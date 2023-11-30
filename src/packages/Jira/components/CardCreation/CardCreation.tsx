import type { FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

import { useJiraContext } from '@/packages/Jira/providers/JiraProvider';

function CardCreation() {
  const { openedCard } = useJiraContext();
  const [title, setTitle] = useState(openedCard?.title || '');
  const [description, setDescription] = useState(openedCard?.description || '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

  const onTitleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onDescriptionInputChange = (e: FormEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  };

  const onSaveButtonClick = () => {
    console.log(title, description);
  };

  return (
    <div>
      <div>
        <input type="text" value={title} placeholder="Write your title" onChange={onTitleInputChange} ref={inputRef} />
      </div>
      <div>
        <input
          type="text"
          value={description}
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

export default CardCreation;
