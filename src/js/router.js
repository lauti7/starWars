import crossroads from 'crossroads'
import homeController from './controllers/homeController'
import peopleController from './controllers/peopleController'
import savedController from './controllers/savedController'
import contactController from './controllers/contactController'

crossroads.addRoute('/', function() {
  $('#app').load('/partials/_home.html', homeController)
});

crossroads.addRoute('/#/', function() {
  $('#app').load('/partials/_home.html', homeController)
});

crossroads.addRoute('#/people', function() {
  $('#app').load('/partials/_people.html', peopleController)
})

crossroads.addRoute('#/saved', function() {
  $('#app').load('/partials/_saved.html', savedController)
})

crossroads.addRoute('#/contact', function() {
  $('#app').load('/partials/_contact.html', contactController)
})

// En cada cambio del # va a verificar las rutas
$(window).on('hashchange', function () {
  crossroads.parse(window.location.hash)
})

crossroads.parse(window.location.hash)
