import axios from "axios";

const server = "http://172.20.10.7:3000";

export async function searchInfos(keyword) {
  try {
    console.log("Search Infos");
    const response = await axios.get(`${server}/api/pill/search/${keyword}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", {
      response: error.response,
    });
    return null;
  }
}

export async function searchProhibited(keyword) {
  try {
    console.log("Search Prohibited");
    const response = await axios.get(`${server}/api/pill/combine/${keyword}`);

    //console.log("Response data:", response.data);
    if (response.data !== null && !response.data.startsWith("Cannot")) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching data:", {
      response: error.response,
      message: error.message,
      request: error.request,
    });
    return null; // 에러 발생 시 null 반환
  }
}

export async function searchImage(imageUrl) {
  try {
    const formData = new FormData();
    formData.append("image", {
      uri: imageUrl,
      type: "image/png", // MIME 타입 지정
      name: "upload.png", // 파일명 지정, 서버에서 필요에 따라 사용될 수 있음
    });
    //formData.append("image", imageUrl);

    const response = await axios.post(
      `${server}/api/pill/upload/hex`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Response:", response.data);
    return response.data; // response 데이터 반환
  } catch (error) {
    console.error("Error uploading image:", error);
    return null; // 에러 발생 시 null 반환
  }
}

export async function searchNumber(keyword) {
  //console.log("Searching for keyword:", keyword);
  const trimKeyword = keyword.trim();
  //console.log("Searching for keyword:", trimKeyword);
  try {
    const response = await axios.get(
      `${server}/api/pill/searchSeq/${trimKeyword}`
    );
    console.log("Response data:", response.data);
    return response.data;
    //return response.data; // API 응답을 반환하여 외부에서 사용할 수 있도록 함
  } catch (error) {
    console.error("Error fetching data:", {
      response: error.response,
      message: error.message,
      request: error.request,
    });
    //return null; // 에러 발생 시 null 반환
  }
}

export function getUsers() {
  axios
    .get(`${server}/api/users`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
}
