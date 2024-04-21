import ExpoModulesCore

internal class FileNotFoundException: GenericException<String> {
  override var reason: String {
    "File \(param) not found"
  }
}

internal class TextRecognitionFailedException: GenericException<String?> {
  override var reason: String {
    "Text recognizer failed with error: \(param ?? "nil")"
  }
}

// internal class TextRecognitionFailedException: Exception {
//   override var reason: String {
//     "Text recognizer failed"
//   }
// }