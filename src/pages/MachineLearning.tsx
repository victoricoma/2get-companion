import { Col, Container, Row } from "react-bootstrap";
import infograficoPag1 from "/machinelearning1.png";
import infograficoPag2 from "/machinelearning2.png";
export default function MachineLearning() {
    return (
        <Container>
            <Row>
                <Col>
                    <img src={infograficoPag1} alt="Infográfico" className="img-fluid" />
                    <img src={infograficoPag2} alt="Infográfico" className="img-fluid" />
                </Col>
            </Row>
        </Container>
    );
}