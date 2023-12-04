import { useDispatch } from 'react-redux';

import CardForm from '@/packages/Jira/components/CardCreation/CardForm';

import { addCard } from '@/packages/Jira/features/jiraSlice';
import type { CreateCardPayload } from '@/packages/Jira/interfaces/jira.interface';

interface Props {
  columnId: string;
}

export type CreateCardProps = Props;
function CreateCard({ columnId }: Props) {
  const dispatch = useDispatch();

  const onFormSave = (payload: Omit<CreateCardPayload, 'columnId'>) => {
    dispatch(addCard({ columnId, ...payload }));
  };

  return <CardForm onSave={onFormSave} />;
}

export default CreateCard;
