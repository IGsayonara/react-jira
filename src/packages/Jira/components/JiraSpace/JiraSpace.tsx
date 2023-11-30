import { useState } from 'react';
import type { DropResult } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';

import ModalWindow from '@/common/components/ModalWindow/ModalWindow';
import CardCreation from '@/packages/Jira/components/CardCreation/CardCreation';
import JIraColumn from '@/packages/Jira/components/JiraColumn/JIraColumn';

import './JiraSpace.scss';
import type { ICard } from '@/packages/Jira/interfaces/jira.interface';
import { useJiraContext } from '@/packages/Jira/providers/JiraProvider';

function JiraSpace() {
  const { columns, setColumns, openedCard, setOpenedCard } = useJiraContext();

  const onModalClose = () => {
    setOpenedCard(null);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return; // Drop occurred outside of a valid droppable area
    }

    const updatedColumns = [...columns];
    const [movedCard] =
      updatedColumns.find((col) => col.title === result.source.droppableId)?.cards.splice(result.source.index, 1) || [];

    if (movedCard) {
      updatedColumns
        .find((col) => col.title === result.destination?.droppableId)
        ?.cards.splice(result.destination.index, 0, movedCard);
    }

    setColumns(updatedColumns);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="jira-space">
        {columns.map(({ title, cards }) => {
          return <JIraColumn title={title} key={title} cards={cards} />;
        })}
        <ModalWindow isOpen={!!openedCard} onClose={onModalClose}>
          <div>
            <CardCreation />
          </div>
        </ModalWindow>
      </div>
    </DragDropContext>
  );
}

export default JiraSpace;
