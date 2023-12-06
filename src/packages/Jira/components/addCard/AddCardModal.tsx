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
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import CardForm from '@/packages/Jira/components/CardForm/CardForm';

import { addCard } from '@/packages/Jira/features/jiraSlice';

interface Props {
  columnId: string;
  renderButton: (onClick: () => void) => ReactNode;
}

function AddCardModal({ columnId, renderButton }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    columnId,
  });

  const onFormChange = (data: { title: string; description: string; columnId: string }) => {
    setFormData(data);
  };

  const openModal = () => {
    onOpen();
  };

  const onCardAdd = () => {
    dispatch(addCard(formData));
    onClose();
  };

  return (
    <>
      {renderButton(openModal)}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CardForm onChange={onFormChange} columnId={formData.columnId} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={onCardAdd} variant="ghost">
              Add card
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddCardModal;
