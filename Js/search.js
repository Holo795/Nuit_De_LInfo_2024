const emojiList = document.getElementById('emojiList');

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
    .then(data => loadEmoji(data))

function loadEmoji(data){
    data.forEach(emoji => {
        let li = document.createElement('li');
        li.setAttribute('emoji-name', emoji.slug);
        li.textContent =  emoji.character;
        li.classList.add(
            'p-0',
            'm-0',
            'align-middle',
            'w-10',
            'text-2xl'

            
        );
        emojiList.appendChild(li); 
    });

}