const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  chainWebpack: config => {
    config.plugins.delete('copy'); // 🔥 remove o plugin que duplica o index.html
  }
});
