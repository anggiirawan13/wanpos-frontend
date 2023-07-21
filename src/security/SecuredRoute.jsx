import Storage from "../Storage/storage";
import jwtDecode from "jwt-decode";
import Login from "../pages/login/index.jsx";

const SecuredRoute = ({ element: Element, role: Role }) => {
  const auth = Storage.getLogin() ? jwtDecode(Storage.getLogin()) : false;

  if (!auth) {
    history.replaceState(null, null, "/login");
    return <Login />;
  } else if (auth.role == Role || Role == "") {
    return Element;
  } else {
    return history.back();
  }
};

export default SecuredRoute;
