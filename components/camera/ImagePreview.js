import { View, StyleSheet, Image, Text } from "react-native";
import { useEffect } from "react";
import axios from "axios";
import uuid from "react-native-uuid";

import Colors from "../../constants/Colors";

//API 호출

function requestWithBase64() {
  axios
    .post(
      "", // APIGW Invoke URL
      {
        images: [
          {
            format: "", // file format
            name: "", // image name
            data: "", // image base64 string(only need part of data). Example: base64String.split(',')[1]
          },
        ],
        requestId: "", // unique string
        timestamp: 0,
        version: "V2",
      },
      {
        headers: {
          "X-OCR-SECRET": "", // Secret Key
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        console.log("requestWithBase64 response:", res.data);
      }
    })
    .catch((e) => {
      console.warn("requestWithBase64 error", e.response);
    });
}

function requestWithFile() {
  // image file object. Example: fs.createReadStream('./example.png')
  //const file = "../../assets/images/sampleImage.jpg"; //local relative
  //const file = "/Users/danahshin/Desktop/cap/ChemiKim/assets/images/sampleImage.jpg"; //local ultimate
  const file = RNFS.readFile("../../assets/images/sampleImage.jpg"); //web url
  const message = {
    images: [
      {
        format: "png", // file format
        name: "test.png", // file name
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
      "https://4s376tsj0w.apigw.ntruss.com/custom/v1/29314/86a1154edeb470c6b86ef567a6534e7e7539c99e35dd34a51f6e/infer", // APIGW Invoke URL
      formData,
      {
        headers: {
          "X-OCR-SECRET": "aGN", // Secret Key
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

function ImagePreview({ route }) {
  // useEffect(() => {
  //   requestWithFile();
  // }, [imageUrl]);
  const { imageUrl } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image style={styles.image} source={{ uri: imageUrl }} />
        ) : (
          <Text>No image available</Text>
        )}
      </View>
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
