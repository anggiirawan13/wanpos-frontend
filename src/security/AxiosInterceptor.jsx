import axios from "axios";
import Storage from "../Storage/storage.jsx";
import ClearSession from "./ClearSession.jsx";

export default function axiosInterceptors() {
  axios.interceptors.request.use(
    (req) => {
      req.headers["Authorization"] = `Bearer ${Storage.getLogin()}`;

      return req;
    },
    (err) => {
      ClearSession();
    }
  );

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      ClearSession();
    }
  );
}
