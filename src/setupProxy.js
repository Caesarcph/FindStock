const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/yahoo-finance',
    createProxyMiddleware({
      target: 'https://query1.finance.yahoo.com',
      changeOrigin: true,
      pathRewrite: {
        '^/yahoo-finance': '', // 移除 /yahoo-finance 前缀
      },
      onProxyRes: function (proxyRes) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      },
    })
  );
};
