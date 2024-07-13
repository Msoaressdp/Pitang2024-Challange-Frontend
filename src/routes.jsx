import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Schedule from './pages/Schedule';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Schedule />} path='/Schedule' />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;