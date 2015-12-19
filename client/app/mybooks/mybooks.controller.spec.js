'use strict';

describe('Controller: MybooksCtrl', function () {

  // load the controller's module
  beforeEach(module('booksApp'));

  var MybooksCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MybooksCtrl = $controller('MybooksCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
