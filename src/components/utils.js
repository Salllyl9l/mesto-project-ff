export function renderLoading(isLoading, button, buttonText, loadingText) {
  if (isLoading) {
    button.textContent = loadingText;
  }
  else {
    button.textContent = buttonText;
  };
};

export function handleSubmit(request, evt, loadingText = 'Сохранение...', button = '') {
  const evtIsNotEmpty = evt !== '';
  if (evtIsNotEmpty) {
    evt.preventDefault();
  };
  const submitButton = evtIsNotEmpty ? evt.submitter : button;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      if (evtIsNotEmpty) {
        evt.target.reset();
      };
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
};