const { withAndroidManifest, AndroidConfig } = require("@expo/config-plugins");

function addMetaDataToMainApplication(androidManifest, attributes) {
  const mainApplication =
    AndroidConfig.Manifest.getMainApplicationOrThrow(androidManifest);
  mainApplication["meta-data"].push({ $: attributes });

  // this one works too! :)
  // const mainApplication =
  //   AndroidConfig.Manifest.getMainApplicationOrThrow(androidManifest);
  // AndroidConfig.Manifest.addMetaDataItemToMainApplication(
  //   mainApplication,
  //   "com.google.mlkit.vision.DEPENDENCIES",
  //   "ocr"
  // );

  return androidManifest;
}

module.exports = function withAndroidMainActivityAttributes(
  config,
  attributes
) {
  return withAndroidManifest(config, (config) => {
    config.modResults = addMetaDataToMainApplication(
      config.modResults,
      attributes
    );
    return config;
  });
};
