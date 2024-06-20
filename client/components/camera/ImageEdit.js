import { View, StyleSheet, Image, Button } from "react-native";
import { useState, useEffect } from "react";

import BasicButton from "../../ui/BasicButton";
import Colors from "../../constants/Colors";

function ImageEdit({ route, navigation }) {
  const { imageUrl: imageUrl } = route.params;
  // useEffect(() => {
  //   if (route.params) {
  //     const { imageUrl: incomingUrl } = route.params;
  //     setImageUrl(incomingUrl);
  //   }
  //   console.log(imageUrl);
  // }, [route.params]);

  function buttonHandler() {
    navigation.navigate("ImagePreview", {
      imageUrl: imageUrl,
      type: "add",
    });
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      <View style={styles.rectangleA} />
      <View style={styles.rectangleB} />
      <BasicButton title={"편집 완료"} onPress={buttonHandler}></BasicButton>
    </View>
  );
}

export default ImageEdit;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  image: {
    width: "90%",
    height: 250,
    alignContent: "center",
    marginTop: 74,
    marginVertical: 20,
  },
  rectangleA: {
    position: "absolute",
    left: 56,
    top: 240,
    width: 42,
    height: 15,
    backgroundColor: Colors.main, // Red with opacity
  },
  rectangleB: {
    position: "absolute",
    left: 163,
    top: 250,
    width: 65,
    height: 18,
    backgroundColor: Colors.main, // Blue with opacity
  },
});
