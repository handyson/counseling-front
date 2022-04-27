let proxyObj = {};

proxyObj['/api'] = {
  target: 'http://8i7vsd.natappfree.cc',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
};
proxyObj['/ws'] = {
  ws: true,
  target: "http://8i7vsd.natappfree.cc"
};
proxyObj['/'] = {
  ws: false,
  target: 'http://8i7vsd.natappfree.cc',
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