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
        if (!result.destination) return;

        const reorderedBoxes = Array.from(boxes);
        const [removed] = reorderedBoxes.splice(result.source.index, 1);
        reorderedBoxes.splice(result.destination.index, 0, removed);
        setBoxes(reorderedBoxes);
    };

    const handleInputChange = (index: number, value: string) => {
        const updatedBoxes = [...boxes];
        updatedBoxes[index].content = value;
        setBoxes(updatedBoxes);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div className="dropzone" {...provided.droppableProps} ref={provided.innerRef}>
                        {boxes.map((box, index) => (
                            <Draggable key={box.id} draggableId={box.id} index={index}>
                                {(provided) => (
                                    <div className="move-box" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <input 
                                            type="text" 
                                            value={box.content} 
                                            onChange={(e) => handleInputChange(index, e.target.value)} 
                                        />
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
};

export default Moving;
