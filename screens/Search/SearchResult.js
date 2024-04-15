import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import Title1 from "../../ui/Title1";
import Box from "../../ui/Box";
import InfoBox from "../../ui/InfoBox";

import { searchInfos, getUsers } from "../../util/http";

function SearchResult({ route }) {
  const {
    name: name,
    id: id,
    imageUrl: imageUrl,
    prohibited: prohibited,
  } = route.params;
  //console.log("test:", name);
  console.log("prohibited list:", prohibited);
  return (
    <View style={styles.container}>
      <Title1>검색 결과</Title1>
      <View style={styles.contentContainer}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
        <Box style={styles.Box} type={"notitle"}>
          <View style={styles.textContainer}>
            <Text style={styles.result}>{name}</Text>
          </View>
          <View style={styles.infoContainer}>
            {/* <View style={styles.infoContainer}>
            <Text style={styles.result}>동해물과 백두산이</Text>
          </View> */}
            <InfoBox title={"병용 금기 약물"}>
              {prohibited.length !== 0 ? (
                <ScrollView>
                  {prohibited.map((item, index) => (
                    <Text key={index} style={styles.textStyle}>
                      0{index + 1} {item.name}
                    </Text>
                  ))}
                </ScrollView>
              ) : (
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="checkmark-circle"
                    color={Colors.main}
                    size={60}
                  />
                  <Text style={styles.text}>병용 금기 약물이 없습니다!</Text>
                </View>
              )}
            </InfoBox>
          </View>
        </Box>
      </View>
    </View>
  );
}

export default SearchResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg2,
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: "4%",
  },
  contentContainer: {
    alignItems: "center",
    //justifyContent: "center",
  },
  image: { width: "100%", height: 180, alignContent: "center" },
  textContainer: {
    overflow: "hidden",
    textAlign: "center",
    textAlignVertical: "center",
    alignContent: "center",
    alignItems: "center",
    paddingTop: 5,
  },
  result: { fontFamily: "noto-sans-medium", fontSize: 22, paddingVertical: 10 },
  Box: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginTop: 15,
    marginBottom: 200,
    paddingTop: 0,
    maxHeight: "62%",
  },
  infoContainer: {
    // borderWidth: 2,
    // borderRadius: 8,
    // borderColor: Colors.grey1,
    // backgroundColor: "#CAD6D566",
    // overflow: "hidden",
    // textAlign: "center",
    // textAlignVertical: "center",
    // alignContent: "center",
    // alignItems: "center",
    // marginTop: 5,
    maxHeight: "72%",
  },
  prohiContainer: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: Colors.grey1,
    backgroundColor: "#CAD6D566",
    overflow: "hidden",
    textAlign: "center",
    textAlignVertical: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  text: {
    fontFamily: "noto-sans-medium",
    fontSize: 20,
    color: Colors.main,
    paddingTop: 15,
  },
  textStyle: {
    fontFamily: "noto-sans-medium",
    fontSize: 18,
    paddingLeft: 20,
    marginVertical: 5,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
    paddingTop: 20,
  },
});
