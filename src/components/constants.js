export const profileImage = document.querySelector('.profile__image');
export const cardsContainer = document.querySelector('.places__list');
export const cardTemplate = document.querySelector('#card-template').content;
// opening popup buttons
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const avatarButton = document.querySelector('.profile__image');
// all popups
export const popups = Array.from(document.querySelectorAll('.popup'));
// popup types
export const editPopup = document.querySelector('.popup_type_edit');
export const newCardPopup = document.querySelector('.popup_type_new-card');
export const imagePopup = document.querySelector('.popup_type_image');
export const avatarPopup = document.querySelector('.popup_type_avatar');
export const deletePopup = document.querySelector('.popup_type_delete');
// popup buttons
export const deletePopupButton = deletePopup.querySelector('.popup__button');
// image popup components
export const imagePopupImage = imagePopup.querySelector('.popup__image');
export const imagePopupCaption = imagePopup.querySelector('.popup__caption');
// forms
export const editForm = document.forms.edit_profile;
export const newCardForm = document.forms.new_place;
export const avatarForm = document.forms.avatar;
// new card form inputs
export const nameInput = editForm.elements.name;
export const descriptionInput = editForm.elements.description;
// new card form outputs
export const nameOutput = document.querySelector('.profile__title');
export const descriptionOutput = document.querySelector('.profile__description');