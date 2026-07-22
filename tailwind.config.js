/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: '#243629',
        'forest-2': '#2E4738',
        'forest-deep': '#182319',
        sage: '#7C9A82',
        'sage-tint': '#E7ECDE',
        paper: '#FBF7EE',
        'paper-2': '#F4EEDE',
        gold: '#DFA23A',
        'gold-soft': '#F0C878',
        coral: '#D3684B',
        ink: '#20291F',
        'ink-soft': '#54604F',
        cream: '#F7F2E4',
        line: '#D9D2BE',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      maxWidth: {
        wrap: '1180px',
      },
      borderRadius: {
        brand: '22px',
      },
    },
  },
  plugins: [],
};
