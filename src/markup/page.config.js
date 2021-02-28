module.exports = {
  data: {
    // ejsに注入するデータを定義
    // `htmlWebpackPlugin.options.data` でアクセスする
    site: {
      name: 'site name',
      lang: 'ja',
      charset: 'UTF-8',
      dir: 'ltr',
      title: 'site title',
      separater: ' | ',
    },
    path: {
      favicon: 'assets/favicons',
      font: 'assets/fonts',
      css: 'assets/styles',
      js: 'assets/javascripts',
      vector: 'assets/media/images/vector',
      raster: 'assets/media/images/raster',
      video: 'assets/media/videos',
      audio: 'assets/media/audios',
    },
    env: process.env.NODE_ENV,
  },
}
