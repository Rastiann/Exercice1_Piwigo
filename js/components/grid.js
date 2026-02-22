import { createElement } from "../functions/createElement.js";

/**
 * Crée la grille en fonction des versions PHP et Piwigo
 * @param {string[]} phpVersions
 * @param {string[]} piwigoVersions
 * @returns {HTMLElement} La grille générée
 */
export const createGrid = (phpVersions, piwigoVersions) => {
    const grid = document.querySelector(".chart");

    // Supprime le loader
    grid.replaceChildren();

    // Taille de la grille
    Object.assign(grid.style, {
        gridTemplateColumns: `repeat(${piwigoVersions.length + 1}, 1fr)`,
        gridTemplateRows: `repeat(${phpVersions.length + 1}, 40px)`
    });

    // Palette de couleurs possibles pour les cercles
    const palette = ["#f5f0ff", "#d6c8ff", "#ffe066", "#ff8a00"];

    // Case vide en haut à gauche
    grid.appendChild(createElement("div", { class: "cell" }));

    // Header Piwigo
    piwigoVersions.forEach(version => {
        const cell = createElement("div", { class: "cell" });
        cell.textContent = version;
        grid.appendChild(cell);
    });

    // Lignes PHP + cellules de données
    phpVersions.forEach(version => {
        // Colonne PHP
        const phpCell = createElement("div", { class: "cell" });
        phpCell.textContent = "PHP " + version;
        grid.appendChild(phpCell);

        // Cellules avec les cercles
        for (let i = 0; i < piwigoVersions.length; i++) {
            const dataCell = createElement("div", { class: "cell data" });

            /* --- calcul des valeurs du cerce --- */
            // à terme ces valeurs devraient etre récupérable via fetch et passer dans un objet exploitable
            // Mais pour l'instant elles sont juste générer aléatoirement ici
            const value = Math.random();

            const size = value * 100 - 20;
            const opacity = 0.2 + value * 0.7;

            const index = Math.floor(value * palette.length);
            const color = palette[index];

            const circle = createElement("div", { class: "circle" });

            Object.assign(circle.style, {
                width: size + "%",
                background: color,
                opacity: opacity
            });
            /* ----------------------------------- */

            // le petit pop up du nombre d'installations
            const dataInfo = createElement("div", { class: "dataInfo" });
            dataInfo.textContent = `${Math.floor(value * 300)} installations`;
            const arrow = createElement("div", { class: "arrow" });
            dataInfo.appendChild(arrow);


            dataCell.appendChild(circle);
            dataCell.appendChild(dataInfo);

            grid.appendChild(dataCell);
        }
    });

    return grid;
};