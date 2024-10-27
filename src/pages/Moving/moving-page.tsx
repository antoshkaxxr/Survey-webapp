import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DragStart } from 'react-beautiful-dnd';
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
    const [isCardDragDisabled, setIsCardDragDisabled] = useState(false);
    const [isListDragDisabled, setIsListDragDisabled] = useState(false);

    const handleOnDragStart = (start: DragStart) => {
        const { type } = start;
        if (type === "card") {
            setIsListDragDisabled(true);
        }
        if (type === "list") {
            setIsCardDragDisabled(true);
        }
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        setIsCardDragDisabled(false);
        setIsListDragDisabled(false);

        const reorderedBoxes = Array.from(boxes);
        const [removed] = reorderedBoxes.splice(result.source.index, 1);
        reorderedBoxes.splice(result.destination.index, 0, removed);
        setBoxes(reorderedBoxes);
    };

    return (
        <DragDropContext onDragStart={handleOnDragStart} onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div
                        className="dropzone"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {boxes.map((box, index) => (
                            <Draggable key={box.id} draggableId={box.id} index={index} isDragDisabled={isCardDragDisabled}>
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

