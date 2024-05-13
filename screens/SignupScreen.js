import { useState, useContext } from "react";
import { Alert } from "react-native";
import { View, StyleSheet } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../ui/LoadingOverlay";
import { createUser } from "../util/auth";

import { AuthContext } from "../store/context/auth-context";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler(id, name, email, password) {
    setIsAuthenticating(true);
    try {
      await createUser(id, name, email, password);
    } catch (error) {
      Alert.alert(
        "회원가입 실패!",
        "가입할 수 없습니다. 입력 정보를 확인해주세요."
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="가입 요청 중입니다・・・" />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
