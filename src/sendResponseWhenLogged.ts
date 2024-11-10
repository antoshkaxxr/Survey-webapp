import {s3} from "./config/AwsConfig.ts";

export async function sendChangingResponseWhenLogged(method: string, url: string, bodyObject: object, ){
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + getCookie('Token')
        },
        body: JSON.stringify(bodyObject)
    });
    return response;
}

export async function sendGetResponseWhenLogged(url: string){

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + getCookie('Token')
        },
    });
    return response;
}

export async function sendGetSheetResponseWhenLogged(url: string){
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Authorization': "Bearer " + getCookie('Token')
        },
    });
    return response;
}

export async function getImage(key: string) {
    try {
        const params = {
            Bucket: 'survey-webapp-bucket',
            Key: key
        };

        const response = await s3.getObject(params).promise();
        const imageBlob = new Blob([response.Body as BlobPart], { type: response.ContentType });
        return URL.createObjectURL(imageBlob);
    } catch (error) {
        console.error('Ошибка при получении изображения:', error);
    }
}

export function getEmail(){
    return getCookie("Email")
}

function getCookie(name: string) {
    const cookieArr = document.cookie.split('; ');
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split('=');
        if (cookiePair[0] === name) {
            return cookiePair[1];
        }
    }
    return null;
}
