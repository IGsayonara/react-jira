import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '@/store/store';

import ModalWindow from '@/common/components/ModalWindow/ModalWindow';
import CreateCard from '@/packages/Jira/components/CardCreation/CreateCard';
import EditCard from '@/packages/Jira/components/CardCreation/EditCard';

import type { IModalProps } from '@/common/features/modalSlice';
import { closeModal } from '@/common/features/modalSlice';

function ModalWrapper() {
  const modalContent = useSelector((state: RootState) => state.modal.modalContent);
  const modalFactory = () => {
    switch (modalContent?.component) {
      case 'jira/createCard': {
        const { props } = modalContent as unknown as IModalProps['jira/createCard'];
        if (!props) {
          return null;
        }
        return <CreateCard columnId={props.columnId} />;
      }
      case 'jira/editCard': {
        const { props } = modalContent as unknown as IModalProps['jira/editCard'];
        if (!props) {
          return null;
        }
        return <EditCard id={props.id} title={props.title} description={props.description} columnId={props.columnId} />;
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
