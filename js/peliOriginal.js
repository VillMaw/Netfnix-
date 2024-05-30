
let currentPage = 1;
const resultsPerPage = 20;
let peliculas = []; // Almacena los resultados de búsqueda

function buscarPelicula() {
    const apiKey = '9d94a5948850daa4a43141576ba19b24'; // Reemplaza con tu clave de API de TMDB
    const query = document.getElementById('searchInput').value;

    // Agregamos el parámetro 'language=es' para obtener resultados en español
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=es`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            peliculas = data.results; // Almacenamos los resultados
            mostrarResultados(peliculas.slice(0, resultsPerPage)); // Mostramos los primeros 4
        })
        .catch(error => console.error('Error al buscar películas:', error));
}

function cargarMasResultados() {
    const startIndex = currentPage * resultsPerPage;
    const nextResults = peliculas.slice(startIndex, startIndex + resultsPerPage);
    mostrarResultados(nextResults);
    currentPage++;
}

function mostrarResultados(peliculas) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    peliculas.forEach(pelicula => {
        const titulo = pelicula.title;
        const descripcion = pelicula.overview;
        const posterURL = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
        const anio = pelicula.release_date ? pelicula.release_date.substring(0, 4) : 'N/A';
        const rating = pelicula.vote_average ? pelicula.vote_average.toFixed(1) : 'N/A';

        const peliculaCard = document.createElement('div');
        peliculaCard.classList.add('movie-card');
        peliculaCard.innerHTML = `
            <img src="${posterURL}" alt="${titulo} - Portada" class="movie-poster">
            <h3 class="movie-title">${titulo} (${anio})</h3>
            <p class="movie-description">${descripcion}</p>
            <p class="movie-rating">${rating}</p>
        `;
        resultadoDiv.appendChild(peliculaCard);
    });
}

// Detecta cuando el usuario llega al final de la página
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition + windowHeight >= documentHeight) {
        cargarMasResultados();
    }
});


/*function mostrarResultados(peliculas) {
    // Almacena los resultados en una variable global
    peliculas = data.results;

    // Redirige al usuario a la página de resultados
    window.location.href = 'peliculas.html';
}*/


function buscarPelicula() {
    const apiKey = '9d94a5948850daa4a43141576ba19b24'; // Reemplaza con tu clave de API
    const query = document.getElementById('searchInput').value;

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=es`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            peliculas = data.results;
            guardarEnLocalStorage(peliculas);
            window.location.href = 'peliculas.html';
        })
        .catch(error => console.error('Error al buscar películas:', error));
}
function guardarEnLocalStorage(data) {
    localStorage.setItem('peliculas', JSON.stringify(data));
}



function mostrarResultados() {
    const peliculasJSON = localStorage.getItem('peliculas');
    const peliculas = JSON.parse(peliculasJSON);
    const resultadoDiv = document.getElementById('resultado');

    if (!resultadoDiv) {
        console.error('El elemento con ID "resultado" no existe en la página.');
        return;
    }

    resultadoDiv.innerHTML = ''; // Limpia el contenido antes de agregar nuevos resultados

    if (peliculas) {
        peliculas.forEach(pelicula => {
            const titulo = pelicula.title;
            const descripcion = pelicula.overview;
            const posterURL = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
            const anio = pelicula.release_date ? pelicula.release_date.substring(0, 4) : 'N/A';
            const rating = pelicula.vote_average ? pelicula.vote_average.toFixed(1) : 'N/A';

            const peliculaCard = document.createElement('div');
            peliculaCard.classList.add('movie-card');
            peliculaCard.innerHTML = `
            <img src="${posterURL}" alt="${titulo} - Portada" class="movie-poster">
            <h3 class="movie-title">${titulo} (${anio})</h3>
            <p class="movie-description">${descripcion}</p>
            <p class="movie-rating">${rating}</p>
        `;

            resultadoDiv.appendChild(peliculaCard);
        });
    } else {
        console.error('Los datos recuperados del local storage son nulos o indefinidos.');
    }
}

window.onload = mostrarResultados;







// // prueba
// function mostrarResultados() {
//     const peliculasJSON = localStorage.getItem('peliculas');
//     const peliculas = JSON.parse(peliculasJSON);
//     const resultadoDiv = document.getElementById('resultado');

//     if (!resultadoDiv) {
//         console.error('El elemento con ID "resultado" no existe en la página.');
//         return;
//     }

//     resultadoDiv.innerHTML = ''; // Limpia el contenido antes de agregar nuevos resultados

//     if (peliculas) {
//         peliculas.forEach(pelicula => {
//             const titulo = pelicula.title;
//             const descripcion = pelicula.overview;
//             const posterURL = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
//             const anio = pelicula.release_date ? pelicula.release_date.substring(0, 4) : 'N/A';
//             const rating = pelicula.vote_average ? pelicula.vote_average.toFixed(1) : 'N/A';

//             const peliculaCard = document.createElement('div');
//             peliculaCard.classList.add('movie-card');
//             peliculaCard.innerHTML = `
//                 <img src="${posterURL}" alt="${titulo} - Portada" class="movie-poster">
//                 <h3 class="movie-title">${titulo} (${anio})</h3>
//                 <p class="movie-rating">Rating: ${rating}</p>
//                 <button class="mostrar-sinopsis-btn">Mostrar Sinopsis</button>
//                 <p class="movie-sinopsis" style="display: none;">${descripcion}</p>
//             `;

//             resultadoDiv.appendChild(peliculaCard);
//         });

//         // Añadir eventos de clic a los botones de sinopsis
//         document.querySelectorAll('.mostrar-sinopsis-btn').forEach(button => {
//             button.addEventListener('click', (event) => {
//                 const movieCard = event.target.closest('.movie-card');
//                 const sinopsisElement = movieCard.querySelector('.movie-sinopsis');
//                 const isVisible = sinopsisElement.style.display === 'block';
//                 sinopsisElement.style.display = isVisible ? 'none' : 'block';
//                 event.target.textContent = isVisible ? 'Mostrar Sinopsis' : 'Ocultar Sinopsis';
//             });
//         });
//     } else {
//         console.error('Los datos recuperados del local storage son nulos o indefinidos.');
//     }
// }

// window.onload = mostrarResultados;





