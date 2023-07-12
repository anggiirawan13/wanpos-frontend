import React, { Component } from "react";
import Navbar from "../Navbar/index";
import { Col, Container, Row } from "react-bootstrap";
// import Menus from "../pagesClients/Menus/menu";
import swal from "sweetalert";

import axios, { Axios } from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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
    const {  keranjangs } = this.state;
    return (
      <>
        <Navbar />
        <Container>
          
        </Container>
      </>
    );
  }
}
