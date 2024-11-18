import React from 'react';
import './ColorPanel.css';

interface ColorProps {
    name: string;
    selectedColor: string;
    setSelectedColor: (s: string) => void;
}

export function ColorPanel({ selectedColor, setSelectedColor, name }: ColorProps) {
    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedColor(e.target.value);
    };

    return (
        <div className="color-panel">
            <span className="name-selector">{name}</span>
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
