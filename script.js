// Sélectionnez toutes les images et leurs pop-ups
const triggers = document.querySelectorAll('.popup-trigger');
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.close');

// Ouvrir la pop-up associée
triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      // Fermer toutes les pop-ups ouvertes
      popups.forEach((popup) => {
        popup.classList.remove('show');
      });
  
      // Identifier la pop-up associée à l'image
      const popupId = `popup${trigger.id.replace('openPopup', '')}`;
      const popup = document.getElementById(popupId);
      if (popup) {
        popup.classList.add('show');
      }
    });
  });

// Fermer la pop-up via le bouton "×"
closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const popupId = button.dataset.popup;
    const popups = document.getElementById(popupId);
    popups.classList.remove('show');
  });
});


