/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#162E22',
          dark: '#0E1F16',
          light: '#254B38',
          subtle: '#2E5A44'
        },
        leaf: {
          DEFAULT: '#4A7C59',
          soft: '#88AB8E',
          pale: '#E2EBE4',
          highlight: '#34D399'
        },
        harvest: {
          DEFAULT: '#D97706',
          amber: '#F59E0B',
          warm: '#D97706',
          pale: '#FEF3C7'
        },
        paper: {
          DEFAULT: '#FAF8F5',
          card: '#FFFFFF',
          muted: '#EFECE6',
          dark: '#E7E2D9'
        },
        charcoal: {
          DEFAULT: '#1A201C',
          muted: '#4B5563',
          light: '#6B7280'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Noto Sans Devanagari', 'Noto Sans Ol Chiki', 'sans-serif'],
        editorial: ['Plus Jakarta Sans', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft-natural': '0 4px 20px -2px rgba(22, 46, 34, 0.08)',
        'elevated-farm': '0 12px 32px -4px rgba(22, 46, 34, 0.12)',
        'glow-harvest': '0 0 24px rgba(245, 158, 11, 0.3)',
        'glow-mic': '0 0 32px rgba(74, 124, 89, 0.4)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan-line': 'scan 2.5s ease-in-out infinite',
        'wave-bar': 'wave 1.2s ease-in-out infinite alternate',
      },
      keyframes: {
        scan: {
          '0%, 100%': { top: '0%' },
          '50%': { top: '95%' },
        },
        wave: {
          '0%': { transform: 'scaleY(0.3)' },
          '100%': { transform: 'scaleY(1.0)' },
        }
      }
    },
  },
  plugins: [],
}
