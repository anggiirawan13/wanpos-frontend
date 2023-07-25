import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Storage from "../../Storage/storage";
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from "axios";

function ColorSchemesExample() {
  useEffect(() => {
    fetchPesanan();
    const auth = Storage.getLogin() ? true : false;
    setBtnLogout(auth);
  }, []);

  const [order, setOrder] = useState([]);


  const fetchPesanan = () => {

    axios.get('/api/v1/order/menunggu_konfirmasi').then((res) => {
      setOrder(res.data.result);
    });

  }

  const [btnLogout, setBtnLogout] = useState(false);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Roti Sobek App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="Pesanan Saya" id="navbarScrollingDropdown">
              { 
                order.map((item, i) => (

                  <NavDropdown.Item href="#action4">
                  Pesanan anda sedang {item.status}
                </NavDropdown.Item>


                ))
              
              }
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Lihat Semua
              </NavDropdown.Item>
            </NavDropdown>
            {btnLogout ? <Nav.Link href="/logout">Logout</Nav.Link> : <></>}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
