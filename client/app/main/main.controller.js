'use strict';

(function() {

class MainController {

  constructor($http, $scope, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.user = $scope.getCurrentUser();
    $scope.getAllBooks = function() {
      $http.get('/api/trades/').success(function(data) {
        $scope.bookTrades = data;
      }).error(function(err) {
        console.log(err);
      });
    };
    $scope.checkContact = function() {
      $http.get('/api/contact/').success(function(data) {
        var contactInfo = data.filter(function(info) {
          return info._id === $scope.user._id;
        });
        if(contactInfo.length === 0) {
          var contact = {
            _id: $scope.user._id,
            username: $scope.user.name,
            fullName: '',
            city: '',
            state: ''
          }
          $http.post('/api/contact/', contact).success(function(data) {
          }).error(function(err) {
            console.log(err);
          });
        }
      }).error(function(err) {
        console.log(err)
      });
    };
    $scope.getAllBooks();
    if(Auth.isLoggedIn()) {
      $scope.checkContact();
    }
  }
}

angular.module('booksApp')
  .controller('MainController', MainController);

})();
