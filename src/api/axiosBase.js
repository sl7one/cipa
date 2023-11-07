import axios from "axios";

export const cipa = axios.create({
  baseURL: "https://cipa-backend.onrender.com/api",
});
