package com.adisetu.app;

import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.util.Log;

import androidx.core.content.FileProvider;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.Executors;

public class UpdateManager {

    private static final String TAG = "UpdateManager";
    private static final String GITHUB_API_URL = "https://api.github.com/repos/Yasinali123/ADISETU/releases/latest";

    public interface UpdateCheckCallback {
        void onResult(boolean updateAvailable, String downloadUrl, String newVersion);
    }

    /**
     * Check GitHub releases for a newer APK version.
     * Runs on a background thread, calls back on the background thread.
     */
    public static void checkForUpdate(Context context, UpdateCheckCallback callback) {
        Executors.newSingleThreadExecutor().execute(() -> {
            try {
                URL url = new URL(GITHUB_API_URL);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");
                conn.setRequestProperty("Accept", "application/vnd.github.v3+json");
                conn.setConnectTimeout(10000);
                conn.setReadTimeout(10000);

                int responseCode = conn.getResponseCode();
                if (responseCode != 200) {
                    Log.d(TAG, "GitHub API returned: " + responseCode);
                    callback.onResult(false, null, null);
                    return;
                }

                BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                StringBuilder response = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
                reader.close();

                JSONObject release = new JSONObject(response.toString());
                String tagName = release.optString("tag_name", "");
                String remoteVersion = tagName.startsWith("v") ? tagName.substring(1) : tagName;

                // Get current app version
                String currentVersion = getCurrentVersion(context);

                if (isNewerVersion(remoteVersion, currentVersion)) {
                    // Find APK download URL from assets
                    JSONArray assets = release.optJSONArray("assets");
                    String downloadUrl = null;
                    if (assets != null) {
                        for (int i = 0; i < assets.length(); i++) {
                            JSONObject asset = assets.getJSONObject(i);
                            String name = asset.optString("name", "");
                            if (name.endsWith(".apk")) {
                                downloadUrl = asset.optString("browser_download_url", null);
                                break;
                            }
                        }
                    }
                    callback.onResult(downloadUrl != null, downloadUrl, remoteVersion);
                } else {
                    callback.onResult(false, null, null);
                }

            } catch (Exception e) {
                Log.e(TAG, "Update check failed", e);
                callback.onResult(false, null, null);
            }
        });
    }

    /**
     * Download APK from URL and trigger install.
     */
    public static void downloadAndInstall(Context context, String downloadUrl) {
        try {
            String fileName = "ADISETU-update.apk";

            // Clean up any previous download
            File oldFile = new File(context.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS), fileName);
            if (oldFile.exists()) {
                oldFile.delete();
            }

            DownloadManager.Request request = new DownloadManager.Request(Uri.parse(downloadUrl));
            request.setTitle("ADISETU Update");
            request.setDescription("Downloading latest version...");
            request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
            request.setDestinationInExternalFilesDir(context, Environment.DIRECTORY_DOWNLOADS, fileName);
            request.setMimeType("application/vnd.android.package-archive");

            DownloadManager downloadManager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
            long downloadId = downloadManager.enqueue(request);

            // Listen for download completion
            BroadcastReceiver receiver = new BroadcastReceiver() {
                @Override
                public void onReceive(Context ctx, Intent intent) {
                    long id = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
                    if (id == downloadId) {
                        ctx.unregisterReceiver(this);
                        installApk(ctx, fileName);
                    }
                }
            };

            IntentFilter filter = new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                context.registerReceiver(receiver, filter, Context.RECEIVER_NOT_EXPORTED);
            } else {
                context.registerReceiver(receiver, filter);
            }

        } catch (Exception e) {
            Log.e(TAG, "Download failed", e);
        }
    }

    private static void installApk(Context context, String fileName) {
        try {
            File file = new File(context.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS), fileName);
            if (!file.exists()) {
                Log.e(TAG, "APK file not found");
                return;
            }

            Intent intent = new Intent(Intent.ACTION_VIEW);
            Uri apkUri;

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                apkUri = FileProvider.getUriForFile(context,
                    context.getPackageName() + ".fileprovider", file);
                intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            } else {
                apkUri = Uri.fromFile(file);
            }

            intent.setDataAndType(apkUri, "application/vnd.android.package-archive");
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(intent);

        } catch (Exception e) {
            Log.e(TAG, "Install failed", e);
        }
    }

    private static String getCurrentVersion(Context context) {
        try {
            PackageInfo info = context.getPackageManager().getPackageInfo(context.getPackageName(), 0);
            return info.versionName;
        } catch (PackageManager.NameNotFoundException e) {
            return "0.0.0";
        }
    }

    /**
     * Compare semantic versions (e.g., "1.1.0" > "1.0.0").
     */
    private static boolean isNewerVersion(String remote, String current) {
        try {
            String[] remoteParts = remote.split("\\.");
            String[] currentParts = current.split("\\.");

            int maxLen = Math.max(remoteParts.length, currentParts.length);
            for (int i = 0; i < maxLen; i++) {
                int r = i < remoteParts.length ? Integer.parseInt(remoteParts[i].replaceAll("[^0-9]", "")) : 0;
                int c = i < currentParts.length ? Integer.parseInt(currentParts[i].replaceAll("[^0-9]", "")) : 0;
                if (r > c) return true;
                if (r < c) return false;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }
}
