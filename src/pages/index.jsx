import React, { Component } from "react";
import Navbar from "./Navbar/index";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../env.json";

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
      .get(`api/product/noauth`)
      .then((res) => {
        const menus = res.data.result;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { menus } = this.state;
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
                {menus ? (
                  menus.map((menu, index) => (
                    <Col md={4} xs={6} key={index ? index : 0}>
                      <Card className="shadow mb-5">
                        <Card.Img
                          variant="top"
                          src={`${API_URL ? API_URL : ""}/uploads/${
                            menu.files ? menu.files : ""
                          }`}
                        />
                        <Card.Body>
                          <Card.Title>
                            {menu.name_products ? menu.name_products : ""} -{" "}
                            {menu.kode ? menu.kode : ""}{" "}
                          </Card.Title>
                          <span className="dark:text-indigo-200 mb-2">
                            {menu.desc_products ? menu.desc_products : ""}
                          </span>
                          <Card.Text>
                            Rp. {menu.harga ? menu.harga : 0}
                          </Card.Text>
                          <Card.Text>
                            <span className="dark:text-indigo-200 mb-2">
                              Stock Tersedia : {menu.stock ? menu.stock : 0}
                            </span>
                          </Card.Text>
                          <Link
                            to="/login"
                            className="btn btn-primary"
                            variant="primary"
                          >
                            Beli Sekarang
                          </Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <></>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
