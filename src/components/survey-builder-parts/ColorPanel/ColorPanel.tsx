import { useState} from 'react';
import './ColorPanel.css';

interface ColorProps {
    selectedColor: string;
    setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
}

export function ColorPanel({selectedColor, setSelectedColor}: ColorProps) {


    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedColor(e.target.value);
    };

    return (
        <div className="color-panel">
            <h2>Цвет фона</h2>
            <input
                type="color"
                value={selectedColor}
                onChange={handleColorChange}
            />
            
        </div>
        
    );
}


// import { useState} from 'react';



// export function ColorPanel() {
//     const themes = [
//         { name: 'Стандартная тема', theme: 'default', url: 'url(/images/default.jpg)' },
//         { name: 'Небоскребы', theme: 'theme1', url: 'url(/images/theme1.jpg)' },
//         { name: 'Водная гладь', theme: 'theme2', url: 'url(/images/theme2.jpg)' }
//     ];




//     return (
//         <div className="theme-selector">
//             {themes.map(theme => (
//                 <button
//                     key={theme.name}
                    
//                 >
//                     {theme.name}
//                 </button>
//             ))}
//         </div>
//     );
// }