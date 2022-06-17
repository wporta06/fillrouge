import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;
// console.log(TOKEN);
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTA2M2M0MDYyYjg3OGQwZWEzMGU2NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NTQxODc0OCwiZXhwIjoxNjU1Njc3OTQ4fQ.9BlE5JZUQeKBfUvPk07UH-uCsccgrMv8iYEwkZdD-Y0";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
