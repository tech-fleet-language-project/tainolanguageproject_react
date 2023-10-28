const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);



{
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

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

module.exports = config;
