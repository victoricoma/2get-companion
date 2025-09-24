import type { FormEvent } from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import Banner from "./Banner";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Carrossel from "./Carrossel";
import SiteIcoma from "./SiteIcoma";


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
            await updateProfile(cred.user, { displayName: name });
            if (cred.user) {
                await setDoc(doc(db, "conversas", cred.user.uid), {
                    id: cred.user.uid,
                    lastLogin: new Date(),
                    photoURL: cred.user.photoURL,
                    name: cred.user.displayName,
                    updatedAt: new Date(),
                    email: cred.user.email,
                    messages: [],
                    threadId: null,
                    createdAt: new Date()
                });
                navigate("/upload", { replace: true });

            }
        } catch (err: any) {
            setError(err.message);
        }
    };


    return (
        <Container>
            <Row>
                <Alert variant="warning">
                    <Alert.Heading>Importante!</Alert.Heading>
                    <p>As informações fornecidas nesta aplicação são armazenadas em banco de dados e tratadas de acordo
                        com as políticas de segurança e privacidade estabelecidas pela Lei Geral de Proteção de Dados
                        (<a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/L13709.htm">LGPD Lei nº 13.709/2018</a>)
                    </p>
                </Alert>
            </Row>
            <Row>
                <Col lg={8}>
                    <SiteIcoma />
                </Col>
                <Col lg={4}>
                    <h1>Registro</h1>
                    <form onSubmit={onSubmit} className="form" >
                        <input type="text" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} required />
                        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Senha (mín. 6 caracteres)" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        {error && <div className="error">{error}</div>}
                        <button type="submit">Criar conta</button>
                    </form>
                    <p>Já tem conta? <Link to="/login">Entrar</Link></p>
                    <Banner />
                </Col>
            </Row>
            <Row>
                <Carrossel />
            </Row>
            <Row>
                <Col className="text-center mb-3">
                    <small>2Get Companion &copy; 2025</small>
                </Col>
            </Row>
        </Container>
    );
}