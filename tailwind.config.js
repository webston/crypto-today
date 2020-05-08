const plugin = require('tailwindcss/plugin')

module.exports = {
    theme: {
        fontFamily: {
            'roboto': ['Roboto', 'sans-serif'],
        },
        container: {
            padding: '2rem'
        },
        fontSize: {
            '12': '0.75rem',
            '13': '0.8125rem',
            '14': '0.875rem',
            '15': '0.9375rem',
            '16': '1rem',
            '17.5': '1.0625rem',
            '18': '1.125rem',
            '19': '1.1875rem',
            '20': '1.25rem',
            '22': '1.375rem',
            '24': '1.5rem',
            '26': '1.625rem',
            '29': '1.8125rem',
            '30': '1.875rem',
            '32': '2rem',
            '34': '2.125rem',
            '36': '2.25rem',
            '40': '2.5rem',
            '44': '2.75rem',
            '45': '2.8125rem',
            '50': '3.125rem',
            '55': '3.4375rem',
            '57': '3.5625rem',
            '60': '3.75rem',
            '70': '4.375rem',
            '90': '5.625rem',
            '100': '6.25rem',
            '110': '6.875rem',
        },
        extend: {
            colors: {
                'green': '#00CF91',
                'blue': '#1771F1',
                'opacity-blue': 'rgba(23, 113, 241, 0.9)',
                'light-blue': '#eef5ff',
                'light-green': '#F0F6F4',
                'red': '#FF6A61'
            },
            maxWidth: {
                '600': '600px',
                '700': '700px',
                '900': '900px',
                '1200' : '1200px',
            },
            width: {
                '2px': '2px',
                '20px': '20px',
                '24px': '24px',
                '33px': '33px',
                '67px': '67px',
                '73px': '73px',
                '84px': '84px',
                '87px': '87px',
                '94px': '94px',
                '98px': '98px',
                '116px': '116px',
                '150px': '150px',
                '330px': '330px'
            },
            margin: {
                '-17px': '-17px',
                '-4px': '-4px',
                '-2px': '-2px',
                '3px': '3px',
                '4px': '4px',
                '5px': '5px',
                '6px': '6px',
                '7px': '7px',
                '8px': '8px',
                '9px': '9px',
                '10px': '10px',
                '11px': '11px',
                '12px': '12px',
                '14px': '14px',
                '15px': '15px',
                '16px': '16px',
                '17px': '17px',
                '18px': '18px',
                '19px': '19px',
                '20px': '20px',
                '21px': '21px',
                '22px': '22px',
                '24px': '24px',
                '25px': '25px',
                '27px': '27px',
                '28px': '28px',
                '30px': '30px',
                '32px': '32px',
                '33px': '33px',
                '35px': '35px',
                '40px': '40px',
                '42px': '42px',
                '44px': '44px',
                '45px': '45px',
                '50px': '50px',
                '55px': '55px',
                '60px': '60px',
                '70px': '70px',
                '76px': '76px',
                '80px': '80px',
                '83px': '83px',
                '90px': '90px',
                '95px': '95px',
                '100px': '100px',
                '112px': '112px',
                '187px': '187px',
            },
            height: {
                '40px': '40px'
            },
            padding: {
                '4px': '4px',
                '6px': '6px',
                '7px': '7px',
                '8px': '8px',
                '9px': '9px',
                '10px': '10px',
                '12px': '12px',
                '13px': '13px',
                '14px': '14px',
                '15px': '15px',
                '16px': '16px',
                '17px': '17px',
                '18px': '18px',
                '19px': '19px',
                '20px': '20px',
                '21px': '21px',
                '22px': '22px',
                '23px': '23px',
                '24px': '24px',
                '25px': '25px',
                '26px': '26px',
                '27px': '27px',
                '28px': '28px',
                '30px': '30px',
                '34px': '34px',
                '35px': '35px',
                '36px': '36px',
                '39px': '39px',
                '40px': '40px',
                '46px': '46px',
                '50px': '50px',
                '70px': '70px',
                '72px': '72px',
                '83px': '83px',
                '90px': '90px',
                '100px': '100px',
                '102px': '102px',
                '116px': '116px',
                '240px': '240px',
                '9/16': '56.25%',
            },
        },
    },
    variants: {},
    plugins: [
        plugin(function({ addUtilities }) {
            const newUtilities = {
                '.transform-x-center': {
                    transform: 'rotate(0deg)',
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)'
                },
                '.hyphens-auto': {
                    hyphens: 'auto'
                }
            }

            addUtilities(newUtilities, ['responsive'])
        })
    ],
}