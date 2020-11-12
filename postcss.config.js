module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,
      viewportHeight: 667,
      unitprecision: 5,
      viewportUnit: "vw",
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item','tabbar-item'],
      minPixelValue: 1,
      mediaQuery: false,
    }

  }
}
