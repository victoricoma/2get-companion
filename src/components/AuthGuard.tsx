import {useEffect, useState } from "react";
import type { ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from ".././firebase/firebase";


export default function AuthGuard({ children }: { children: ReactNode }) {
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);
const navigate = useNavigate();


useEffect(() => {
const unsub = onAuthStateChanged(auth, (u) => {
setUser(u);
setLoading(false);
if (!u) navigate("/login", { replace: true });
});
return () => unsub();
}, [navigate]);


if (loading) return <div className="center">Carregando...</div>;
if (!user) return null;
return <>{children}</>;
}