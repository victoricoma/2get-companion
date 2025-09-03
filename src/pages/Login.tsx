import type { FormEvent } from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import Banner from "./Banner";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();


    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/profile", { replace: true });
        } catch (err: any) {
            setError(err.message);
        }
    };


    return (
        <div className="card">
            <Banner />
            <h1>Login</h1>
            <form onSubmit={onSubmit} className="form">
                <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
                {error && <div className="error">{error}</div>}
                <button type="submit">Entrar</button>
            </form>
            <p>Não tem conta? <Link to="/register">Registre-se</Link></p>
        </div>
    );
}