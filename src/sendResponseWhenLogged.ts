
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

export async function sendGetSheetEcxelResponseWhenLogged(url: string){
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Authorization': "Bearer " + getCookie('Token')
        },
    });
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
    return response;
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