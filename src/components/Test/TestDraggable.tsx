import { useState } from 'react';
import type { DropResult } from 'react-beautiful-dnd';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function TestDraggable() {
  const [cards, setCards] = useState([{ id: '1' }, { id: '2' }]);
  const onDragEnd = (result: DropResult) => {
    console.log('Drag result:', result);

    if (!result.destination) {
      return;
    }

    const updatedCards = Array.from(cards);
    const [movedCard] = updatedCards.splice(result.source.index, 1);
    updatedCards.splice(result.destination.index, 0, movedCard);

    setCards(updatedCards);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" key={1}>
        {(provided) => (
          <div className="card-list" ref={provided.innerRef} {...provided.droppableProps}>
            {cards.map((card, index) => (
              <Draggable draggableId={card.id} index={index} key={card.id}>
                {(provided2) => (
                  <div
                    className="task"
                    ref={provided2.innerRef}
                    {...provided2.draggableProps}
                    {...provided2.dragHandleProps}
                    style={{
                      ...provided2.draggableProps.style,
                      border: '1px solid lightgray',
                      padding: '8px',
                      margin: '8px',
                      backgroundColor: 'white',
                    }}
                  >
                    {card.id}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TestDraggable;
