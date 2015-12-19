'use strict';

angular.module('booksApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/mybooks', {
        templateUrl: 'app/mybooks/mybooks.html',
        controller: 'MybooksCtrl',
        authenticate: true
      });
  });
