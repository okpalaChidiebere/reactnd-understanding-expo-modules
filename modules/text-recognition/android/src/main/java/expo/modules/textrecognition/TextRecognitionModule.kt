package expo.modules.textrecognition

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.ModuleDefinition

class TextRecognitionModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    Name("TextRecognition")

    AsyncFunction("recognizeImage") { url: String, promise: Promise ->
      promise.resolve("Hello world from Android! 👋")
    }
  }
}
