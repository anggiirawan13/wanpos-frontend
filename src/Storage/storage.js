export default class Storage {
  static set = (label, data) => {
    localStorage.setItem(label, JSON.stringify(data));
  };

  static get = (label) => {
    return JSON.parse(localStorage.getItem(label) || '{"data":""}');
  };

  static delete = (label) => {
    localStorage.removeItem(label);
  };

  static setLogin = (token) => {
    localStorage.setItem("acctok", token);
  };

  static getLogin = () => {
    return localStorage.getItem("acctok");
  };
}
