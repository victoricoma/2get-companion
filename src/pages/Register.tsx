import type { FormEvent } from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import Banner from "./Banner";
import { Alert, Col, Container, Row } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';


export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();


    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            if (cred.user) {
                await updateProfile(cred.user, { displayName: name });
                navigate("/upload", { replace: true });
            }
        } catch (err: any) {
            setError(err.message);
        }
    };


    return (
        <Container>
            <Row>
                <Col>
                    <Banner />
                </Col>
                <Col>
                    <h1>Registro</h1>
                    <form onSubmit={onSubmit} className="form" >
                        <input type="text" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} required />
                        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Senha (mín. 6 caracteres)" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        {error && <div className="error">{error}</div>}
                        <button type="submit">Criar conta</button>
                    </form>
                    <p>Já tem conta? <Link to="/login">Entrar</Link></p>
                </Col>

            </Row>
                  <Row>
        <Alert variant="warning">
          <Alert.Heading>Importante!</Alert.Heading>
          <p>As informações fornecidas nesta aplicação são armazenadas em banco de dados e tratadas de acordo com as políticas de segurança e privacidade estabelecidas pela Lei Geral de Proteção de Dados (<a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/L13709.htm">LGPD Lei nº 13.709/2018</a>)
          </p>
        </Alert>
      </Row>
            <Row>
                <Carousel data-bs-theme="dark">
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/anunciofeira.png"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/anuncioana.png"
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/anuncioicoma.png"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                                        <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/anunciolk.png"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </Row>
            <Row>
                <Col className="text-center mb-3">
                    <small>2Get Companion &copy; 2025</small>
                </Col>
            </Row>
        </Container>
    );
}