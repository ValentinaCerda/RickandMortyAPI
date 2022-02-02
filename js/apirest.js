// Crear las referencias
const rowCards = document.querySelector('#rowCards');
const formData = document.querySelector('#formData');

// Inicio de peticiones a las apis
const getCharacters = async () => {

  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getCharacterForName = async(nameCharacter) => {

  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${nameCharacter}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }

}

// limpia el row
const cleanRow = () => {
  rowCards.innerHTML = '';
}

const init = async () => {
  const characters = await getCharacters();
  //console.log(characters.results); // aquí ya estan en el arreglo
  createCards(characters.results);
}
init();

/* Fin de las peticiones */

// crear tarjeta de bootstrap (card)

cardCharacter = (character) => {
  // creamos los elementos html
  const cardBootstrap = document.createElement('div');
  const imgCard = document.createElement('img');
  const cardBody = document.createElement('div');
  const titleCharacter = document.createElement('h5');
  const btnByIdCharacter = document.createElement('a');

  // textos de los elementos
  const nameCharacter = document.createTextNode(character.name);
  const textButtonCharacter = document.createTextNode('Ir al personaje');

  // añadir clases
  cardBootstrap.classList.add('card', 'mt-4');
  imgCard.classList.add('card-img-top', 'mt-2');
  cardBody.classList.add('card-body');
  titleCharacter.classList.add('card-title', 'text-center');
  btnByIdCharacter.classList.add('btn', 'btn-secondary', 'mb-2');

  // añadiendo el href
  // <a class="btn btn-secondary mb-2" href=""></a>
  btnByIdCharacter.href=`personaje.html?id=${character.id}`;
  
  //console.log(character.image);
  titleCharacter.appendChild(nameCharacter);
  imgCard.src=character.image;
  btnByIdCharacter.appendChild(textButtonCharacter);

  //el renderizado
  cardBootstrap.append(imgCard, cardBody, btnByIdCharacter);
  cardBody.append(titleCharacter);
  rowCards.append(cardBootstrap);
}

// creación de cards
createCards = (characters) => {
  //console.log(characters);
  characters.map(element => cardCharacter(element));
} // recordar que "map" es un método de Arreglo

/* Llamar al formulario */
// event: esta implicto en el handleSubmit
formData.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  // console.log(this);
  const form = new FormData(this);
  cleanRow();
  // console.log(form.get('character'));
  // (()=>{})() : función anónima, también se podía hacer así
  getCharacterForName(form.get('character')).then( data => createCards(data.results))
}


{/* <div class="card" style="width: 18rem;">
<img src="..." class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">Card title</h5>
  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
</div>
  <a href="#" class="btn btn-primary">Go somewhere</a>
</div> */}


//const init = () => {
//  getCharacters().then( data => console.log(data.results)).catch(err => console.log(err));
//}
//init();

// funcion anonima
// () => {}

// funcion anonima auto invocada
// (() => {})()

//(async ()=> {
//  const data = getCharacters();
//  console.log(data);
//})();
// end points
// npm axios