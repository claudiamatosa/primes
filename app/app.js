'use strict';

// Declare app level module which depends on views, and components
angular.module('primesApp', [
  'ngRoute',
  'primesApp.table',
  'primesApp.prime'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/table'});
}]);
