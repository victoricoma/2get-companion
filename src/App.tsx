import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UploadAvatar from "./pages/UploadAvatar";
import Profile from "./pages/Profile";
import Chat from './pages/Chat';
import AuthGuard from "./components/AuthGuard";
import Repositorio from "./pages/Repositorio";
import MachineLearning from "./pages/MachineLearning";
import PorcoEspinho from "./pages/PorcoEspinho";
import Bowlby from "./pages/Bowlby";
import Navegador from "./pages/Navegador";
import Turma from "./pages/Turma";


export default function App() {
    return (
        <>
        <Navegador />
            <Routes>

                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/repositorio" element={<Repositorio />} />
                <Route path="/machinelearning" element={<MachineLearning />} />
                <Route path="/porcoespinho" element={<PorcoEspinho />} />
                <Route path="/bowlby" element={<Bowlby />} />
                <Route path="/turma" element={<Turma />} />
                <Route
                    path="/upload"
                    element={
                        <AuthGuard>
                            <UploadAvatar />
                        </AuthGuard>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <AuthGuard>
                            <Profile />
                        </AuthGuard>
                    }
                />
                <Route
                    path="/chat"
                    element={
                        <AuthGuard>
                            <Chat />
                        </AuthGuard>
                    }
                />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </>
    );
}