const { getDefaultConfig } = require("expo/metro-config");

const createConfig = () => {
  const config = getDefaultConfig(__dirname);
  const { transformer, resolver } = config;

  // Add SVG transformer to the Babel pipeline.
  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };

  // Include SVG files in the asset extensions.
  config.resolver = {
    ...resolver,
    assetExts: [...resolver.assetExts, "svg"],
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return config;
};

const config = createConfig();
module.exports = config;
