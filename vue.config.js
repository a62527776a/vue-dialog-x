module.exports = {
  pages: {
    demo: {
      entry: 'demo/main.ts',
      template: 'public/index.html'
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/styles/index.sass";`
      }
    }
  }
}