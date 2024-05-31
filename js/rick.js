


/*Creo una funcion con parametro
Creo una variable que guarde un fetch (q busca los datos de la api)*/
function getCharacters(done) {
  const results = fetch("https://rickandmortyapi.com/api/character");

  /*La variable trae datos raros, 
  1-entonces le ponemos una función flecha a un .json 
  para traducir esos datos a un JASON legible
  2- Luego sigue estando con datos raros, entonces sumamos otro then
  que da los datos, entonces llamamos al DONE de la function getCharacters*/
  results.then(response => response.json())
    .then(data => (
      done(data)
    ));
}



/*Ahora llamo a la funcion y veo si en consola muestra los datos */
getCharacters(data => {
  console.log(data);
  /**Llamo a la data donde estan los personajes 
  * y quiero ver cada uno con un forEach */
  data.results.forEach(personaje => {
    /**Creo una variable, una etiqueta HTML */
    const article = document.createRange().createContextualFragment(/*html */`
    <article>

          <div class="image-container">
              <img src="${personaje.image}" alt="Personaje">
          </div>
          <h2>${personaje.name}</h2>
          <span>${personaje.status}</span> 
          <span>${personaje.gender}</span>
          <span>${personaje.species}</span>

      </article>            
      `);

    /**Para que muestre en pantalla= creo variable, selecciono main (etiqueta que contiene todo)
     * Quiero main.append  metas a todos los personajes aqui (article)
     */
    const main = document.querySelector("main");
    main.append(article)

    const card = document.createElement('div');
    card.classList.add('character-card');

  });
});


