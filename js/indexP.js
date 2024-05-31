
function buscarPelicula() {
    const apiKey = '9d94a5948850daa4a43141576ba19b24';
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









