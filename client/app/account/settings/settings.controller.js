'use strict';

class SettingsController {
  //start-non-standard
  errors = {};
  submitted = false;
  //end-non-standard

  constructor($http, $scope, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.user = $scope.getCurrentUser();
    this.Auth = Auth;
    $scope.updateContact = function(name, city, state) {
      var contact = {
        _id: $scope.user._id,
        username: $scope.user.name,
        fullName: name,
        city: city,
        state: state
      }
      $http.patch('/api/contact/' + $scope.user._id, contact).success(function(data) {
        console.log(data);
      }).error(function(err) {
        console.log(err);
      });
    }
    $scope.getContactInfo = function() {
      $http.get('/api/contact/' + $scope.user._id).success(function(contact) {
        $scope.fullName = contact.fullName;
        $scope.city = contact.city;
        $scope.state = contact.state;
        console.log(contact);
      }).error(function(err) {
        console.log(err);
      });
    }

    $scope.getContactInfo();
  }

  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }
}

angular.module('booksApp')
  .controller('SettingsController', SettingsController);
