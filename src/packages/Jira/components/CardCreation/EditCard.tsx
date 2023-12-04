import { useDispatch } from 'react-redux';

import CardForm from '@/packages/Jira/components/CardCreation/CardForm';

import { editCard } from '@/packages/Jira/features/jiraSlice';
import type { ICard } from '@/packages/Jira/interfaces/jira.interface';

interface Props {
  id: string;
  title: string;
  description: string;
  columnId: string;
}

export type EditCardProps = Props;
function CreateCard({ id, title, description, columnId }: Props) {
  const dispatch = useDispatch();

  const onFormSave = (payload: ICard) => {
    dispatch(editCard({ ...payload, id }));
  };

  return <CardForm onSave={onFormSave} title={title} description={description} columnId={columnId} />;
}

export default CreateCard;
