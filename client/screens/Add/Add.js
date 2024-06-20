import { StyleSheet, View, Image } from "react-native";

import Colors from "../../constants/Colors";
import Title1 from "../../ui/Title1";
import SelectButton from "../../components/SelectButton";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ImagePicker from "../../components/camera/ImagePicker";
import ImagePreview from "../../components/camera/ImagePreview";
import BasicButton from "../../ui/BasicButton";

import { usePills } from "../../store/context/pills-context";

const Stack = createNativeStackNavigator();

function Add({ navigation }) {
  const { setPhotoType } = usePills();

  const navigateToScreen = (screenName) => {
    return () => {
      navigation.navigate(screenName);
      setPhotoType("add");
    };
  };
  return (
    <View style={styles.rootContainer}>
      <Title1 style={styles.title}>드시는 약을{"\n"}등록해보세요</Title1>
      <View style={styles.container}>
        <SelectButton
          title="약봉투 사진으로 등록"
          imageKey="icon1"
          onPress={navigateToScreen("AddPhoto")}
        />
        <View style={styles.gap}></View>
        <BasicButton
          title="직접 등록"
          onPress={navigateToScreen("AddName")}
        ></BasicButton>
      </View>
    </View>
  );
}

export default Add;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.bg2,
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: "4%",
  },
  container: { flex: 1, justifyContent: "center" },
  gap: {
    paddingVertical: 10,
  },
  image: {},
  gap: {
    paddingVertical: 12,
  },
  title: {
    position: "absolute", // 절대 위치로 설정
    top: 100, // 상단으로부터 20의 간격
    left: 20, // 왼쪽으로부터 20의 간격
    right: 20, // 오른쪽으로부터 20의 간격, 컨테이너 내에서 가운데 정렬을 위해
  },
});
