import getData from '../utils/api';
import {initialStorage, getCharacters, save, saveCharactersEdited} from '../utils/storage';
import Character from '../utils/newCharacter';

var base_url = 'https://swapi.co/api/people/';
var nxtPage = localStorage.getItem('nxtpage');
console.log(nxtPage);


var countCharacters = 0;

function peopleController() {
  countCharacters = 0;
  var allCharactersInStorage = getCharacters('allCharacters');
  if (allCharactersInStorage.length != 0) {
    showCharacters(allCharactersInStorage);
  } else {
    console.log(false);
    getData(base_url, handleRequest);
  }
}

function handleRequest(characters){
  var fetchedCharacters = [];
  for (var i = 0; i < characters.results.length; i++) {
    var character = new Character(characters.results[i].name, characters.results[i].gender, characters.results[i].eye_color, characters.results[i].height, characters.results[i].mass);
    fetchedCharacters.push(character);
  }
  showCharacters(characters.results);
  save('allCharacters', fetchedCharacters);
  if (characters.next) {
    localStorage.setItem('nxtpage', characters.next);
  }
}

function showCharacters(characters){
  for (var i = 0; i < characters.length; i++) {
    countCharacters++;
    var tr = `<tr id=${i}>
      <th scope="row">${countCharacters}</th>
      <td>${characters[i].name}</td>
      <td>${translateGender(characters[i].gender)}</td>
      <td>${translateEyeColor(characters[i].eye_color)}</td>
      <td>${translateHeight(characters[i].height)}</td>
      <td>${translateMass(characters[i].mass)}</td>
      <td><button class="btn ${changeClassIfSaved(characters[i].saved)}">${changeTextIfSaved(characters[i].saved)}</button></td>
      </tr>`;
    $('.tBody').append(tr);
  }
  $('.btn-success').on('click', function(evt){
    var $btn = $(evt.target);
    $btn.removeClass('btn-success');
    $btn.addClass('btn-warning');
    $btn.text('Remover')
    var id = $btn.parent().parent().attr('id');
    var characterToSave = characters[id];
    var allCharacters = getCharacters('allCharacters');
    for (var i = 0; i < allCharacters.length; i++) {
      if (allCharacters[i].name === characterToSave.name) {
        console.log('found');
        allCharacters[i].saved = true;
        saveCharactersEdited(allCharacters);
        break;
      }
    }
    console.log('edited');
  });
  $('.btn-warning').on('click', function(evt){
    var $btn = $(evt.target);
    $btn.removeClass('btn-warning');
    $btn.addClass('btn-success');
    $btn.text('Guardar')
    var id = $btn.parent().parent().attr('id');
    var characterToSave = characters[id];
    var allCharacters = getCharacters('allCharacters');
    for (var i = 0; i < allCharacters.length; i++) {
      if (allCharacters[i].name === characterToSave.name) {
        console.log('found');
        allCharacters[i].saved = false;
        saveCharactersEdited(allCharacters);
        break;
      }
    }
    console.log('edited');
  });

}



//Event delegation
$('.container').on('click', '#load-more', function(evt){
  console.log('clickeaste');
  console.log(nxtPage);
  getData(nxtPage, handleRequest);
});

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
    return '?? Cm'
  } else {
    return height + ' Cm'
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
