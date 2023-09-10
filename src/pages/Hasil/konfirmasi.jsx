import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import { Card } from "react-bootstrap";
export default class Konfirmasi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showmodal: false,
      keranjangdetail: false,
      keterangan: "",
      order: [],
    };
  }

  componentDidMount() {
    axios.get("/api/order/menunggu_konfirmasi").then((response) => {
      const order = response.data.result;
      this.setState({
        order,
      });
    });
  }

  render() {
    const { order } = this.state;
    let bayar = 0;
    order ? order.map((item) => (bayar += item.total_bayar)) : 0;
    return (
      <>
        <h2
          className="font-semibold text-center text-slate-900 mb-3 dark:text-slate-100"
          style={{ marginTop: "80px" }}
        >
          <strong>Pembayaran Transfer </strong>
        </h2>

        <h2
          className="font-semibold text-center text-slate-900 mb-3 dark:text-slate-100"
          style={{ marginTop: "10px" }}
        >
          Bank Central Asia ( BCA )<br></br>
          No. Rek 876-092229 <br />
          a.n ROTI SOBEK <br></br>
          Total Tagihan : Rp. {bayar}
        </h2>

        <h2
          className="font-semibold text-center text-slate-900 mb-3 dark:text-slate-100"
          style={{ marginTop: "10px" }}
        >
          Lakukan Konfirmasi Pembayaran kepada Admin Roti Sobek di bawah ini.
          dengan cara : <br />
          1. Upload Bukti Transfer ( Jika Metode yang digunakan Transfer ) dan
          Konfirmasi Kode Pesanan Beserta Bukti Transfer anda Kepada Admin Roti
          Sobek
        </h2>
        <Container>
          {order ? (
            order.map((item, i) => (
              <Card key={i}>
                <Card.Body className="text-center">
                  KODE PESANAN ANDA [ {item.order_code} ]{" "}
                </Card.Body>
              </Card>
            ))
          ) : (
            <></>
          )}
        </Container>

        <Link
          to="whatsapp://send?phone=+628989193735&text=Hello%2C%20Saya ingin Konfirmasi pesanan saya ..."
          className="text-center btn btn-success"
          style={{ width: "120px", marginLeft: "620px" }}
        >
          Konfirmasi
        </Link>
        <Container></Container>
      </>
    );
  }
}
