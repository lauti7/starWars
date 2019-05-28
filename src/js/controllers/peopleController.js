import getData from '../utils/api';
import {initialStorage, getCharacters, save, saveCharactersEdited} from '../utils/storage';
import Character from '../utils/newCharacter';

var base_url = 'https://swapi.co/api/people/';
var nxtPage;
console.log(nxtPage);

var countCharacters = 0;


function peopleController() {
  var allCharactersInStorage = getCharacters('allCharacters');
  if (allCharactersInStorage.length != 0) {
    showCharacters(allCharactersInStorage, 0);
  } else {
    console.log(false);
    getData(base_url, handleRequest);
  }
}

function handleRequest(characters){

  if (characters.next) {
    nxtPage = characters.next;
    localStorage.setItem('nxtpage',nxtPage);
    console.log(nxtPage);
  } else {
    nxtPage = null;
    localStorage.setItem('nxtpage', nxtPage);
    console.log(nxtPage);
    $('#load-more').attr('disabled', true);
  }

  countCharacters = localStorage.getItem('countCharacters');

  if (getCharacters('allCharacters')) {
    var allCharactersInStorage = getCharacters('allCharacters');
  } else {
    var allCharactersInStorage = [];
  }

  for (var i = 0; i < characters.results.length; i++) {
    countCharacters++;
    allCharactersInStorage.push(new Character(countCharacters,characters.results[i].name, characters.results[i].gender, characters.results[i].eye_color, characters.results[i].height, characters.results[i].mass));
  }

  saveCharactersEdited(allCharactersInStorage);
  save('countCharacters', countCharacters);

  if (countCharacters > 10) {
    showCharacters(allCharactersInStorage, countCharacters - 10);
  } else {
    showCharacters(allCharactersInStorage, 0);
  }


}

//Event delegation
$('.container').on('click', '#load-more', handleLoadMoreButton);
$('.container').on('click', '.btn-success', handleSaveButton);
$('.container').on('click', '.btn-warning', handleRemoveButton);


function handleSaveButton(evt){
  var $btn = $(evt.target);
  var id = $btn.parent().parent().attr('id');
  var allCharacters = getCharacters('allCharacters');
  allCharacters[id - 1].saved = true;
  saveCharactersEdited(allCharacters);
  $btn.removeClass('btn-success');
  $btn.addClass('btn-warning');
  $btn.text('Remover');
  // for (var i = 0; i < allCharacters.length; i++) {
  //   if (allCharacters[i].name === characterToSave.name) {
  //     console.log('found');
  //     allCharacters[i].saved = true;
  //     saveCharactersEdited(allCharacters);
  //     break;
  //   }
  //}
}

function handleRemoveButton(evt){
  var $btn = $(evt.target);
  var id = $btn.parent().parent().attr('id');
  var allCharacters = getCharacters('allCharacters');
  allCharacters[id - 1].saved = false;
  saveCharactersEdited(allCharacters);
  $btn.removeClass('btn-warning');
  $btn.addClass('btn-success');
  $btn.text('Guardar');
  // for (var i = 0; i < allCharacters.length; i++) {
  //   if (allCharacters[i].name === characterToSave.name) {
  //     console.log('found');
  //     allCharacters[i].saved = false;
  //     saveCharactersEdited(allCharacters);
  //     break;
  //   }
  // }
}

function handleLoadMoreButton(){
  getData(nxtPage, handleRequest);
}


function showCharacters(characters, index){
  for (var i = index; i < characters.length; i++) {
    var tr = `<tr id=${characters[i].id}>
      <th scope="row">${characters[i].id}</th>
      <td>${characters[i].name.toLowerCase()}</td>
      <td>${translateGender(characters[i].gender)}</td>
      <td>${translateEyeColor(characters[i].eye_color)}</td>
      <td>${translateHeight(characters[i].height)}</td>
      <td>${translateMass(characters[i].mass)}</td>
      <td><button class="btn ${changeClassIfSaved(characters[i].saved)}">${changeTextIfSaved(characters[i].saved)}</button></td>
      </tr>`;
    $('.tBody').append(tr);
  }
}


function translateGender(gender) {
  if (gender === 'male') {
    return 'Hombre';
  } else if (gender === 'female') {
    return 'Mujer'
  } else if (gender === 'hermaphrodite') {
    return 'Hermafrodita'
  } else {
    return 'Desconocido'
  }
}

function translateEyeColor(eye_color) {
    if (eye_color === 'blue') {
      return 'Azul'
    } else if (eye_color === 'red') {
      return 'Rojo'
    } else if (eye_color === 'yellow') {
      return 'Amarillo'
    } else if (eye_color === 'brown') {
      return 'Marron'
    } else if (eye_color === 'blue-gray') {
      return 'Azul grisacio'
    } else if (eye_color === 'orange') {
      return 'Naranja'
    } else if (eye_color === 'black') {
      return 'Negro'
    } else {
      return 'Desconocido'
    }
}

function translateMass(mass) {
  if (mass === 'unknown') {
    return '?? Kg'
  } else {
    return mass + ' Kg'
  }
}

function translateHeight(height) {
  if (height === 'unknown') {
    return '?? M'
  } else {
    var fromCmToM = height / 100;
    return fromCmToM + ' M'
  }
}

function changeClassIfSaved(character){
  if (character) {
    return 'btn-warning';
  } else {
    return 'btn-success';
  }
}

function changeTextIfSaved(character){
  if (character) {
    return 'Remover'
  } else {
    return 'Guardar'
  }
}



export default peopleController
