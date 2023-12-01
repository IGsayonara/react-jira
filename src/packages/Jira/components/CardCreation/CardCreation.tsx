import type { FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { decrement, increment } from '@/packages/Jira/features/counterSlice';
import { useJiraContext } from '@/packages/Jira/providers/JiraProvider';

function CardCreation() {
  const { openedCard } = useJiraContext();
  const [title, setTitle] = useState(openedCard?.title || '');
  const [description, setDescription] = useState(openedCard?.description || '');
  const inputRef = useRef<HTMLInputElement>(null);

  const count = useSelector((state: any) => state.counter.count);
  const dispatch = useDispatch();

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
    dispatch(increment());
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
          Save {count}
        </button>
      </div>
    </div>
  );
}

export default CardCreation;
