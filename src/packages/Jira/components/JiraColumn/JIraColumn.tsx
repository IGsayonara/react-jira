import { Box, Button, Card, CardBody, CardHeader, Flex, Spacer } from '@chakra-ui/react';

import type React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import JiraCard from '@/packages/Jira/components/JiraCard/JiraCard';
import AddCardModal from '@/packages/Jira/components/addCard/AddCardModal';

import type { ICard } from '@/packages/Jira/interfaces/jira.interface';

interface props {
  title: string;
  cards: ICard[];
}
function JiraColumn({ cards, title }: props) {
  return (
    <Card h="100%">
      <CardHeader>{title}</CardHeader>
      <CardBody>
        <Flex h="100%" direction="column" justifyContent="space-between">
          <Droppable key={title} droppableId={title}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef as unknown as React.RefObject<HTMLDivElement>}>
                {cards.map((card, index) => {
                  return (
                    <Box my="10" key={card.id}>
                      <JiraCard title={card.title} description={card.description} index={index} id={card.id} />
                    </Box>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Spacer />
          <AddCardModal columnId={title} renderButton={(onClick) => <Button onClick={onClick}>Open modal</Button>} />
        </Flex>
      </CardBody>
    </Card>
  );
}

export default JiraColumn;
