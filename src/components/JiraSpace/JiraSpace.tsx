import { useState } from 'react';
import type { DropResult } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';

import JIraColumn from '@/components/JiraColumn/JIraColumn';

import './JiraSpace.scss';

function JiraSpace() {
  const [columns, setColumns] = useState([
    {
      title: 'Column 1',
      cards: [
        { id: '1', title: 'Card 1', description: 'Jira card text ahahah', columnId: 'Column 1' },
        { id: '2', title: 'Card 2', description: 'Jira card text ahahah', columnId: 'Column 1' },
      ],
    },
    { title: 'Column 2', cards: [] },
    { title: 'Column 3', cards: [] },
  ]);

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
      </div>
    </DragDropContext>
  );
}

export default JiraSpace;
