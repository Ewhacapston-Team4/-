import { Share, View, Button } from "react-native";
import BasicButton from "../ui/BasicButton";

const ShareExample = () => {
  const onShare = async () => {
    const result = await Share.open({
      url: Platfrom.OS === "ios" ? `file://${uri}` : uri,
    });
  };
  return (
    <View style={{ marginTop: 50 }}>
      <BasicButton onPress={onShare} title="사진 촬영 완료" />
    </View>
  );
};

export default ShareExample;
