//Funcion constructora para los personajes, solo datos que sirven.
function Character(id, name, gender, eyeColor, height, mass){
  this.id = id,
  this.name = name,
  this.gender = gender,
  this.eye_color = eyeColor,
  this.height = height,
  this.mass = mass,
  this.saved = false
}

export default Character
