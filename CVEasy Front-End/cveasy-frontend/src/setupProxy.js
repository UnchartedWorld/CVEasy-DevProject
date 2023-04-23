const { createProxyMiddleware } = require("http-proxy-middleware");


module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: "https://localhost:7237",
            changeOrigin: true,
            secure: false // This is horrendously insecure. However, this is a PoC, not a production build. So it's fine.
        })
    );
};