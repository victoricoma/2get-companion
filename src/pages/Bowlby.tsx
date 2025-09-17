import { Col, Container, Row } from "react-bootstrap";
import infograficoPag1 from "/bowlby.png";
import Navegador from "./Navegador";
export default function Bowlby() {
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
                </Col>
            </Row>
        </Container>
    );
}