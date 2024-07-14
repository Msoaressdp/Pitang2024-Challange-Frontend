import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Schedule from './pages/Schedule';
import AppointmentList from './pages/AppointmentList';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/schedule" />} />
        <Route element={<Schedule />} path='/schedule' />
        <Route element={<AppointmentList />} path='/list' />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;