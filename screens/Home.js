import { StyleSheet, ScrollView } from "react-native";

import Colors from "../constants/Colors";
import Daily from "../components/daily/Daily";
import PillList from "../components/PillList";

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
      <Daily />
      <PillList />
    </ScrollView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg1,
    paddingTop: 90,
  },
});
