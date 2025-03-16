
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


const types = [
	".carto",
    ".poster",
	".diag",
	".r",
    ".terrain",
    ".photo",
];
var ongletActif = -1;

boutonAfficherTout = document.querySelector('#afficherTypeTout');
boutonAfficherTout.addEventListener("click", funcAfficherTypeTout);
boutonAfficherCarto = document.querySelector('#afficherTypeCarto');
boutonAfficherCarto.addEventListener("click", funcAfficherTypeCarto);
boutonAfficherPoster = document.querySelector('#afficherTypePoster');
boutonAfficherPoster.addEventListener("click", funcAfficherTypePoster);
boutonAfficherDiag = document.querySelector('#afficherTypeDiag');
boutonAfficherDiag.addEventListener("click", funcAfficherTypeDiag);
boutonAfficherR = document.querySelector('#afficherTypeR');
boutonAfficherR.addEventListener("click", funcAfficherTypeR);
boutonAfficherTerrain = document.querySelector('#afficherTypeTerrain');
boutonAfficherTerrain.addEventListener("click", funcAfficherTypeTerrain);
boutonAfficherPhoto = document.querySelector('#afficherTypePhoto');
boutonAfficherPhoto.addEventListener("click", funcAfficherTypePhoto);

function funcAfficherTypeTout() {
	ongletActif = -1;
	actualiserAffichage();
}

function funcAfficherTypeCarto() {
	ongletActif = 0;
	actualiserAffichage();
}

function funcAfficherTypePoster() {
	ongletActif = 1;
	actualiserAffichage();
}

function funcAfficherTypeDiag() {
	ongletActif = 2;
	actualiserAffichage();
}

function funcAfficherTypeR() {
	ongletActif = 3;
	actualiserAffichage();
}

function funcAfficherTypeTerrain() {
	ongletActif = 4;
	actualiserAffichage();
}

function funcAfficherTypePhoto() {
	ongletActif = 5;
	actualiserAffichage();
}


function actualiserAffichage() {
	types.forEach((t) => {
		tab = document.querySelectorAll(t);
		tab.forEach((projet) => {
			projet.style.display = "none";
		})
	})

	if ( ongletActif === -1 )
	{
		types.forEach((t) => {
			tab = document.querySelectorAll(t);
			tab.forEach((projet) => {
				projet.style.display = "initial";
			})
		})
	}
	else
	{
		tableau = document.querySelectorAll(types[ongletActif]);
		tableau.forEach((projet) => {
			projet.style.display = "initial";
		})
	}
}

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



document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".filter-button"); // Boutons de filtre
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const category = this.getAttribute("id").replace("afficherType", "").toLowerCase();

            portfolioItems.forEach(item => {
                if (category === "tout" || item.classList.contains(category)) {
                    item.classList.add("active"); // Agrandit
                    item.style.display = "block"; // Rend visible
                } else {
                    item.classList.remove("active"); // Réduit à sa taille normale
                    item.style.display = "none"; // Cache l'élément
                }
            });
        });
    });
});
