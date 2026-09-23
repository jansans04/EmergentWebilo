/** @type {import('tailwindcss').Config} */
module.exports = {
    blocklist: ["overline"],
    darkMode: ["class"],
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                },
                turquoise: {
                    DEFAULT: '#1FC8C0',
                    light: '#7FE0DA',
                    tint: '#E8FAF9',
                    dark: '#17A398'
                },
                navy: {
                    DEFAULT: '#0A2540',
                    surface: '#0F3254',
                    border: '#1A446C'
                },
                azure: '#E6F4F8',
                ink: '#0B1220',
                slateblue: '#5B6B7A',
                linegray: '#E2E8F0',
                mist: '#A8B8C6',
                wa: '#25D366'
            },
            fontFamily: {
                display: ['Satoshi', 'Inter', '-apple-system', 'sans-serif'],
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
            },
            boxShadow: {
                soft: '0 20px 50px -20px rgba(10,37,64,0.25)',
                lift: '0 24px 60px -24px rgba(10,37,64,0.35)'
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                marquee: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-50%)' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                marquee: 'marquee 46s linear infinite'
            }
        }
    },
    plugins: [require("tailwindcss-animate")]
};
