import ClearSession from "../../security/ClearSession";

export default function Logout() {
  ClearSession();

  return (window.location.href = "/login");
}
