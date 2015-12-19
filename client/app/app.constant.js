(function(angular, undefined) {
'use strict';

angular.module('booksApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','admin']})

;
})(angular);