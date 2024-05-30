function mostrarResultados() {
    const peliculasJSON = localStorage.getItem('peliculas');
    const peliculas = JSON.parse(peliculasJSON); // Asigna los datos a la variable local
    const resultadoDiv = document.getElementById('resultado');

    if (!resultadoDiv) {
        console.error('El elemento con ID "resultado" no existe en la página.');
        return;
    }

    resultadoDiv.innerHTML = ''; // Limpia el contenido antes de agregar nuevos resultados

    if (peliculas) {
        peliculas.forEach(pelicula => {
            const titulo = pelicula.title;
            const descripcion = pelicula.overview; // Texto completo
            const posterURL = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
            const anio = pelicula.release_date ? pelicula.release_date.substring(0, 4) : 'N/A';
            const rating = pelicula.vote_average ? pelicula.vote_average.toFixed(1) : 'N/A';

            const peliculaCard = document.createElement('div');
            peliculaCard.classList.add('movie-card');
            peliculaCard.innerHTML = `
                <img src="${posterURL}" alt="${titulo} - Portada" class="movie-poster">
                <h3 class="movie-title">${titulo} (${anio})</h3>
                <button class="mostrar" data-id="${pelicula.id}" onclick="mostrarDescripcionCompleta(${pelicula.id})">Mostrar Sinopsis</button>
                <p class="movie-rating">${rating}</p>
                <div class="descripcion-pelicula hidden" data-id="${pelicula.id}">${descripcion}</div>
            `;

            resultadoDiv.appendChild(peliculaCard);
        });
    } else {
        console.error('Los datos recuperados del local storage son nulos o indefinidos.');
    }
}

function mostrarDescripcionCompleta(id) {
    const descripcionDiv = document.querySelector(`.descripcion-pelicula[data-id='${id}']`);
    const boton = document.querySelector(`.mostrar[data-id='${id}']`);

    if (descripcionDiv.classList.contains('hidden')) {
        descripcionDiv.classList.remove('hidden');
        boton.textContent = 'Ocultar Sinopsis';
    } else {
        descripcionDiv.classList.add('hidden');
        boton.textContent = 'Mostrar Sinopsis';
    }
}

// Llama a la función mostrarResultados al cargar la página
document.addEventListener('DOMContentLoaded', mostrarResultados);



















































/*let peliculas;
let mostrado = false;

function mostrarResultados() {
    const peliculasJSON = localStorage.getItem('peliculas');
    peliculas = JSON.parse(peliculasJSON); // Asigna los datos a la variable global
    const resultadoDiv = document.getElementById('resultado');

    if (!resultadoDiv) {
        console.error('El elemento con ID "resultado" no existe en la página.');
        return;
    }

    resultadoDiv.innerHTML = ''; // Limpia el contenido antes de agregar nuevos resultados

    if (peliculas) {
        peliculas.forEach(pelicula => {
            const titulo = pelicula.title;
            const descripcion = pelicula.overview.substring(0, 10);
            const posterURL = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
            const anio = pelicula.release_date ? pelicula.release_date.substring(0, 4) : 'N/A';
            const rating = pelicula.vote_average ? pelicula.vote_average.toFixed(1) : 'N/A';

            const peliculaCard = document.createElement('div');
            peliculaCard.classList.add('movie-card');
            peliculaCard.innerHTML = `
                <img src="${posterURL}" alt="${titulo} - Portada" class="movie-poster">
                <h3 class="movie-title">${titulo} (${anio})</h3>
                <button class="mostrar" data-id="${pelicula.id}" onclick="mostrarDescripcionCompleta(${pelicula.id})">Mostrar Sinopsis</button>
                <p class="movie-rating">${rating}</p>
                <div class="descripcion-pelicula hidden" data-id="${pelicula.id}"></div>
            `;

            resultadoDiv.appendChild(peliculaCard);
        });
    } else {
        console.error('Los datos recuperados del local storage son nulos o indefinidos.');
    }
}

function mostrarDescripcionCompleta(peliculaId) {
    const mostrado = false;
    const pelicula = peliculas.find(p => p.id === parseInt(peliculaId));
    if (pelicula) {
        const descripcionCompleta = pelicula.overview;
        const descripcionCompletaDiv = document.querySelector(`.descripcion-pelicula[data-id="${peliculaId}"]`);

        if (descripcionCompletaDiv) {
            descripcionCompletaDiv.textContent = descripcionCompleta;
            if (mostrado === true) {
                descripcionCompletaDiv.classList.remove('hidden');
            } else {
                descripcionCompletaDiv.classList.add('hidden');
            }
        } else {
            console.error('El elemento con la clase "descripcion-pelicula" y el ID proporcionado no existe en la página.');
        }
    } else {
        console.error('No se encontró la película con el ID proporcionado.');
    }
}

 document.addEventListener('DOMContentLoaded', function () {
 mostrarResultados();
});*/



