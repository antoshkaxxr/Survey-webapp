import './ClearButton.css';

interface ClearButtonProps {
    handleClear: () => void;
}

export function ClearButton({handleClear}: ClearButtonProps) {
    return (
        <button onClick={handleClear} className={'clear-button'}>
            Очистить ответ
        </button>
    );
}
