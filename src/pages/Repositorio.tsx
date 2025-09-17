import { Col, Container, Row } from "react-bootstrap";
import infograficoPag1 from "../../public/repositorios1.png";
import infograficoPag2 from "../../public/repositorios2.png";
import Navegador from "./Navegador";
export default function Repositorio() {
  return (
    <Container>
      <Row>
        <Col>
        <Navegador />
        </Col>
      </Row>
      <Row>
        <Col>
          <img src={infograficoPag1} alt="Infográfico" className="img-fluid" />
          <img src={infograficoPag2} alt="Infográfico" className="img-fluid" />
        </Col>
      </Row>
    </Container>
  );
}