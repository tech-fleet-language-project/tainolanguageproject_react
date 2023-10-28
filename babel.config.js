dmodule.exports = function (api) {
  api.cache(true);
  const disableImportExportTransform = true;
  return {
    presets: [
      [
        'module:metro-react-native-babel-preset',
        'react-native',
        {
          native: {
            disableImportExportTransform,
          },
          web: {
            disableImportExportTransform,
          },
        },
      ],
    ],
  };
};
