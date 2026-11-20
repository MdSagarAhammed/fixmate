module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: {
      // Brand: deep ocean blue. CTA: warm sunset.
      ink: { DEFAULT: '#0b2a4a', 700: '#123b63', 800: '#071f38', 50: '#eef4fa' },
      signal: { DEFAULT: '#ff7a45', dark: '#e65c28' },
      bench: '#f7f4ef',
    },
    fontFamily: { display: ['var(--font-display)', 'sans-serif'], sans: ['var(--font-body)', 'sans-serif'] },
    boxShadow: { glow: '0 24px 70px -24px rgba(11,42,74,.45)' },
  } },
  plugins: [],
};
