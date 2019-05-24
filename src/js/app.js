import './router'
import getData from './utils/api'
import {initialStorage, getCharacters, save} from './utils/storage'

$(document).ready(function() {
  initialStorage();
})
