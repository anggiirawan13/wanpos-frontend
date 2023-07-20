import ClearSession from "../../security/ClearSession";

export default function Logout() {
  ClearSession();

  history.pushState(null, null, "/login");
}
