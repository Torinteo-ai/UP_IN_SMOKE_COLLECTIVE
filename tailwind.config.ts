import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050706',
        charcoal: '#0e1210',
        emeraldGlow: '#7dffbf'
      },
      boxShadow: {
        glow: '0 0 40px rgba(125,255,191,0.20)',
        soft: '0 20px 45px rgba(0,0,0,0.35)'
      },
      backgroundImage: {
        grain: 'radial-gradient(circle at 20% 20%, rgba(125,255,191,0.08), transparent 35%), radial-gradient(circle at 80% 0%, rgba(125,255,191,0.12), transparent 40%)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(125,255,191,0.0)' },
          '50%': { boxShadow: '0 0 30px rgba(125,255,191,0.25)' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite'
      }
    }
  },
  plugins: [],
};

export default config;
