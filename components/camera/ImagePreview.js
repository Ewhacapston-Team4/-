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

//res.data.image[0]

let result = [
  {
    boundingPoly: { vertices: [Array] },
    inferConfidence: 0.9997,
    inferText: "2024-03-15",
    name: "date",
    subFields: [[Object], [Object]],
    type: "NORMAL",
    valueType: "ALL",
  },
  {
    boundingPoly: { vertices: [Array] },
    inferConfidence: 0.9996,
    inferText: "피디정2mg",
    name: "med 01",
    subFields: [[Object]],
    type: "NORMAL",
    valueType: "ALL",
  },
  {
    boundingPoly: { vertices: [Array] },
    inferConfidence: 0.9999,
    inferText: "알레락정5mg",
    name: "med 02",
    subFields: [[Object]],
    type: "NORMAL",
    valueType: "ALL",
  },
  {
    boundingPoly: { vertices: [Array] },
    inferConfidence: 0.9991,
    inferText: "가스모틴정5mg",
    name: "med 03",
    subFields: [[Object]],
    type: "NORMAL",
    valueType: "ALL",
  },
  {
    boundingPoly: { vertices: [Array] },
    inferConfidence: 0.9715,
    inferText: "1정씩2회4일분",
    name: "info 01",
    subFields: [[Object]],
    type: "NORMAL",
    valueType: "ALL",
  },
  {
    boundingPoly: { vertices: [Array] },
    inferConfidence: 0.9535,
    inferText: "1정씩2회4일분",
    name: "info 02",
    subFields: [[Object]],
    type: "NORMAL",
    valueType: "ALL",
  },
  {
    boundingPoly: { vertices: [Array] },
    inferConfidence: 0.9538,
    inferText: "1정씩2회4일분",
    name: "info 03",
    subFields: [[Object]],
    type: "NORMAL",
    valueType: "ALL",
  },
  {
    boundingPoly: { vertices: [Array] },
    inferConfidence: 0.9986,
    inferText: "삼아리도멕스크림",
    name: "med 04",
    subFields: [[Object]],
    type: "NORMAL",
    valueType: "ALL",
  },
  {
    boundingPoly: { vertices: [Array] },
    inferConfidence: 0,
    inferText: "",
    name: "med 05",
    type: "NORMAL",
    valueType: "ALL",
  },
  {
    boundingPoly: { vertices: [Array] },
    inferConfidence: 0,
    inferText: "",
    name: "med 06",
    type: "NORMAL",
    valueType: "ALL",
  },
  {
    boundingPoly: { vertices: [Array] },
    inferConfidence: 0,
    inferText: "",
    name: "med 07",
    type: "NORMAL",
    valueType: "ALL",
  },
  {
    boundingPoly: { vertices: [Array] },
    inferConfidence: 0,
    inferText: "",
    name: "med 08",
    type: "NORMAL",
    valueType: "ALL",
  },
  {
    boundingPoly: { vertices: [Array] },
    inferConfidence: 0.9999333,
    inferText: "의사 지시대로 사용",
    name: "info 04",
    subFields: [[Object], [Object], [Object]],
    type: "NORMAL",
    valueType: "ALL",
  },
  {
    boundingPoly: { vertices: [Array] },
    inferConfidence: 0,
    inferText: "",
    name: "info 05",
    type: "NORMAL",
    valueType: "ALL",
  },
  {
    boundingPoly: { vertices: [Array] },
    inferConfidence: 0,
    inferText: "",
    name: "info 06",
    type: "NORMAL",
    valueType: "ALL",
  },
  {
    boundingPoly: { vertices: [Array] },
    inferConfidence: 0,
    inferText: "",
    name: "info 07",
    type: "NORMAL",
    valueType: "ALL",
  },
  {
    boundingPoly: { vertices: [Array] },
    inferConfidence: 0,
    inferText: "",
    name: "info 08",
    type: "NORMAL",
    valueType: "ALL",
  },
];

let parsingDate = null; // 'date'가 없을 경우 null로 초기화
let medsList = [];

result.forEach((item) => {
  if (item.name === "date") {
    parsingDate = item.inferText;
  } else if (item.name.startsWith("med ")) {
    const medNumber = item.name.split(" ")[1]; // 'med 01'에서 숫자 부분을 분리합니다.
    const infoName = `info ${medNumber}`;
    const infoItem = result.find((info) => info.name === infoName);
    const medInfo = infoItem ? infoItem.inferText : null; // 연관된 'info' 항목의 inferText를 찾습니다.

    medsList.push({
      name: item.inferText || null, // 'med' 항목의 inferText가 없다면 null로 설정
      info: medInfo, // 매칭되는 'info' 항목의 inferText, 없다면 null
    });
  }
});

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
        onPress={navigation.navigate("AddResult", {
          date: parsingDate,
          meds: medsList,
        })}
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
