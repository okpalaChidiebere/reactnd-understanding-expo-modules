- `npx create-expo-module@latest --local`
- https://docs.expo.dev/modules/get-started/#creating-the-local-expo-module

npx expo prebuild --platform ios

npx expo run:ios|android
make sure the device is connect to the computer

https://github.com/expo/expo/issues/19548
https://forums.expo.dev/t/how-to-edit-android-manifest-was-build/65663/4
https://forums.expo.dev/t/app-json-meta-data-android-name-asset-statements/70994/3
https://stackoverflow.com/questions/73901548/how-can-i-add-edit-android-manifest-meta-data-in-expo-managed

https://github.com/googlesamples/mlkit/blob/master/android/android-snippets/app/src/main/java/com/google/example/mlkit/kotlin/TextRecognitionActivity.kt

https://developers.google.com/ml-kit/vision/text-recognition/v2/android#kotlin

Anytime you add a new swift or kotlin file you will have to rebuild the app; not regenerating the prebuild
pod deintegrate && pod install

https://developers.google.com/ml-kit/reference/swift/mlkitvision/api/reference/Classes/VisionImage
