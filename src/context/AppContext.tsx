import React from 'react';
import { ModalProvider } from './ModalContext';
import AppRoutes from '../routes';

const AppContext: React.FC = () => {
  return (
    <ModalProvider>
      <AppRoutes />
    </ModalProvider>
  );
};

export default AppContext;