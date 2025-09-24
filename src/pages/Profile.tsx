import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Banner from "./Banner";
import Card from 'react-bootstrap/Card';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Carrossel from "./Carrossel";
import { Alert, Button } from "react-bootstrap";
import SiteIcoma2 from "./SiteIcoma2";


export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            updateDoc(doc(db, "conversas", user.uid), {
                lastLogin: new Date(),
            });

        }
    }, [user]);


    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => setUser(u));

        return () => unsub();
    }, []);


    const logout = async () => {
        await signOut(auth);
        navigate("/login", { replace: true });
    };


    if (!user) return <div className="center">Carregando...</div>;


    return (
        <Container>
            <Row>
                <Col lg={4}><SiteIcoma2 /></Col>
                <Col>
                    <Row className="p-4">
                        <Col>
                            <Card style={{ width: '24rem' }}>
                                <Card.Img variant="top" src={user.photoURL || "https://via.placeholder.com/120"} />
                                <Card.Body>
                                    <div className="p-4">
                                    <Button variant="danger" className="me-4" onClick={logout}>
                                        Sair da Conta
                                    </Button>
                                    <Button variant="info" className="me-4" onClick={() => navigate("/upload")}>
                                        Alterar Foto
                                    </Button>
                                    </div>
                                    <Card.Text>
                                        <div>
                                            <strong>Nome</strong>
                                            <div>{user.displayName || "—"}</div>
                                        </div>
                                        <div>
                                            <strong>E-mail</strong>
                                            <div>{user.email}</div>
                                        </div>
                                        <div>
                                            <strong>UID</strong>
                                            <div>{user.uid}</div>
                                        </div>
                                    </Card.Text>
                                    <div className="d-grid gap-2 p-4">
                                        <Button variant="primary" className="me-4" onClick={() => navigate("/chat")}>
                                            Chat
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Banner />
                            <Alert variant="warning">
                                <Alert.Heading>⚠️ Aviso Importante sobre Saúde Mental</Alert.Heading>
                                <blockquote>
                                    O <strong>2get Family Companion</strong> é um mediador para atividades de entretenimento familiar, não um terapeuta.
                                    Em casos de problemas emocionais graves, relações tóxicas ou abusivas, procure sempre um profissional de saúde mental qualificado.
                                </blockquote>
                                <ul>
                                    <li>👉 Nunca descuide da sua saúde mental.</li>
                                    <li>👉 Se precisar, busque apoio de psicólogos, psiquiatras ou serviços especializados.</li>
                                </ul>
                                A sua saúde e bem-estar vêm em primeiro lugar.
                            </Alert>
                        </Col>
                    </Row>
                    <Row>
                        <Carrossel />
                    </Row>
                </Col>

            </Row>
        </Container>
    );
}