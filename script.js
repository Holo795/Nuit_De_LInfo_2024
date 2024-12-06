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
      console.log(popup)
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


// Fonction pour ouvrir la sous-pop-up associée (x.1 ou x.2)
function openSubPopup() {
    // Sélectionner tous les boutons dans les popups
    const goodButtons = document.querySelectorAll('.good');
    const badButtons = document.querySelectorAll('.bad');
    const allSubPopups = document.querySelectorAll('.bpopup');
    console.log(allSubPopups)
    // Associer les boutons "bon fonctionnement" (x.1)
    goodButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Fermer toutes les sous-popups ouvertes
            allSubPopups.forEach((subPopup) => {
                subPopup.style.display = 'none';
            });

            // Identifier et ouvrir la sous-popup associée
            const subPopupId = button.id.replace('open', '');
            console.log(subPopupId)
            const subPopup = document.getElementById(subPopupId);
            console.log(subPopup)
            if (subPopup) {
                subPopup.style.display = 'flex';
                
            }
        });
    });

    // Associer les boutons "dysfonctionnement" (x.2)
    badButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Fermer toutes les sous-popups ouvertes
            allSubPopups.forEach((subPopup) => {
                subPopup.style.display = 'none';
            });

            // Identifier et ouvrir la sous-popup associée
            const subPopupId = button.id.replace('open', '');
            const subPopup = document.getElementById(subPopupId);
            if (subPopup) {
                subPopup.style.display = 'flex';
            }
        });
    });
}

// Fonction pour fermer les popups (et sous-popups) via la croix
function closePopup() {
    const closeButtons = document.querySelectorAll('.close');

    closeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const popupId = button.dataset.popup;
            const popup = document.getElementById(popupId);
            if (popup) {
                popup.style.display = 'none';
            }
        });
    });
}

// Initialiser les fonctions
openSubPopup();
closePopup();


