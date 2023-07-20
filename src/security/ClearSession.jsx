import Storage from "../Storage/storage";

const ClearSession = () => {
  Storage.delete("user_id");
  Storage.delete("username");
  Storage.delete("role");
  Storage.delete("acctok");
};

export default ClearSession;
