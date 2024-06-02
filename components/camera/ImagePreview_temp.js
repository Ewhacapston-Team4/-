import { View, StyleSheet, Image, Text, Button } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import uuid from "react-native-uuid";
import * as FileSystem from "expo-file-system";

import Colors from "../../constants/Colors";
import TextAnimator from "../TextAnimator";

import { PILLS } from "../../datas/pills-list";

import { searchImage } from "../../util/http";
import { searchNumber } from "../../util/http";
import { searchInfos } from "../../util/http";
import { searchProhibited } from "../../util/http";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

let parsingDate = null; // 'date'가 없을 경우 null로 초기화
let medsList = [];
let vertices = [];

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

function processInfoData(string) {
  let data = [];

  const lines = string.split("\n");

  // 각 줄을 데이터 리스트에 추가합니다.
  lines.forEach((line) => {
    // 공백이 아닌 경우에만 데이터 리스트에 추가합니다.
    if (line.trim() !== "") {
      data.push(line.trim());
    }
  });

  return data;
}

function checkProhibited(users_list, meds_list) {
  const data = [];

  users_list.forEach((userPill) => {
    // meds_list에 있는 각 요소의 Id와 일치하는 약을 찾음
    const matchedPill = meds_list.find((med) => med.num == userPill.id);
    if (matchedPill) {
      // 일치하는 약이 있으면 data 배열에 추가
      data.push({
        num: userPill.id,
        name: userPill.name,
        imageUrl: userPill.imageUrl,
        summary: userPill.summary,
      });
    }
  });

  return data;
}

function ImagePreview({ route, navigation }) {
  //const [name, setName] = useState("");
  const [ID, setId] = useState(null);
  const [vertices, setVertices] = useState([]);

  function requestWithBase64(base64, imageUrl) {
    axios
      .post(
        "https://4s376tsj0w.apigw.ntruss.com/custom/v1/29314/86a1154edeb470c6b86ef567a6534e7e753f2398af6355e9c99e35dd34a51f6e/infer", // APIGW Invoke URL
        {
          images: [
            {
              format: "jpeg", // file format
              name: "test.jpeg", // image name
              data: base64, // image base64 string(only need part of data). Example: base64String.split(',')[1]
            },
          ],
          requestId: uuid.v4(), // unique string
          timestamp: 0,
          version: "V2",
        },
        {
          headers: {
            "X-OCR-SECRET": "ZEFJUGRKTGNBVm1GYWdTVXFaa3RaeWNhWFBDeG9ITmU=", // Secret Key
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          let result = res.data.images[0];
          const imageWidth = result.convertedImageInfo.width;
          console.log(imageWidth);
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
            }
            if (item.inferText !== "")
              vertices.push(item.boundingPoly.vertices);
          });
          navigation.navigate(
            "AddResult",
            {
              date: parsingDate,
              meds: medsList,
              imageUrl: imageUrl,
              vertices: vertices,
              imageWidth: imageWidth,
            },
            navigation
          );
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
        requestWithBase64(base64Img, imageUrl);
        //console.log(base64Img);
      } catch (error) {
        console.error("Error reading image file:", error);
      }
    };

    const imgAPICall = async (type) => {
      try {
        const response = await searchImage(imageUrl, type); //ok
        if (response !== null) {
          console.log("response:", response);
          let trimResponse = response.trim();
          if (trimResponse) {
            console.log("trimed response:", trimResponse);
            let name = trimResponse;
            //let name = "씨코나졸정(이트라코나졸)";
            //console.log("name:", name);
            const id = await searchNumber(name);
            const infos = await searchInfos(id);
            //console.log("api 호출 결과 info:", infos);
            let infos_result;
            if (infos !== null) {
              infos_result = processInfoData(infos);
            } else {
              infos_result = null;
            }

            console.log("infos_result:", infos_result);
            const prohibited = await searchProhibited(id);

            let prohibited_result = [];

            if (prohibited !== null) {
              prohibited_result = processData(prohibited);
              prohibited_result = checkProhibited(PILLS, prohibited_result);
            } else {
              prohibited_result = null;
            }
            navigation.navigate("SearchResult", {
              name: name,
              id: id,
              imageUrl: imageUrl,
              infos: infos_result,
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
      imgAPICall(pillType);
      navigation.navigate("SearchResult", {
        name: name,
        id: id,
        imageUrl: imageUrl,
        infos: infos_result,
        prohibited: prohibited_result,
      });
    }
  }, [imageUrl]);

  const { imageUrl: imageUrl, type: type, pillType: pillType } = route.params;

  //imageUrl to base64
  const handlePress = () => {
    console.log(medsList);
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
        {/* {imageUrl && type === "search" ? (
          <Image style={styles.image} source={{ uri: imageUrl }} />
        ) : (
          <></>
        )} */}
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
