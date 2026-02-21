import { fetchAllVersions } from "./js/functions/api.js"
import { createGrid } from "./js/components/grid.js"

// Permet de fetch les versions de php et piwigo
fetchAllVersions()
    .then(({ phpVersions, piwigoVersions }) => {

        // Créer la grille en fonction des versions puis l'ajoute à la page
        const grid = createGrid(phpVersions, piwigoVersions)
        const container = document.querySelector("#container")
        container.appendChild(grid)
    })
    .catch((e) => console.log(e))
