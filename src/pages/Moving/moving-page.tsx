import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import './styles.css';

interface MoveBox {
    id: string;
    content: string;
}

const initialBoxes: MoveBox[] = [
    { id: '1', content: 'Information 1' },
    { id: '2', content: 'Information 2' },
    { id: '3', content: 'Information 3' },
];

const Moving: React.FC = () => {
    const [boxes, setBoxes] = useState<MoveBox[]>(initialBoxes);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        const reorderedBoxes = Array.from(boxes);
        const [removed] = reorderedBoxes.splice(result.source.index, 1);
        reorderedBoxes.splice(result.destination.index, 0, removed);
        
        setBoxes(reorderedBoxes);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div
                        className="dropzone"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {boxes.map((box, index) => (
                            <Draggable key={box.id} draggableId={box.id} index={index}>
                                {(provided) => (
                                    <div
                                        className="move-box"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <p>{box.content}</p>
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

export default Moving;
