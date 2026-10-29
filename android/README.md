# ADISETU Android App 🌾

Native Android wrapper for **ADISETU** (Bridging Tribal Wisdom & Modern AI for Jharkhand Farmers).

---

## 🚀 Key Features

- **Full Feature Parity**: Loads the live, real-time updated ADISETU web app (`https://adisetu.vercel.app`) with zero lag.
- **Hardware Integrations**:
  - 📷 **Crop Scanner & OCR**: Directly captures photos with device camera or selects from gallery for Gemini 3.5 Flash disease and packaging label analysis.
  - 🎙️ **AI Voice Advisor**: Full microphone access for voice-based crop advice in Hindi, Santhali, and English.
  - 📍 **Weather & Location**: Geolocation permissions for automatic district weather detection.
- **Offline Resilience**: Automatic offline detection screen with retry mechanism and network reconnection listener.
- **Pull-to-Refresh**: Swipe down at any time to refresh data and market prices.
- **OTA (Over-The-Air) Auto-Updates**:
  - Automatically queries `api.github.com/repos/Yasinali123/ADISETU/releases/latest`.
  - Prompts users when a new APK version is released.
  - Downloads and triggers Android's package installer in one tap.

---

## 🛠️ GitHub Actions Automated APK Builder

The repository includes a GitHub Actions workflow: [`.github/workflows/build-apk.yml`](../.github/workflows/build-apk.yml).

### How to get the APK:

1. **Automatic Build on Push**:
   - Whenever code is pushed to `android/**`, GitHub Actions automatically compiles both:
     - `ADISETU-v1.0.0-debug.apk`
     - `ADISETU-v1.0.0-release.apk`
   - Download them directly from the **Actions** tab on your GitHub repository under **Artifacts**.

2. **Publish a Release (Triggers OTA update for all users)**:
   - Go to your GitHub repository -> **Actions** tab.
   - Select **Build Android APK** in the left sidebar.
   - Click **Run workflow**:
     - `Create a GitHub Release with APK`: Choose `true`
     - `Version name`: Enter `1.0.1` (or whatever version you want)
   - GitHub Actions will build the signed APK, attach it to the release, and all installed ADISETU apps will automatically see the update prompt!

---

## 📱 App Specifications

- **Package Name**: `com.adisetu.app`
- **Minimum SDK**: 24 (Android 7.0 Nougat) — covers 96%+ of active Android devices
- **Target SDK**: 34 (Android 14)
- **Architecture**: Single Activity WebView Architecture + Native Android Download/Update Engine

