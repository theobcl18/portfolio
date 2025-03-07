
// carrousel.js

// Sélectionne tous les carrousels sur la page
const carousels = document.querySelectorAll('.carousel');

// Pour chaque carrousel trouvé
carousels.forEach((carousel, index) => {
    const images = carousel.querySelectorAll('.carousel-image'); // Récupère toutes les images du carrousel
    let currentIndex = 0; // Commence par la première image

    // Affiche la première image
    images[currentIndex].classList.add('active');
    
    // Fonction pour afficher l'image suivante
    function showNextImage() {
        images[currentIndex].classList.remove('active'); // Cacher l'image actuelle
        currentIndex = (currentIndex + 1) % images.length; // Passer à l'image suivante (ou revenir à la première après la dernière)
        images[currentIndex].classList.add('active'); // Afficher la nouvelle image
    }

    // Fonction pour afficher l'image précédente
    function showPreviousImage() {
        images[currentIndex].classList.remove('active'); // Cacher l'image actuelle
        currentIndex = (currentIndex - 1 + images.length) % images.length; // Passer à l'image précédente (ou revenir à la dernière après la première)
        images[currentIndex].classList.add('active'); // Afficher la nouvelle image
    }

    // Créer et ajouter les boutons de navigation gauche et droite
    const leftArrow = document.createElement('button');
    leftArrow.classList.add('carousel-arrow', 'left');
    leftArrow.innerHTML = '&#10094;'; // Symbole flèche gauche
    leftArrow.addEventListener('click', showPreviousImage); // Lorsqu'on clique, afficher l'image précédente

    const rightArrow = document.createElement('button');
    rightArrow.classList.add('carousel-arrow', 'right');
    rightArrow.innerHTML = '&#10095;'; // Symbole flèche droite
    rightArrow.addEventListener('click', showNextImage); // Lorsqu'on clique, afficher l'image suivante

    // Ajouter les flèches au carrousel
    carousel.appendChild(leftArrow);
    carousel.appendChild(rightArrow);

    // Ajouter un attribut data-index pour chaque carrousel afin de garder une trace de l'image actuelle
    carousel.setAttribute('data-index', currentIndex);
});




const docs = [
    {
        title: "Carte de densité de haies",
        description:"Dossier cartographique, UE SIG et CARTOGRAPHIE",
        url: "https://github.com/theobcl18/portfolio/blob/main/docs/RenduV8paysage_CC_07_02_.pdf",
        tags: ["Cartographies"]
    },
    {title: "Carte de densité de haies",
        description: "Dossier cartographique, UE SIG et CARTOGRAPHIE",
        url: "https://github.com/theobcl18/portfolio/blob/main/docs/rendu_cc_geoprocessing_mm.pdf",
        tags: ["Cartographies"]
    }
];
        // Ajoutez d'autres objets de documents ici si nécessaire



        const docContainer = document.querySelector(".docs");

const tagColors = {
    "Tous mes travaux": "grey",
    Cartographies: "blue",
    "Infographies et posters": "green",
    "Terrain et techniques d'enquêtes": "red",
    "Diagnostic de territoire": "black",
    Code: "yellow",
    "Télédétection": "pink"
};

const docSelection = document.querySelector(".tag-selection");

// Création du modal pour l'affichage de l'image en plein écran
const modal = document.createElement('div');
modal.classList.add('modal');
document.body.appendChild(modal);

// Création du contenu du modal
modal.innerHTML = `
  <div class="modal-content">
    <span class="close">&times;</span>
    <img id="modal-image" src="" alt="Document Image">
    <p id="modal-text" class="modal-text"></p>
  </div>
`;

// Sélection des éléments du modal
const modalImage = modal.querySelector('#modal-image');
const modalText = modal.querySelector('#modal-text');
const closeModal = modal.querySelector('.close');

// Fermeture du modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fermeture du modal en cliquant en dehors du contenu
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Affichage immédiat des documents au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    filterDocs(); // Affiche tous les documents au chargement
});

// Gestion de l'événement de clic sur le conteneur des documents
docContainer.addEventListener("click", function (e) {
    const tagItem = e.target.closest(".docs__tag");
    if (!tagItem) return;
    const tag = tagItem.textContent;
    highlightTag(tag);
    filterDocs(tag);
});

// Gestion de l'événement de clic sur la sélection de tags
docSelection.addEventListener("click", function (e) {
    const tagItem = e.target.closest(".docs__tag");
    if (!tagItem) return;
    const tag = tagItem.textContent;
    if (tagItem.classList.contains("tag-inactive")) {
        highlightTag(tag);
        filterDocs(tag);
    } else {
        highlightTag();
        filterDocs();
    }
});

// Fonction pour filtrer les documents
function filterDocs(tag = "Tous mes travaux") {
    if (tag === "Tous mes travaux") return printDocs(docs);
    const filteredDocs = docs.filter((doc) => doc.tags.includes(tag));
    printDocs(filteredDocs);
}

// Fonction pour mettre en évidence le tag sélectionné
function highlightTag(tag = "Tous mes travaux") {
    docSelection.querySelectorAll("p").forEach((tagSelect) => {
        if (tagSelect.textContent === tag) tagSelect.classList.remove("tag-inactive");
        else tagSelect.classList.add("tag-inactive");
    });
}

// Fonction pour afficher les documents
function printDocs(docArray) {
    docContainer.innerHTML = ""; // Réinitialise le conteneur

    docArray.forEach((doc) => {
        let tags = "";
        doc.tags.forEach((tag) => {
            const tagHTML = `
                <p class="docs__tag docs__tag--${tagColors[tag] ? tagColors[tag] : "grey"}">${tag}</p>
            `;
            tags += tagHTML;
        });

        const html = `
            <div class="portfolio-item">
                <img src="${doc.url}" alt="${doc.title}" data-title="${doc.title}" data-description="${doc.description}">
                <div>
                    <h3>${doc.title}</h3>
                </div>
                <div class="docs__tags">
                    ${tags}
                </div>
            </div>
        `;

        docContainer.insertAdjacentHTML("beforeend", html);
    });

    // Ajout d'un gestionnaire d'événements pour les images
    const docImages = document.querySelectorAll(".portfolio-item img");
    docImages.forEach((img) => {
        img.addEventListener("click", (e) => {
            const target = e.target;
            modalImage.src = target.src;
            modalText.textContent = target.dataset.description;
            modal.style.display = 'block';
        });
    });
}
// Sélectionnez tous les tags
const tags = document.querySelectorAll('.docs__tag');

// Ajoutez un événement de clic à chaque tag
tags.forEach(tag => {
    tag.addEventListener('click', () => {
        // Retirez la classe "active" de tous les tags
        tags.forEach(t => t.classList.remove('active'));
        
        // Ajoutez la classe "active" au tag cliqué
        tag.classList.add('active');
        
        // Filtrer les documents par tag
        const tagText = tag.textContent;
        filterDocs(tagText); // Appelez votre fonction pour filtrer les documents
    });
});
