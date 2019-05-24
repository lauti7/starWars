import {getCharacters, save, saveCharactersEdited} from '../utils/storage';

function savedController() {
  console.log('saveController');
  var allCharacters = getCharacters('allCharacters');
  console.log(allCharacters);
  if (allCharacters) {
    var trueSaved = [];
    for (var i = 0; i < allCharacters.length; i++) {
      console.log(allCharacters[i].saved);
      if (allCharacters[i].saved) {
        trueSaved.push(allCharacters[i]);
      }
    }
    showCharacters(trueSaved);
  } else {
    var warningMessage =
    `<div class="alert alert-warning" role="alert">
      <p style="color:black;"" class="text-center">No hay personajes guardados</p>
    </div>`
    $('.container').append(warningMessage);
  }

}

function showCharacters(characters){
  for (var i = 0; i < characters.length; i++) {
    var tr = `<tr id=${i}>
      <th scope="row">${i + 1}</th>
      <td>${characters[i].name}</td>
      <td>${translateGender(characters[i].gender)}</td>
      <td>${translateEyeColor(characters[i].eye_color)}</td>
      <td>${translateHeight(characters[i].height)}</td>
      <td>${translateMass(characters[i].mass)}</td>
      <td><button id="btn-save" class="btn btn-danger">Eliminar</button></td>
      </tr>`
    $('.tBody').append(tr);
  }
  // console.log($('#btn-save'));
  $('.btn-danger').on('click', function(evt) {
    var $btn = $(evt.target);
    var id = $btn.parent().parent().attr('id');
    var characterToSave = characters[id];
    var allCharacters = getCharacters('allCharacters');
    $btn.parent().parent().fadeOut( "slow", function() {
      console.log('completed!');
    });
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


export default savedController
