const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-20',
  headers: {
    authorization: 'c164c1f5-dc4a-4525-bdd1-611a8a07cdea',
    'Content-Type': 'application/json'
  },
};

const getResponseData = (response) => {
  if (response.ok) {
    return response.json();
  }
  else {
    return Promise.reject(`Что-то пошло не так: ${response.status}`);
  };
};

const sendRequest = (endpoint, requestMethod = 'GET', requestBody = '') => {
  if (requestMethod === 'POST' || requestMethod === 'PATCH') {
    return fetch(`${config.baseUrl}${endpoint}`, {
      method: requestMethod,
      headers: config.headers,
      body: JSON.stringify(requestBody),
    }).then(getResponseData);
  }
  else {
    return fetch(`${config.baseUrl}${endpoint}`, {
      method: requestMethod,
      headers: config.headers,
    }).then(getResponseData);
  };
};

export const getUserData = () => {
  return sendRequest('/users/me');
};

export const getInitialCards = () => {
  return sendRequest('/cards');
};

export const updateUserData = (userName, userAbout) => {
  return sendRequest('/users/me', 'PATCH', {name: userName, about: userAbout});
};

export const postCard = (cardName, cardLink) => {
  return sendRequest('/cards', 'POST', {name: cardName, link: cardLink});
};

export const deleteCard = (cardID) => {
  return sendRequest(`/cards/${cardID}`, 'DELETE');
};

export const updateLike = (cardID, method) => {
  return sendRequest(`/cards/likes/${cardID}`, method);
};

export const updateAvatar = (avatarLink) => {
  return sendRequest(`/users/me/avatar`, 'PATCH', {avatar: avatarLink});
};