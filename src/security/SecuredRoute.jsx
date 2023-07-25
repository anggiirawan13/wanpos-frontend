import Storage from "../Storage/storage";
import jwtDecode from "jwt-decode";
import Login from "../pages/login/index.jsx";

const SecuredRoute = ({ element, role, withLogin }) => {
  if (!withLogin) {
    history.replaceState(null, null, "/");
    return element;
  } else {
    const auth = Storage.getLogin() ? jwtDecode(Storage.getLogin()) : false;
    if (!auth) {
      history.replaceState(null, null, "/login");
      return <Login />;
    } else if (auth.role == role || role == "") {
      return element;
    } else {
      return history.back();
    }
  }
};

export default SecuredRoute;
