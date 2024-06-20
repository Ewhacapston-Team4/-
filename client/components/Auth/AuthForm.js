import { useState } from "react";
import { View, StyleSheet } from "react-native";

import Input from "./Input";
import Button from "../../ui/Button";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredId, setEnteredId] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    email: emailIsInvalid,
    //id 중복 확인
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "name":
        setEnteredName(enteredValue);
        break;
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "id":
        setEnteredId(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }
  function submitHandler() {
    onSubmit({
      name: enteredName,
      email: enteredEmail,
      id: enteredId,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
    // console.log(
    //   "AuthForm submithandler:",
    //   enteredName,
    //   enteredEmail,
    //   enteredId,
    //   enteredPassword
    // );
  }

  return (
    <View style={styles.form}>
      <View>
        {!isLogin && (
          <Input
            label="이름"
            isLogin={isLogin}
            onUpdateValue={updateInputValueHandler.bind(this, "name")}
            value={enteredName}
          />
        )}
        {/* 중복 확인 과정 넣기 */}
        {!isLogin && (
          <Input
            label="이메일"
            isLogin={isLogin}
            onUpdateValue={updateInputValueHandler.bind(this, "email")}
            value={enteredEmail}
            isInvalid={emailIsInvalid}
            keyboardType="email-address"
          />
        )}
        <Input
          label="아이디"
          isLogin={isLogin}
          onUpdateValue={updateInputValueHandler.bind(this, "id")}
          value={enteredId}
        />
        <Input
          label="비밀번호"
          isLogin={isLogin}
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label="비밀번호 확인"
            isLogin={isLogin}
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword"
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
      </View>
      <View style={styles.buttons}>
        <Button onPress={submitHandler} isLogin={isLogin}>
          {isLogin ? "로그인" : "회원가입"}
        </Button>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 15,
    marginBottom: 10,
  },
});
