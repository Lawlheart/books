'use strict';

(function() {

class MainController {

  constructor($http, $scope, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.user = $scope.getCurrentUser();
    $scope.getAllBooks = function() {
      $http.get('/api/trades/').success(function(data) {
        $scope.bookTrades = data;
        console.log($scope.bookTrades);
      }).error(function(err) {
        console.log(err);
      });
    };
    $scope.getAllBooks();
  }
}

angular.module('booksApp')
  .controller('MainController', MainController);

})();
