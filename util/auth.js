import axios from "axios";

const server = "http://116.32.121.121:80";

export async function createUser(id, name, email, password) {
  const response = await axios.post(`${server}/api/auth/signup`, {
    userId: id,
    password: password,
    username: name,
    email: email,
  });

  console.log(response.data);
}

export async function login(id, password) {
  const response = await axios.post(`${server}/api/auth/login`, {
    userId: id,
    password: password,
  });

  console.log(response.data);
}
