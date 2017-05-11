describe('Auth factory', function() {
  var AuthServices;
  var $httpBackend;
  var $q;
  var API = '/api/';

  // Load our payrollApp.authServices module
  beforeEach(angular.mock.module('payrollApp.authServices'));

  // Set our injected AuthServices factory (_AuthServices_) to our local AuthServices variable
  beforeEach(inject(function(_AuthServices_, _$q_, _$httpBackend_) {
    AuthServices = _AuthServices_;
    $q = _$q_;
    $httpBackend = _$httpBackend_;
  }));

  // A simple test to verify the service exists
  it('should exist', function() {
    expect(AuthServices).toBeDefined();
  });

  // A set of tests for our AuthServices.login() method
  describe('.login()', function() {
    var response;

    beforeEach(function() {
      response = {};

      spyOn(AuthServices, 'login').and.callThrough();
    });

    // A simple test to verify the method all exists
    it('should exist', function() {
      expect(AuthServices.login).toBeDefined();
    });

    // Login test
    it('should receive a response from login', function() {
      var login = 'login';
      var loginData = {user: 'test@test.com', password: 'test'};

      expect(AuthServices.login).not.toHaveBeenCalled();
      expect(response).toEqual({});

      $httpBackend
        .when('POST', API + login)
        .respond(200, 'success');

      AuthServices
        .login(loginData)
        .then(function(res) {
          response = res.data;
        });

      $httpBackend.flush();

      expect(AuthServices.login).toHaveBeenCalledWith(loginData);
      expect(response).toBe('success');
    });
  });

  // A set of tests for our AuthServices.login() method
  describe('.logout()', function() {
    var response;

    beforeEach(function() {
      response = {};

      spyOn(AuthServices, 'logout').and.callThrough();
    });

    // A simple test to verify the method all exists
    it('should exist', function() {
      expect(AuthServices.logout).toBeDefined();
    });

    // Logout test
    it('should receive a response from logout', function() {
      var login = 'logout';
      var loginData = {user: 'test@test.com', password: 'test'};

      expect(AuthServices.logout).not.toHaveBeenCalled();
      expect(response).toEqual({});

      $httpBackend
        .when('POST', API + login)
        .respond(200, 'success');

      AuthServices
        .logout(loginData)
        .then(function(res) {
          response = res.data;
        });

      $httpBackend.flush();

      expect(AuthServices.logout).toHaveBeenCalledWith(loginData);
      expect(response).toBe('success');
    });
  });
});