import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

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
    return (
      <>
        <h2 className="font-semibold text-center text-slate-900 mb-3 dark:text-slate-100"
        style={{ marginTop: '180px'}}>
          <strong>Konfirmasi Pembayaran</strong>
        </h2>
        <Link
            to="whatsapp://send?phone=+628989193735&text=Hello%2C%20Saya ingin Konfirmasi pesanan saya ..."
            className="text-center btn btn-success"
            style={{'width': '120px', 'marginLeft': '620px'}}
          >
            Konfirmasi
          </Link>
        <Container>
         
      
         
        </Container>
      </>
    );
  }
}
