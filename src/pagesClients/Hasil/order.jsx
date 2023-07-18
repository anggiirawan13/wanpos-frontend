import React, { Component } from "react";
import { Badge, Col, Row } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import ModalKeranjang from "./ModalKeranjang";

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

  handleShow = (menuKerajang) => {
    this.setState({ showmodal: true, keranjangdetail: menuKerajang });
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
        </h2>
        <hr />
        {keranjangs.length !== 0 && (
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

            <ModalKeranjang handleClose={this.handleClose} {...this.state} />
          </ListGroup>
        )}
      </Col>
    );
  }
}
