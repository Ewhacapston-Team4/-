import { StyleSheet, View, Text, Image, Pressable } from "react-native";

import Box from "../ui/Box";
import Colors from "../constants/Colors";

const images = {
  icon1: require("../assets/images/image1.png"),
  icon2: require("../assets/images/image2.png"),
};

function SelectButton({ title, imageKey, children, onPress }) {
  const dynamicStyles = {
    marginTop: title === "약봉투 찍어서 등록" ? 45 : 35,
  };

  return (
    <View style={[styles.rootContainer, dynamicStyles]}>
      <Pressable style={styles.button} onPress={onPress}>
        <Image
          source={images[imageKey]}
          style={imageKey === "icon1" ? styles.image : styles.image2}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default SelectButton;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    height: "45%",
    elevation: 6,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginVertical: 5,
    position: "relative",
    paddingTop: 15, // 이 컨테이너를 기준으로 자식 요소들을 절대 위치시킴
  },
  button: { flex: 1 },
  image: {
    height: "80%", // 부모 컨테이너에 맞게 너비 설정, // 적절한 높이 설정
    width: "112%",
    resizeMode: "contain", // 이미지가 잘리지 않도록 조정
  },
  image2: {
    height: "88%", // 부모 컨테이너에 맞게 너비 설정, // 적절한 높이 설정
    width: "105%",
    resizeMode: "contain",
  },
  titleContainer: {
    position: "absolute", // 절대 위치 사용
    bottom: 0, // 부모 컨테이너의 하단에 위치
    width: "100%", // 부모 컨테이너의 너비와 동일하게 설정
    alignItems: "center",
    justifyContent: "center",
    height: "25%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#4ECDC4ef",
  },
  title: {
    fontFamily: "nnsq-bold",
    color: Colors.darkblue,
    fontSize: 30,
  },
});
