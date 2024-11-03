
export async function sendResponseWhenLogged(method: string, url: string, bodyObject: object, ){
    if (method === 'POST' || method === 'PATCH' || method == 'DELETE'){
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('Token')}`
            },
            body: JSON.stringify(bodyObject)
        });
        return response;
    }
    else if (method === 'GET'){
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getCookie('Token')}`
            },
            body: JSON.stringify(bodyObject)
        });
        return response;
    }
    else if (method === 'GET_SHEET'){
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Authorization': `Bearer ${getCookie('Token')}`
            },
            body: JSON.stringify(bodyObject)
        });
        return response;
    }

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