/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        render: {
          '0%': { transform: 'scale(0.5)' },
          '100%': { transform: 'scale(1)' },
        },
        remove: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0.2) ' },
        },
      },
      animation: {
        render: 'render 0.2s',
        remove: 'remove 0.2s',
      },
      colors: {
        mainColor: '#37485D',
        backgroundColor: '#F0F2F5',
        black: '#0C151C',
        white: '#FFFFFF',
      },
    },
    fontFamily: {
      Pretendard: 'Pretendard-Regular',
    },
    screens: {
      mobile: { min: '360px', max: '767px' },
      pc: { min: '768px' },
    },
  },
  plugins: [],
};
