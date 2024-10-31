import React, { useState } from "react";
import './ThemeSelector.css';

interface Theme {
  name: string;
  url: string;
}

interface ThemeSelectorProps {
  backgroundImage: Theme | null;  // Изменено на null по умолчанию
  setBackgroundImage: React.Dispatch<React.SetStateAction<Theme | null>>;
}

const themes: Theme[] = [
  { name: 'Стандартная тема', url: 'url(/images/default.jpg)' },
  { name: 'Небоскребы', url: 'url(/images/theme1.jpg)' },
  { name: 'Водная гладь', url: 'url(/images/theme2.jpg)' },
];

export function ThemeSelector({ backgroundImage, setBackgroundImage }: ThemeSelectorProps) {
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [customTheme, setCustomTheme] = useState<Theme | null>(null);

  const handleOpenModal = () => {
    setIsThemeModalOpen(true);
  };

  const handleThemeChange = (theme: Theme) => {
    setSelectedTheme(theme);
  };

  const handleConfirmTheme = () => {
    if (selectedTheme) {
      setBackgroundImage(selectedTheme);
    } else if (customTheme) {
      setBackgroundImage(customTheme);
    }
    setIsThemeModalOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newTheme: Theme = { name: file.name, url: `url(${url})` };
      setCustomTheme(newTheme);
      setSelectedTheme(newTheme); // Автоматически выбираем пользовательскую тему
    }
  };

  return (
    <div className="theme-selector">
      {!backgroundImage ? (
        <button className="theme-button" onClick={handleOpenModal}>
          Добавить тему
        </button>
      ) : (
        // Если тема выбрана, отобразите кнопку "Изменить тему"
        <button className="theme-button" onClick={handleOpenModal}>
          Изменить тему
        </button>
      )}

      {isThemeModalOpen && (
        <div className="theme-modal">
          <div className="theme-modal-content">
            <h2>Выберите тему</h2>
            <div className="theme-options">
              {themes.map((theme) => (
                <div key={theme.name} className="theme-option">
                  <img src={theme.url.slice(4, -1)} alt={theme.name} />
                  <button
                    onClick={() => handleThemeChange(theme)}
                    className={selectedTheme?.name === theme.name ? 'active' : ''}
                  >
                    {theme.name}
                  </button>
                </div>
              ))}
            </div>
            <div className="custom-upload">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
              <p>Загрузить собственный файл</p>
            </div>
            <button className="cancel-button" onClick={() => setIsThemeModalOpen(false)}>
              Отмена
            </button>
            <button className="confirm-button" onClick={handleConfirmTheme} disabled={!selectedTheme && !customTheme}>
              Применить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
