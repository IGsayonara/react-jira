import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '@/store/store';

import ModalWindow from '@/common/components/ModalWindow/ModalWindow';
import type { CreateCardProps } from '@/packages/Jira/components/CardCreation/CreateCard';
import CreateCard from '@/packages/Jira/components/CardCreation/CreateCard';

import type { IModalProps } from '@/common/features/modalSlice';
import { closeModal } from '@/common/features/modalSlice';

function ModalWrapper() {
  const modalContent = useSelector((state: RootState) => state.modal.modalContent);

  const modalFactory = () => {
    switch (modalContent?.component) {
      case 'jira/createCard': {
        const { columnId } = modalContent.props as IModalProps['jira/createCard'];
        return <CreateCard columnId={columnId} />;
      }
      case 'jira/editCard': {
        return <div onClick={console.log} />;
      }
      default: {
        return null;
      }
    }
  };

  const dispatch = useDispatch();
  return (
    <ModalWindow
      isOpen={!!modalContent}
      onClose={() => {
        dispatch(closeModal());
      }}
    >
      {modalFactory()}
    </ModalWindow>
  );
}

export default ModalWrapper;
