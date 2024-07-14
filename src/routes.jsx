import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Schedule from './pages/Schedule';
import AppointmentsList from './pages/AppointmentList';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/schedule" />} />
        <Route element={<Schedule />} path='/schedule' />
        <Route element={<AppointmentsList />} path='/list' />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;