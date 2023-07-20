import Storage from "../Storage/storage";
import jwtDecode from "jwt-decode";

const SecuredRoute = ({ element: Element, role: Role }) => {
  const auth = Storage.getLogin() ? jwtDecode(Storage.getLogin()) : false;

  if (auth.role == Role || Role == "") {
    return Element;
  } else {
    return history.back();
  }
};

export default SecuredRoute;
