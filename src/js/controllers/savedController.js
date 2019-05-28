import {getCharacters, saveCharactersEdited} from '../utils/storage';

function savedController() {
  var allCharacters = getCharacters('allCharacters');
  if (allCharacters) {
    var trueSaved = [];
    for (var i = 0; i < allCharacters.length; i++) {
      if (allCharacters[i].saved) {
        trueSaved.push(allCharacters[i]);
      }
    }
    if (trueSaved.length > 0) {
      showCharacters(trueSaved);
    } else {
      var warningMessage =
      `<div class="alert alert-warning" role="alert">
        <p style="color:black;"" class="text-center">No hay personajes guardados</p>
      </div>`
      $('.container').append(warningMessage);
    }
  } else {
    var warningMessage =
    `<div class="alert alert-danger" role="alert">
      <p style="color:black;"" class="text-center">Error</p>
    </div>`
    $('.container').append(warningMessage);
  }

}

$('.container').on('click', '.btn-danger', handleRemoveButton);

function handleRemoveButton(evt){
  var $btn = $(evt.target);
  var id = $btn.parent().parent().attr('id');
  var allCharacters = getCharacters('allCharacters');
  allCharacters[id - 1].saved = false;
  saveCharactersEdited(allCharacters);
  $btn.parent().parent().fadeOut("slow", function(){
    //
  })
}


function showCharacters(characters){
  for (var i = 0; i < characters.length; i++) {
    var tr = `<tr id=${characters[i].id}>
      <th scope="row">${i + 1}</th>
      <td>${characters[i].name.toLowerCase()}</td>
      <td>${translateGender(characters[i].gender)}</td>
      <td>${translateEyeColor(characters[i].eye_color)}</td>
      <td>${translateHeight(characters[i].height)}</td>
      <td>${translateMass(characters[i].mass)}</td>
      <td><button id="btn-save" class="btn btn-danger">Remover</button></td>
      </tr>`
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


export default savedController
