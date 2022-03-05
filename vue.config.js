module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/twitter/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        data: `
           @import "@/assets/style/_variables.scss";
           @import "@/assets/style/_base.scss";
           @import "@/assets/style/_reset.scss";
           @import "@/assets/style/_mixin.scss";
        `
      }
    }
  }
};