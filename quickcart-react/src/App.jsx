import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Checkout from './pages/Checkout.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
