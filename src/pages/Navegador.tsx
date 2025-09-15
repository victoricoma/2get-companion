import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Auth from "../service/Auth";
import { Link, useNavigate } from "react-router-dom";


export default function Navegador() {

  const currentUser = Auth();
  const navigate = useNavigate();

return (
<>
    <Navbar expand="lg" className="mb-3" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
        <img src={currentUser?.photoURL || "https://via.placeholder.com/120"} width="60" height="60" alt="2Get Companion" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Infográfico</Nav.Link>
            <Nav.Link href="#link">Quem é a turma</Nav.Link>
            <NavDropdown title="Teoria base" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Jhon Bowlby (Teoria do Apego)</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Arthur de Schopenhauer (Paradigma do Porco Espinho)
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Machine Learning</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Onde armezenamos nosso conhecimento?
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="align-items-center">
            <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }} className='me-3'>
              {currentUser?.displayName || "Usuário"}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
</>
);
}