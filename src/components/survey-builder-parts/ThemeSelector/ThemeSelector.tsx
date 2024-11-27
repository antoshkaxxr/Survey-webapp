import React, {useState, useEffect} from "react";
import './ThemeSelector.css';
import {getImage} from "../../../sendResponseWhenLogged.ts";

interface ThemeSelectorProps {
    backgroundImage: Theme | null;
    setBackgroundImage: (x: Theme | null) => void;
}

const themes: Theme[] = [
    {title: 'Стандартная тема', name: 'default.jpg'},
    {title: 'Небоскребы', name: 'theme1.jpg'},
    {title: 'Водная гладь', name: 'theme2.jpg'},
];

export function ThemeSelector({backgroundImage, setBackgroundImage}: ThemeSelectorProps) {
    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
    const [haveImage, setHaveImage] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
    const [customTheme, setCustomTheme] = useState<Theme | null>(null);
    const [themeImages, setThemeImages] = useState<{ [key: string]: string | undefined }>({});

    useEffect(() => {
        const loadImages = async () => {
            const images: { [key: string]: string | undefined } = {};
            for (const theme of themes) {
                images[theme.name] = await getImage(theme.name);
            }
            setThemeImages(images);
        };
        loadImages();
    }, []);

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
        setHaveImage(true);
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64Data = reader.result?.toString().split(',')[1];
            if (!base64Data) return;

            const timestamp = new Date().getTime();
            const randomId = Math.floor(Math.random() * 1000000);
            const uniqueFileName = `${timestamp}_${randomId}_${file.name}`;

            const fileData = {
                name: uniqueFileName,
                buffer: base64Data,
            };

            try {
                const response = await fetch('https://functions.yandexcloud.net/d4e5uokosjfla9bphql4', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({file: fileData}),
                });

                if (response.ok) {
                    const newTheme: Theme = {title: 'Кастомный фон', name: uniqueFileName};
                    setCustomTheme(newTheme);
                    setSelectedTheme(newTheme);
                    console.log('Успех!');
                } else {
                    console.error('Error uploading file');
                }
            } catch (error) {
                console.error('Error uploading file', error);
            }
        };
    };

    const handleRemoveTheme = () => {
        setBackgroundImage(null);
        setSelectedTheme(null);
        setCustomTheme(null);
        setIsThemeModalOpen(false);
        setHaveImage(false);
    };

    return (
        <div className="theme-selector">
            {backgroundImage ? (
                <>
                    <button
                        className="theme-button"
                        onClick={handleOpenModal}
                        style={{background: 'transparent', border: 'none', cursor: 'pointer'}}
                    >
                        <img
                            src="/icons/design-nib.svg"
                            alt="Изменить картинку"
                            style={{width: '200px', filter: 'invert(1)', transition: 'transform 0.3s, filter 0.3s'}}
                            className="image-icon"
                        />
                    </button>
                </>
            ) : (
                <button
                    className="theme-button"
                    onClick={handleOpenModal}
                    style={{background: 'transparent', border: 'none', cursor: 'pointer'}}
                >
                    <img
                        src="/icons/media-image-plus.svg"
                        alt="Добавить картинку"
                        style={{width: '200px', filter: 'invert(1)', transition: 'transform 0.3s, filter 0.3s'}}
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
                                <div key={theme.title} className="theme-option">
                                    <img src={themeImages[theme.name]} alt={theme.name}/>
                                    <button
                                        onClick={() => handleThemeChange(theme)}
                                        className={selectedTheme?.title === theme.title ? 'active' : ''}
                                    >
                                        {theme.title}
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
                        <button className="confirm-button" onClick={handleConfirmTheme}
                                disabled={!selectedTheme && !customTheme}>
                            Применить
                        </button>
                        <button
                            className="remove-theme-button"
                            onClick={handleRemoveTheme}
                            disabled={!haveImage && backgroundImage === undefined}
                        >
                            <img
                                src="/icons/trash-solid.svg"
                                alt="Удалить картинку"
                                style={{width: '30px', filter: 'invert(1)', transition: 'transform 0.3s, filter 0.3s'}}
                                className="image-icon"
                            />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
