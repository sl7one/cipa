import axios from "axios";

export const cipa = axios.create({
  baseURL: "https://cipa-backend.onrender.com/api",
});

// export const cipa = axios.create({
//   baseURL: "http://localhost:4747/api",
// });
