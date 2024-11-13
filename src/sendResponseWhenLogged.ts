export async function sendChangingResponseWhenLogged(method: string, url: string, bodyObject: object){
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + getCookie('Token')
        },
        body: JSON.stringify({
            email: getEmail(),
            data: bodyObject
        })
    });
    if(response.status === 403){
        deleteAllCookies();
        window.location.reload();
    }
    return response;
}

export async function sendGetResponseWhenLogged(url: string){

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + getCookie('Token')
        },
    });
    if(response.status === 403){
        console.log(response);
        deleteAllCookies();
        window.location.reload();
    }
    return response;
}

export async function sendGetSheetEcxelResponseWhenLogged(url: string){
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Authorization': "Bearer " + getCookie('Token')
        },
    });
    if(response.status === 403){
        deleteAllCookies();
        window.location.reload();
    }
    return response;
}

export async function sendGetSheetPdfResponseWhenLogged(url: string){
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': "application/pdf",
            'Authorization': "Bearer " + getCookie('Token')
        },
    });
    if(response.status === 403){
        deleteAllCookies();
        window.location.reload();
    }
    return response;
}

export async function getImage(key: string) {
    try {
        const response = await fetch(`https://functions.yandexcloud.net/d4e5uokosjfla9bphql4?fileName=${encodeURIComponent(key)}`);
        if (!response.ok) {
            throw new Error('Ошибка при получении изображения');
        }

        const imageBlob = await response.blob();
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


function deleteAllCookies() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        const name = cookie.substring(0, cookie.indexOf('='));
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
}

