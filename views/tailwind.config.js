module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        navBtn: "100px",
      },
      colors: {
        purpleBg: "#9F5F80",
        primaryBg: "#FFC996",
        secondaryBg: "#FF8474",
        navBtn: "#583D72"
      },
      boxShadow: {
        nav: "5px 5px 4px 0px #9F5F806B"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
