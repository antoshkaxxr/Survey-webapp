import React, { useState } from "react";
import './ThemeSelector.css';
import { IP_ADDRESS } from "../../../config";

interface Theme {
  name: string;
  url: string;
}

interface ThemeSelectorProps {
  backgroundImage: Theme | null;
  setBackgroundImage: React.Dispatch<React.SetStateAction<Theme | null>>;
}

const themes: Theme[] = [
  { name: 'Стандартная тема', url: 'url(/images/default.jpg)' },
  { name: 'Небоскребы', url: 'url(/images/theme1.jpg)' },
  { name: 'Водная гладь', url: 'url(/images/theme2.jpg)' },
];

export function ThemeSelector({ backgroundImage, setBackgroundImage }: ThemeSelectorProps) {
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [haveImage, sethaveImage] = useState(false);
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
    sethaveImage(true);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) { // Проверка на картинку
      const url = URL.createObjectURL(file);
      const newTheme: Theme = { name: file.name, url: `url(${url})` };
      setCustomTheme(newTheme);
      setSelectedTheme(newTheme);

      // Отправка изображения в формате Base64
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          const base64Data = e.target.result;
          sendImageToBackend(base64Data);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const sendImageToBackend = async (base64Data: string) => {
    try {
      const response = await fetch(`http://${IP_ADDRESS}:8080/bucket`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Data }),
      });

      if (!response.ok) {
        console.error('Ошибка при отправке изображения:', response.status);
      }
    } catch (error) {
      console.error('Ошибка при отправке изображения:', error);
    }
  };

  const handleRemoveTheme = () => {
    setBackgroundImage(null); // Сброс выбранной темы
    setSelectedTheme(null);
    setCustomTheme(null); // Сброс выбранной темы
    setIsThemeModalOpen(false);
    sethaveImage(false);
  };




  return (
    <div className="theme-selector">
      {backgroundImage ? (
        <>
          <button
            className="theme-button"
            onClick={handleOpenModal}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <img
              src="/icons/design-nib.svg"
              alt="Изменить картинку"
              style={{ width: '200px', filter: 'invert(1)', transition: 'transform 0.3s, filter 0.3s' }}
              className="image-icon"
            />
          </button>

        </>
      ) : (
        <button
          className="theme-button"
          onClick={handleOpenModal}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <img
            src="/icons/media-image-plus.svg"
            alt="Добавить картинку"
            style={{ width: '200px', filter: 'invert(1)', transition: 'transform 0.3s, filter 0.3s' }}
            className="image-icon"
          />
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
            <button
              className="remove-theme-button"
              onClick={handleRemoveTheme}
              disabled={!haveImage}
            >
              <img
                src="/icons/trash-bin.svg"
                alt="Удалить картинку"
                style={{ width: '30px', filter: 'invert(1)', transition: 'transform 0.3s, filter 0.3s' }}
                className="image-icon"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
