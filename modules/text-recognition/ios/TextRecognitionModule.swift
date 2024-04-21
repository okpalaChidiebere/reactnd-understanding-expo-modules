import ExpoModulesCore
import MLKitTextRecognition
import MLKitVision

public class TextRecognitionModule: Module {
  public func definition() -> ModuleDefinition {
    Name("TextRecognition")

    AsyncFunction("recognizeImage") { (localUri: String, promise: Promise) in
      let fileURL = URL(string:localUri)! // Let is defining a constant variable
      let imageData = try? Data(contentsOf: fileURL)
      if let mImage = UIImage(data: imageData!){
        let visionImage = VisionImage(image: mImage)
        visionImage.orientation = mImage.imageOrientation
        let latinOptions = TextRecognizerOptions()
        let latinTextRecognizer = TextRecognizer.textRecognizer(options: latinOptions)
        latinTextRecognizer.process(visionImage) { result, error in
          guard error == nil, let result = result else {
            // Error handling
            return promise.reject(TextRecognitionFailedException(error?.localizedDescription))
          }
          // Recognized text
          var response = ["width": mImage.size.width, "height": mImage.size.height, "blocks": []] 
          for block in result.blocks {
            let blockText = block.text
            let blockFrame = block.frame
            var blockObject = ["blockText": blockText, "blockFrame": self.getRectMap(rect: blockFrame)] 
            var lines = []
            for line in block.lines {
              let lineText = line.text
              let lineFrame = line.frame
              let lineObject = ["lineText": lineText, "lineFrame": self.getRectMap(rect: lineFrame)] 
              lines.append(lineObject)
            }
            blockObject["lines"] = lines
            var existingBlocks = response["blocks"] as? [[String: Any]] ?? [[String: Any]]()
            existingBlocks.append(blockObject)
            response["blocks"] = existingBlocks
          }
          return promise.resolve(response)
        }
      } else {
        return promise.reject(FileNotFoundException(localUri))
      }
    }
  }

  private func getRectMap(rect: CGRect?) -> Dictionary<String, CGFloat> {
    var rectObject: [String: CGFloat] = [:] //initialize to an emptyMap. The var makes it mutable.

    rectObject["left"] = rect?.origin.x
    rectObject["top"] = rect?.origin.y
    rectObject["width"] = rect?.size.width
    rectObject["height"] = rect?.size.height

    return rectObject
  }
}
