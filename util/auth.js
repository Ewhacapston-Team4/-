import axios from "axios";

const server = "http://116.32.121.121:80";

export async function createUser(id, name, email, password) {
  try {
    console.log("createUser submitHandler:", id, name, email, password);

    const userData = {
      userId: id,
      password: password,
      username: name,
      email: email,
    };

    const response = await axios.post(`${server}/api/auth/signup`, userData);

    console.log(response.data);
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export async function login(id, password) {
  const response = await axios.post(`${server}/api/auth/login`, {
    userId: id,
    password: password,
    returnSecureToken: true,
  });

  console.log(response.data);

  // const token = response.data.idToken;

  // return token;
}
