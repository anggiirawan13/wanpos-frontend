import React, { Component } from "react";
import Navbar from "./Navbar/index";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import axios from "axios";
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
      .get("/api/product")
      .then((res) => {
        const menus = res.data.result;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  numberWithComas = (x) => {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
  };

  render() {
    const { menus } = this.state;
    return (
      <>
        <Navbar />
        <Container>
          <Row>
            <Col>
              <h2 className="font-semibold mt-3 text-slate-900 mb-3 dark:text-slate-100">
                <strong>List Menu</strong>
                <hr />
              </h2>
              <Row>
                {menus == null ? (
                  <></>
                ) : (
                  menus.map((menu, index) => (
                    <Col md={4} xs={6} key={index ? index : 0}>
                      <Card className="shadow mb-5">
                        <Card.Body>
                          <Card.Title>
                            {menu.product_code} - {menu.product_name}
                          </Card.Title>
                          <span className="dark:text-indigo-200 mb-2">
                            {menu.product_name}
                          </span>
                          <Card.Text>
                            Rp. {numberWithComas(menu.selling_price)}
                          </Card.Text>
                          <Card.Text>
                            <span className="dark:text-indigo-200 mb-2">
                              Stock : {menu.stock ? menu.stock : 0}
                            </span>
                          </Card.Text>
                          <Link
                            to="/login"
                            className="btn btn-primary"
                            variant="primary"
                          >
                            Buy Now
                          </Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
