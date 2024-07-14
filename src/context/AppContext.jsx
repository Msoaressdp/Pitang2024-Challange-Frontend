import React from 'react';
import { ModalProvider } from './ModalContext';
import AppRoutes from '../routes';

const App = () => {
  return (
    <ModalProvider>
      <AppRoutes />
    </ModalProvider>
  );
};

export default App;