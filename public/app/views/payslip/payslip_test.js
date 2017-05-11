describe('payrollApp.payslip', function() {
  var $controller;
  var $httpBackend;
  var PayslipServices;
  var PayslipController;
  var $rootScope;

  var API = '/api/payslip'

  beforeEach(angular.mock.module('ui.router'));
  beforeEach(angular.mock.module('ngMessages'));
  beforeEach(angular.mock.module('payrollApp.authServices'));
  beforeEach(angular.mock.module('payrollApp.payslipServices'));
  beforeEach(angular.mock.module('payrollApp.payslip.view'));
  beforeEach(angular.mock.module('payrollApp.payslip'));

  beforeEach(inject(function(_$controller_, _$httpBackend_, _PayslipServices_, _$rootScope_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    PayslipServices = _PayslipServices_;
    $rootScope = _$rootScope_;
  }));

  describe('Payslip Controller', function() {
  	var PayslipController;

  	beforeEach(function() {
  		PayslipController = $controller('PayslipController', {})
  	});

	  it('should be defined', function() {
	    expect(PayslipController).toBeDefined();
	  });
  });

  describe('.generatePayslip()', function() {
  	var PayslipController;
  	var employee1 = {firstName: 'One', lastName: 'OneLast', annualSalary: 5000, superRate: 5}
  	var employee2 = {firstName: 'Two', lastName: 'TwoLast', annualSalary: 24123, superRate: 8}
  	var employee3 = {firstName: 'Three', lastName: 'ThreeLast', annualSalary: 60050, superRate: 9}
  	var employee4 = {firstName: 'Four', lastName: 'FourLast', annualSalary: 123456, superRate: 9.5}
  	var employee5 = {firstName: 'Five', lastName: 'FiveLast', annualSalary: 515000, superRate: 12}

  	beforeEach(function() {
  		PayslipController = $controller('PayslipController', {})
  	});

  	it('should exist', function() {
  		expect(PayslipController.generatePayslip).toBeDefined();
  	});

  	it('(<18,000) test should return pay of $396', function() {
  		expect(PayslipController.employee).toEqual({});
  		expect(PayslipController.payslipDetails).toBeUndefined();

  		PayslipController.employee = employee1;

  		PayslipController.generatePayslip();

  		expect(PayslipController.payslipDetails.first_name).toBe('One');
  		expect(PayslipController.payslipDetails.last_name).toBe('OneLast');
  		expect(PayslipController.payslipDetails.annual_income).toBe(5000);
  		expect(PayslipController.payslipDetails.gross_income).toBe(417);
  		expect(PayslipController.payslipDetails.income_tax).toBe(0);
  		expect(PayslipController.payslipDetails.net_income).toBe(417);
  		expect(PayslipController.payslipDetails.super).toBe(21);
  		expect(PayslipController.payslipDetails.pay).toBe(396);
  	});

  	it('(18,000 - 37,000) test should return pay of $1,755', function() {
  		expect(PayslipController.employee).toEqual({});
  		expect(PayslipController.payslipDetails).toBeUndefined();

  		PayslipController.employee = employee2;

  		PayslipController.generatePayslip();

  		expect(PayslipController.payslipDetails.first_name).toBe('Two');
  		expect(PayslipController.payslipDetails.last_name).toBe('TwoLast');
  		expect(PayslipController.payslipDetails.annual_income).toBe(24123);
  		expect(PayslipController.payslipDetails.gross_income).toBe(2010);
  		expect(PayslipController.payslipDetails.income_tax).toBe(94);
  		expect(PayslipController.payslipDetails.net_income).toBe(1916);
  		expect(PayslipController.payslipDetails.super).toBe(161);
  		expect(PayslipController.payslipDetails.pay).toBe(1755);
  	});

  	it('(37,000 - 80,000) test should return pay of $3,632', function() {
  		expect(PayslipController.employee).toEqual({});
  		expect(PayslipController.payslipDetails).toBeUndefined();

  		PayslipController.employee = employee3;

  		PayslipController.generatePayslip();

  		expect(PayslipController.payslipDetails.first_name).toBe('Three');
  		expect(PayslipController.payslipDetails.last_name).toBe('ThreeLast');
  		expect(PayslipController.payslipDetails.annual_income).toBe(60050);
  		expect(PayslipController.payslipDetails.gross_income).toBe(5004);
  		expect(PayslipController.payslipDetails.income_tax).toBe(922);
  		expect(PayslipController.payslipDetails.net_income).toBe(4082);
  		expect(PayslipController.payslipDetails.super).toBe(450);
  		expect(PayslipController.payslipDetails.pay).toBe(3632);
  	});

  	it('(80,000 - 180,000) test should return pay of $6,509', function() {
  		expect(PayslipController.employee).toEqual({});
  		expect(PayslipController.payslipDetails).toBeUndefined();

  		PayslipController.employee = employee4;

  		PayslipController.generatePayslip();

  		expect(PayslipController.payslipDetails.first_name).toBe('Four');
  		expect(PayslipController.payslipDetails.last_name).toBe('FourLast');
  		expect(PayslipController.payslipDetails.annual_income).toBe(123456);
  		expect(PayslipController.payslipDetails.gross_income).toBe(10288);
  		expect(PayslipController.payslipDetails.income_tax).toBe(2802);
  		expect(PayslipController.payslipDetails.net_income).toBe(7486);
  		expect(PayslipController.payslipDetails.super).toBe(977);
  		expect(PayslipController.payslipDetails.pay).toBe(6509);
  	});

  	it('(180,000<) test should return pay of $20,659', function() {
  		expect(PayslipController.employee).toEqual({});
  		expect(PayslipController.payslipDetails).toBeUndefined();

  		PayslipController.employee = employee5;

  		PayslipController.generatePayslip();

  		expect(PayslipController.payslipDetails.first_name).toBe('Five');
  		expect(PayslipController.payslipDetails.last_name).toBe('FiveLast');
  		expect(PayslipController.payslipDetails.annual_income).toBe(515000);
  		expect(PayslipController.payslipDetails.gross_income).toBe(42917);
  		expect(PayslipController.payslipDetails.income_tax).toBe(17108);
  		expect(PayslipController.payslipDetails.net_income).toBe(25809);
  		expect(PayslipController.payslipDetails.super).toBe(5150);
  		expect(PayslipController.payslipDetails.pay).toBe(20659);
  	});

  });

	describe('.pay()', function() {
		var PayslipController;
		var payslipDetails;
		var response;
		var employee;

		beforeEach(function() {
			PayslipController = $controller('PayslipController', {});
			$rootScope.userDetails = {user: 'test', 'session': '1234'};
			payslipDetails = {
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
			employee = {
				firstName: 'test',
				lastName: 'testLast',
				annualSalary: 1234,
				superRate: 1
			};

			spyOn(PayslipServices, 'save').and.callThrough();
		});

		it('should be defined', function() {
			expect(PayslipController.pay).toBeDefined();
		});

		it('should call PayslipServices.save and get a response', function() {
			PayslipController.payslipDetails = payslipDetails;
			PayslipController.employee = employee;

			expect(response).toBeUndefined();
			expect(PayslipController.employee).toBe(employee);

			$httpBackend
				.when('POST', API)
				.respond(200, {error: false, key: 'test|test|1|2017'})

			PayslipController.pay();

			$httpBackend.flush();

			expect(PayslipServices.save).toHaveBeenCalledWith(PayslipController.payslipDetails, $rootScope.userDetails);
			expect(PayslipController.employee).toEqual({});
		})
	});
});