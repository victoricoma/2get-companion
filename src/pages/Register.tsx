import type { FormEvent } from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase/firebase";


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
<div className="card">
<h1>Registro</h1>
<form onSubmit={onSubmit} className="form">
<input type="text" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} required />
<input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
<input type="password" placeholder="Senha (mín. 6 caracteres)" value={password} onChange={(e) => setPassword(e.target.value)} required />
{error && <div className="error">{error}</div>}
<button type="submit">Criar conta</button>
</form>
<p>Já tem conta? <Link to="/login">Entrar</Link></p>
</div>
);
}