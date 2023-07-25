import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Storage from "../../Storage/storage";

function ColorSchemesExample() {
  useEffect(() => {
    const auth = Storage.getLogin() ? true : false;
    setBtnLogout(auth);
  }, []);

  const [btnLogout, setBtnLogout] = useState(false);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Roti Sobek App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Status Pesanan</Nav.Link>
            {btnLogout ? <Nav.Link href="/logout">Logout</Nav.Link> : <></>}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
