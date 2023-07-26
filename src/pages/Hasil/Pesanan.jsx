import React, { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Order from "../Hasil/order.jsx";
import axios from "axios";
import Storage from "../../Storage/storage.jsx";
import { redirect } from "react-router-dom";

export default class Pesanan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      keranjangs: [],
      id_user: "",
      alamat: "",
      nama_lengkap: "",
      no_rek: "",
      nama_rekening: "",
      no_tlp: "",
      total_bayar: 0,
      metode_pemesanan: "",
      status_pengiriman: "menunggu_diproses",
      status: "menunggu_konfirmasi",
    };
  }

  componentDidMount() {
    axios
      .get(`/api/v1/product`)
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

  handleBayar = (e) => {
    e.preventDefault();

    let form = {
      id_user: Storage.get("user_id").data,
      nama_lengkap: this.state.nama_lengkap,
      alamat: this.state.alamat,
      no_tlp: this.state.no_tlp,
      nama_rekening: this.state.nama_rekening,
      no_rek: this.state.no_rek,
      total_bayar: this.state.total_bayar,
      metode_pemesanan: this.state.metode_pemesanan,
      status_pengiriman: this.state.status_pengiriman,
      status: "menunggu_konfirmasi",
    };

    axios.post(`api/v1/checkout/order`, form).then(() => {
      swal({
        title: "Konfirmasi Berhasil!",
        text: "pesanan telah dikonfirmasi",
        icon: "success",
      }).then(() => {
        history.back();
      });
    });
  };

  render() {
    const { keranjangs } = this.state;
    return (
      <>
        <Container>
          <Row>
            <Col>
              <h2 className="font-semibold mt-3 text-slate-900 mb-3 dark:text-slate-100">
                <strong>isi Form Pesanan</strong>
                <hr />
              </h2>
              <Row>
                <Form onSubmit={this.handleBayar}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Nama Lengkap</Form.Label>
                    <Form.Control
                      type="text"
                      name="nama_lengkap"
                      onChange={(e) =>
                        this.setState({ nama_lengkap: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Alamat Lengkap</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="alamat"
                      onChange={(e) =>
                        this.setState({ alamat: e.target.value })
                      }
                      rows={3}
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>No Telepon ( WA )</Form.Label>
                    <Form.Control
                      type="text"
                      name="no_tlp"
                      onChange={(e) =>
                        this.setState({ no_tlp: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Nama Rekening</Form.Label>
                    <Form.Control
                      type="text"
                      name="nama_rekening"
                      onChange={(e) =>
                        this.setState({ nama_rekening: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>No Rekening</Form.Label>
                    <Form.Control
                      type="text"
                      name="no_rek"
                      onChange={(e) =>
                        this.setState({ no_rek: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Label>Metode Pembayaran</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) =>
                      this.setState({ metode_pemesanan: e.target.value })
                    }
                  >
                    <option hidden>- Pilih Metode Pembayaran -</option>
                    <option value="BCA Virtual Account">
                      BCA Virtual Account
                    </option>
                    <option value="Ambil Sendiri">Ambil Sendiri</option>
                  </Form.Select>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ width: "250px" }}
                    className="btn bg-primary mt-2 mb-2 text-white"
                    size="lg"
                  >
                    Bayar Sekarang
                  </Button>
                </Form>
              </Row>
            </Col>
            <Order keranjangs={keranjangs} />
          </Row>
        </Container>
      </>
    );
  }
}
