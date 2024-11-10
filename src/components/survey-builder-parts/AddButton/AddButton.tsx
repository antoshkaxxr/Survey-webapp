import React from "react";

interface AddButtonProps {
    index: number;
    setAddIndex: React.Dispatch<React.SetStateAction<number | null>>;
    setTypeModalOpen : React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddButton({index, setAddIndex, setTypeModalOpen}: AddButtonProps) {
    const handleMoveDown = (index: number) => {
        setAddIndex(index);
        setTypeModalOpen(true);
    };

    return (
        <button onClick={() => handleMoveDown(index)}>
            <img src="/icons/icon-add-question.svg" alt="Добавить новый вопрос перед этим"/>
        </button>
    );
}
