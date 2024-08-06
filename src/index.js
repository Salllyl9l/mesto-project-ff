import './pages/index.css';
import { profileImage, cardsContainer, editButton, addButton, avatarButton, popups, editPopup, newCardPopup, imagePopup, avatarPopup, deletePopup, deletePopupButton, imagePopupImage, imagePopupCaption, editForm, newCardForm, avatarForm, nameInput, descriptionInput, nameOutput, descriptionOutput} from './components/constants.js';
import { createCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { validationConfig, enableValidation, clearValidation } from './components/validation.js';
import { getUserData, getInitialCards, updateUserData, postCard, deleteCard, updateAvatar } from './components/api.js';
import { renderLoading, handleSubmit} from './components/utils.js';

let userID;
let cardID, cardDeleteButton;

function openImage(imageToBeOpened, cardTitle) {
  imagePopupImage.src = imageToBeOpened.src;
  imagePopupImage.alt = cardTitle.textContent;
  imagePopupCaption.textContent = cardTitle.textContent;
  openModal(imagePopup);
};

function handleDeleteButton(id, button) {
  cardID = id;
  cardDeleteButton = button;
  openModal(deletePopup);
};

function renderCard(card, method = 'prepend') {
  const parameters = {card, likeCard, openImage, userID, handleDeleteButton};
  const cardElement = createCard(parameters);
  cardsContainer[method](cardElement);
}

Promise.all([getUserData(), getInitialCards()])
  .then(([userData, initialCards]) => {
    userID = userData._id;
    nameOutput.textContent = userData.name;
    descriptionOutput.textContent = userData.about;
    profileImage.setAttribute('style', `background-image: url('${userData.avatar}');`);
    initialCards.forEach(initialCard => {
      renderCard(initialCard, 'append')
    });
  })
  .catch(console.error);

editButton.addEventListener('click', () => {
  nameInput.value = nameOutput.textContent;
  descriptionInput.value = descriptionOutput.textContent;
  clearValidation(editForm, validationConfig);
  openModal(editPopup);
});

addButton.addEventListener('click', () => {
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig);
  openModal(newCardPopup);
});

avatarButton.addEventListener('click', () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openModal(avatarPopup)
});

popups.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
      closeModal(popup);
    };
  });
}); 

function submitEditForm(evt) {
  function makeRequest() {
    return updateUserData(nameInput.value, descriptionInput.value)
      .then(userData => {
        nameOutput.textContent = userData.name;
        descriptionOutput.textContent = userData.about;
        closeModal(editPopup);
      });
  };
  handleSubmit(makeRequest, evt);
};

function submitNewCardForm(evt) {
  function makeRequest() {
    const placeInput = newCardForm.elements.place_name;
    const linkInput = newCardForm.elements.link;
    return postCard(placeInput.value, linkInput.value)
      .then(newCard => {
        renderCard(newCard);
        closeModal(newCardPopup);
      });
  };
  handleSubmit(makeRequest, evt);
};

function submitAvatarForm(evt) {
  function makeRequest() {
    const avatarInput = avatarForm.elements.avatar;
     return updateAvatar(avatarInput.value)
      .then(updatedUserData => {
        profileImage.setAttribute('style', `background-image: url('${updatedUserData.avatar}');`);
        closeModal(avatarPopup);
      });
  };
  handleSubmit(makeRequest, evt);
};

function removeCard() {
  function makeRequest() {
    return deleteCard(cardID)
      .then(() => {
        const cardToBeRemoved = cardDeleteButton.closest('.card');
        cardToBeRemoved.remove();
        closeModal(deletePopup);
      })
  };
  handleSubmit(makeRequest, '', 'Удаление...', deletePopupButton);
};

editForm.addEventListener('submit', submitEditForm); 
newCardForm.addEventListener('submit', submitNewCardForm);
avatarForm.addEventListener('submit', submitAvatarForm);
deletePopupButton.addEventListener('click', removeCard);

enableValidation(validationConfig);