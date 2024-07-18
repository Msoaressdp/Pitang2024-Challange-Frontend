import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import SubmissionModal from '../components/ModalComponent';
import { useModal } from '../context/ModalContext';

jest.mock('../context/ModalContext', () => ({
  useModal: jest.fn(),
}));

describe('SubmissionModal', () => {
  it('should render the message and close automatically after 2 seconds', async () => {
    const closeModal = jest.fn();
    (useModal as jest.Mock).mockReturnValue({
      isOpen: true,
      closeModal,
      message: 'Mensagem de teste',
    });

    render(
      <ChakraProvider>
        <SubmissionModal />
      </ChakraProvider>
    );

    expect(screen.getByText('Mensagem de teste')).toBeInTheDocument();

    await waitFor(() => {
      expect(closeModal).toHaveBeenCalled();
    }, { timeout: 2000 });
  });

  it('should close the modal when the "Close" button is clicked', () => {
    const closeModal = jest.fn();
    (useModal as jest.Mock).mockReturnValue({
      isOpen: true,
      closeModal,
      message: 'Mensagem de teste',
    });

    render(
      <ChakraProvider>
        <SubmissionModal />
      </ChakraProvider>
    );

    screen.getByText('Fechar').click();

    expect(closeModal).toHaveBeenCalled();
  });
});