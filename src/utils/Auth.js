// export const BASE_URL = 'https://auth.nomoreparties.co';
export const BASE_URL = 'https://api.mestogram.frontend.nomoredomains.rocks';

const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.statusText}`)
}

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
    .then(checkResponse)
};

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
    .then(checkResponse)
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    .then(checkResponse)    
}