import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import Banner from "./Banner";


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
        <div className="card" style={{width: "80%", maxWidth: 1090, margin: "auto",  }}>
            <Banner />
            <h1>Ficha e Usuário</h1>
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
                <button className="actions" style={{ backgroundColor:"#007bff", color: "black" }}>
                    <Link to="/chat" style={{ color: "inherit", textDecoration: "none" }}>Ir para o chat</Link>
                </button>
                
            </div>
        </div>
    );
}