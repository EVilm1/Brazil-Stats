// Format personnalisé pour afficher les dates
function formatDate(date) {
    return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

// Format pour afficher un jour en toutes lettres
function formatDay(date) {
    return date.toLocaleDateString("fr-FR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
}

// Dates principales
const startDate = new Date("2024-08-28");
const endDate = new Date("2025-05-21");
const middleDate = new Date((startDate.getTime() + endDate.getTime()) / 2); // Calcul de la date du milieu

// Calcul des durées
const today = new Date();
const totalDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
const daysPassed = Math.round((today - startDate) / (1000 * 60 * 60 * 24));
const daysRemaining = totalDays - daysPassed;

// Calcul pour le 1er janvier 2025
const newYearDate = new Date("2025-01-01");
const daysToNewYear = Math.round((newYearDate - today) / (1000 * 60 * 60 * 24));

// Calcul pour le 22 janvier 2025
const jan22Date = new Date("2025-01-22");
const daysToJan22 = Math.round((jan22Date - today) / (1000 * 60 * 60 * 24));

// Affichage des statistiques principales
document.getElementById("date-range").textContent = 
    `Période : du ${formatDate(startDate)} au ${formatDate(endDate)}`;

document.getElementById("stats").innerHTML = `
    <p class="stat">Jours totaux : <strong>${totalDays}</strong></p>
    <p class="stat">Jours passés : <strong>${daysPassed}</strong></p>
    <p class="stat">Jours restants : <strong>${daysRemaining}</strong></p>
    <p class="stat">Pourcentage effectué : <strong>${((daysPassed / totalDays) * 100).toFixed(2)}%</strong></p>
    <p class="stat">Jour du milieu : <strong>${formatDay(middleDate)}</strong></p>
`;

// Affichage des jours avant le 1er janvier 2025
document.getElementById("days-to-new-year").innerHTML = `
    ${daysToNewYear > 0 ? `Il reste <strong>${daysToNewYear}</strong> jours avant le 1er janvier 2025.` 
                        : `Le 1er janvier 2025 est déjà passé.`}
`;

// Affichage des jours avant le 22 janvier 2025
document.getElementById("days-to-jan22").innerHTML = `
    ${daysToJan22 > 0 ? `Il reste <strong>${daysToJan22}</strong> jours avant le 22 janvier 2025.` 
                      : `Le 22 janvier 2025 est déjà passé.`}
`;

// Gestion si la date actuelle est hors de la plage
if (today < startDate) {
    document.getElementById("stats").innerHTML = "<p>La période principale n'a pas encore commencé.</p>";
}
if (today > endDate) {
    document.getElementById("stats").innerHTML = "<p>La période principale est terminée.</p>";
}
