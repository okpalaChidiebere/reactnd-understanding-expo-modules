const { withDangerousMod, withPlugins } = require("@expo/config-plugins");
const { resolve } = require("path");
const { readFileSync, writeFileSync } = require("fs");

function withTextRecognitionPod(config) {
  return withDangerousMod(config, [
    "ios",
    (cfg) => {
      const { platformProjectRoot } = cfg.modRequest;
      const podfile = resolve(platformProjectRoot, "Podfile");
      const contents = readFileSync(podfile, "utf-8");
      const lines = contents.split("\n");
      const index = lines.findIndex((line) =>
        /\s+use_expo_modules!/.test(line)
      );

      writeFileSync(
        podfile,
        [
          ...lines.slice(0, index),
          `  pod 'GoogleMLKit/TextRecognition', '3.2.0' #install pod dependency for Text Recognition`,
          ...lines.slice(index),
        ].join("\n")
      );

      return cfg;
    },
  ]);
}
function withPodFile(config) {
  return withPlugins(config, [withTextRecognitionPod]);
}

module.exports = withPodFile;

//  I didn't use this plugin but its good to know how to lines to podfile! :)
