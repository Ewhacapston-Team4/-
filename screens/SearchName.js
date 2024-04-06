import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Text,
  Alert,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { searchAPI } from "../datas/SearchData";
import { searchInfos } from "../util/http";

import Title1 from "../ui/Title1";
import Colors from "../constants/Colors";

function SearchName() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState("");
  function searchHandler(enteredText) {
    setKeyword(enteredText);
  }

  useEffect(() => {
    const getList = () => {
      try {
        setLoading(true);

        //검색 API 호출
        const data = searchAPI(keyword);

        setList(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      getList();
    }, 200);

    return () => {
      clearTimeout(debounce);
    };
  }, [keyword]);

  return (
    <View style={styles.container}>
      <Title1>이름으로 검색</Title1>
      <View style={styles.searchContainer}>
        <Ionicons name="search" color={Colors.grey1} size={30} />
        <TextInput
          style={styles.inputContainer}
          placeholder={"약 이름을 검색해보세요."}
          onChangeText={searchHandler}
          value={keyword}
        />
      </View>
      {loading ? (
        <View>
          <ActivityIndicator color={"#fff"} />
        </View>
      ) : (
        <FlatList
          keyExtractor={(item) => item.id}
          data={list}
          disableScrollViewPanResponder={true}
          ListEmptyComponent={() => (
            <View>
              <Text>검색 내용이 없습니다.</Text>
            </View>
          )}
          renderItem={(items) => {
            const { item } = items;
            return (
              <TouchableOpacity
                onPressIn={() => Keyboard.dismiss()}
                onPress={() => Alert.alert("클릭 시: 동작 코드")}
                activeOpacity={1}
                style={styles.applicationBox}
                key={items.index}
              >
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                  }}
                >
                  <Text style={styles.fontStyle}>Id {item.id} : </Text>
                  <Text style={[styles.fontStyle, { fontWeight: "bold" }]}>
                    {item.cityname}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}

export default SearchName;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg1,
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: "4%",
  },
  applicationBox: {
    borderBottomColor: "#3D3D3D",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    elevation: 4,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 8,
  },
  inputContainer: {
    paddingLeft: 5,
    fontSize: 20,
    textAlignVertical: "center",
  },
});
