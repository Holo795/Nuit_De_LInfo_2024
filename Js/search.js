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

        const apiKeyGoogle = '';
        const cx = '';

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
        } else {
            resultsContainer.innerHTML = "<p>Aucun résultat trouvé.</p>";
        }
    }

    // Fonction pour convertir les emojis en slugs
    async function convertEmojisToSlugs(query) {
        const apiKeyEmoji = "";
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
