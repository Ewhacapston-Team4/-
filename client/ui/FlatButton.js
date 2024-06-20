import { Pressable, StyleSheet, Text, View } from "react-native";

import Colors from "../constants/Colors";

function FlatButton({ children, onPress, isLogin }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={[styles.signupText, isLogin && styles.buttonText]}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: -30,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontFamily: "nnsq-bold",
  },
  signupText: {
    textAlign: "center",
    color: Colors.darkblue,
    fontSize: 20,
    fontFamily: "nnsq-bold",
  },
});
