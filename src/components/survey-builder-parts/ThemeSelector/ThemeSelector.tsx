import React, { useState } from "react";
import './ThemeSelector.css';
import { uploadFileToBucket } from "../../../utils/uploadFile.ts";
import { Tooltip } from 'react-tooltip';
import {toast, ToastContainer} from "react-toastify";

interface ThemeSelectorProps {
    backgroundImage: Theme | null;
    setBackgroundImage: (x: Theme | null) => void;
}

const themes: Theme[] = [
    { title: 'Стандартная тема', url: 'https://survey-app-bucket.storage.yandexcloud.net/default.jpg' },
    { title: 'Небоскребы', url: 'https://survey-app-bucket.storage.yandexcloud.net/theme1.jpg' },
    { title: 'Водная гладь', url: 'https://survey-app-bucket.storage.yandexcloud.net/theme2.jpg' },
];

export function ThemeSelector({ backgroundImage, setBackgroundImage }: ThemeSelectorProps) {
    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
    const [haveImage, setHaveImage] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
    const [customTheme, setCustomTheme] = useState<Theme | null>(null);
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

    const handleOpenModal = () => {
        setIsThemeModalOpen(true);
    };

    const handleThemeChange = (theme: Theme) => {
        setSelectedTheme(theme);
        setHaveImage(true);
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

        if (!file.type.startsWith('image/')) {
            toast.error('Пожалуйста, загрузите файл изображения (например, JPEG, PNG)');
            return;
        }

        try {
            const url = await uploadFileToBucket(file);
            if (url) {
                const newTheme: Theme = { title: 'Кастомный фон', url: url };
                setCustomTheme(newTheme);
                setSelectedTheme(newTheme);
                setUploadedFileName(file.name);
                toast.success('Изображение успешно загружено')
            }
        } catch (error) {
            toast.error('Ошибка при загрузке файла');
        }
    };

    const handleRemoveTheme = () => {
        setBackgroundImage(null);
        setSelectedTheme(null);
        setCustomTheme(null);
        setIsThemeModalOpen(false);
        setHaveImage(false);
        setUploadedFileName(null);
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
                                <div key={theme.title} className="theme-option">
                                    <img src={theme.url} alt={theme.url} />
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
                            <p>Загрузить собственную тему</p>
                            <label htmlFor="file-upload" className="custom-file-upload">
                                <img src="/icons/upload-icon.svg" alt="Upload" />
                                {uploadedFileName ? uploadedFileName : 'Выбрать изображение'}
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="modal-buttons">
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
                                data-tooltip-id="remove-tooltip"
                                data-tooltip-content="Удалить картинку"
                            >
                                <img
                                    src="/icons/trash-solid.svg"
                                    alt="Удалить картинку"
                                    style={{ width: '30px', filter: 'invert(1)', transition: 'transform 0.3s, filter 0.3s' }}
                                    className="image-icon"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Tooltip id="remove-tooltip" place="bottom" style={{zIndex: "10000"}}/>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={true}
                closeOnClick
                pauseOnHover
                draggable
            />
        </div>
    );
}
