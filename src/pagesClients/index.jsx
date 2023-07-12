import React, { Component } from "react";
import Navbar from "./Navbar/index";
import { Col, Container, Row } from "react-bootstrap";
import Menus from "../pagesClients/Menus/menu";
import swal from "sweetalert";
import Card from 'react-bootstrap/Card';
import Rotibakar from '../images/rotiBakar1.png';
import Button from 'react-bootstrap/Button';



import Hasil from "./Hasil/hasil";
import axios, { Axios } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Storage from "../../src/Storage/storage";
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

  componentDidMount() {
    axios
      .get(`api/v1/listProduct`)
      .then((res) => {
        const menus = res.data.result;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  
  render() {
    const { menus, keranjangs } = this.state;
    return (
      <>
        <Navbar />
        <Container>
          <Row>
            <Col>
              <h2 className="font-semibold mt-3 text-slate-900 mb-3 dark:text-slate-100">
                <strong>Daftar Menu</strong>

                <hr />
              </h2>
              <Row>
                  { menus && menus.map((menu, index) => (
                <Col md={4} xs={6}>

                
                  <Card
                    className="shadow mb-5"
                    onClick={() => ma}
                  >
                    <Card.Img variant="top" src={Rotibakar} />
                    <Card.Body>
                      <Card.Title>
                        {menu.name_products} - {menu.kode}{" "}
                      </Card.Title>
                      <p className="dark:text-indigo-200 mb-2">
                        {menu.desc_products}
                      </p>
                      <Card.Text>
                        <>Rp.</>
                      </Card.Text>
                      <Card.Text>
                        <p className="dark:text-indigo-200 mb-2">
                          {" "}
                          Stock Tersedia : {menu.stock}
                        </p>
                      </Card.Text>
                      <Link to='/login' className="btn btn-primary" variant="primary">Beli Sekarang</Link>
                    </Card.Body>
                  </Card>
                </Col>
                    ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
