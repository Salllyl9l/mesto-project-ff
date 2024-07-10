'use strict';

import { initialCards } from './cards.js';
import { handleLikeClick, createCard, handleRemoveClick } from './card.js';
import { openModal, closeModal, closeModalOnOverlay } from './modal.js';

import '../pages/index.css';

// Объявляем модальное окно и его элементы в глобальной области
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImageElement = popupTypeImage.querySelector('.popup__image');
const popupCaptionElement = popupTypeImage.querySelector('.popup__caption');

const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');

const editForm = document.forms['edit-profile'];
const newPlaceForm = document.forms['new-place'];

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const placesList = document.querySelector('.places__list');

editBtn.addEventListener('click', () => {
  openModal(popupTypeEdit);
  editForm.name.value = profileTitle.textContent;
  editForm.description.value = profileDescription.textContent;
});

addBtn.addEventListener('click', () => {
  openModal(popupTypeNewCard);
});

function updateProfileInfo({ name, description }) {
  profileTitle.textContent = name;
  profileDescription.textContent = description;
}

editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const { name, description } = editForm.elements;
  updateProfileInfo({ name: name.value, description: description.value });
  closeModal(popupTypeEdit);
});

newPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const newCard = createCard(
    {
      name: newPlaceForm.elements['place-name'].value,
      link: newPlaceForm.elements.link.value,
    },
    (item) => openImageModal(item),
    handleLikeClick,
    handleRemoveClick
  );
  placesList.prepend(newCard);

  closeModal(popupTypeNewCard);
  newPlaceForm.reset();
});

initialCards.forEach((item) => {
  const newCard = createCard(
    item,
    (item) => openImageModal(item),
    handleLikeClick,
    handleRemoveClick
  );
  placesList.append(newCard);
});

function openImageModal(item) {
  popupImageElement.src = item.link;
  popupImageElement.alt = item.name;
  popupCaptionElement.textContent = item.name;
  openModal(popupTypeImage);
}

// Устанавливаем обработчик для закрытия попапа по клику на оверлей
document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closeModalOnOverlay(evt);
    }
  });
});

document.addEventListener('click', (evt) => {
  if (
    evt.target.classList.contains('popup__close') ||
    evt.target.classList.contains('popup')
  ) {
    const popup = evt.target.classList.contains('popup')
      ? evt.target
      : evt.target.closest('.popup');
    closeModal(popup);
  }
});