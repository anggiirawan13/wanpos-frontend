import React, { Component } from "react";
import Navbar from "./Navbar/index";
import { Col, Container, Row } from "react-bootstrap";
import Menus from "../pagesClients/Menus/menu";
import swal from "sweetalert";

import Hasil from "./Hasil/hasil";
import axios, { Axios } from "axios";
import { useParams } from "react-router-dom";
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

    axios.get(`/api/v1/checkout/${Storage.get("user_id").data}`).then((res) => {
      this.getListKeranjang();
    });


  }

  getListKeranjang = () => {
    axios
      .get(`/api/v1/checkout/user/${Storage.get("user_id").data}`)
      .then((res) => {
        console.log("res keranjang", res);
        const keranjangs = res.data.result;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

 

  masukKeranjang = (value) => {

    axios.get(`/api/v1/checkout/${value.id_products}/${Storage.get('user_id').data}`).then((res) => {
      console.log("resssss", res);

      if ( res.data.result.length > 0 && Storage.get('user_id').data == res.data.result[0].user_id ) {
        const jumlah = res.data.result[0].jumlah + 1;
        const total_harga = res.data.result[0].total_harga + value.harga;
        let id_products = value.id_products;
        let user_id = Storage.get("user_id").data;

        axios
          .put(`/api/v1/checkout/${res.data.result[0].id_checkout}`, {
            jumlah,
            total_harga,
            id_products,
            user_id
            })
          .then((res) => {
            this.getListKeranjang();
            swal({
              title: "Berhasil Menambahkan ke Keranjang!",
              text: "Berhasil Masuk Keranjang " + value.name_products,
              icon: "success",
              timer: 1500
            });
          });
      } else {

        const jumlah = 1;
        const total_harga = value.harga;
        const id_products = value.id_products;
        const user_id = Storage.get("user_id").data;

        axios
          .post("api/v1/checkout", {
            jumlah,
            total_harga,
            id_products,
            user_id
          })
          .then((res) => {
            console.log("ressssd", res);
            this.getListKeranjang();
            swal({
              title: "Berhasil Menambahkan ke Keranjang!",
              text: "Berhasil Masuk Keranjang " + value.name_products,
              icon: "success",
              timer: 1500
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
                <strong>Daftar Menu</strong>

                <hr />
              </h2>
              <Row>
                {
                menus &&
                  menus.map((menu, index) => (
                    <Menus
                      key={menu.id_products}
                      menus={menu}
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))
                }
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}