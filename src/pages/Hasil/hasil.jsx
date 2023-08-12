import React, { Component } from "react";
import { Badge, Col, Row } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import ModalKeranjang from "./ModalKeranjang";
import TotalBayar from "./totalBayar";
import axios from "axios";

function numberWithComas(x) {
  return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
}

export default class hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showmodal: false,
      keranjangdetail: false,
      keterangan: "",
      jumlah: 0,
      totalHarga: 0,
      addQuantity: 0,
    };
  }

  handleShow = (menuKerajang) => {
    this.setState({
      showmodal: true,
      keranjangdetail: menuKerajang,
      jumlah: menuKerajang.jumlah,
      totalHarga: menuKerajang.total_harga,
    });
  };

  tambah = () => {
    if (this.state.jumlah < this.state.keranjangdetail.stock) {
      this.setState({
        jumlah: this.state.jumlah + 1,
        totalHarga: this.state.keranjangdetail.harga * (this.state.jumlah + 1),
        addQuantity: this.state.addQuantity + 1,
      });
    } else {
      swal({
        title: "Jumlah Melebihi batas stock!",
        timer: 1500,
      });
    }
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga: this.state.keranjangdetail.harga * (this.state.jumlah - 1),
        addQuantity: this.state.addQuantity - 1,
      });
    }
  };

  handleSubmit = (e, menuKeranjang) => {
    e.preventDefault();
    axios
      .put(`api/v1/checkout/${menuKeranjang.keranjangdetail.id_checkout}`, {
        jumlah: menuKeranjang.jumlah,
        total_harga: menuKeranjang.totalHarga,
        id_products: menuKeranjang.keranjangdetail.id_products,
        addQuantity: menuKeranjang.addQuantity,
      })
      .then(() => {
        swal({
          title: "Berhasil Menambahkan ke Keranjang!",
          text: "Berhasil Masuk Keranjang",
          icon: "success",
          timer: 1500,
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log("ini errornya s : ", error);
      });
  };

  handleDelete = (e, menuKeranjang) => {
    e.preventDefault();
    swal({
      title: "Hapus Pesanan!",
      text: "apakah kamu yakin ingin menghapus pesanan?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      console.log(menuKeranjang);
      if (willDelete) {
        axios
          .delete(
            `api/v1/checkout/${menuKeranjang.keranjangdetail.id_checkout}/${menuKeranjang.keranjangdetail.id_products}/${menuKeranjang.keranjangdetail.jumlah}`
          )
          .then(() => {
            swal({
              title: "Hapus Berhasil!",
              text: "pesanan berhasil dihapus",
              icon: "success",
            }).then(() => {
              window.location.reload();
            });
          })
          .catch((error) => {
            console.log("ini errornya s : ", error);
          });
      }
    });
  };

  handleClose = () => {
    this.setState({ showmodal: false });
  };

  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} mt={"2"}>
        <h2 className="font-semibold mt-3 text-slate-900 mb-3 dark:text-slate-100">
          <strong>Hasil</strong>
          <hr />
        </h2>
        {keranjangs ? (
          keranjangs.length !== 0 && (
            <ListGroup variant="flush">
              {keranjangs.map((menuKerajang) => (
                <ListGroup.Item
                  key={menuKerajang.id_checkout}
                  onClick={() => this.handleShow(menuKerajang)}
                >
                  <Row>
                    <Col xl="2">
                      <h2 className="font-semibold mt-3 text-slate-900 mb-3 dark:text-slate-100">
                        <Badge pill variant="success">
                          {menuKerajang.jumlah}
                        </Badge>
                      </h2>
                    </Col>
                    <Col>
                      <h5 className="dark:text-indigo-200 mb-2">
                        {menuKerajang.name_products}
                      </h5>
                      <span
                        className="dark:text-indigo-200 mb-2"
                        style={{ fontSize: "12px" }}
                      >
                        Rp. {numberWithComas(menuKerajang.harga)} x{" "}
                        {menuKerajang.jumlah}
                      </span>
                    </Col>
                    <Col>
                      <span
                        className="dark:text-indigo-200 mb-2"
                        style={{ fontSize: "14px" }}
                      >
                        <strong className="float-right">
                          Rp. {numberWithComas(menuKerajang.total_harga)}
                        </strong>
                      </span>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}

              <ModalKeranjang
                {...this.state}
                handleClose={() => this.handleClose()}
                handleSubmit={(e) => this.handleSubmit(e, { ...this.state })}
                handleDelete={(e) => this.handleDelete(e, { ...this.state })}
                tambah={() => this.tambah()}
                kurang={() => this.kurang()}
              />
            </ListGroup>
          )
        ) : (
          <></>
        )}
        <TotalBayar keranjangs={keranjangs} />
      </Col>
    );
  }
}
