import { View, StyleSheet, Image, Text } from "react-native";
import { useEffect } from "react";

import Colors from "../../constants/Colors";

//API 호출
// const FormData = require('form-data')
// const axios = require('axios')

// function requestWithBase64 () {
//   axios
//     .post(
//       '', // APIGW Invoke URL
//       {
//         images: [
//           {
//             format: '', // file format
//             name: '', // image name
//             data: '' // image base64 string(only need part of data). Example: base64String.split(',')[1]
//           }
//         ],
//         requestId: '', // unique string
//         timestamp: 0,
//         version: 'V2'
//       },
//       {
//         headers: {
//           'X-OCR-SECRET': '' // Secret Key
//         }
//       }
//     )
//     .then(res => {
//       if (res.status === 200) {
//         console.log('requestWithBase64 response:', res.data)
//       }
//     })
//     .catch(e => {
//       console.warn('requestWithBase64 error', e.response)
//     })
// }

// function requestWithFile () {
//   const file = '' // image file object. Example: fs.createReadStream('./example.png')
//   const message = {
//     images: [
//       {
//         format: '', // file format
//         name: '' // file name
//       }
//     ],
//     requestId: '', // unique string
//     timestamp: 0,
//     version: 'V2'
//   }
//   const formData = new FormData()

//   formData.append('file', file)
//   formData.append('message', JSON.stringify(message))

//   axios
//     .post(
//       '', // APIGW Invoke URL
//       formData,
//       {
//         headers: {
//           'X-OCR-SECRET': '', // Secret Key
//           ...formData.getHeaders()
//         }
//       }
//     )
//     .then(res => {
//       if (res.status === 200) {
//         console.log('requestWithFile response:', res.data)
//       }
//     })
//     .catch(e => {
//       console.warn('requestWithFile error', e.response)
//     })
// }

function ImagePreview({ route }) {
  // useEffect(() => {
  //   requestWithBase64();
  // }, [imageUrl]);
  const { imageUrl } = route.params;
  console.log(imageUrl);
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
