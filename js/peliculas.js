function mostrarResultados() {
    const peliculasJSON = localStorage.getItem('peliculas');
    const peliculas = JSON.parse(peliculasJSON);
    const resultadoDiv = document.getElementById('resultado');

    if (!resultadoDiv) {
        console.error('El elemento con ID "resultado" no existe en la página.');
        return;
    }

    resultadoDiv.innerHTML = '';

    const peliculasFiltradas = peliculas.filter(pelicula => pelicula.poster_path);

    if (peliculasFiltradas) {
        peliculasFiltradas.forEach(pelicula => {
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

document.addEventListener('DOMContentLoaded', mostrarResultados);

