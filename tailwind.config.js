/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    screens: {
      '390': '390px',
      'fold': '600px',
      'tablet': '768px',
      'laptop': '1024px',
      'desktop': '1232px',
      'wide-desktop': '1536px',
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'skz-intimidavely' : '#FF0D41',
        'skz-navisity' : '#0CBFA1',
        'skz-distincute' : '#FF0D98',
        'skz-adventurule' : '#830DFF',
        'skz-rasmart' : '#FF8812',
        'skz-youthbloom' : '#F955E9',
        'skz-outstanaline' : '#FF9700',
        'skz-dratsy' : '#0000FF'
      },
      fontFamily: {
        'plastic': ['"Plastic Beach"', 'sans-serif'],
      },
      fontSize: {
        'head-96px': ['96px', {
          lineHeight: '0.9',
          letterSpacing: 'normal',
          fontWeight: '400',
        }],
        'head-88px': ['88px', {
          lineHeight: '1',
          letterSpacing: 'normal',
          fontWeight: '400',
        }],
        'head-80px': ['80px', {
          lineHeight: '0.8',
          letterSpacing: 'normal',
          fontWeight: '400',
        }],
        'head-72px': ['72px', {
          lineHeight: '1',
          letterSpacing: 'normal',
          fontWeight: '400',
        }],
        'head-64px': ['64px', {
          lineHeight: '1',
          letterSpacing: 'normal',
          fontWeight: '400',
        }],
        'head-56px': ['56px', {
          lineHeight: '1',
          letterSpacing: 'normal',
          fontWeight: '400',
        }],
        'head-48px': ['48px', {
          lineHeight: '1.3',
          letterSpacing: 'normal',
          fontWeight: '400',
        }],
        'body-40px-black': ['40px', {
          lineHeight: '1',
          letterSpacing: 'normal',
          fontWeight: '900',
        }],
        'body-32px-bold': ['32px', {
          lineHeight: '1',
          letterSpacing: 'normal',
          fontWeight: '700',
        }],
        'body-24px-black': ['24px', {
          lineHeight: '1',
          letterSpacing: 'normal',
          fontWeight: '900',
        }],
        'body-24px-bold': ['24px', {
          lineHeight: '1',
          letterSpacing: 'normal',
          fontWeight: '700',
        }],
        'body-24px': ['24px', {
          lineHeight: '1',
          letterSpacing: 'normal',
          fontWeight: '500',
        }],
        'body-20px-black': ['20px', {
          lineHeight: '1',
          letterSpacing: 'normal',
          fontWeight: '900',
        }],
        'body-20px-bold': ['20px', {
          lineHeight: '1',
          letterSpacing: 'normal',
          fontWeight: '700',
        }],
        'body-20px': ['20px', {
          lineHeight: '1',
          letterSpacing: 'normal',
          fontWeight: '500',
        }],
        'body-16px-black': ['16px', {
          lineHeight: 'normal',
          letterSpacing: 'normal',
          fontWeight: '900',
        }],
        'body-16px-bold': ['16px', {
          lineHeight: 'normal',
          letterSpacing: 'normal',
          fontWeight: '700',
        }],
        'body-16px': ['16px', {
          lineHeight: 'normal',
          letterSpacing: 'normal',
          fontWeight: '500',
        }],
        'body-14px': ['14px', {
          lineHeight: 'normal',
          letterSpacing: 'normal',
          fontWeight: '500',
        }],
        'body-12px-black': ['12px', {
          lineHeight: 'normal',
          letterSpacing: 'normal',
          fontWeight: '900',
        }],
      },
      boxShadow: {
        card: '-16px 16px 0px 0px rgba(0, 0, 0, 0.10)'
      }
    },
  },
  plugins: [],
}

