// generate loader string to be used with extract text plugin
function generateLoaders(loader, loaderOptions) {
  const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];

  if (loader) {
    loaders.push({
      loader: loader + "-loader",
      options: Object.assign({}, loaderOptions, {
        sourceMap: options.sourceMap,
      }),
    });
  }

  // 此处为添加的less全局配置代码，其中patterns里路径为需要使用的全局less文件所在的路径
  if (loader == "less") {
    loaders.push({
      loader: "style-resources-loader",
      options: {
        patterns: path.resolve(__dirname, "../src/css/*.less"),
      },
    });
  }

  // Extract CSS when that option is specified
  // (which is the case during production build)
  if (options.extract) {
    return ExtractTextPlugin.extract({
      use: loaders,
      fallback: "vue-style-loader",
    });
  } else {
    return ["vue-style-loader"].concat(loaders);
  }
}
