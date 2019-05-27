  //Inicio del storage
  function initialStorage(){
    if (!getCharacters('allCharacters')) {
      var characters = [];
      var stringfiedCharacters = JSON.stringify(characters)
      localStorage.setItem('allCharacters' ,stringfiedCharacters);
    } else {
      return false;
    }
  }

  function getCharacters(key){
    if (localStorage.getItem(key)) {
      var characters = JSON.parse(localStorage.getItem(key));
      return characters;
    } else {
      return null;
    }
  }

  function save(key, c){
    if (Array.isArray(c)) {
      console.log('arr');
      for (var i = 0; i < c.length; i++) {
        var allCharacters = getCharacters(key);
        allCharacters.push(c[i]);
        var stringfiedCharacters = JSON.stringify(allCharacters);
        localStorage.setItem(key , stringfiedCharacters);
      }
    }
  }

  function saveCharactersEdited(c){
    var updatedCharactersList = c;
    var stringfiedStudents = JSON.stringify(updatedCharactersList);
    localStorage.setItem('allCharacters' , stringfiedStudents);
  }

export {initialStorage, getCharacters, save, saveCharactersEdited}
