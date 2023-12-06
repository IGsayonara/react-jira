import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import type { ReactNode } from 'react';
import { useEffect } from 'react';

// import './ModalWindow.scss';

interface props {
  children: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
  title: string;
  isOpen: boolean;
}

function ModalWindow({ isOpen, onClose, children, footer, title }: props) {
  const { isOpen: isUiModalOpen, onOpen: onUiModalOpen, onClose: onUiModalClose } = useDisclosure();

  const onModalClose = () => {
    // onUiModalClose();
    onClose?.();
  };

  useEffect(() => {
    onUiModalOpen();
    return () => {
      onUiModalClose();
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }
  return (
    <Modal isOpen={isUiModalOpen} onClose={onModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
}

export default ModalWindow;
