import React from "react";
import './theme-selector-styles.css';

interface ThemeSelectorProps {
    backgroundImage: Theme;
    setBackgroundImage: React.Dispatch<React.SetStateAction<Theme>>;
}

export function ThemeSelector({backgroundImage, setBackgroundImage}: ThemeSelectorProps) {
    const themes = [
        { name: 'Стандартная тема', theme: 'default', url: 'url(/images/default.jpg)' },
        { name: 'Небоскребы', theme: 'theme1', url: 'url(/images/theme1.jpg)' },
        { name: 'Водная гладь', theme: 'theme2', url: 'url(/images/theme2.jpg)' }
    ];

    const handleSelectTheme = (theme: Theme) => {
        setBackgroundImage(theme);
    };

    return (
        <div className="theme-selector">
            {themes.map(theme => (
                <button
                    key={theme.name}
                    onClick={() => handleSelectTheme(theme)}
                    className={backgroundImage.name === theme.name ? 'active' : ''}
                >
                    {theme.name}
                </button>
            ))}
        </div>
    );
}
