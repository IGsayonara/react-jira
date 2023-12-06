import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react';

import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '@/store/store';

interface Props {
  onChange: (formData: { title: string; description: string; columnId: string }) => void;
  title?: string;
  description?: string;
  columnId?: string;
}

function CardForm({
  title: defaultTitle = '',
  description: defaultDescription = '',
  columnId: defaultColumnId = '',
  onChange,
}: Props) {
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);
  const [columnId, setColumnId] = useState(defaultColumnId);

  const columns = useSelector((state: RootState) => {
    return state.jira.columns;
  });

  const columnTitles = columns.map((col) => col.title);

  const onFormChange = () => {
    onChange({
      title,
      description,
      columnId,
    });
  };

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    onFormChange();
  };
  const onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
    onFormChange();
  };
  const onStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setColumnId(e.currentTarget.value);
    onFormChange();
  };

  return (
    <FormControl>
      <FormLabel>Title</FormLabel>
      <Input mb="5" onChange={onTitleChange} value={title} type="text" />
      <FormLabel>Description</FormLabel>
      <Input mb="5" onChange={onDescriptionChange} value={description} type="text" />
      <FormLabel>Status</FormLabel>
      <Select mb="5" onChange={onStatusChange} value={columnId}>
        {columnTitles.map((colTitle) => (
          <option key={colTitle} value={colTitle}>
            {colTitle}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

CardForm.defaultProps = {
  title: '',
  description: '',
  columnId: '',
};

export default CardForm;
