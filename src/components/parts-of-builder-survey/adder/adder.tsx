import { useState } from "react";
import "./custom-adder.css";

const questionTypes = ["Текстовой", "Multiple Choice", "Оценка", "Дата", "Да/Нет"];

function AdderNewQuestion() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addNewQuestion = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button
                onClick={addNewQuestion}
                className={'adder'}>
            </button>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Выберите тип вопроса</h2>
                        <ul>
                            {questionTypes.map((type, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => {
                                            console.log(`Добавлен вопрос типа: ${type}`);
                                            closeModal();
                                        }}>
                                        {type}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button onClick={closeModal}>Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdderNewQuestion;
