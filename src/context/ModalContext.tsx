import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ModalContextProps } from '../interfaces/index';

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const showModal = (msg: string) => {
    setMessage(msg);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setMessage('');
  };

  return (
    <ModalContext.Provider value={{ isOpen, message, showModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};