/*
let peliculas;

function mostrarResultados() {
    const peliculasJSON = localStorage.getItem('peliculas');
    peliculas = JSON.parse(peliculasJSON); // Asigna los datos a la variable global
    const resultadoDiv = document.getElementById('resultado');

    if (!resultadoDiv) {
        console.error('El elemento con ID "resultado" no existe en la página.');
        return;
    }

    resultadoDiv.innerHTML = ''; // Limpia el contenido antes de agregar nuevos resultados

    if (peliculas) {
        peliculas.forEach(pelicula => {
            const titulo = pelicula.title;
            const descripcion = pelicula.overview.substring(0, 200) + '...';
            const posterURL = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;
            const anio = pelicula.release_date ? pelicula.release_date.substring(0, 4) : 'N/A';
            const rating = pelicula.vote_average ? pelicula.vote_average.toFixed(1) : 'N/A';

            const peliculaCard = document.createElement('div');
            peliculaCard.classList.add('movie-card');
            peliculaCard.innerHTML = `
                <img src="${posterURL}" alt="${titulo} - Portada" class="movie-poster">
                <h3 class="movie-title">${titulo} (${anio})</h3>
                <button class="mostrar" onclick="mostrarDescripcionCompleta(${pelicula.id})">Mostrar Sinopsis</button>
                <p class="movie-rating">${rating}</p>
                <div id="descripcionCompleta"><p class="movie-description">${descripcion}</p></div>
            `;

            // Agrega un evento de clic para mostrar la descripción completa
            peliculaCard.addEventListener('click', () => mostrarDescripcionCompleta(pelicula.id));

            resultadoDiv.appendChild(peliculaCard);
        });
    } else {
        console.error('Los datos recuperados del local storage son nulos o indefinidos.');
    }
}

function mostrarDescripcionCompleta(peliculaId) {
    const pelicula = peliculas.find(p => p.id === peliculaId);
    if (pelicula) {
        const descripcionCompleta = pelicula.overview;
        const descripcionCompletaDiv = document.getElementById('descripcionCompleta');
        if (descripcionCompletaDiv) {
            descripcionCompletaDiv.textContent = descripcionCompleta;
        } else {
            console.error('El elemento con ID "descripcionCompleta" no existe en la página.');
        }
    } else {
        console.error('No se encontró la película con el ID proporcionado.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    mostrarResultados();
});*/



/*function mostrarResultados() {
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
            const descripcion = pelicula.overview.substring(0, 200) + '...';
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
window.onload = mostrarResultados;*/


/*function mostrarResultados() {
    const peliculasJSON = localStorage.getItem('peliculas');
    const peliculas = JSON.parse(peliculasJSON);

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = ''; // Limpia el contenido antes de agregar nuevos resultados

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
// Llama a la función para mostrar los resultados cuando cargue la página
window.onload = mostrarResultados;*/



/*

         // Añadir eventos de clic a los botones de sinopsis
         document.querySelectorAll('.mostrar-sinopsis-btn').forEach(button => {
             button.addEventListener('click', (event) => {
                 const movieCard = event.target.closest('.movie-card');
                 const sinopsisElement = movieCard.querySelector('.movie-sinopsis');
                 const isVisible = sinopsisElement.style.display === 'block';
                 sinopsisElement.style.display = isVisible ? 'none' : 'block';
                 event.target.textContent = isVisible ? 'Mostrar Sinopsis' : 'Ocultar Sinopsis';
             });
         });
      else {
         console.error('Los datos recuperados del local storage son nulos o indefinidos.');
    }
}

 window.onload = mostrarResultados;*/





/*
 function mostrarDescripcionCompleta(peliculaId) {
    const mostrado = false;
    const pelicula = peliculas.find(p => p.id === parseInt(peliculaId));
    if (pelicula) {
        const descripcionCompleta = pelicula.overview;
        const descripcionCompletaDiv = document.querySelector(`.descripcion-pelicula[data-id="${peliculaId}"]`);

        if (descripcionCompletaDiv) {
            descripcionCompletaDiv.textContent = descripcionCompleta;
            if (mostrado) { // No es necesario comparar con true
                descripcionCompletaDiv.classList.remove('hidden');
            } else {
                descripcionCompletaDiv.classList.add('hidden');
            }
        } else {
            console.error('El elemento con la clase "descripcion-pelicula" y el ID proporcionado no existe en la página.');
        }
    } else {
        console.error('No se encontró la película con el ID proporcionado.');
    }
}
function mostrarDescripcionCompleta(peliculaId, mostrado = false) { // mostrado se establece como false por defecto
    // Resto del código...
}

*/


