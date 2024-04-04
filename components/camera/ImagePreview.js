import { View, StyleSheet, Image, Text, Button } from "react-native";
import { useEffect } from "react";
import axios from "axios";
import uuid from "react-native-uuid";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as FileSystem from "expo-file-system";

import Colors from "../../constants/Colors";
import AddResult from "../../screens/AddResult";

//API 호출

function requestWithBase64(imageUrl) {
  axios
    .post(
      "", // APIGW Invoke URL
      {
        images: [
          {
            format: "jpeg", // file format
            name: "test.jpeg", // image name
            data: imageUrl, // image base64 string(only need part of data). Example: base64String.split(',')[1]
          },
        ],
        requestId: uuid.v4(), // unique string
        timestamp: 0,
        version: "V2",
      },
      {
        headers: {
          "X-OCR-SECRET": "cld6ZEFqSG9PaUVsbW51bGpwd3lEYnJwcnZqUHNIVms=", // Secret Key
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        console.log(
          "requestWithBase64 response:",
          res.data.images[0].fields[0]
        );
      }
    })
    .catch((e) => {
      console.warn("requestWithBase64 error", e.message);
    });
}

function requestWithFile(imageUrl) {
  // image file object. Example: fs.createReadStream('./example.png')
  //const file = "../../assets/images/sampleImage.jpg"; //local relative
  //const file = "/Users/danahshin/Desktop/cap/ChemiKim/assets/images/sampleImage.jpg"; //local ultimate
  const file = imageUrl; //web url
  const message = {
    images: [
      {
        format: "jpg", // file format
        name: "test.jpg", // file name
      },
    ],
    requestId: uuid.v4(), // unique string
    timestamp: Date.now(),
    version: "V2",
  };
  const formData = new FormData();

  formData.append("file", file);
  formData.append("message", JSON.stringify(message));

  axios
    .post(
      "", // APIGW Invoke URL
      formData,
      {
        headers: {
          "X-OCR-SECRET": "bVV6aFBDdUVkd3pYdGRwcEtBWkFER3ZESWVCaFVkSnI=", // Secret Key
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        console.log("requestWithFile response:", res.data);
      }
    })
    .catch((e) => {
      console.warn("requestWithFile error", e.response);
      console.log(e.message);
    });
}

function ImagePreview({ route, navigation }) {
  useEffect(() => {
    const ocrAPICall = async () => {
      try {
        const base64Img = await FileSystem.readAsStringAsync(imageUrl, {
          encoding: FileSystem.EncodingType.Base64,
        });
        //requestWithFile(imageUrl);
        //requestWithBase64(base64Img);
        //console.log(base64Img);
      } catch (error) {
        console.error("Error reading image file:", error);
      }
    };

    ocrAPICall();
    //requestWithFile();
  }, [imageUrl]);
  const { imageUrl } = route.params;

  //imageUrl to base64
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image style={styles.image} source={{ uri: imageUrl }} />
        ) : (
          <Text>No image available</Text>
        )}
      </View>
      <Button
        title={"확인"}
        onPress={navigation.navigate("AddResult")}
      ></Button>
    </View>
  );
}

export default ImagePreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg1,
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: "4%",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.bg1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
