export default {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'sans-serif']
            },
            colors: {
                primary: '#4F46E5',
                accent: '#ccf32f'
            }
        }
    },
    plugins: []
}
