package expo.modules.textrecognition

import android.net.Uri
import android.content.Context
import android.graphics.Rect
import android.util.Log
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.exception.CodedException
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.latin.TextRecognizerOptions
import java.io.IOException

private class TextRecognitionFailedException :
  CodedException("Text Recognition is failed")

class TextRecognitionModule : Module() {  
  override fun definition() = ModuleDefinition {
    Name("TextRecognition")

    AsyncFunction("recognizeImage") { localUri: String, promise: Promise ->
      val context = appContext.reactContext ?: throw Exceptions.ReactContextLost()

      val uri = Uri.parse(localUri) 
      val image: InputImage
      try {
        image = InputImage.fromFilePath(context, uri)
        val recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS)
        recognizer.process(image)
        .addOnSuccessListener { result ->
          val response = mapOf(
            "width" to image.getWidth(),
            "height" to image.getHeight(),
            "blocks" to run {
              val blocks = mutableListOf<Any>()
              for (block in result.textBlocks) {
                val blockText = block.text
                val blockFrame = block.boundingBox
                val blockObject = mutableMapOf<String, Any>("blockText" to blockText, "blockFrame" to getRectMap(blockFrame))
                val lines = mutableListOf<Any>()
                for (line in block.lines) {
                  val lineText = line.text
                  val lineFrame = line.boundingBox
                  val lineObject = mapOf<String, Any>("lineText" to lineText, "lineFrame" to getRectMap(lineFrame))
                  lines.add(lineObject)
                }
                blockObject["lines"] = lines
                blocks.add(blockObject)
              }
              blocks
            }
          )
          promise.resolve(response)
        }
        .addOnFailureListener { e ->
          promise.reject("ERR_TEXT_TECOGNITION_EXCEPTION", "Text Recognition is failed.", e)
        }
      } catch (e: IOException) {
        e.printStackTrace()
        throw TextRecognitionFailedException()
      }
      Log.d("TextRecognitionModule", "Url: " + localUri); //to confirm that the file uri we passed from JS side is gotten here :)
    }
  }

  //Helper function to convert a Rect Type to a readable map
  private fun getRectMap(rect: Rect?): MutableMap<String, Int>{
    val rectObject = mutableMapOf<String, Int>()

     if (rect == null){
      return rectObject
    }

    rectObject["left"] = rect.left
    rectObject["top"] = rect.right
    rectObject["width"] = rect.right - rect.left //coordinates start from left to right
    rectObject["height"] = rect.bottom - rect.top //coordinates start from top to bottom

    return rectObject;
  }
}
