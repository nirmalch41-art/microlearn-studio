/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#070A13', // deepest navy black
          850: '#0B0F19', // dashboard background
          800: '#111827', // card surface
          750: '#151E32', // card hover surface
          700: '#1E293B', // border surface
          600: '#334155', // muted border
        },
        circuit: {
          cyan: '#06B6D4',
          cyanGlow: '#22D3EE',
          purple: '#8B5CF6',
          purpleGlow: '#A78BFA',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
          blue: '#3B82F6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(rgba(34, 211, 238, 0.08) 1px, transparent 1px)",
        'circuit-gradient': "linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)",
      }
    },
  },
  plugins: [],
}