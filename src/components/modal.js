export function openModal(popupToBeOpened) {
  popupToBeOpened.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
};

export function closeModal(popupToBeClosed) {
  popupToBeClosed.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);
};

export function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const popupToBeClosed = document.querySelector('.popup_is-opened');
    closeModal(popupToBeClosed);
  };
};
