const background = document.getElementById('background');

// Fonction pour obtenir l'image utilisateur
async function getGitHubUserAvatar(username) {
    const url = `https://api.github.com/users/${username}`;

    try {
        // Envoyer une requête GET à l'API GitHub
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erreur : ${response.status} ${response.statusText}`);
        }

        // Récupérer les données JSON
        const userData = await response.json();

        // Extraire l'URL de l'avatar
        const avatarUrl = userData.avatar_url;

        console.log(`Avatar URL for ${username}:`, avatarUrl);

        return avatarUrl;

    } catch (error) {
        console.error("Erreur lors de la récupération de l'avatar :", error);
    }
}

// Exemple d'utilisation
getGitHubUserAvatar("VOID575").then((avatarUrl) => {
    if (avatarUrl) {

        const profile = document.getElementById('Github-profile')
        if (profile) {
        profile.classList.remove('bg-[#C2B280]');
        profile.style.backgroundImage = `url(${avatarUrl})`;
        profile.style.backgroundSize = "cover"; // Pour couvrir tout l'élément
        profile.style.backgroundPosition = "center"; // Centrer l'image
        }
        
}
});

getGitHubUserAvatar("Sampo01").then((avatarUrl) => {
    if (avatarUrl) {

        const profile = document.getElementById('Github-profile2')
        if (profile) {
        profile.classList.remove('bg-[#C2B280]');
        profile.style.backgroundImage = `url(${avatarUrl})`;
        profile.style.backgroundSize = "cover"; // Pour couvrir tout l'élément
        profile.style.backgroundPosition = "center"; // Centrer l'image
        }
        
}
});

getGitHubUserAvatar("Sampo01").then((avatarUrl) => {
    if (avatarUrl) {

        const profile = document.getElementById('Github-profile3')
        if (profile) {
        profile.classList.remove('bg-[#C2B280]');
        profile.style.backgroundImage = `url(${avatarUrl})`;
        profile.style.backgroundSize = "cover"; // Pour couvrir tout l'élément
        profile.style.backgroundPosition = "center"; // Centrer l'image
        }
        
}
});

getGitHubUserAvatar("Jace020").then((avatarUrl) => {
    if (avatarUrl) {

        const profile = document.getElementById('Github-profile4')
        if (profile) {
        profile.classList.remove('bg-[#C2B280]');
        profile.style.backgroundImage = `url(${avatarUrl})`;
        profile.style.backgroundSize = "cover"; // Pour couvrir tout l'élément
        profile.style.backgroundPosition = "center"; // Centrer l'image
        }
        
}
});


getGitHubUserAvatar("Marledia2").then((avatarUrl) => {
    if (avatarUrl) {

        const profile = document.getElementById('Github-profile5')
        if (profile) {
        profile.classList.remove('bg-[#C2B280]');
        profile.style.backgroundImage = `url(${avatarUrl})`;
        profile.style.backgroundSize = "cover"; // Pour couvrir tout l'élément
        profile.style.backgroundPosition = "center"; // Centrer l'image
        }
        
}
});

getGitHubUserAvatar("Nonolaxolotlo").then((avatarUrl) => {
    if (avatarUrl) {

        const profile = document.getElementById('Github-profile6')
        if (profile) {
        profile.classList.remove('bg-[#C2B280]');
        profile.style.backgroundImage = `url(${avatarUrl})`;
        profile.style.backgroundSize = "cover"; // Pour couvrir tout l'élément
        profile.style.backgroundPosition = "center"; // Centrer l'image
        }
        
}
});


function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

// Gestion du clic pour ouvrir/fermer le menu
document.getElementById('menu-button').addEventListener('click', function () {
    const dropdown = document.getElementById('menu-dropdown');
    if (dropdown.classList.contains('opacity-0')) {
        dropdown.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
        dropdown.classList.add('opacity-100', 'scale-100');
    } else {
        dropdown.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
        dropdown.classList.remove('opacity-100', 'scale-100');
    }
});

// Optionnel : fermer le menu si on clique en dehors
window.addEventListener('click', function (e) {
    const button = document.getElementById('menu-button');
    const dropdown = document.getElementById('menu-dropdown');
    if (!button.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
        dropdown.classList.remove('opacity-100', 'scale-100');
    }
});

// Switch dar mode/light mode
document.getElementById('Dark-mode').addEventListener('click', function () {
    const buttonDark = document.getElementById('Dark-mode');
    if (buttonDark.checked)
    {
        document.querySelector('.sky').style.visibility='hidden';
        document.querySelector('.earth').style.visibility='visible';
        document.querySelector('.earthbis').style.visibility='visible';
        document.querySelector('.beach').style.visibility='hidden';
        document.querySelector('.etoile_filante').style.visibility='visible';
        document.querySelector('.astre').style.visibility='visible';
        background.classList.remove('bg-sky-700');
        background.classList.add('bg-black');
    }
});

document.getElementById('Light-mode').addEventListener('click', function () {
    const buttonLight = document.getElementById('Light-mode');
    if (buttonLight.checked)
    {
        document.querySelector('.sky').style.visibility='visible';
        document.querySelector('.earth').style.visibility='hidden';
        document.querySelector('.earthbis').style.visibility='hidden';
        document.querySelector('.beach').style.visibility='visible';
        document.querySelector('.etoile_filante').style.visibility='hidden';
        document.querySelector('.astre').style.visibility='hidden';
        background.classList.add('bg-sky-700');
        background.classList.remove('bg-black');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    background.classList.remove('opacity-0')
    background.classList.add('opacity-100')
});

document.querySelectorAll('#Github-profile').forEach( (profile)=> {
    profile.addEventListener('mouseover', async function () {
    console.log('github');
    await sleep(200);
    profile.classList.add('animate-bounce');
})

profile.addEventListener('mouseout', async function () {
    console.log('github');
    await sleep(200);
    profile.classList.remove('animate-bounce');
})

});

function initializeShootingStars(count) {
    const body = document.body;
    for (let i = 0; i < count; i++) {
      // Create a new shooting star
      const star = document.createElement("div");
      star.classList.add("etoile_filante");
      // Randomize initial position
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      const delay = Math.random() * 1; // Random delay for the animation
      star.style.left = `${startX}px`;
      star.style.top = `${startY}px`;
      star.style.animationDelay = `${delay}s`;
      // Append to the body
      body.appendChild(star);
    }
  }
  // Initialize with 20 stars
  initializeShootingStars(20);

