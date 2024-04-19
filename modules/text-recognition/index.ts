// Import the native module. On web, it will be resolved to TextRecognition.web.ts
// and on native platforms to TextRecognition.ts
import TextRecognitionModule from "./src/TextRecognitionModule";
import {
  ChangeEventPayload,
  TextRecognitionViewProps,
} from "./src/TextRecognition.types";

export async function recognizeImage(url: string) {
  return TextRecognitionModule.recognizeImage(url);
}

export { TextRecognitionViewProps, ChangeEventPayload };
