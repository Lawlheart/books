'use strict';

angular.module('booksApp')
  .controller('AllbooksCtrl', function ($http, $scope, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.user = $scope.getCurrentUser();
    console.log($scope.user._id)
    $scope.getAllBooks = function() {
      $http.get('/api/trades/').success(function(data) {
        $scope.bookTrades = data;
        console.log($scope.bookTrades);
      }).error(function(err) {
        console.log(err);
      });
    };
    $scope.tradeBook = function(trade) {
      trade.requests.push($scope.user._id);
      $http.patch('/api/trades/' + trade._id, trade).success(function(data) {
        $scope.getAllBooks();
        console.log(data);
      }).error(function(err) {
        console.log(err)
      });
    };
    $scope.removeTrade = function(trade) {
      trade.requests = trade.requests.filter(function(req) {
        return req !== $scope.user._id;
      });
      $http.patch('/api/trades/' + trade._id, trade).success(function(data) {
        $scope.getAllBooks();
        console.log(data);
      }).error(function(err) {
        console.log(err)
      });
    }
    $scope.getAllBooks();
  });
