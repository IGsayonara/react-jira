import type { MouseEventHandler, RefObject } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FaEdit } from 'react-icons/fa';

import './JiraCard.scss';
import { useJiraContext } from '@/packages/Jira/providers/JiraProvider';

interface Props {
  index: number;
  title: string;
  id: string;
  description: string;
}

function JiraCard({ title, id, description, index }: Props) {
  const { setOpenedCard } = useJiraContext();
  const onEditButtonClick: MouseEventHandler = () => {
    setOpenedCard(id);
  };
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef as unknown as RefObject<HTMLDivElement>}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
            }}
          >
            <div className="jira-card">
              <div className="jira-card__header">
                <div className="jira-card__title">{title}</div>
                <div className="jira-card_edit_icon">
                  <FaEdit cursor="pointer" onClick={onEditButtonClick} />
                </div>
              </div>

              <div className="jira-card__description">{description}</div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default JiraCard;
