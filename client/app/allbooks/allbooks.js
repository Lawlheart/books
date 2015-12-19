'use strict';

angular.module('booksApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/allbooks', {
        templateUrl: 'app/allbooks/allbooks.html',
        controller: 'AllbooksCtrl'
      });
  });
