import { Card, CardBody, CardHeader, Text } from '@chakra-ui/react';

import type { MouseEventHandler, RefObject } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FaEdit } from 'react-icons/fa';

interface Props {
  index: number;
  title: string;
  id: string;
  description: string;
  onEdit?: () => void;
}

function JiraCard({ title, id, description, index, onEdit }: Props) {
  const onEditButtonClick: MouseEventHandler = () => {
    onEdit?.();
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
            <Card>
              <CardHeader>{title}</CardHeader>
              <CardBody>
                <Text>{description}</Text>
              </CardBody>
            </Card>
          </div>
        );
      }}
    </Draggable>
  );
}

export default JiraCard;
