const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/lotto-api",
    createProxyMiddleware({
      target: "https://developers.lotto.pl",
      changeOrigin: true,
      pathRewrite: {
        "^/lotto-api": "/api/open/v1/departments", // Opcjonalnie, możesz zmienić ścieżkę
      },
    })
  );
};
