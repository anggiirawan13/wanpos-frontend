import React, { Component } from "react";
import { Badge, Col, Row, Modal, Button, Container } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import ModalKeranjang from "./ModalKeranjang";
import { Form } from "react-bootstrap";

import TotalBayar from "./totalBayar";
import { Link } from "react-router-dom";

function numberWithComas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default class hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showmodal: false,
      keranjangdetail: false,
      keterangan: "",
    };
  }

  render() {
    const { keranjangs } = this.props;
    return (
      <>
        <h2 className="font-semibold text-center mt-3 text-slate-900 mb-3 dark:text-slate-100">
          <strong>Cara melakukan Pembayaran</strong>
        </h2>
        <Container>
          <h1 className="text-center mt-5">BANK CENTRAL ASIA</h1>
          <h1 className="text-center mt-5">a/n. ROTI SOBEK SLAMET</h1>
          <h2 className="text-center mt-2" style={{ fontSize: "40px" }}>
            8003428392
          </h2>
          <span className="text-center">
            Mohon Lakukan Pembayaran ke no rekening tersebut. Konfirmasi jika
            sudah melakukan pembayaran
          </span>
          <Link
            to="/konfirmasi-pesanan"
            className="text-center d-flex justify-center mt-5 mx-0 btn btn-primary"
          >
            Konfirmasi
          </Link>
        </Container>
      </>
    );
  }
}
