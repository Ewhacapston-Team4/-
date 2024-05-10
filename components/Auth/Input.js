import { View, Text, TextInput, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

function Input({
  isLogin,
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.signupLabel, isLogin && styles.label]}>{label}</Text>
      <TextInput
        style={[
          styles.signupInput,
          isLogin && styles.input,
          isInvalid && styles.inputInvalid,
        ]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      ></TextInput>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: "white",
    marginBottom: 15,
    fontSize: 20,
    fontFamily: "nnsq-bold",
  },
  signupLabel: {
    color: Colors.darkblue,
    marginBottom: 15,
    fontSize: 20,
    fontFamily: "nnsq-bold",
  },
  labelInvalid: {
    color: "red",
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 0,
    fontSize: 20,
    fontFamily: "nnsq-bold",
  },
  signupInput: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: "white",
    borderColor: Colors.darkblue,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 20,
  },
  inputInvalid: {
    backgroundColor: "red",
  },
});
