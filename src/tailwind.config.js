/** @type {import('tailwindcss').Config} */
export default {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      backgroundImage: {
        "bg-img": "url('/images/bg-img.avif')",
        "bg-img2": "url('/images/bg-img2.avif')",
        "bg-img3": "url('/images/bg-img3.avif')",
        "bg-img4": "url('/images/bg-img4.avif')",
      },
    },
  },
  plugins: [],
};
