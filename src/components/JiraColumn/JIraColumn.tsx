import type React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { FaPlus } from 'react-icons/fa';

import JiraCard from '@/components/JiraCard/JiraCard';

import './JiraColumn.scss';

interface props {
  title: string;
  cards: any[];
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
                  <Draggable key={card.id} draggableId={card.id} index={index}>
                    {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
                    {(provided) => {
                      return (
                        <div
                          ref={provided.innerRef as unknown as React.RefObject<HTMLDivElement>}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                          }}
                        >
                          <JiraCard title={card.title} description={card.description} />
                        </div>
                      );
                    }}
                  </Draggable>
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
