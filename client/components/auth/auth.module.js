'use strict';

angular.module('booksApp.auth', [
  'booksApp.constants',
  'booksApp.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
