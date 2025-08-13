/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    safelist: ['w-12', 'w-16'],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
};