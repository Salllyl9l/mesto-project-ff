export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

export function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach(formElement => {
    setEventListeners(
      formElement, 
      validationConfig.inputSelector,
      validationConfig.submitButtonSelector,
      validationConfig.inactiveButtonClass,
      validationConfig.inputErrorClass,
      validationConfig.errorClass);
  });
};

export function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  makeButtonInactive(buttonElement, validationConfig.inactiveButtonClass);
  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
  });
};

function setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

function isValid(formElement, inputElement, inputErrorClass, errorClass) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }
  else {
    inputElement.setCustomValidity('');
  };
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } 
  else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  };
};

function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const inputError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  inputError.textContent = errorMessage;
  inputError.classList.add(errorClass);
};

function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const inputError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  inputError.textContent = '';
  inputError.classList.remove(errorClass);
};

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    makeButtonInactive(buttonElement, inactiveButtonClass);
  } 
  else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

function makeButtonInactive(buttonElement, inactiveButtonClass) {
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(inactiveButtonClass);
};