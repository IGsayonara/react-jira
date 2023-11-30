import type React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { FaPlus } from 'react-icons/fa';

import JiraCard from '@/packages/Jira/components/JiraCard/JiraCard';

import './JiraColumn.scss';
import type { ICard } from '@/packages/Jira/interfaces/jira.interface';

interface props {
  title: string;
  cards: ICard[];
}
function JiraColumn({ cards, title }: props) {
  return (
    <div className="jira-column">
      <div className="jira-column__headline">
        <div className="jira-column__title">{title}</div>
        <div className="jira-column__add_card">
          <FaPlus cursor="pointer" />
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
