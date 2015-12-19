'use strict';

(function() {


class MybooksCtrl {
	constructor($http, $scope, Auth) {	
		$scope.getCurrentUser = Auth.getCurrentUser;
		$scope.user = $scope.getCurrentUser();
		$scope.addBook = function(bookData, notes) {
			var trade = {
				user: $scope.user.name,
				userId: $scope.user._id,
				book: {
					title: bookData.volumeInfo.title,
					image: bookData.volumeInfo.imageLinks.thumbnail,
					author: bookData.volumeInfo.authors.join(", "),
					year: bookData.volumeInfo.publishedDate,
					volumeId: bookData.id
				},
				notes: '',
				requests: [],
				active: true
			};
			$http.post('/api/trades/', trade).success(function(data) {
				console.log(data);
				$scope.bookTrades.push(data);
			}).error(function(err) {
				console.log(err);
			});
		};
		$scope.removeBook = function(book) {
			$http.delete('/api/trades/' + book._id).success(function(data) {
				console.log(data);
				$scope.bookTrades = $scope.bookTrades.filter(function(trade, index) {
					return trade._id !== book._id;
				});
			}).error(function(err) {
				console.log(err);
			});
		}
		$scope.getMyBooks = function() {
			$http.get('/api/trades/').success(function(data) {
				$scope.bookTrades = data.filter(function(trade, index) {
					return trade.userId === $scope.user._id;
				});
				console.log($scope.bookTrades);
			}).error(function(err) {
				console.log(err);
			});
		};
		$scope.bookSearch = function(query) {
			var key = 'AIzaSyBRzQkPjF9QC05UphhctTImdgcdWWAzdEM';
			$http.get('https://www.googleapis.com/books/v1/volumes?key=' + key + '&q=' + query + '&CALLBACK=?').success(function(data) {
				console.log(data)
				$scope.raw = data;
				$scope.books = data.items;
				console.log($scope.books[0].volumeInfo.title);
			});
		};
		$scope.getUserData = function(userId) {

		};
		$scope.showOffers = function(trade) {
			var requests = trade.requests;

		};
		$scope.bookSearch('the name of the wind');
		$scope.getMyBooks();


		$('#search').on('keyup', function(e) {
			if(e.keyCode === 13 ) {
				$('#searchButton').click();
			}
		});
	}
}

angular.module('booksApp')
	.controller('MybooksCtrl', MybooksCtrl);

})();
