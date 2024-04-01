import { View, StyleSheet, Image } from "react-native";

import axios from "axios";

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

function requestWithFile(imageUrl) {
  const formData = new FormData();
  const file = imageUrl; // image file object. Example: fs.createReadStream('./example.png')
  const message = {
    images: [
      {
        format: "jpeg", // file format
        name: "test", // file name
      },
    ],
    requestId: "string", // unique string
    timestamp: 0,
    version: "V2",
  };

  formData.append("file", file);
  formData.append("message", JSON.stringify(message));

  console.log(formData);

  axios
    .post(
      "https://4s376tsj0w.apigw.ntruss.com/custom/v1/29314/86a1154edeb470c6b86ef567a6534e7e753f2398af6355e9c99e35dd34a51f6e/infer", // APIGW Invoke URL
      formData,
      {
        headers: {
          "X-OCR-SECRET": "aGNhdFB2VGFkd2pIZEpJaWVRZnFOZEJYcGNxVmd6Ymc=", // Secret Key
          "Content-Type": "multipart/form-data",
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
    });
}

function ImagePreview({ imageUrl }) {
  requestWithFile("../../assets/images/sampleImage.jpg");
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
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
