//Funcion constructora para los personajes, solo datos que sirven.
function Character(name, gender, eyeColor, height, mass){
  this.name = name,
  this.gender = gender,
  this.eye_color = eyeColor,
  this.height = height,
  this.mass = mass,
  this.saved = false
}

export default Character
