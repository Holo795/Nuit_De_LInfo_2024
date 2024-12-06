const emojiList = document.getElementById('emojiList');
const emojiSearch = document.getElementById('searchInput');
const emojiPutInput = document.getElementById('searchInput')

var emojiData;     

document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Empêcher la soumission classique du formulaire
        const query = document.getElementById("searchInput").value;
        displayCustomSearchResults(query); // Lancer la recherche personnalisée
    });

    // Fonction pour afficher les résultats personnalisés via Google Custom Search
    async function displayCustomSearchResults(query) {
        const resultsContainer = document.getElementById("resultsContainer");
        if (!resultsContainer) return;

        const apiKeyGoogle = 'AIzaSyAuA1N4Rkr74EsEzdwSEjgy_c2hCzi63ts';
        const cx = '37410c1e9531d49a9';

        // Traduire les emojis en slugs
        const querySlugs = await convertEmojisToSlugs(query);
        console.log(querySlugs);

        // Créer l'URL de la recherche Google Custom Search
        const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(querySlugs)}&key=${apiKeyGoogle}&cx=${cx}`;

        // Faire une requête GET pour obtenir les résultats
        const response = await fetch(url);
        const data = await response.json();

        // Vérifier si des résultats ont été trouvés
        if (data.items && data.items.length > 0) {
            resultsContainer.innerHTML = ""; // Vider les anciens résultats

            data.items.forEach((item) => {
                const resultElement = document.createElement("div");
                resultElement.classList.add("result-item", "mb-6");
                resultElement.innerHTML = `
                        <a href="${item.link}" target="_blank" class="text-blue-600 hover:underline font-semibold">${item.title}</a>
                        <p class="text-gray-700">${item.snippet}</p>
                    `;
                resultsContainer.appendChild(resultElement);
            });
        }
    }

    // Fonction pour convertir les emojis en slugs
    async function convertEmojisToSlugs(query) {
        const apiKeyEmoji = "aaab5aea8be43727a7055a906cfbe1add35c6a47";
        const apiUrl = `https://emoji-api.com/emojis?access_key=${apiKeyEmoji}`;

        const response = await fetch(apiUrl);
        const emojisData = await response.json();
        const emojiMap = new Map(
            emojisData.map((emoji) => [emoji.character, emoji.slug]) // Associer chaque emoji à son slug
        );

        // Extraire chaque caractère de la chaîne et récupérer le slug, puis traduire si nécessaire
        const slugs = await Promise.all(
            Array.from(query)
                .map(async (char) => {
                    const slug = emojiMap.get(char);
                    if (slug) {
                        return extractImportantWord(slug); // Extraire et traduire
                    }
                    return char; // Si ce n'est pas un emoji, on garde le caractère
                })
        );

        return slugs.join(" "); // Retourner une chaîne de slugs traduits séparés par des espaces
    }

    // Fonction pour extraire la partie importante d'un slug
    function extractImportantWord(slug) {
        const parts = slug.split('-'); // Divise le slug par les tirets
        return parts.slice(2).join('-'); // Enlève les deux premiers éléments et retourne le reste
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector("#searchInput");
    const popupContainer = document.querySelector("#popupContainer");

    searchInput.addEventListener("focus", () => {
        console.log('blablabla')
        popupContainer.classList.remove("hidden");
    });

    document.addEventListener("click", (e) => {
        if (!popupContainer.contains(e.target) && !searchInput.contains(e.target)) {
            popupContainer.classList.add("hidden");
        }
    });
})



document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector("#searchInput");
    const popupContainer = document.querySelector("#popupContainer");

    searchInput.addEventListener("focus", () => {
        popupContainer.classList.remove("hidden");
    });

    document.addEventListener("click", (e) => {
        if (!popupContainer.contains(e.target) && !searchInput.contains(e.target)) {
            popupContainer.classList.add("hidden");
        }
    });
    fetch('https://emoji-api.com/emojis?access_key=aaab5aea8be43727a7055a906cfbe1add35c6a47')
    .then(res => res.json())
    .then(data => {
        emojiData = data
        loadEmoji(data)
    }
    )

})


    function loadEmoji(data, text = null) {
        // Effacer la liste existante d'emojis
        emojiList.textContent = '';
    
        data.forEach(emoji => {
            if (!text) {
                // Si aucun texte de recherche n'est fourni, afficher tous les emojis
                let li = document.createElement('li');
                li.setAttribute('emoji-name', emoji.slug);
                li.setAttribute('emoji-charactere', emoji.character);
                li.textContent = emoji.character;
                li.classList.add(
                    'p-0',
                    'm-0',
                    'align-middle',
                    'w-10',
                    'text-2xl'
                );
                li.addEventListener('click', () => addEmojiToInput(emoji.character));
                emojiList.appendChild(li);
            } else {
                // Filtrer les emojis selon le texte de recherche
                let searchTerms = text.toLowerCase().split(' ');
    
                // Vérifier si l'emoji correspond à un des termes de recherche
                if (searchTerms.some(term => emoji.slug.includes(term))) {
                    let li = document.createElement('li');
                    li.setAttribute('emoji-name', emoji.slug);
                    li.setAttribute('emoji-charactere', emoji.character);
                    li.textContent = emoji.character;
                    li.classList.add(
                        'p-0',
                        'm-0',
                        'align-middle',
                        'w-10',
                        'text-2xl'
                    );
                    li.addEventListener('click', () => addEmojiToInput(emoji.character));
                    emojiList.appendChild(li);
                }
            }
        });
    }
    

emojiSearch.addEventListener('keyup', e => {
    let value = e.target.value.toLowerCase();
    loadEmoji(emojiData, value.trim())

    if(e.key === ' ') {
        const firstEmoji = emojiList.firstElementChild.getAttribute('emoji-charactere');
        console.log(firstEmoji)

        const space_word = value.trim().split(' '); // Supprime les espaces inutiles au début et à la fin
        const last_space_word = space_word[space_word.length - 1]; // Avant-dernier mot

        emojiSearch.value = emojiSearch.value.replace(last_space_word, firstEmoji)
    }

});


function addEmojiToInput(emojiCharacter) {
    emojiSearch.value += emojiCharacter; 
    emojiSearch.focus(); 
}