let proxyObj={};

proxyObj['/api']={
    // target: 'http://127.0.0.1:8000',
    target: 'http://localhost:8000',
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    }
};

/* 
聊天室
*/
proxyObj['/ws']={
  ws:true,
  target:"ws://localhost:8000"
};
proxyObj['/']={
  ws:false,
  target:'http://localhost:8000',
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
        port: 80,
        proxy: proxyObj
    }
}