import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Schedule from './pages/Schedule';
import AppointmentList from './pages/AppointmentList';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/schedule" />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/list" element={<AppointmentList />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;