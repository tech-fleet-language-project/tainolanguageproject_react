const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

module.exports = (() => {
  /**
   * Metro configuration
   * https://facebook.github.io/metro/docs/configuration
   *
   * @type {import('metro-config').MetroConfig}
   */
  const config = getDefaultConfig(__dirname);

  const {transformer, resolver} = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve(
      'react-native-typescript-transformer',
    ),
    minifierPath: 'metro-minify-terser',
    minifierConfig: {
      compress: {
        // enable all unsafe optimizations.
        unsafe: true,
        unsafe_arrows: true,
        unsafe_comps: true,
        unsafe_Function: true,
        unsafe_math: true,
        unsafe_symbols: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        unsafe_undefined: true,
        unused: true,
      },
    },
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: true,
        inlineRequires: true,
      },
    }),
  };

  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts,
    sourceExts: resolver.sourceExts,
  };

  return config;
})();

// config.transformer.getTransformOptions = async () => ({
//   transform: {
//     experimentalImportSupport: true,
//   },
// });

// config.transformer.minifierPath = 'metro-minify-terser';

// config.transformer.minifierConfig = {
//   compress: {
//     // Enable all unsafe optimizations.
//     unsafe: true,
//     unsafe_arrows: true,
//     unsafe_comps: true,
//     unsafe_Function: true,
//     unsafe_math: true,
//     unsafe_symbols: true,
//     unsafe_methods: true,
//     unsafe_proto: true,
//     unsafe_regexp: true,
//     unsafe_undefined: true,
//     unused: true,
//   },
// };
