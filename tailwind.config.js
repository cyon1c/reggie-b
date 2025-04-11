/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F20C1F', // Bright red
        secondary: '#BF1120', // Darker red
        white: '#F2F2F2', // Almost white
        gray: '#404040', // Medium gray
        dark: '#0D0D0D', // Nearly black
        darker: '#0D0D0D', // Nearly black (same as dark)
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-bebas)', 'var(--font-orbitron)', 'system-ui', 'sans-serif'], // Bold display font
        title: ['var(--font-vt323)', 'var(--font-orbitron)', 'monospace'], // Pixelated retro font
      },
      fontSize: {
        '7xl': '5rem',
        '8xl': '6rem',
        '9xl': '8rem',
      },
      letterSpacing: {
        tighter: '-.05em',
        tight: '-.025em',
        normal: '0',
        wide: '.025em',
        wider: '.05em',
        widest: '.1em',
        super: '.25em',
      },
    },
  },
  plugins: [],
}; 