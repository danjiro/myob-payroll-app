describe('Payslip factory', function() {
  var PayslipServices;
  var $httpBackend;
  var $q;
  var API = '/api/';

  // Load our payrollApp.payslipServices module
  beforeEach(angular.mock.module('payrollApp.payslipServices'));

  // Set our injected PayslipServices factory (_PayslipServices_) to our local PayslipServices variable
  beforeEach(inject(function(_PayslipServices_, _$q_, _$httpBackend_) {
    PayslipServices = _PayslipServices_;
    $q = _$q_;
    $httpBackend = _$httpBackend_;
  }));

  // A simple test to verify the service exists
  it('should exist', function() {
    expect(PayslipServices).toBeDefined();
  });

  // A set of tests for our PayslipServices.login() method
  describe('.save()', function() {
    var response;

    beforeEach(function() {
      response = {};

      spyOn(PayslipServices, 'save').and.callThrough();
    });

    it('should exist', function() {
      expect(PayslipServices.save).toBeDefined();
    });

    // Save test
    it('should receive a response from save', function() {
      var save = 'payslip';
      var payslipData = {
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
      };
      var payslipUser = {user: 'test@test.com', session: '1234'};

      expect(PayslipServices.save).not.toHaveBeenCalled();
      expect(response).toEqual({});

      $httpBackend
        .when('POST', API + save)
        .respond(200, 'success');

      PayslipServices
        .save(payslipData, payslipUser)
        .then(function(res) {
          response = res;
        });

      $httpBackend.flush();

      expect(PayslipServices.save).toHaveBeenCalledWith(payslipData, payslipUser);
      expect(response).toBe('success');
    });
  });

  // A set of tests for our PayslipServices.get() method
  describe('.get()', function() {
    var response;

    beforeEach(function() {
      response = {};

      spyOn(PayslipServices, 'get').and.callThrough();
    });

    // A simple test to verify the method all exists
    it('should exist', function() {
      expect(PayslipServices.get).toBeDefined();
    });

    // Get test
    it('should receive a response from get', function() {
      var get = "payslip"
      var key = 'test|test|01|2017';
      var payslipUser = {user: 'test@test.com', session: '1234'};

      expect(PayslipServices.get).not.toHaveBeenCalled();
      expect(response).toEqual({});

      $httpBackend
        .when('GET', API + get + '/' + key)
        .respond(200, 'success');

      PayslipServices
        .get(key, payslipUser)
        .then(function(res) {
          response = res;
        });

      $httpBackend.flush();

      expect(PayslipServices.get).toHaveBeenCalledWith(key, payslipUser);
      expect(response).toBe('success');
    });
  });
});