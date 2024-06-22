/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{html,js}"],
    theme: {
        container: {
            center: true,
        },
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                helvetica: ['Helvetica-Neue', 'sans-serif'],
            },    
            colors: {
                'primary': {
                   500 : '#226CFE',
                   600 : '#0458FE',
                   700 : '#0346CB',
                }, 
                'secondary': {
                    600 : '#4AD8B6',
                 }, 
                'brand': '#021E45',  
                'main': {
                    400: '#4F5153',
                    500 : '#404144',
                    600 : '#101215',
                    700 : '#060608',
                 },
                'light': '#F7F7F7',  
            },
        },
    },
    plugins: [
        require('prettier-plugin-tailwindcss')
    ],
}