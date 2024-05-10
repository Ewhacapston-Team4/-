import { useState } from "react";
import { View, StyleSheet } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../ui/LoadingOverlay";
import { createUser } from "../util/auth";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signupHandler({ id, password }) {
    setIsAuthenticating(true);
    await createUser(id, password);
    setIsAuthenticating(false);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="가입 요청 중입니다・・・" />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
