import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Auth from "../service/Auth";
import { Link } from 'react-router-dom';


export default function Navegador() {

  const currentUser = Auth();
  return (
    <>
      <Navbar expand="lg" className="mb-3" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            {currentUser?.photoURL ?
              <img src={currentUser?.photoURL || "https://via.placeholder.com/120"} width="40" height="40" alt="2Get Companion" /> :
              <img src='/Logo Simples.png' width="40" height="40" alt="2Get Companion" />}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/turma" style={{ textDecoration: 'none', color: 'inherit' }}>Quem é a Classe?</Link>
              </Nav.Link>
              <NavDropdown title="Teorias da Base Mediadora" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/bowlby">
                  Jhon Bowlby (Teoria do Apego)
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/porcoespinho">
                    Schopenhauer (Paradigma do Porco Espinho)
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/machinelearning">
                    Machine Learning
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                <Link to="/repositorio">
                  Onde armezenamos nosso conhecimento?
                </Link>
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
    </Navbar >
    </>
  );
}