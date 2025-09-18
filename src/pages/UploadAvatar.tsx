import { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase/firebase";
import Banner from "./Banner";
import { Alert, Col, Container, Row } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";



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
      await updateDoc(doc(db, "conversas", auth.currentUser.uid), {
        photoURL: url,
        updatedAt: new Date()
      });
      navigate("/profile", { replace: true });
    } catch (e) {
      console.error(e);
      alert("Falha ao enviar a foto. Tente novamente.");
    } finally {
      setUploading(false);
    }
  };


  return (
    <Container>
      <Row style={{ padding: "20px" }}>
        <Alert variant="light">
          <Alert.Heading>Importante!</Alert.Heading>
          <p>É de extrema importancia o upload de foto, nosso sistema de IA
            utiliza YOLO v8 para alguns diagnósticos etinicos e a foto ajuda
            a melhorar a precisão dos resultados. (A foto deve ser de seu rosto e servirá como
            base cientifica somente para o sistema de IA, não será compartilhada com ninguem)
          </p>
        </Alert>
      </Row>
      <Row className="justify-content-center">
        <Col>
          <img src="/exemplo.png" alt="Exemplo de Foto" width={300} height={300} />
        </Col>
        <Col>
          <p>
            Este é um bom exemplo de foto que o mediador pode utilizar em seu processo de aprendizagem. Por favor,
            use esta referência como guia ao enviar a sua foto de perfil e nos ajude a fortalecer o trabalho do mediador.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Banner />
          {preview && <img src={preview} alt="preview" className="avatar" />}
        </Col>
        <Col>
          <h1>Upload de Foto</h1>
          <p>Olá {displayName || "usuário"}, envie sua foto de perfil.</p>
          <input type="file" accept="image/*" onChange={onFile} />
          <button disabled={!file || uploading} onClick={onUpload}>
            {uploading ? "Enviando..." : "Salvar foto"}
          </button>
        </Col>
      </Row>
      <Row>
        <Carousel data-bs-theme="dark" style={{ padding: "20px" }}>
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