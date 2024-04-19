import { StyleSheet, Text, Pressable } from "react-native";

type DemoButtonProps = {
  title?: string;
  onPress?: (() => void) | undefined;
};

export const DemoButton: React.FC<DemoButtonProps> = ({ title, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "skyblue" : "steelblue",
        },
        styles.container,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    minWidth: "45%",
    maxWidth: "100%",
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 8,
  },
  text: {
    textAlign: "center",
    color: "white",
  },
});
