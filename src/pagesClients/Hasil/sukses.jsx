import React, { Component } from "react";
import Navbar from "../Navbar/index";
import { Container } from "react-bootstrap";

export default class DaftarMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      keranjangs: [],
      id_user: "",
    };
  }

  render() {
    return (
      <>
        <Navbar />
        <Container></Container>
      </>
    );
  }
}
