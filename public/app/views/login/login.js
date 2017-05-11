(function() {
	'use strict';

	angular
		.module('payrollApp.login', [
			'ui.router',
			'ngMessages',
			'payrollApp.authServices'
		])
		.config(config)
		.controller('LoginController', LoginController)

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		var loginState = {
			name: 'login',
			url: '/login',
			templateUrl: 'views/login/login.html',
			controller: LoginController,
			controllerAs: 'vm'
		}
		$stateProvider.state(loginState);
	}

	LoginController.$inject = ['AuthServices', '$state', '$rootScope']
	function LoginController(AuthServices, $state, $rootScope) {
		var vm = this;

		vm.loginDetails = {};
		vm.login = login;

		function login() {
			AuthServices.login(vm.loginDetails).then(successRedirect)

			function successRedirect(response) {
				if (response === 'success') {
					$rootScope.toasts= {message: 'Successfully logged in.'};
					$state.go('payslip.form');
					$rootScope.userDetails = AuthServices.userDetails();
				}
			}
		}
	}
})();