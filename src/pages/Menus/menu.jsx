import React from "react";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { API_URL } from "../../../env.json";

function numberWithComas(x) {
  return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
}

const menu = ({ menus, masukKeranjang }) => {
  return (
    <Col md={4} xs={6}>
      <Card className="shadow mb-5" onClick={() => masukKeranjang(menus)}>
        <Card.Img variant="top" src={`${API_URL}/uploads/${menus.files}`} />

        <Card.Body>
          <Card.Title>
            {menus.name_products} - {menus.kode}{" "}
          </Card.Title>
          <span className="dark:text-indigo-200 mb-2">
            {menus.desc_products}
          </span>
          <Card.Text>
            <>Rp. {menus.harga ? numberWithComas(menus.harga) : 0}</>
          </Card.Text>
          <Card.Text>
            <span className="dark:text-indigo-200 mb-2">
              {" "}
              Stock Tersedia : {menus.stock}
            </span>
          </Card.Text>
          <Button type="input" variant="primary">
            Beli Sekarang
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default menu;
