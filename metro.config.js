// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');



/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  // @ignore
  isCSSEnabled: true,
});



config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: true,
  },
});

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

