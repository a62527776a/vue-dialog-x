console.log(process.VUE_CLI_SERVICE.mode)

let vueConfig = {
  publicPath: '',
  outputDir: process.VUE_CLI_SERVICE.mode === 'demo' ? 'docs/' : 'dist/',
  productionSourceMap: process.VUE_CLI_SERVICE.mode === 'demo',
  pages: process.VUE_CLI_SERVICE.mode === 'demo' ? {
    index: {
      entry: 'demo/main.ts',
      template: 'public/index.html'
    }
  } : {
    index: {
      entry: 'src/main.ts'
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

module.exports = vueConfig