//                        Récupération des projets de l'architecte             //


const imagesContainer = document.querySelector('.gallery')
const reponse = fetch('http://localhost:5678/api/works')
    .then((reponse) => reponse.json())
    .then((data) => {
        data.forEach((work) => {
            const figure = document.createElement('figure')
            const figureCaption = document.createElement('figcaption')
            const figureImage = document.createElement('img')
            figureImage.src = work.imageUrl
            figureImage.alt = work.title
            figureCaption.innerHTML = work.title
            figure.className = work.category.name
            imagesContainer.appendChild(figure)
            figure.appendChild(figureImage)
            figure.appendChild(figureCaption)    
            
        });
    });
    
//                                  FILTRES                                 //

// Filtre Objets //
        
function filtreObjet(){
    //afficher les Objets//
    var elementObjets = document.querySelectorAll('.Objets');
    for (var i = 0; i < elementObjets.length; i++){
        elementObjets[i].style.display = 'block';
    }
    //cacher les autres travaux//
    var elementsAppartements = document.querySelectorAll(".Appartements");
    var elementsHotelRestaurants = document.querySelectorAll("[class*=Hotels][class*=restaurants]");
    for (var i = 0; i < elementsAppartements.length; i++){
        elementsAppartements[i].style.display = 'none';
    }
    for (var j = 0; j < elementsHotelRestaurants.length; j++){
        elementsHotelRestaurants[j].style.display = 'none';
    }
}
var bouton = document.getElementById('btnObjet');
bouton.addEventListener('click',filtreObjet);
              
       
// Filtre Hotel & resutaurants //
        
function filtreHotelsRestaurants(){
    //afficher les Hotels & restaurants//
    var elementsHotelRestaurants = document.querySelectorAll("[class*=Hotels][class*=restaurants]");
    for (var i = 0; i < elementsHotelRestaurants.length; i++){
        elementsHotelRestaurants[i].style.display = 'block';
    }
    //cacher  les autrex travaux//
    var elementsAppartements = document.querySelectorAll('.Appartements');
    var elementsObjets = document.querySelectorAll('.Objets');
    for (var i = 0; i < elementsAppartements.length; i++){
        elementsAppartements[i].style.display = 'none';
    }
    for (var j = 0; j < elementsObjets.length; j++){
        elementsObjets[j].style.display = 'none';
    }
}
var bouton = document.getElementById('btnHotelRestaurant');
bouton.addEventListener('click',filtreHotelsRestaurants);
        
// Filtre Appartements //

function filtreAppartements(){      
    //afficher les Appartements//
    var elementsAppartements = document.querySelectorAll('.Appartements');
    for(var i = 0; i < elementsAppartements.length; i++){
        elementsAppartements[i].style.display = 'block';
    }
    //cacher le autrex travaux//
    var elementsObjets = document.querySelectorAll('.Objets');
    var elementsHotelRestaurants = document.querySelectorAll("[class*=Hotels][class*=restaurants]");
    for (var j = 0; j < elementsObjets.length; j++){
        elementsObjets[j].style.display = 'none';
    }
    for(var j= 0; j < elementsHotelRestaurants.length; j++){
        elementsHotelRestaurants[j].style.display = 'none';
    }
}
var bouton = document.getElementById('btnAppartement');
bouton.addEventListener('click',filtreAppartements);

// Filtre Tous //

function filtreTous(){
    //Afficher tout les travaux//
    var elementsObjets = document.querySelectorAll('.Objets');
    var elementsAppartements = document.querySelectorAll('.Appartements');
    var elementsHotelRestaurants = document.querySelectorAll("[class*=Hotels][class*=restaurants]");
    for (var i = 0; i < elementsObjets.length; i++){
        elementsObjets[i].style.display = 'block';
    }
    for(var i = 0; i < elementsAppartements.length; i++){
        elementsAppartements[i].style.display = 'block';
    }
    for (var i = 0; i < elementsHotelRestaurants.length; i++){
        elementsHotelRestaurants[i].style.display = 'block';
    }
}
var bouton = document.getElementById('btnTous');
bouton.addEventListener('click',filtreTous);



const boutons = document.querySelectorAll('.bouton-css');


// Fonction qui garde le bouton filtre selectionné//

boutons.forEach((bouton) => {
    bouton.addEventListener('click', function() {
      // Supprime la classe "selected" de tous les boutons
      boutons.forEach((bouton) => {
        bouton.classList.remove('selected');
      });
      // Ajoute la classe "selected" au bouton cliqué
      this.classList.add('selected');
      // Stocke l'ID du bouton cliqué dans le stockage local
      localStorage.setItem('boutonSelectionne', this.id);
    });
  });

  // Vérifie si un bouton a été sélectionné précédemment
  const boutonSelectionne = localStorage.getItem('boutonSelectionne');
  if (boutonSelectionne) {
    // Ajoute la classe "selected" au bouton correspondant
    const bouton = document.getElementById(boutonSelectionne);
    bouton.classList.add('selected');
  }

  window.onbeforeunload = function(){
    localStorage.removeItem('boutonSelectionne');
  }



