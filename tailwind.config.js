/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // Make sure the image is in your /public folder!
        'bagan-night': "url('/bagan-night.png')",
        'bagan-day': "url('/bagan-day.png')",
      },
    },
  },
  plugins: [],
}