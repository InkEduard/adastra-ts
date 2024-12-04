import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './{assets,config,layout,locales,sections,snippets,src,templates}/**/*.{js,ts,liquid,json}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '10px',
          '2xl': '0',
        },
      },
      screens: {
        md: '768px',
        lg: '1024px',
        xl: '1440px',
        '2xl': '1660px',
      },
      colors: {
        'green-dark': 'rgba(var(--color-green-dark) / <alpha-value>)', // #2d3f1c
        primary: 'rgba(var(--color-primary) / <alpha-value>)', // #476529
        'green-light': 'rgba(var(--color-green-light) / <alpha-value>)', // #7bb264
        mustard: 'rgba(var(--color-mustard) / <alpha-value>)', // #aea276
        brown: 'rgba(var(--color-brown) / <alpha-value>)', // #2e2e2d
        'brown-light': 'rgba(var(--color-brown-light) / <alpha-value>)', // #9b8477
        'orange-light': 'rgba(var(--color-orange-light) / <alpha-value>)', // #edb993
        orange: 'rgba(var(--color-orange) / <alpha-value>)', // #faa12c
        red: 'rgba(var(--color-red) / <alpha-value>)', // #ee6452
        'bright-red': 'rgba(var(--color-bright-red) / <alpha-value>)', // #f44336
        'gray-light': 'rgba(var(--color-gray-light) / <alpha-value>)', // #f9f9f9
        'blue-light': 'rgba(var(--color-blue-light) / <alpha-value>)', // #2564eb
      },
      boxShadow: {
        lg: '0 10px 20px -12px rgba(0, 0, 0, 0.42), 0 3px 20px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
        xl: '0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
      },
      textShadow: {
        DEFAULT: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
      },
      fontFamily: {
        heading: [
          'var(--font-heading-family)',
          ...defaultTheme.fontFamily.sans,
        ],
        body: ['var(--font-body-family)', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xxs: ['var(--font-size-xxs)', '12px'], // 10px/12px
        xs: ['var(--font-size-xs)', '14px'], // 12px/14px
        sm: ['var(--font-size-sm)', '16px'], // 14px/16px
        base: ['var(--font-size-base)', '20px'], // 16px/20px
        lg: ['var(--font-size-lg)', '24px'], // 18px/24px
        xl: ['var(--font-size-xl)', '26px'], // 20px/26px
        '2xl': ['var(--font-size-2xl)', '32px'], // 24px/32px
        '3xl': ['var(--font-size-3xl)', '32px'], // 26px/32px
        '4xl': ['var(--font-size-4xl)', '34px'], // 30px/34px
        '5xl': ['var(--font-size-5xl)', '36px'], // 36px/36px
        '6xl': ['var(--font-size-6xl)', '50px'], // 50px/50px
        '7xl': ['var(--font-size-7xl)', '70px'], // 70px/70px
      },
      lineHeight: {
        2: '0.5rem', // 8px
        3.5: '0.875rem', // 14px
        4.5: '1.125rem', // 18px
        5.5: '1.375rem', // 22px
        6.5: '1.625rem', // 26px
        7.5: '1.875rem', // 30px
        8.5: '2.125rem', // 34px
        10.5: '2.625rem', // 42px
      },
      borderRadius: {
        '3xl': '1.25rem', // 20px
        large: '28px', // 28px
      },
      spacing: {
        0.75: '0.1875rem', // 3px
        1.25: '0.3125rem', // 5px
        1.5: '0.375rem', // 6px
        1.75: '0.4375rem', // 7px
        2.5: '0.625rem', // 10px
        2.75: '0.6875rem', // 11px
        3.25: '0.875rem', // 14px
        3.75: '0.9375rem', // 15px
        4.25: '1.0625rem', // 17px
        4.5: '1.125rem', // 18px
        4.75: '1.1875rem', // 19px
        5.5: '1.375rem', // 22px
        6.25: '1.5625rem', // 25px
        6.5: '1.625rem', // 26px
        7.5: '1.875rem', // 30px
        8.5: '2.125rem', // 34px
        9: '2.25rem', // 36px
        9.5: '2.375rem', // 38px
        10.5: '2.625rem', // 42px
        12.5: '3.125rem', // 50px
        13.5: '3.375rem', // 54px
        15: '3.75rem', // 60px
        17: '4.25rem', // 68px
        18: '4.5rem', // 72px
        20: '5rem', // 80px
        25: '6.25rem', // 100px
        26: '6.5rem', // 104px
        29: '7.25rem', // 116px
        30: '7.5rem', // 120px
        35: '8.75rem', // 140px
        50: '12.5rem', // 200px
        75: '18.75rem', // 300px
      },
      maxWidth: {
        '1/2': '50%',
      },
      keyframes: {
        // throb - Tailwind's default 'pulse' animation
        // Changed because of Klaviyo styles conflict
        throb: {
          '50%': { opacity: '.5' },
        },
        sliding: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(50%)' },
        },
      },
      animation: {
        throb: 'throb 2s cubic-bezier(.4,0,.6,1) infinite',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
      aria: {
        invalid: 'invalid="true"',
      },
    },
  },

  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'base',
    }),

    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'text-shadow': value => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    }),
  ],
};
