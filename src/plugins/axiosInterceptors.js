import axios from "axios";
import Storage from "../Storage/storage.jsx";

export default function axiosInterceptors() {
  axios.interceptors.request.use(
    (req) => {
      req.headers["Authorization"] = `Bearer ${Storage.getLogin()}`;

      return req;
    },
    (err) => {
      localStorage.clear();

      window.location = "/login";
    }
  );

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      localStorage.clear();

      window.location = "/login";
    }
  );
}
