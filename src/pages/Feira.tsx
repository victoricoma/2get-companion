import { Col, Container, Row } from "react-bootstrap";
import infograficoPag1 from "/feira1.png";
import infograficoPag2 from "/feira2.png";
import SiteIcoma2 from "./SiteIcoma2";
import Carrossel from "./Carrossel";
export default function Feira() {
    return (
        <Container>
            <Row>
                <Carrossel />
            </Row>
            <Row>
                <Row>
                    <Col lg={4}>
                    <SiteIcoma2 />
                    </Col>
                    <Col>
                        <img src={infograficoPag1} alt="Infográfico" className="img-fluid" />
                        <img src={infograficoPag2} alt="Infográfico" className="img-fluid" />
                    </Col>
                </Row>
            </Row>
        </Container>
    );
}