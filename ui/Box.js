import { View, StyleSheet, Text } from "react-native";

import Title from "./Title";

function Box({ title, children, style, type }) {
  return (
    <View
      style={[
        type === "schedule" ? styles.scheduleContainer : styles.container,
        style,
      ]}
    >
      <View style={type === "schedule" ? [styles.titleContainer] : null}>
        {type === "notitle" ? <></> : <Title type={type}>{title}</Title>}
      </View>
      {children}
    </View>
  );
}

export default Box;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    height: "200px,",
    paddingHorizontal: 25,
    paddingVertical: 30,
    elevation: 4,
    marginVertical: 15,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  scheduleContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    height: "200px,",
    paddingTop: 20,
    paddingBottom: 30,
    elevation: 5,
    marginVertical: 15,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  titleContainer: { alignItems: "center" },
});
