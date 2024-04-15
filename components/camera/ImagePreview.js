import { View, StyleSheet, Image, Text, Button } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import uuid from "react-native-uuid";
import * as FileSystem from "expo-file-system";

import Colors from "../../constants/Colors";
import TextAnimator from "../TextAnimator";

import { searchImage } from "../../util/http";
import { searchNumber } from "../../util/http";
import { searchInfos } from "../../util/http";
import { searchProhibited } from "../../util/http";

//API 호출

//res.data.image[0]

// let result = [
//   {
//     boundingPoly: { vertices: [Array] },
//     inferConfidence: 0.9997,
//     inferText: "2024-03-15",
//     name: "date",
//     subFields: [[Object], [Object]],
//     type: "NORMAL",
//     valueType: "ALL",
//   },
//   {
//     boundingPoly: { vertices: [Array] },
//     inferConfidence: 0.9996,
//     inferText: "피디정2mg",
//     name: "med 01",
//     subFields: [[Object]],
//     type: "NORMAL",
//     valueType: "ALL",
//   },
//   {
//     boundingPoly: { vertices: [Array] },
//     inferConfidence: 0.9999,
//     inferText: "알레락정5mg",
//     name: "med 02",
//     subFields: [[Object]],
//     type: "NORMAL",
//     valueType: "ALL",
//   },
//   {
//     boundingPoly: { vertices: [Array] },
//     inferConfidence: 0.9991,
//     inferText: "가스모틴정5mg",
//     name: "med 03",
//     subFields: [[Object]],
//     type: "NORMAL",
//     valueType: "ALL",
//   },
//   {
//     boundingPoly: { vertices: [Array] },
//     inferConfidence: 0.9715,
//     inferText: "1정씩2회4일분",
//     name: "info 01",
//     subFields: [[Object]],
//     type: "NORMAL",
//     valueType: "ALL",
//   },
//   {
//     boundingPoly: { vertices: [Array] },
//     inferConfidence: 0.9535,
//     inferText: "1정씩2회4일분",
//     name: "info 02",
//     subFields: [[Object]],
//     type: "NORMAL",
//     valueType: "ALL",
//   },
//   {
//     boundingPoly: { vertices: [Array] },
//     inferConfidence: 0.9538,
//     inferText: "1정씩2회4일분",
//     name: "info 03",
//     subFields: [[Object]],
//     type: "NORMAL",
//     valueType: "ALL",
//   },
//   {
//     boundingPoly: { vertices: [Array] },
//     inferConfidence: 0.9986,
//     inferText: "삼아리도멕스크림",
//     name: "med 04",
//     subFields: [[Object]],
//     type: "NORMAL",
//     valueType: "ALL",
//   },
//   {
//     boundingPoly: { vertices: [Array] },
//     inferConfidence: 0,
//     inferText: "",
//     name: "med 05",
//     type: "NORMAL",
//     valueType: "ALL",
//   },
//   {
//     boundingPoly: { vertices: [Array] },
//     inferConfidence: 0,
//     inferText: "",
//     name: "med 06",
//     type: "NORMAL",
//     valueType: "ALL",
//   },
//   {
//     boundingPoly: { vertices: [Array] },
//     inferConfidence: 0,
//     inferText: "",
//     name: "med 07",
//     type: "NORMAL",
//     valueType: "ALL",
//   },
//   {
//     boundingPoly: { vertices: [Array] },
//     inferConfidence: 0,
//     inferText: "",
//     name: "med 08",
//     type: "NORMAL",
//     valueType: "ALL",
//   },
//   {
//     boundingPoly: { vertices: [Array] },
//     inferConfidence: 0.9999333,
//     inferText: "의사 지시대로 사용",
//     name: "info 04",
//     subFields: [[Object], [Object], [Object]],
//     type: "NORMAL",
//     valueType: "ALL",
//   },
//   {
//     boundingPoly: { vertices: [Array] },
//     inferConfidence: 0,
//     inferText: "",
//     name: "info 05",
//     type: "NORMAL",
//     valueType: "ALL",
//   },
//   {
//     boundingPoly: { vertices: [Array] },
//     inferConfidence: 0,
//     inferText: "",
//     name: "info 06",
//     type: "NORMAL",
//     valueType: "ALL",
//   },
//   {
//     boundingPoly: { vertices: [Array] },
//     inferConfidence: 0,
//     inferText: "",
//     name: "info 07",
//     type: "NORMAL",
//     valueType: "ALL",
//   },
//   {
//     boundingPoly: { vertices: [Array] },
//     inferConfidence: 0,
//     inferText: "",
//     name: "info 08",
//     type: "NORMAL",
//     valueType: "ALL",
//   },
// ];

let parsingDate = null; // 'date'가 없을 경우 null로 초기화
let medsList = [];

