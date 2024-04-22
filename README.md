# Understanding Expo Modules

Sometimes a React Native app needs to access a native platform API, or some features, for example the native APIs to access Apple or Google Pay, access certain apps(like Calendar, whatsapp) ContentProvider, or even putting a users phone on silent, etc that is not available by default in [React Native Directory](https://reactnative.directory/), [Expo SDK](https://docs.expo.dev/versions/latest/sdk/accelerometer/) and javascript. Maybe you want to reuse some existing Objective-C, Swift, Java or Kotlin libraries without having to reimplement it in JavaScript, or write some high performance, multi-threaded code for things like image processing. Here are list of [Google Play APIs](https://developers.google.com/android/guides/setup) that you can use if they don't exist in JS already. They already have a Kolin and Swift code sample for you

# [MLKit](https://firebase.google.com/docs/ml-kit) Text recognition

- This was the one we implemented. We added Native Side code for [Android](https://developers.google.com/ml-kit/vision/text-recognition/android) and [iOS](https://developers.google.com/ml-kit/vision/text-recognition/ios#swift) using expo modules that i generated [locally](https://docs.expo.dev/modules/get-started/#creating-the-local-expo-module) using `npx create-expo-module@latest --local`. I opt to create a local module because i will not be using this module on multiple projects. I want to make one that i can use on multiple projects than i can just remove the local flag
- With native modules you cannot test them in Expo Go app. You will have to run them on real device like a standalone app. You can use Expo dev client or Run the Expo prebuild directory (ios or android). I prefer to use the prebuild just because its time saving :). To generate the prebuild folders run `npx expo prebuild --platform <ios|android>`. You can add the `--clean` flag to delete the existing prebuild folder.
- To **Run the app** with expo prebuild folder, you can run `npx expo run:ios|android` or `npm run [android|ios]`. It will install the app on physical devices connected to the computer with cables or startup emulators on your laptop if no device is connected.
- To **edit and test the module**, personally, due to the fact that i want familiar with the programming language Swift and Kotlin, i had to be making sure that each segment of code was good by rebuilding the app; not regenerating the prebuild folders :). For ios this command `pod deintegrate && pod install` was helpful . You can read more about better ways to edit the module in the [doc](https://docs.expo.dev/modules/get-started/#editing-the-module)
- Few tips that help me understand the language a bit more was i just go look at existing expo [modules](https://github.com/expo/expo/tree/main/packages) already created. I look at the kotlin and swift and try to relate or you can look at this expo [documentation](https://docs.expo.dev/modules/module-api/)
- When coding you will find yourself googling syntax for things in Kotlin and Swift if you are not too familiar with them. For an idea of how to import libraris to a file in swift [see](https://developers.google.com/ml-kit/reference/swift/mlkitvision/api/reference/Classes/VisionImage) and for android [see](https://developers.google.com/android/reference/com/google/mlkit/vision/text/Text.TextBlock)
- MlKit examples [codes](https://github.com/googlesamples/mlkit/tree/master)
- Lean more about [Kotlin](https://kotlinlang.org/docs/null-safety.html#nullable-receiver)
- Learn more about [Swift](https://www.swift.org/)

# Installing Libraries on Expo modules

- For ios, you must add the dependency to the `.podspec` file for the particular module ios folder. Like example [here](https://stackoverflow.com/questions/55745916/add-pod-dependency-with-source-to-podspec)
- For Android, you must add it to the `build.gradle` file for the particular module android folder
- Expo talked about this [here](https://docs.expo.dev/modules/third-party-library/#add-native-dependencies) in the doc
- If you want the Module to modify the manifest file, you will have to make a plugin for that module like [this](https://docs.expo.dev/modules/config-plugin-and-native-module-tutorial/#4-creating-a-new-config-plugin) or just for the local project which is what i did. Expo documentation about plugins and how to add code to different files of the app for ios and android without using prebuilds [here](https://docs.expo.dev/config-plugins/plugins-and-mods/). You add this plugins to the app.json files and they are used to configure the prebuilds!.

# Expo Plugin USefule liks

- [https://www.sitepen.com/blog/doing-more-with-expo-using-custom-native-code](https://www.sitepen.com/blog/doing-more-with-expo-using-custom-native-code)
- [https://github.com/expo/expo/issues/19548](https://github.com/expo/expo/issues/19548)
- [https://forums.expo.dev/t/how-to-edit-android-manifest-was-build/65663/4](https://forums.expo.dev/t/how-to-edit-android-manifest-was-build/65663/4)
- [https://forums.expo.dev/t/app-json-meta-data-android-name-asset-statements/70994/3](https://forums.expo.dev/t/app-json-meta-data-android-name-asset-statements/70994/3)
- [https://stackoverflow.com/questions/73901548/how-can-i-add-edit-android-manifest-meta-data-in-expo-managed](https://stackoverflow.com/questions/73901548/how-can-i-add-edit-android-manifest-meta-data-in-expo-managed)
- [https://stackoverflow.com/questions/77703362/expo-change-accent-color-of-react-native-community-datetimepicker](https://stackoverflow.com/questions/77703362/expo-change-accent-color-of-react-native-community-datetimepicker)
- [https://stackoverflow.com/questions/77591531/how-to-resolve-invariant-violation-new-nativeeventemitter-requires-a-non-nu/77591554](https://stackoverflow.com/questions/77591531/how-to-resolve-invariant-violation-new-nativeeventemitter-requires-a-non-nu/77591554)
- [https://stackoverflow.com/questions/70258607/react-native-expo-android-dark-mode-issue](https://stackoverflow.com/questions/70258607/react-native-expo-android-dark-mode-issue)
- [https://evba.uk/blog/expo-transparent-android-status-bar](https://evba.uk/blog/expo-transparent-android-status-bar)
  = [https://geekyants.com/blog/unlocking-expos-power-a-guide-to-config-plugins-and-mods](https://geekyants.com/blog/unlocking-expos-power-a-guide-to-config-plugins-and-mods)
- [https://github.com/expo/expo/issues/16084](https://github.com/expo/expo/issues/16084)

# Expo modules

- [https://www.youtube.com/watch?v=UczTzTBYRhA](https://www.youtube.com/watch?v=UczTzTBYRhA)
- [https://docs.expo.dev/modules/native-module-tutorial/](https://docs.expo.dev/modules/native-module-tutorial/)
- [https://docs.wavemaker.com/learn/react-native/publish-expo-module-and-use-in-wavemaker-project/](https://docs.wavemaker.com/learn/react-native/publish-expo-module-and-use-in-wavemaker-project/)
