describe('Login Controller', function() {
  var $controller;
  var LoginController;

  beforeEach(angular.mock.module('ui.router'));
  beforeEach(angular.mock.module('ngMessages'));
  beforeEach(angular.mock.module('payrollApp.authServices'));
  beforeEach(angular.mock.module('payrollApp.login'));

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
    LoginController = $controller('LoginController', {});
  }));

  it('should be defined', function() {
    expect(LoginController).toBeDefined();
  });
});