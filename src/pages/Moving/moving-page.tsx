import React from 'react';
import Draggable from 'react-draggable';
import './styles.css';

const Moving: React.FC = () => {
    return (
        <>
            <Draggable>
                <div className="move-box">
                    <p>Information 1</p>
                </div>
            </Draggable>
            <Draggable>
                <div className="move-box">
                    <p>Information 2</p>
                </div>
            </Draggable>
            <Draggable>
                <div className="move-box">
                    <p>Information 3</p>
                </div>
            </Draggable>
        </>
    );
}

export default Moving;