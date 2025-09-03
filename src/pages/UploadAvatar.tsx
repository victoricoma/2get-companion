import { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase/firebase";


export default function UploadAvatar() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [displayName, setDisplayName] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            if (!u) return;
            setDisplayName(u.displayName || "");
        });
        return () => unsub();
    }, []);


    const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] || null;
        setFile(f);
        setPreview(f ? URL.createObjectURL(f) : null);
    };


    const onUpload = async () => {
        if (!file || !auth.currentUser) return;
        setUploading(true);
        try {
            const uid = auth.currentUser.uid;
            const ext = file.name.split(".").pop() || "jpg";
            const path = `avatars/${uid}.${ext}`;
            const storageRef = ref(storage, path);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            await updateProfile(auth.currentUser, { photoURL: url });
            navigate("/profile", { replace: true });
        } catch (e) {
            console.error(e);
            alert("Falha ao enviar a foto. Tente novamente.");
        } finally {
            setUploading(false);
        }
    };


    return (
        <div className="card">
            <h1>Upload de Foto</h1>
            <p>Olá {displayName || "usuário"}, envie sua foto de perfil.</p>
            <input type="file" accept="image/*" onChange={onFile} />
            {preview && <img src={preview} alt="preview" className="avatar" />}
            <button disabled={!file || uploading} onClick={onUpload}>
                {uploading ? "Enviando..." : "Salvar foto"}
            </button>
        </div>
    );
}