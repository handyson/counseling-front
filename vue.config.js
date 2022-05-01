let proxyObj = {};

proxyObj['/api'] = {
  target: 'http://vp2p76.natappfree.cc',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
};
proxyObj['/ws'] = {
  ws: true,
  target: "http://vp2p76.natappfree.cc"
};
proxyObj['/'] = {
  ws: false,
  target: 'http://vp2p76.natappfree.cc',
  changeOrigin: true,
  pathRewrite: {
    '^/': ''
  }
};

module.exports = {
  baseUrl: './',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    public: 'localhost',
    port: 80,
    proxy: proxyObj
  }
}