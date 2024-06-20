import { View, StyleSheet, Image, Pressable, Text } from "react-native";

import Colors from "../constants/Colors";
import { Platform } from "react-native";
import TTS from "./TTS";

function PillItem({ pillName, imageUrl }) {
  function buttonHandler() {
    TTS.speak(pillName);
    console.log(pillName);
  }
  return (
    <Pressable onPress={buttonHandler} style={styles.button}>
      <View style={styles.view}>
        <Image source={imageUrl} style={styles.image} />
        <Text style={styles.text}>{pillName}</Text>
      </View>
    </Pressable>
  );
}

export default PillItem;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.grey3,
    // Pressable에 적절한 높이 값을 지정
    width: "31%",
    height: 110,
    margin: 3.5,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    ...Platform.select({
      android: {
        paddingTop: 10,
        elevation: 3,
      },
    }),
  },
  view: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  image: {
    // 고정 높이 및 비율 조정
    height: "60%", // 전체 높이의 60%
    width: "100%", // 부모 너비와 동일하게 설정
    resizeMode: "contain",
  },
  text: {
    // 고정 높이 및 너비 조정
    ...Platform.select({
      ios: {
        height: "25%",
      },
      android: {
        height: "45%",
      },
    }),
    // 전체 높이의 30%
    width: "100%", // 부모 너비와 동일하게 설정
    textAlign: "center", // 가운데 정렬
    fontFamily: "noto-sans-bold",
    fontSize: 15,
  },
});
