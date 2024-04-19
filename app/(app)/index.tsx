import { useCallback, useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Device from "expo-device";
import * as ImagePicker from "expo-image-picker";
import { DemoButton } from "../../src/components";
import { Strings } from "../../src/values";
import { router } from "expo-router";

export default function Page() {
  const { width } = useWindowDimensions();
  const [image, setImage] = useState<string | undefined>(undefined);

  const pickImage = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }, []);

  const takePhoto = useCallback(async () => {
    if (!Device.isDevice && Platform.OS === "ios") {
      alert("Camera not available on iOS simulator");
      return;
    }

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }, []);

  const onProcessImage = useCallback(() => {
    if (image) {
      router.navigate({
        pathname: Strings.screen_process_image,
        params: {
          uri: encodeURI(image),
        },
      });
    }
  }, [image]);

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <View style={styles.content}>
        <View style={{ flex: 4, marginVertical: 24, alignItems: "center" }}>
          {image && (
            <Image
              resizeMode="cover"
              resizeMethod="scale"
              style={{ width, height: width }}
              source={{ uri: image }}
            />
          )}
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: "column-reverse" }}>
            <View style={{ flexDirection: "row", paddingBottom: 8 }}>
              <DemoButton
                key="Process Image"
                onPress={onProcessImage}
                title="Process Image"
              />
            </View>
            <View style={{ flexDirection: "row", paddingVertical: 8 }}>
              <DemoButton
                key="Take Image"
                onPress={() => takePhoto()}
                title="Take Image"
              />

              <DemoButton
                key="Select Image"
                title="Select Image"
                onPress={() => pickImage()}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: Platform.select({
    ios: {
      flex: 1,
      // backgroundColor: Colors.empty,
    },
    android: {
      flex: 1,
    },
  }),
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
