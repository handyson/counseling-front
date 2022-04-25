let proxyObj = {};

proxyObj['/api'] = {
  target: 'http://localhost:8000',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
};
proxyObj['/ws'] = {
  ws: true,
  target: "http://localhost:8000"
};
proxyObj['/'] = {
  ws: false,
  target: 'http://localhost:8000',
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