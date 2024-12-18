import {SERVERLESS_FUNCTION} from "../config.ts";

export async function uploadFileToBucket(file: File): Promise<string | null> {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve, reject) => {
        reader.onload = async () => {
            const base64Data = reader.result?.toString().split(',')[1];
            if (!base64Data) {
                reject(new Error('Не удалось получить данные файла'));
                return;
            }

            const timestamp = new Date().getTime();
            const randomId = Math.floor(Math.random() * 1000000);
            const uniqueFileName = `${timestamp}_${randomId}_${file.name}`;

            const fileData = {
                name: uniqueFileName,
                buffer: base64Data,
            };

            try {
                const response = await fetch(SERVERLESS_FUNCTION, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ file: fileData }),
                });

                if (response.ok) {
                    resolve(`https://survey-app-bucket.storage.yandexcloud.net/${uniqueFileName}`);
                } else {
                    reject(new Error('Ошибка при загрузке файла'));
                }
            } catch (error) {
                reject(new Error('Произошла ошибка при загрузке файла'));
            }
        };

        reader.onerror = () => {
            reject(new Error('Ошибка при чтении файла'));
        };
    });
}
