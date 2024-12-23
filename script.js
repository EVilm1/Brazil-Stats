// Utilisation de la date manuelle pour aujourd'hui
let manualToday = new Date("2024-12-22");

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

// Calcul des durées
const today = new Date();
//const today = new Date("2025-03-09");
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
progressBar.style.width = `${progressPercentage}%`;

// Ajouter un élément <span> pour afficher le pourcentage
const percentageText = document.createElement("span");
percentageText.textContent = `${progressPercentage.toFixed(2)}%`;
progressBar.appendChild(percentageText);

// Gestion des périodes grises
const greyPeriods = [
    { start: new Date("2024-10-26"), end: new Date("2024-11-03") },
    { start: new Date("2024-12-20"), end: new Date("2025-02-03") },
    { start: new Date("2025-02-28"), end: new Date("2025-03-09") },
    { start: new Date("2025-04-17"), end: new Date("2025-04-21") },
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
adjustedProgressElement.textContent = `Progression hors vacances : ${adjustedProgressPercentage.toFixed(2)}%`;

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

// Affichage des jours avant le 1er janvier 2025
document.getElementById("days-to-new-year").innerHTML = `
    ${daysToNewYear > 0 ? `Il reste <strong>${daysToNewYear}</strong> jours avant le 1er janvier 2025.` 
                        : `Le 1er janvier 2025 est déjà passé.`}
`;

// Affichage des jours avant le 2 février 2025
document.getElementById("days-to-jan22").innerHTML = `
    ${daysToFev2 > 0 ? `Il reste <strong>${daysToFev2}</strong> jours avant le 2 février 2025.` 
                      : `Le 2 février 2025 est déjà passé.`}
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
