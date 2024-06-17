import { View, Image, StyleSheet } from "react-native";

function Profile({ imageUrl }) {
  return (
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={{ uri: imageUrl }} />
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  imageContainer: { width: "100%", alignContent: "flex-end" },
  image: {
    width: "100%",
    height: "100%", // 부모 너비와 동일하게 설정
    resizeMode: "contain",
  },
});
