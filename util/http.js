import axios from "axios";

export function searchInfos(keyword) {
  axios
    .get(`http://116.32.121.121:3000/api/pill/search/:pillName`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
}

export function searchImage(imageUrl) {
  const file = imageUrl;
  const message = {
    key: "image",
    value: imageUrl,
  };

  const formData = new FormData();

  formData.append("file", file);
  formData.append("message", JSON.stringify(message));

  axios
    .post("http://116.32.121.121:80/api/pill/upload", formData, {})
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      console.error("Error fetching data: ", error.message);
    });
}

export function getUsers() {
  axios
    .get(`http://116.32.121.121:3000/api/users`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
}
