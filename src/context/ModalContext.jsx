import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const showModal = (msg) => {
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