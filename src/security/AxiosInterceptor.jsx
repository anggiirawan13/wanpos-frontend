import axios from "axios";
import ClearSession from "./ClearSession.jsx";
import Storage from "../Storage/storage.jsx";

export default function axiosInterceptors() {
  axios.interceptors.request.use(
    (req) => {
      req.headers["Authorization"] = `Bearer ${Storage.getLogin()}`;

      return req;
    },
    (err) => {
      ClearSession();
      history.pushState(null, null, "/login");
    }
  );

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      ClearSession();
      history.pushState(null, null, "/login");
    }
  );
}
