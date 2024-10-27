import React from 'react';
import './ColorPanel.css';

interface ColorProps {
    selectedColor: string;
    setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
}

export function ColorPanel({ selectedColor, setSelectedColor }: ColorProps) {

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedColor(e.target.value);
    };

    return (
        <div className="color-panel">
            <input
                type="color"
                value={selectedColor}
                onChange={handleColorChange}
                className="color-input"
            />
            <span className="color-hex">{selectedColor}</span>
        </div>
    );
}
