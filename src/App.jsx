import React from 'react';
import { ModalProvider } from './context/ModalContext';
import Schedule from './pages/Schedule';

const App = () => {
  return (
    <ModalProvider>
      <Schedule />
    </ModalProvider>
  );
};

export default App;