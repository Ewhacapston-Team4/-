import { StyleSheet, View } from "react-native";

import Colors from "../../constants/Colors";
import Title1 from "../../ui/Title1";
import SelectButton from "../../components/SelectButton";
import SearchBox from "../../components/SearchBox";

function Search({ navigation }) {
  const navigateToScreen = (screenName) => {
    return () => {
      navigation.navigate(screenName);
    };
  };

  return (
    <View style={styles.rootContainer}>
      <Title1 style={styles.title}>알약을 찾아보세요</Title1>
      <View style={styles.container}>
        <SelectButton
          title="사진 찍어서 찾기"
          imageKey="icon2"
          onPress={navigateToScreen("SearchPhoto")}
        />
        <View style={styles.gap}></View>
        <SearchBox
          placeholder={"약 이름을 검색해보세요."}
          onPress={navigateToScreen("SearchName")}
          editable={false}
        ></SearchBox>
      </View>
    </View>
  );
}

export default Search;

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
  title: {
    position: "absolute", // 절대 위치로 설정
    top: 100, // 상단으로부터 20의 간격
    left: 20, // 왼쪽으로부터 20의 간격
    right: 20, // 오른쪽으로부터 20의 간격, 컨테이너 내에서 가운데 정렬을 위해
  },
});
