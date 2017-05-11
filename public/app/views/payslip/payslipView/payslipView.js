(function() {
	'use strict';

	angular
		.module('payrollApp.payslip.view', [])
		.config(config)
		.controller('PayslipViewController', PayslipViewController)

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		var viewState = {
			name: 'payslip.view',
			url: '/:key',
			views: {
				'main@payslip': {
					templateUrl: 'views/payslip/payslipView/payslipView.html',
					controller: PayslipViewController,
					controllerAs: 'vm'
				}
			},

		}

		$stateProvider.state(viewState);
	}

	PayslipViewController.$inject = ['$stateParams', 'PayslipServices', '$rootScope', '$state']

	function PayslipViewController($stateParams, PayslipServices, $rootScope, $state) {
		var vm = this;

		vm.payslipDetails = null;

		PayslipServices
			.get($stateParams.key, $rootScope.userDetails)
			.then(function(response) {
				if (response.error === true) {
					$rootScope.toasts = response;
					$state.transitionTo('payslip.form');
				}
				else {
					vm.payslipDetails = response;
				}
			});
	}
})();
