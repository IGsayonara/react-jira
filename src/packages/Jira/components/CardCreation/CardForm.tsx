import type { FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

interface Props {
  title?: string;
  description?: string;
  columnId?: string;
  onSave: (payload: any) => void;
}

function CardForm({ title = '', description = '', columnId, onSave }: Props) {
  const [titleValue, setTitle] = useState(title);
  const [descriptionValue, setDescription] = useState(description);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onTitleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onDescriptionInputChange = (e: FormEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  };

  const onSaveButtonClick = () => {
    onSave({ title: titleValue, description: descriptionValue });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={titleValue}
          placeholder="Write your title"
          onChange={onTitleInputChange}
          ref={inputRef}
        />
      </div>
      <div>
        <input
          type="text"
          value={descriptionValue}
          placeholder="Write your description"
          onChange={onDescriptionInputChange}
        />
      </div>
      <div>
        <button type="submit" onClick={onSaveButtonClick}>
          Save
        </button>
      </div>
    </div>
  );
}

CardForm.defaultProps = {
  title: '',
  description: '',
};

export default CardForm;
