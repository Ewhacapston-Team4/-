import { StyleSheet, ScrollView, Image, View, Text } from "react-native";

import Colors from "../constants/Colors";
import Daily from "../components/daily/Daily";
import PillList from "../components/PillList";
import Profile from "../components/Profile";

function Home() {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 80,
      }}
      style={styles.container}
    >
      <View
        style={{
          marginLeft: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 0,
        }}
      >
        <Image
          style={{ width: 55, height: 55 }}
          source={require("../assets/images/icon_1.png")}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 130,
          }}
        >
          <Text
            style={{
              fontFamily: "noto-sans-medium",
              marginRight: -20,
              fontSize: 25,
            }}
          >
            김혜자님
          </Text>
          <View style={styles.imageContainer}></View>
          <Image
            style={styles.image}
            source={require("../assets/images/profile.jpg")}
          />
        </View>
      </View>
      <Daily type={"home"} title={"오늘 드실 약"} />
      <PillList />
    </ScrollView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg1,
    paddingTop: 50,
  },
  image: {
    width: 75,
    height: 75,
    resizeMode: "cover",
    borderRadius: 200,
  },
  imageContainer: {
    marginRight: 30,
  },
});
