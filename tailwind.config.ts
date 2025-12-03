import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                nunito: ['var(--font-nunito)', 'sans-serif'],
                merriweather: ['var(--font-merriweather)', 'serif'],
                sans: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
                serif: ['var(--font-merriweather)', 'Georgia', 'serif'],
            },
            colors: {
                sepia: {
                    50: '#fdf8f3',
                    100: '#f8ead5',
                    200: '#f3ddb7',
                    300: '#eed099',
                    400: '#e9c37b',
                    500: '#e4b65d',
                },
            },
        },
    },
    plugins: [],
}
export default config
