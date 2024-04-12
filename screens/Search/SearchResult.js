import { Text, View, StyleSheet } from "react-native";
import { useEffect } from "react";

import Colors from "../../constants/Colors";
import Title1 from "../../ui/Title1";
import Box from "../../ui/Box";

import { searchInfos, getUsers } from "../../util/http";

function SearchResult() {
  function searchInfo() {
    getUsers();
    console.log("searchInfos 함수가 실행됩니다.");
    // 여기에 API 호출이나 데이터 검색 로직을 구현합니다.
  }

  // 컴포넌트가 렌더링될 때마다 searchInfo를 실행합니다.
  useEffect(() => {
    searchInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Title1>검색 결과</Title1>
      <Box></Box>
    </View>
  );
}

export default SearchResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg1,
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: "4%",
  },
});
