'use strict'
const titles = require('./title.js')
const glob = require('glob')
const pages = {}
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const productionGzipExtensions = ['js', 'css']
let Version = new Date().getTime()

glob.sync('./src/pages/**/app.js').forEach(path => {
  const chunk = path.split('./src/pages/')[1].split('/app.js')[0]
  pages[chunk] = {
    entry: path,
    template: 'public/index.html',
    title: titles[chunk],
    chunks: ['chunk-vendors', 'chunk-common', chunk]
  }
})
module.exports = {
  pages,
  css: { // 是否使用css分离插件 ExtractTextPlugin
    extract: { // 一种方式，打包后的css 会带版本号，不改变文件名的。
      filename: 'css/[name]' + Version + '.css',
      chunkFilename: 'css/[name]' + Version + '.css' // 一种方式，每次打包后的css文件名会变更新。
    }
  },
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugins.delete('named-chunks')
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .tap(options => { // 修改它的选项...
        options.fallback.options.name = 'img/[name].[ext]?' + Version // 去除图片hash
        options.limit = 1
        return options
      })
  },
  configureWebpack: config => {
    config.output.filename = 'js/[name]' + Version + '.js'
    config.output.chunkFilename = 'js/[name]' + Version + '.js' // 这种是给打包后的chunk文件加版本号
    // if (process.env.NODE_ENV === 'production') { // 生产环境
    //   config.plugins.push(
    //     new CompressionWebpackPlugin({
    //       filename: '[path].gz[query]',
    //       algorithm: 'gzip',
    //       test: /\.js$|\.html$|\.css/,
    //       threshold: 10240,
    //       deleteOriginalAssets: true
    //     })
    //   )
    // }
  },
  baseUrl: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.19.17:91',
        // target: 'http://127.0.0.1',
        // target: 'http://192.168.0.73:8080',
        // target: 'http://101.37.14.15:8080',
        changeOrigin: true,
        // pathRewrite: { '^/api': '/api' }
        pathRewrite: { '^/api': '/api' }
      }
    }
  }
}
