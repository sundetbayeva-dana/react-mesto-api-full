class Api {
  constructor(config) {
    this._url = config.url;
    this._authorization = config.authorization;
  }  

  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._authorization,
      }     
    })
    .then(this._handleResponse)
  }

  getUserInformation() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET', 
      headers: {
        authorization: this._authorization,
      }
    })
    .then(this._handleResponse)
  }

  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH', 
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      }) 
    })
    .then(this._handleResponse)    
  }
 
  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH', 
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({          
        name: data.name,
        about: data.about,  
      })      
    })
    .then(this._handleResponse)     
  }

  setLikeOnCard(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
      }
    })
    .then(this._handleResponse)    
  }

  removeLikeOnCard(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'DELETE', 
      headers: {
        authorization: this._authorization,
      }
    })
    .then(this._handleResponse)    
  }  

  addCards(text, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: text,
        link: link})  
    })
    .then(this._handleResponse)    
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      }
    })
    .then(this._handleResponse)    
  }
}

const api = new Api({
  // url: 'https://mesto.nomoreparties.co/v1/cohort-27',
  // authorization: 'a3d0e919-8de7-4208-b834-e803f8c056f2'
  url: 'https://api.mestogram.frontend.nomoredomains.rocks'
})

export default api;