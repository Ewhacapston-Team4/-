import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../ui/LoadingOverlay";

import { AuthContext } from "../store/context/auth-context";

import { login } from "../util/auth";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  //const authCtx = useContext(AuthContext);

  async function loginHandler({ id, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(id, password);
      //authCtx.authenticate(token);
      console.log(token);
    } catch (error) {
      Alert.alert("로그인 실패!", "아이디와 비밀번호를 확인해주세요.");
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="로그인 중입니다・・・" />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
