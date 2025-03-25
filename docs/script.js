
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
            projet.querySelector('.portfolio-item').classList.remove("active"); // Retire l'effet d'agrandissement
            
		});
	});

	if ( ongletActif === -1 )
	{
		types.forEach((t) => {
			tab = document.querySelectorAll(t);
			tab.forEach((projet) => {
				projet.style.display = "initial";
                projet.querySelector('.portfolio-item').classList.remove("active"); // Pas d'agrandissement pour "Tous"
                
			});
		});
	}
	else
	{
		tableau = document.querySelectorAll(types[ongletActif]);
		tableau.forEach((projet) => {
			projet.style.display = "initial";
            projet.classList.add("active"); // Ajoute l'effet d'agrandissement
            projet.querySelector('.portfolio-item').classList.add("active"); // Ajoute l'effet d'agrandissement
		});
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





// Création d'un fond avec des particules

const canvas = document.getElementById("canvas"); // Déclaration unique en global
const ctx = canvas.getContext("2d");

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setupCanvas();


const particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 6 + 2; // Taille aléatoire
        this.dx = (Math.random() - 0.5) * 2; // Vitesse X
        this.dy = (Math.random() - 0.5) * 2; // Vitesse Y
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`; // Blanc transparent
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx *= -1; // Rebond horizontal
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy *= -1; // Rebond vertical
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function initParticles(count) {
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

// Animation des particules
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Mettre à jour et dessiner chaque particule
    particles.forEach(particle => {
        particle.move();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

initParticles(50); // Nombre de particules
animate(); // Démarrer l'animation

