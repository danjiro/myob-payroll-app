describe('payrollApp.payslip.view', function() {
  var $controller;
  var PayslipViewController;
  var PayslipServices;
  var $stateParams;
  var $rootScope;
  var $state;
  var $httpBackend;

  var API = '/api/payslip/'
  var GET_SUCCESS = {
    first_name : "Damien",
    last_name : "Whaley",
    pay_date_month : "02",
    pay_date_year : "2017",
    pay_frequency : "monthly",
    annual_income : "999999",
    gross_income : "999999",
    income_tax : "50",
    net_income : "999999",
    super : "9.5",
    pay : "999999"
  }

  beforeEach(angular.mock.module('payrollApp.payslip'));
  beforeEach(angular.mock.module('payrollApp.payslip.view'));

  beforeEach(inject(function(_$controller_, _$stateParams_, _PayslipServices_, _$rootScope_, _$state_, _$httpBackend_) {
    $controller = _$controller_;
    PayslipServices = _PayslipServices_;
    $stateParams = _$stateParams_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    $httpBackend = _$httpBackend_;
  }));

  describe('PayslipViewController', function() {
    var PayslipViewController;

    beforeEach(function() {
      $rootScope.userDetails = {user: 'test', 'session': '1234'};
      PayslipViewController = $controller('PayslipViewController', {});
    });

    it('should be defined', function() {
      expect(PayslipViewController).toBeDefined();
    });
  });

  describe('PayslipViewController with one payslip detail', function() {
    var PayslipViewController;
    var key;

    beforeEach(function() {
      key = 'test|test|1|2017';
      spyOn(PayslipServices, 'get').and.callThrough();

      $rootScope.userDetails = {user: 'test', 'session': '1234'};
      $stateParams.key = key;
      PayslipViewController = $controller('PayslipViewController', {});
    });

    it('should call PayslipServices.get and return a payslip object', function() {
      expect(PayslipViewController.payslipDetails).toEqual(null);

      $httpBackend
        .when('GET', API + key)
        .respond(200, GET_SUCCESS);

      $httpBackend.flush();

      expect(PayslipServices.get).toHaveBeenCalledWith(key, $rootScope.userDetails);
      expect(PayslipViewController.payslipDetails.first_name = "Damien");
      expect(PayslipViewController.payslipDetails.last_name = "Whaley");
      expect(PayslipViewController.pay_date_month = "02");
      expect(PayslipViewController.pay_date_year = "2017");
      expect(PayslipViewController.pay_frequency = "monthly");
      expect(PayslipViewController.annual_income = "999999");
      expect(PayslipViewController.gross_income = "999999");
      expect(PayslipViewController.income_tax = "50");
      expect(PayslipViewController.net_income = "999999");
      expect(PayslipViewController.super = "9.5");
      expect(PayslipViewController.pay = "999999");
    });

  });

});