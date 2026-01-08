import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://localhost:5073",
  headers: {
    "Content-Type": "application/json",
  },
});
