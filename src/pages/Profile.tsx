import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Banner from "./Banner";
import Card from 'react-bootstrap/Card';


export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();


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
        <Container fluid className="p-3">
            <Row>
                <Col>
                    <Banner />
                    <Card className="text-light" style={{width: '520px'}}>
                        <Card.Header>Ficha e Usuário</Card.Header>
                        <img src={user.photoURL || "https://via.placeholder.com/120"} alt="avatar" className="avatar" />
                        <div className="grid">
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
                        </div>
                        <div className="actions">
                            <button onClick={() => navigate("/upload")}>Trocar foto</button>
                            <button onClick={logout}>Sair</button>
                            <hr />
                            <button className="actions" style={{ backgroundColor: "#007bff", color: "black" }}>
                                <Link to="/chat" style={{ color: "inherit", textDecoration: "none" }}>Ir para o chat</Link>
                            </button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}