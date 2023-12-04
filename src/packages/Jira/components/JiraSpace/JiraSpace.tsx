import type { DropResult } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';

import cloneDeep from 'lodash/cloneDeep';

import ModalWindow from '@/common/components/ModalWindow/ModalWindow';
import CardForm from '@/packages/Jira/components/CardCreation/CardForm';
import CreateCard from '@/packages/Jira/components/CardCreation/CreateCard';
import JIraColumn from '@/packages/Jira/components/JiraColumn/JIraColumn';

import './JiraSpace.scss';
import { setColumns } from '@/packages/Jira/features/jiraSlice';
import { useJiraContext } from '@/packages/Jira/providers/JiraProvider';

function JiraSpace() {
  const { columns } = useJiraContext();
  const dispatch = useDispatch();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return; // Drop occurred outside of a valid droppable area
    }

    const updatedColumns = cloneDeep(columns);
    const [movedCard] =
      updatedColumns.find((col) => col.title === result.source.droppableId)?.cards.splice(result.source.index, 1) || [];

    if (movedCard) {
      updatedColumns
        .find((col) => col.title === result.destination?.droppableId)
        ?.cards.splice(result.destination.index, 0, movedCard);
    }

    dispatch(setColumns(updatedColumns));
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
