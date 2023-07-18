import React, { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Storage from "../../Storage/storage";

export default class Pesanan extends Component {
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

    axios.get(`/api/v1/checkout/${Storage.get("user_id").data}`).then((res) => {
      this.getListKeranjang();
    });
  }

  getListKeranjang = () => {
    axios
      .get(`/api/v1/checkout/user/${Storage.get("user_id").data}`)
      .then((res) => {
        const keranjangs = res.data.result;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  render() {
    const { menus, keranjangs } = this.state;
    return (
      <>
        <Container>
          <Row>
            <Col>
              <h2 className="font-semibold mt-3 text-slate-900 mb-3 dark:text-slate-100">
                <strong>Konfirmasi Pesanan</strong>
                <hr />
              </h2>
              <Row>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Nama Lengkap</Form.Label>
                    <Form.Control type="text" placeholder="" />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>No Telepon ( WA )</Form.Label>
                    <Form.Control type="text" placeholder="" />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>No Rekening ( Optional )</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Nama pemilik rekening ( Optional )</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>

                  <Form.Select aria-label="Default select example">
                    <option>Metode Pembayaran</option>
                    <option value="1">Transfer</option>
                    <option value="2">Ambil Sendiri</option>
                  </Form.Select>
                  <Button
                    variant="primary"
                    block="true"
                    style={{ width: "250px" }}
                    className="btn bg-primary mt-2 mb-2 text-white"
                    size="lg"
                  >
                    Konfirmasi
                  </Button>
                </Form>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
