import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '@/pages/Login';
import AppLayout from './components/AppLayout';
import Dashboard from '@/pages/Dashboard';
import Inbox from './pages/Inbox';
import ViewMessage from './pages/ViewMessage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/inbox/:id" element={<ViewMessage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
