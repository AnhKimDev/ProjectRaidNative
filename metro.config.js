const { getDefaultConfig } = require("expo/metro-config");

const createConfig = () => {
  const config = getDefaultConfig(__dirname);
  const { transformer, resolver } = config;

  // Comment out the SVG transformer and asset extensions
  // config.transformer = {
  //   ...transformer,
  //   babelTransformerPath: require.resolve("react-native-svg-transformer"),
  // };

  // config.resolver = {
  //   ...resolver,
  //   assetExts: [...resolver.assetExts, "svg"],
  //   sourceExts: [...resolver.sourceExts, "svg"],
  // };

  return config;
};

const config = createConfig();
module.exports = config;
