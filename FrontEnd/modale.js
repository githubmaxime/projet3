//MODAL//

const modal = document.querySelector('#modal');
const modalContent = document.querySelector('#modal-content');
const modalPhoto = document.querySelector('#modal-photo');
const modalClose = document.querySelector('#modal-close');

function showModal() {
  modal.style.display = 'block';
}

function hideModal() {
  modal.style.display = 'none';
}

modalContent.addEventListener('click', function (e) {
  e.stopPropagation();
});
modalPhoto.addEventListener('click', function (e) {
  e.stopPropagation();
});

modalClose.addEventListener('click', hideModal);


modal.addEventListener('click', hideModal);


//Modale IMG//

const newPhotoBtn = document.querySelector('#new-photo');
const returnBtn = document.querySelector('#modal-return');
const modalPhotoClose = document.querySelector("#modal-photo-close");


newPhotoBtn.addEventListener('click', function () {
  modalContent.style.display = 'none';
  modalPhoto.style.display = 'block';
});

returnBtn.addEventListener('click', function () {
  modalContent.style.display = 'flex';
  modalPhoto.style.display = 'none';
})

modalPhotoClose.addEventListener('click', hideModal);



//Ajout travaux à la modale//

const imagesModalContainer = document.querySelector('.gallery-modal')

function createModalWorkFigure(work) {
  const figure = document.createElement('figure')
  const figureCaption = document.createElement('figcaption')
  const figureImage = document.createElement('img')
  const deleteIcon = document.createElement('i')

  figureImage.src = work.imageUrl
  figureImage.alt = work.title
  figureCaption.innerHTML = "éditer"
  figure.setAttribute('data-id', work.id);
  deleteIcon.className = "fa-regular fa-trash-can"

  figure.appendChild(figureImage)
  figure.appendChild(figureCaption)
  figure.appendChild(deleteIcon)

  // Ajouter un événement de suppression en cliquant sur l'icône "supprimer"

  deleteIcon.addEventListener('click', (event) => {
    event.preventDefault();
    deleteWorkById(work.id);
  });

  return figure;
}

fetch('http://localhost:5678/api/works')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((work) => {
      const figure = createModalWorkFigure(work);
      imagesModalContainer.appendChild(figure);
    });
  });


//Suppression travaux//

function deleteWorkById(workId) {
  const token = sessionStorage.getItem("Token");
  const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce travail ?");
  if (confirmation) {
    fetch(`http://localhost:5678/api/works/${workId}`, {
      method: 'DELETE',
      headers: {
        "Accept": 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new error('La supression du travai à echoué.');
        }
        const modalWorkToRemove = document.querySelector(`figure[data-id="${workId}"]`);
        if (modalWorkToRemove) {
          modalWorkToRemove.remove();

          const galleryWorkToRemove = document.querySelector(`figure[data-id="${workId}"]`);
          if (galleryWorkToRemove) {
            galleryWorkToRemove.remove();
          } else {
            console.error('Élément à supprimer non trouvé dans la galerie principale');
          }
        } else {
          console.error('Élément à supprimer non trouvé dans la modale');
        }
      })
      .catch(error => console.error(error));
  }
}

//Suppression de toute la galerie//

function deleteGallery() {
  const token = sessionStorage.getItem("Token");
  const galleryWorks = document.querySelectorAll('.gallery-modal figure, .gallery figure');
  galleryWorks.forEach((galleryWork) => {
    const workId = galleryWork.getAttribute('data-id');
    fetch(`http://localhost:5678/api/works/${workId}`, {
      method: 'DELETE',
      headers: {
        "Accept": 'application/json',
        "Authorization": `Bearer ${token}`
      }
    });
    galleryWork.remove();
  });
}

document.getElementById("delete-gallery").addEventListener("click", function () {
  const confirmation = confirm("Êtes-vous sûr de vouloir supprimer la galerie ?");
  if (confirmation) {
    deleteGallery();
  }
});

//Formulaire rempli//

const titleInput = document.getElementById('modal-photo-title');
const categorySelect = document.getElementById('modal-photo-category');
const imageInput = document.getElementById('image');
const submitButton = document.getElementById('modal-valider');

function checkForm() {
  if (titleInput.value !== '' && categorySelect.value !== '' && imageInput.value !== '') {
    submitButton.style.backgroundColor = '#1D6154';
  } else {
    submitButton.style.backgroundColor = '';
  }
}


titleInput.addEventListener('input', checkForm);
categorySelect.addEventListener('change', checkForm);
imageInput.addEventListener('change', checkForm);


//Ajout nouveaux travaux//

const btnValider = document.getElementById("modal-valider");
btnValider.addEventListener("click", addNewWork);

function addNewWork(event) {
  event.preventDefault();

  const token = sessionStorage.getItem("Token");

  const title = document.getElementById("modal-photo-title").value;
  const category = document.getElementById("modal-photo-category").value;
  const image = document.getElementById("image").files[0];
  document.getElementById('form-photo-div').innerHTML = `<img src=${image}/>`

  if (!title || !category || !image) {
    alert('Veuillez remplir tous les champs du formulaire.')
    return;
  }

  //Vérification de la taille de l'IMG//
  if (image.size > 4 * 1024 * 1024) {
    alert("La taille de l'image ne doit pas dépasser 4 Mo.");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", image);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      "Accept": 'application/json',
      "Authorization": `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(work => {
      //Créer et ajoute les travaux dans la galerie//
      console.log(work)
      const gallery = document.querySelector('.gallery');

      //Créer et ajoute les travaux dans la modale//
      const figureModal = createModalWorkFigure(work);
      const galleryModal = document.querySelector('.gallery-modal');
      galleryModal.appendChild(figureModal);
      hideModal()
      location.reload()
    })
    .catch(error => console.error(error));
}

//Prévisualisation IMG//
const inputImage = document.getElementById("image");
const labelImage = document.getElementById("label-image");
const pImage = document.querySelector("#form-photo-div > p");
const iconeImage = document.querySelector("#form-photo-div i");

inputImage.addEventListener("change", function () {
  const selectedImage = inputImage.files[0];
  console.log(selectedImage)

  const imgPreview = document.createElement("img");
  imgPreview.src = URL.createObjectURL(selectedImage);
  imgPreview.style.maxHeight = "100%";
  imgPreview.style.width = "auto";

  labelImage.style.display = "none";
  pImage.style.display = "none";
  inputImage.style.display = "none";
  console.log(imgPreview)
  iconeImage.style.display = "none";
  document.getElementById("form-photo-div").appendChild(imgPreview);
});
