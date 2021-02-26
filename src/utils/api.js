class Api {
  constructor({ baseUrl, token, groupId }) {
    this._address = baseUrl;
    this._token = token;
    this._groupId = groupId;
  }

  getInitialCards() {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`))
  }

  getInfoUser() {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`))
  }

  setInfoUser({ name, about }) {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about,
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`))
  }

  setCard({ name, link }) {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`))
  }

  removeCard(id) {
    return fetch(`${this._address}/${this._groupId}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`))
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._address}/${this._groupId}/cards/likes/${id}`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        authorization: this._token,
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`))
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar,
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`))
  }
}

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1',
  token: '429ceaf1-0a34-48aa-a4c9-c70c2c79ac6e',
  groupId: 'cohort-19'
}

const api = new Api(config);

export default api;