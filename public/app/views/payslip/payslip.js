(function() {
	'use strict';

	angular
		.module('payrollApp.payslip', [
			'ui.router',
			'ngMessages',
			'payrollApp.authServices',
			'payrollApp.payslipServices',
			'payrollApp.payslip.view'
		])
		.config(config)
		.controller('PayslipController', PayslipController)

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		var payslipState = {
			name: 'payslip',
			url: '/payslip',
			abstract: true,
			templateUrl: 'views/payslip/payslip.html',
			resolve: {
				authenticated: function($location, AuthServices, $rootScope, $state) {
					if(!AuthServices.isAuthenticated()) {
						$state.transitionTo('login');
					}
					else {
						$rootScope.userDetails = AuthServices.userDetails();
					}
				}
			},
			controller: PayslipController,
			controllerAs: 'vm'
		}

		var payslipFormState = {
			name: 'payslip.form',
			url: '',
			views: {
				'main@payslip': {
					templateUrl: 'views/payslip/payslipForm/payslipForm.html'
				}
			}
		}

		var generateState = {
			name: 'payslip.form.generate',
			url: '',
			views: {
				'main@payslip': {
					templateUrl: 'views/payslip/payslipForm/generate/generate.html'
				}
			}
		}

		$stateProvider.state(payslipState);
		$stateProvider.state(payslipFormState);
		$stateProvider.state(generateState);
	}

	PayslipController.$inject = ['AuthServices', 'PayslipServices', '$state', '$rootScope']
	function PayslipController(AuthServices, PayslipServices, $state, $rootScope) {
		var vm = this;

		vm.test = 1;
		vm.employee = {};
		vm.generatePayslip = generatePayslip;
		vm.pay = pay;

		function generatePayslip() {
			vm.payslipDetails = calculate(vm.employee);
			$state.transitionTo('payslip.form.generate')
		}

		function calculate(employee) {
			var calculatedData = {
				first_name: employee.firstName,
				last_name: employee.lastName,
				pay_date_month: 1,
				pay_date_year: 2017,
				pay_frequency: 'Monthly',
				annual_income: employee.annualSalary,
				gross_income: calcGrossIncome(),
				income_tax: calcIncomeTax(employee.annualSalary),
			}

			calculatedData.net_income = calculatedData.gross_income - calculatedData.income_tax;
			calculatedData.super = Math.round(calculatedData.gross_income * (employee.superRate * 0.01));
			calculatedData.pay = calculatedData.net_income - calculatedData.super;

			function calcGrossIncome() {
				var grossIncome = employee.annualSalary / 12;
				var rounded = Math.round(grossIncome);

				return rounded;
			}

			function calcIncomeTax(data) {
				var salary = data;

				if (salary >= 0 && salary <= 18200) {
					return 0;
				}

				else if (salary >= 18201 && salary <= 37000) {
					return getTax(18200, 0.19, 0);
				}

				else if (salary >= 37001 && salary <= 80000) {
					return getTax(37000, 0.325, 3572);;
				}

				else if (salary >= 80001 && salary <= 180000) {
					return getTax(80000, 0.37, 17547);;
				}

				else if (salary >= 180001) {
					return getTax(180000, 0.45, 54547);;
				}

				function getTax(threshold, taxPerc, prevTax) {
					var difference = salary - threshold;
					var tax = ((difference * taxPerc) + prevTax) / 12;
					var rounded = Math.round(tax);

					return rounded;
				}
			}

			return calculatedData;
		}

		function pay() {
			PayslipServices
				.save(vm.payslipDetails, $rootScope.userDetails)
				.then(function(response) {
					console.log(response);
					if (response.error === false) {
						vm.employee = {};
						$state.transitionTo('payslip.view', {key: response.key});
						$rootScope.toasts = response;
					}
					else if (response.error === true) {
						$rootScope.toasts = response;
					}
				});
		}
	}
})();
