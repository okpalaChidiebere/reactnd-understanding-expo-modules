import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { recognizeImage } from "../../modules/text-recognition";

export default function Page() {
  const { width: windowWidth } = useWindowDimensions();
  const [aspectRatio, setAspectRation] = useState(1);
  const [response, setResponse] = useState(null);
  const { uri } = useLocalSearchParams<{ uri: string }>();

  const processImage = useCallback(async (url: string) => {
    if (!url) {
      return;
    }

    try {
      const response = await recognizeImage(url);
      //   console.log(response);
      if (response.blocks.length > 0) {
        setResponse(response);
        setAspectRation(response.height / response.width); //we set the correct width and height of the image processed originally
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (uri) {
        processImage(uri);
      }
    }, [uri])
  );

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <ScrollView style={{ flex: 1 }}>
        <Image
          source={{ uri }}
          style={{ width: windowWidth, height: windowWidth * aspectRatio }}
          resizeMode="cover"
        />
        {
          //   `!!` means we converted the result returned into boolean :)
          //    !!response && (
          //      <ResponseRenderer
          //        response={response}
          //        scale={
          //          windowWidth /
          //          response.width /** helps us set position of blocks while rendering */
          //        }
          //      />
          //    )
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
