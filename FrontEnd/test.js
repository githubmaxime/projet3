const imagesContainer = document.querySelector('.gallery');

function createGallery(works) {
    works.forEach((work) => {
        const figure = document.createElement('figure');
        const figureCaption = document.createElement('figcaption');
        const figureImage = document.createElement('img');
        figureImage.src = work.imageUrl;
        figureImage.alt = work.title;
        figureCaption.innerHTML = work.title;
        figure.className = work.category.name;
        imagesContainer.appendChild(figure);
        figure.appendChild(figureImage);
        figure.appendChild(figureCaption);
    });
}

fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        fetch('http://localhost:5678/api/categories')
            .then(response => response.json())
            .then(categories => {
                let node = '<h2>Mes Projets</h2> <div class="filter"><button id="all">Tous</button>';
                for (let i = 0; i < categories.length; i++) {
                    node += `<button class="category" data-id=${categories[i].id}>${categories[i].name}</button>`;
                };
                node += '</div>';
                document.getElementById('portfolio').insertAdjacentHTML('afterbegin', node);

                const allBtn = document.getElementById('all');
                allBtn.addEventListener('click', () => {
                    createGallery(data);
                });

                const categoryBtns = document.querySelectorAll('.category');
                categoryBtns.forEach(btn => {
                    btn.addEventListener('click', (event) => {
                        const categoryId = parseInt(event.target.getAttribute('data-id'));
                        const worksByCategory = data.filter(work => work.categoryId === categoryId);
                        createGallery(worksByCategory);
                    });
                });

            });

    });



    //PARTIE LOGIN//

const loginStatus = document.querySelector("#login")
const logoutStatus = document.querySelector("#logout")
const adminStatus = document.querySelector("#admin-logged",)
const figureModify = document.querySelector("#figure-modify")
const portfolioModify = document.querySelector("#portfolio-l-modify")

console.log(sessionStorage.getItem("isConnected"));

if (JSON.parse(sessionStorage.getItem("isConnected"))) {
    loginStatus.style.display = 'none'
    logoutStatus.style.display = 'block'
    adminStatus.style.display = 'flex'
    figureModify.style.display = 'flex'
    portfolioModify.style.display = 'flex'

} else {
    loginStatus.style.display = 'block'
    logoutStatus.style.display = 'none'
    adminStatus.style.display = 'none'
    figureModify.style.display = 'none'
    portfolioModify.style.display = 'none'
}

logoutStatus.addEventListener("click", (event) => {
    event.preventDefault();
    sessionStorage.removeItem("Token");
    // Réinitialiser l'état de connexion de l'utilisateur
    sessionStorage.removeItem("isConnected");
    console.log(sessionStorage.getItem("isConnected")); 
    window.location.replace("index.html");
});