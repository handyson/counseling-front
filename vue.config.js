let proxyObj={};

proxyObj['/ws']={
  ws:true,
  target:"http://kcd84m.natappfree.cc"
};
proxyObj['/']={
  ws:false,
  target:'http://kcd84m.natappfree.cc',
  changeOrigin: true,
  pathRewrite:{
    '^/':''
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