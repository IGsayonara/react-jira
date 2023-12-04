import type React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { FaPlus } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import JiraCard from '@/packages/Jira/components/JiraCard/JiraCard';

import './JiraColumn.scss';
import { openModal } from '@/common/features/modalSlice';
import type { ICard } from '@/packages/Jira/interfaces/jira.interface';

interface props {
  title: string;
  cards: ICard[];
}
function JiraColumn({ cards, title }: props) {
  const dispatch = useDispatch();
  const onPlusIconClick = () => {
    dispatch(openModal({ component: 'jira/createCard', props: { columnId: title } }));
  };

  return (
    <div className="jira-column">
      <div className="jira-column__headline">
        <div className="jira-column__title">{title}</div>
        <div className="jira-column__add_card">
          <FaPlus cursor="pointer" onClick={onPlusIconClick} />
        </div>
      </div>
      <div className="jira-column__cards">
        <Droppable key={title} droppableId={title}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef as unknown as React.RefObject<HTMLDivElement>}>
              {cards.map((card, index) => {
                return (
                  <JiraCard
                    key={card.id}
                    title={card.title}
                    description={card.description}
                    index={index}
                    id={card.id}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}

export default JiraColumn;
