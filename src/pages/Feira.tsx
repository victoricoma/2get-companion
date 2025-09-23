import { Col, Container, Row } from "react-bootstrap";
import infograficoPag1 from "/feira1.png";
import infograficoPag2 from "/feira2.png";
export default function Feira() {
    return (
        <Container>
            <Row>
                <Col>
                    <img src={infograficoPag1} alt="Infográfico1" className="img-fluid" />
                    <img src={infograficoPag2} alt="Infográfico2" className="img-fluid" />
                </Col>
            </Row>
        </Container>
    );
}