import { Box, Flex } from '@chakra-ui/react';

import type { DropResult } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';

import cloneDeep from 'lodash/cloneDeep';

import JIraColumn from '@/packages/Jira/components/JiraColumn/JIraColumn';

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
      <Flex h="90vh" gap={6}>
        {columns.map(({ title, cards }) => {
          return (
            <Box w="100%" key={title}>
              <JIraColumn title={title} cards={cards} />
            </Box>
          );
        })}
      </Flex>
    </DragDropContext>
  );
}

export default JiraSpace;
