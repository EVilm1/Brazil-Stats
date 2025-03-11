// Format personnalisé pour afficher les dates
function formatDate(date) {
    return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

// Format pour afficher un jour en toutes lettres
function formatDay(date) {
    return date.toLocaleDateString("fr-FR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
}

// Fonction pour forcer les heures d'une date à minuit
function setToMidnight(date) {
    date.setHours(0, 0, 0, 0);
    return date;
}

// Dates principales
const startDate = new Date("2024-08-29");
const endDate = new Date("2025-05-21");
const middleDate = new Date((startDate.getTime() + endDate.getTime()) / 2); // Calcul de la date du milieu
const fourthNov = new Date("2024-11-04");
const firstJan = new Date("2025-01-01");

// Calcul des durées
const today = new Date();
//const today = new Date("2024-09-30");
const totalDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
const daysPassed = Math.round((today - startDate) / (1000 * 60 * 60 * 24));
const daysRemaining = totalDays - daysPassed;

// Calcul pour le 1er janvier 2025
const newYearDate = new Date("2025-01-01");
const daysToNewYear = Math.round((newYearDate - today) / (1000 * 60 * 60 * 24));

// Calcul pour le 2 février 2025
const fev2Date = new Date("2025-02-02");
const daysToFev2 = Math.round((fev2Date - today) / (1000 * 60 * 60 * 24));

// Calcul du pourcentage de progression
const progressPercentage = Math.min((daysPassed / totalDays) * 100, 100);

// Mise à jour de la barre de progression
const progressBar = document.getElementById("progress-bar");
//progressBar.style.width = `${progressPercentage}%`;
progressBar.style.width = "0%"; // La barre commence à 0 et sera animée


// Ajouter un élément <span> pour afficher le pourcentage
const percentageText = document.createElement("span");
percentageText.textContent = `${progressPercentage.toFixed(2)}%`;
progressBar.appendChild(percentageText);

// Gestion des périodes grises
const greyPeriods = [
    { start: new Date("2024-10-26"), end: new Date("2024-11-03") },
    { start: new Date("2024-12-20"), end: new Date("2025-02-02") },
    { start: new Date("2025-02-28"), end: new Date("2025-03-09") },
    { start: new Date("2025-04-17"), end: new Date("2025-04-21") },
    { start: new Date("2025-05-01"), end: new Date("2025-05-04") },
    { start: new Date("2025-05-14"), end: new Date("2025-05-21") },
];

greyPeriods.forEach((period, index) => {
    const greyOverlay = document.getElementById(`grey-overlay-${index + 1}`);
    if (greyOverlay) {
        const startPercentage = Math.max(0, ((period.start - startDate) / (endDate - startDate)) * 100);
        const endPercentage = Math.min(100, ((period.end - startDate) / (endDate - startDate)) * 100);
        const widthPercentage = Math.max(0, endPercentage - startPercentage);

        greyOverlay.style.left = `${startPercentage}%`;
        greyOverlay.style.width = `${widthPercentage}%`;
    }
});

// Ajustement des périodes grisées pour le calcul de progression
let totalNonGreyTime = endDate - startDate; // Temps total sans ajustement
let elapsedNonGreyTime = today - startDate; // Temps écoulé sans ajustement

greyPeriods.forEach((period) => {
    const greyDuration = period.end - period.start;
    totalNonGreyTime -= greyDuration;

    if (today > period.start) {
        const overlapStart = Math.max(period.start, startDate);
        const overlapEnd = Math.min(period.end, today);
        if (overlapStart < overlapEnd) {
            elapsedNonGreyTime -= overlapEnd - overlapStart;
        }
    }
});

const adjustedProgressPercentage = (elapsedNonGreyTime / totalNonGreyTime) * 100;

// Afficher le pourcentage ajusté
const adjustedProgressElement = document.getElementById("adjusted-progress");
adjustedProgressElement.textContent = `Progression des cours uniquement : ${adjustedProgressPercentage.toFixed(2)}%`;

// Affichage des statistiques principales
document.getElementById("date-range").textContent = 
    `Période : du ${formatDate(startDate)} au ${formatDate(endDate)}`;

document.getElementById("stats").innerHTML = `
    <p class="stat">Jours totaux : <strong>${totalDays}</strong></p>
    <p class="stat">Jours passés : <strong>${daysPassed}</strong></p>
    <p class="stat">Jours restants : <strong>${daysRemaining}</strong></p>
    <p class="stat">Progression : <strong>${progressPercentage.toFixed(2)}%</strong></p>
    <p class="stat">Jour du milieu : <strong>${formatDay(middleDate)}</strong></p>
`;

// Calcul du pourcentage du temps écoulé entre le 4 novembre 2024 et la date de fin
const elapsedTimePercentage4nov = ((today - fourthNov) / (endDate - fourthNov)) * 100;
// Calcul du pourcentage du temps écoulé entre le 1 janvier 2025 et la date de fin
const elapsedTimePercentage1jan = ((today - firstJan) / (endDate - firstJan)) * 100;

// Affichage du résultat dans l'élément HTML
document.getElementById("percentage-4-nov").innerHTML = `
    ${today >= startDate && today <= endDate 
        ? `Il s'est écoulé <strong>${elapsedTimePercentage4nov.toFixed(2)}</strong>% du temps entre le 4 novembre 2024 et la fin.` 
        : today < startDate 
            ? `La période n'a pas encore commencé.` 
            : `La période est terminée.`}
`;

// Affichage du résultat dans l'élément HTML
document.getElementById("percentage-1-jan").innerHTML = `
    ${today >= startDate && today <= endDate 
        ? `Il s'est écoulé <strong>${elapsedTimePercentage1jan.toFixed(2)}</strong>% du temps entre le 1 janvier 2025 et la fin.` 
        : today < startDate 
            ? `La période n'a pas encore commencé.` 
            : `La période est terminée.`}
`;

// Gestion si la date actuelle est hors de la plage
if (today < startDate) {
    document.getElementById("stats").innerHTML = "<p>La période principale n'a pas encore commencé.</p>";
}
if (today > endDate) {
    document.getElementById("stats").innerHTML = "<p>La période principale est terminée.</p>";
}

//--------------------------------------------------------------------------------------------

// Conteneur principal de la barre de progression
const progressBarContainer = document.querySelector(".progress-bar-container");

let firstMonday = new Date("2024-09-01");

// Fonction pour calculer les positions des lundis
function addMondayMarkers() {
    let currentDate = new Date(firstMonday); // Clone de la date de début

    // Boucle pour ajouter un trait noir pour chaque lundi jusqu'à endDate
    while (currentDate <= endDate) {
        const mondayPosition = ((currentDate - startDate) / (endDate - startDate)) * 100;

        // Créer une nouvelle div pour représenter un trait noir
        const blackLine = document.createElement("div");
        blackLine.classList.add("black-line");
        blackLine.style.left = `${mondayPosition}%`;

        // Ajouter la div dans le conteneur de la barre de progression
        progressBarContainer.appendChild(blackLine);

        // Passer au lundi suivant
        currentDate.setDate(currentDate.getDate() + 7);
    }
}
addMondayMarkers();

//--------------------------------------------------------------------------------------------

// Ajoute un écouteur d'événement au champ de sélection de date
document.getElementById("date").addEventListener("input", handleSelectedDate);

// Fonction pour ajouter un marqueur à la barre de progression
function addMarkerForDate(date, percentage) {
    const existingMarker = document.querySelector(".marker");
    if (existingMarker) {
        existingMarker.remove(); // Supprime le marqueur existant
    }

    const markerPosition = ((date - startDate) / (endDate - startDate)) * 100;

    // Vérifie que la date est bien dans l'intervalle
    if (markerPosition < 0 || markerPosition > 100) {
        alert("La date sélectionnée est hors de la période.");
        return;
    }

    // Crée un marqueur visuel
    const marker = document.createElement("div");
    marker.classList.add("marker");
    marker.style.left = `${markerPosition}%`;

    // Ajoute un élément pour afficher le pourcentage à côté du marqueur
    const percentageLabel = document.createElement("span");
    percentageLabel.classList.add("percentage-label");
    percentageLabel.textContent = `${percentage.toFixed(2)}%`;

    // Place le pourcentage au-dessus du marqueur
    marker.appendChild(percentageLabel);

    // Ajoute le marqueur dans le conteneur de la barre de progression
    progressBarContainer.appendChild(marker);
}

// Fonction pour gérer la date sélectionnée dynamiquement
function handleSelectedDate(event) {
    const selectedDate = new Date(event.target.value);

    // Vérifie si la date est valide
    if (!isNaN(selectedDate)) {
        // Calcule le pourcentage de temps écoulé entre startDate et la date sélectionnée
        const elapsedPercentage = ((selectedDate - startDate) / (endDate - startDate)) * 100;

        // Ajoute un marqueur pour la date sélectionnée avec le pourcentage
        addMarkerForDate(selectedDate, elapsedPercentage);
    } else {
        alert("Veuillez sélectionner une date valide.");
    }
}

//---------------------------------------ANIM--------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".container, .containerLarge");
    const progressBar = document.getElementById("progress-bar");

    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add("visible");
        }, index * 600);
    });

    // Démarre la barre de progression après l'apparition des 3 blocs
    setTimeout(() => {
        //progressBar.style.width = "100%"; // Fait apparaître la barre en l'animant
    }, elements.length * 1200 + 500); // Ajoute un délai après le dernier élément
});

// Fonction d'animation de la progression
function animateProgressBar(targetPercentage) {
    let currentPercentage = 0;
    const increment = targetPercentage / 100; // Vitesse d'animation

    function step() {
        if (currentPercentage < targetPercentage) {
            currentPercentage += increment;
            progressBar.style.width = `${currentPercentage}%`;
            percentageText.textContent = `${currentPercentage.toFixed(2)}%`;
            requestAnimationFrame(step);
        } else {
            progressBar.style.width = `${targetPercentage}%`;
            percentageText.textContent = `${targetPercentage.toFixed(2)}%`;
        }
    }

    requestAnimationFrame(step);
}

// Lancer l'animation avec la valeur calculée
animateProgressBar(progressPercentage);
