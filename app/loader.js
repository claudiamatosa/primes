/**
 * Load dependencies
 */
$script([
  'vendor/angular/angular.js',
  'vendor/angular-route/angular-route.js',
  'app.js',
  'table/table.js',
  'components/prime/prime.js',
  'components/prime/prime-service.js'
], function() {
  // Execute app
  angular.bootstrap(document, ['primesApp']);
});