function processData(string) {
  const data = [];

  // 문자열에서 숫자와 약 이름을 추출하여 객체로 묶고 리스트에 저장
  const pattern = /\d{4,}\s+(.+)/g;
  let match;

  // 정규식을 사용하여 숫자와 약 이름을 추출하고 객체로 묶어서 리스트에 저장
  while ((match = pattern.exec(string)) !== null) {
    const [, name] = match; // 첫 번째 그룹을 약 이름으로 지정
    const num = parseInt(match[0], 10); // 숫자를 정수로 변환하여 저장
    data.push({ num: num, name: name });
  }

  return data;
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
          "X-OCR-SECRET": "", // Secret Key
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
  //const [name, setName] = useState("");
  const [ID, setId] = useState(null);

  function requestWithBase64(imageUrl) {
    axios
      .post(
        "https://4s376tsj0w.apigw.ntruss.com/custom/v1/29314/86a1154edeb470c6b86ef567a6534e7e753f2398af6355e9c99e35dd34a51f6e/infer", // APIGW Invoke URL
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
            "X-OCR-SECRET": "", // Secret Key
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          let result = res.data.images[0];
          result.fields.forEach((item) => {
            if (item.name === "date") {
              const pattern = /^\D+(.+)/;
              const text = item.inferText;
              console.log(text);
              if (pattern.test(text)) {
                const match = text.match(pattern);
                parsingDate = match[1];
              } else {
                parsingDate = text;
              }
            } else if (item.name.startsWith("med ")) {
              const medNumber = item.name.split(" ")[1]; // 'med 01'에서 숫자 부분을 분리합니다.
              const infoName = `info ${medNumber}`;
              const infoItem = result.fields.find(
                (info) => info.name === infoName
              );
              const medInfo = infoItem ? infoItem.inferText : null; // 연관된 'info' 항목의 inferText를 찾습니다.

              medsList.push({
                name: item.inferText || null, // 'med' 항목의 inferText가 없다면 null로 설정
                info: medInfo, // 매칭되는 'info' 항목의 inferText, 없다면 null
              });

              navigation.navigate("AddResult", {
                date: parsingDate,
                meds: medsList,
              });
            }
          });
        }
      })
      .catch((e) => {
        console.warn("requestWithBase64 error", e.message);
      });
  }

  const onFinish = useEffect(() => {
    const ocrAPICall = async () => {
      try {
        const base64Img = await FileSystem.readAsStringAsync(imageUrl, {
          encoding: FileSystem.EncodingType.Base64,
        });
        //requestWithFile(imageUrl);
        requestWithBase64(base64Img);
        //console.log(base64Img);
      } catch (error) {
        console.error("Error reading image file:", error);
      }
    };

    const imgAPICall = async () => {
      try {
        const response = await searchImage(imageUrl); //ok
        if (response !== null) {
          console.log("response:", response);
          let trimResponse = response.trim();
          if (trimResponse) {
            console.log("trimed response:", trimResponse);
            let name = trimResponse;
            //let name = "씨코나졸정(이트라코나졸)";
            //console.log("name:", name);
            const id = await searchNumber(name);
            const prohibited = await searchProhibited(id);

            let prohibited_result = [];

            if (prohibited !== null) {
              prohibited_result = processData(prohibited);
            } else {
              prohibited_result = null;
            }
            navigation.navigate("SearchResult", {
              name: name,
              id: id,
              imageUrl: imageUrl,
              prohibited: prohibited_result,
            });
          } else {
            console.error("Image search response is empty after trimming.");
          }
        } else {
          console.error("Image search response is null.");
        }
        //setName(trimResponse);
        //setName("씨코나졸정(이트라코나졸)");
        //const id = await searchNumber(name);
        //console.log("id", id);
        //setId(id);
        //console.log("ID:", ID);
        //await searchInfos(id);
        //await searchProhibited(id);
      } catch (error) {
        console.error("Error reading image file:", error);
      }
    };

    if (type === "add") {
      ocrAPICall();
    } else if (type === "search") {
      imgAPICall();
    }
  }, [imageUrl]);
  const { imageUrl: imageUrl, type: type } = route.params;

  //imageUrl to base64
  const handlePress = () => {
    navigation.navigate("AddResult", {
      date: parsingDate,
      meds: medsList,
    });
  };
  let button;

  if (type === "add") {
    button = <Button title={"확인"} onPress={handlePress}></Button>;
  } else if (type === "search") {
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TextAnimator
          content={"인식 중입니다..."}
          textStyle={styles.textStyle}
          onFinish={onFinish}
        />
        {imageUrl ? (
          <Image style={styles.image} source={{ uri: imageUrl }} />
        ) : (
          <Text>No image available</Text>
        )}
      </View>
      {/* {name ? (
        <Box title={"인식 결과"}>
          <Text style={styles.result}>{name}</Text>
        </Box>
      ) : (
        button
      )} */}
    </View>
  );
}

export default ImagePreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg3,
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: "4%",
    justifyContent: "center",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.bg3,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  result: {
    fontFamily: "nnsq-regular",
    fontSize: 20,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: Colors.grey1,
    backgroundColor: "#CAD6D566",
    overflow: "hidden",
    padding: 5,
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 10,
  },
  textStyle: { fontFamily: "nnsq-bold", fontSize: 28, color: "white" },
});
