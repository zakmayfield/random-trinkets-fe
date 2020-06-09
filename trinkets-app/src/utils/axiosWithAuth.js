import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("TOKEN");
  return axios.create({
    headers: {
      Authorization: token,
    },
    baseURL: "https://random-trinkets.herokuapp.com/api",
  });
};