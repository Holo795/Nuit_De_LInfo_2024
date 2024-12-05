document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Empêcher la soumission classique du formulaire
        const query = document.getElementById("query").value;
        displayCustomSearchResults(query); // Lancer la recherche personnalisée
    });

    // Fonction pour afficher les résultats personnalisés via Google Custom Search
    async function displayCustomSearchResults(query) {
        const resultsContainer = document.getElementById("resultsContainer");
        if (!resultsContainer) return;

        const apiKeyGoogle = 'AIzaSyB-G1hAg7EbZVtSsxrjL0Sjm2cER69QUOk';
        const cx = '20a985c2483854fa3';

        // Traduire les emojis en slugs
        const querySlugs = await convertEmojisToSlugs(query);

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
        } else {
            resultsContainer.innerHTML = "<p>Aucun résultat trouvé.</p>";
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

        // Extraire chaque caractère de la chaîne et récupérer le slug si c'est un emoji
        const slugs = Array.from(query)
            .map((char) => emojiMap.get(char) || char) // Remplace les emojis par leurs slugs
            .filter((slug) => typeof slug === "string"); // Filtre pour éliminer les caractères non reconnus

        return slugs.join(" "); // Retourner une chaîne de slugs séparés par des espaces
    }

});
