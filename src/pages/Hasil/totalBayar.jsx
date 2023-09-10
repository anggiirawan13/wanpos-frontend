import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function numberWithComas(x) {
  return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
}

export default class totalBayar extends Component {
  render() {
    let totalBayar = 0;
    this.props.keranjangs.forEach(
      (item) => (totalBayar += item.selling_price * item.quantity)
    );

    return (
      <div className="fixed-bottom">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h4 className="text-bold" style={{ marginLeft: "-60px" }}>
              Net Amount:{" "}
              <strong style={{ marginLeft: "70px" }}>
                Rp. {totalBayar ? numberWithComas(totalBayar) : 0}
              </strong>
            </h4>
            <Link
              variant="primary"
              block="true"
              to={"/checkout"}
              style={{ width: "250px", marginLeft: "-60px" }}
              className="btn bg-primary mt-2 mb-2 text-white"
              size="lg"
            >
              <FontAwesomeIcon
                className="text-white mr-5"
                icon={faShoppingCart}
              />
              Pesan
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}
