import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UploadAvatar from "./pages/UploadAvatar";
import Profile from "./pages/Profile";
import Chat from './pages/Chat';
import AuthGuard from "./components/AuthGuard";


export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
    );
}