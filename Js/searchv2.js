const emojiList = document.getElementById('emojiList');
const emojiSearch = document.getElementById('searchInput');
const emojiPutInput = document.getElementById('searchInput')

var emojiData;       

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
})

fetch('https://emoji-api.com/emojis?access_key=aaab5aea8be43727a7055a906cfbe1add35c6a47')
    .then(res => res.json())
    .then(data => {
        emojiData = data
        loadEmoji(data)
    }
    )

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