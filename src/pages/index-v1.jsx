import React, { Component } from "react";
import Navbar from "./Navbar/index";
import { Col, Container, Row } from "react-bootstrap";
import Menus from "../pages/Menus/menu";
import swal from "sweetalert";

import Hasil from "./Hasil/hasil";
import axios from "axios";
import Storage from "../../src/Storage/storage.jsx";

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
    this.getListProduct();
    this.getListKeranjang();
  }

  getListProduct = () => {
    axios
      .get("/api/product")
      .then((res) => {
        const menus = res.data.result;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getListKeranjang = () => {
    console.log(Storage.get("username").data);
    axios
      .get(`/api/checkout/user/${Storage.get("username").data}`)
      .then((res) => {
        const keranjangs = res.data.result[0].items;
        console.log(keranjangs);
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  masukKeranjang = (value) => {
    console.log(value);
    axios
      .get(`/api/checkout/${value.product_code}/${Storage.get("user_id").data}`)
      .then((res) => {
        if (res.data.result) {
          const jumlah = res.data.result[0].jumlah + 1;
          const total_harga = res.data.result[0].total_harga + value.harga;
          let id_products = value.id_products;

          const user_id = Storage.get("username").data;
          let company = Storage.get("company").data;

          const checkoutNumber =
            company + Date.now() + Math.floor(Math.random() * 9999);
          const data = {
            company_code: company,
            checkout_number: checkoutNumber,
            user_code: user_id,
            gross_amount: value.selling_price,
            net_amount: value.selling_price * 1.1,
            items: [
              {
                checkout_number: checkoutNumber,
                product_code: value.product_code,
                quantity: 1,
                selling_price: value.selling_price,
                line_amount: value.selling_price,
              },
            ],
          };

          axios
            .put(`/api/checkout/${res.data.result[0].id_checkout}`, {
              jumlah,
              total_harga,
              id_products,
              user_id,
              addQuantity: 1,
            })
            .then(() => {
              this.getListProduct();
              this.getListKeranjang();
              swal({
                title: "Berhasil Menambahkan ke Keranjang!",
                text: "Berhasil Masuk Keranjang " + value.name_products,
                icon: "success",
                timer: 1500,
              });
            });
        } else {
          const user_id = Storage.get("username").data;
          let company = Storage.get("company").data;

          const checkoutNumber =
            company + Date.now() + Math.floor(Math.random() * 9999);
          console.log(checkoutNumber);
          console.log(checkoutNumber.length);
          const data = {
            company_code: company,
            checkout_number: checkoutNumber,
            user_code: user_id,
            gross_amount: value.selling_price,
            net_amount: value.selling_price * 1.1,
            items: [
              {
                checkout_number: checkoutNumber,
                product_code: value.product_code,
                quantity: 1,
                selling_price: value.selling_price,
                line_amount: value.selling_price,
              },
            ],
          };

          axios
            .post("/api/checkout", data)
            .then(() => {
              this.getListProduct();
              this.getListKeranjang();
              swal({
                title: "Berhasil Menambahkan ke Keranjang!",
                text: "Berhasil Masuk Keranjang " + value.name_products,
                icon: "success",
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("ini errornya s : ", error);
            });
        }
      });
  };
  render() {
    const { menus, keranjangs } = this.state;
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
                {menus ? (
                  menus.map((menu, index) => (
                    <Menus
                      key={index}
                      menus={menu}
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))
                ) : (
                  <></>
                )}
              </Row>
            </Col>
            <Hasil keranjangs={keranjangs} />
          </Row>
        </Container>
      </>
    );
  }
}
