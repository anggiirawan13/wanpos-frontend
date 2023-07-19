import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

function numberWithComas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const modalKeranjang = ({ handleClose, showmodal, keranjangdetail, jumlah, tambah, kurang, handleSubmit, totalHarga }) => {
  console.log("keranjang", keranjangdetail);
  if (keranjangdetail) {
    return (
      <Modal show={showmodal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {keranjangdetail.name_products}
            <strong className="ml-2">
              (Rp. {numberWithComas(keranjangdetail.harga)})
            </strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Label htmlFor="inputPassword5">Total Harga : </Form.Label>
          <p className="">
              Rp. {numberWithComas(totalHarga)}
            </p>
        
         
         <Form.Label htmlFor="inputPassword5">Jumlah : </Form.Label>
         <br />
         <Button variant="primary" onClick={() => kurang()} size="sm" className="bg-danger mr-2">
          <FontAwesomeIcon icon={faMinus} />
         </Button>
         <strong>{jumlah}</strong>
         <Button variant="primary" onClick={() => tambah()} size="sm" className="btn-add bg-primary ml-2">
          <FontAwesomeIcon icon={faPlus} />
         </Button>
         <br></br>
         <Button onClick={handleSubmit} type="submit" variant="primary" className="bg-primary mt-5">Simpan</Button>
         </Form>



        </Modal.Body>
        <Modal.Footer>
        
          <Button className="bg-danger">
             <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={showmodal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default modalKeranjang;
