import { StyleSheet, View, Image } from "react-native";

import Colors from "../constants/Colors";
import Title1 from "../ui/Title1";
import SelectButton from "../components/SelectButton";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ImagePicker from "../components/camera/ImagePicker";
import ImagePreview from "../components/camera/ImagePreview";

const Stack = createNativeStackNavigator();

function Add({ navigation }) {
  const navigateToScreen = (screenName) => {
    return () => {
      navigation.navigate(screenName);
    };
  };
  return (
    <View style={styles.container}>
      <Title1>드시는 약 등록하기</Title1>
      <SelectButton
        title="약봉투 찍어서 등록"
        imageUrl="../assets/images/image2.png"
        onPress={navigateToScreen("AddPhoto")}
      />
      <SelectButton
        title="직접 등록"
        imageUrl="../assets/images/image1.png"
        onPress={navigateToScreen("AddName")}
      />
    </View>
  );
}

export default Add;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg1,
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: "4%",
  },
  image: {},
});
