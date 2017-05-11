(function() {
	'use strict';

	// Declare app level module which depends on views, and components
	angular
		.module('payrollApp', [
		  'ui.router',
		  'ngMaterial',
		  'payrollApp.login',
		  'payrollApp.payslip',
		  'payrollApp.authServices'
		])
		.config(config)
		.run(run)
		.controller('payrollAppController', payrollAppController);

	config.$inject = ['$urlRouterProvider', '$stateProvider', '$mdIconProvider', '$mdThemingProvider']
	function config($urlRouterProvider, $stateProvider, $mdIconProvider, $mdThemingProvider) {
		$urlRouterProvider.otherwise('/login');
		$mdIconProvider
			.icon('percentage', './assets/svg/percentage-discount.svg', '24')
			.icon('dollar-sign', './assets/svg/american-dollar-symbol.svg', '24');
		$mdThemingProvider
			.theme('default')
			.primaryPalette('deep-purple')
	}

	run.$inject = ['$location', 'AuthServices']
	function run($location, AuthServices) {
		if(AuthServices.isAuthenticated()) {
			if($location.$$url.indexOf('payslip') === -1) {
      	$location.path('/payslip');
			}
		}
	}

	payrollAppController.$inject = ['$rootScope', '$scope', '$mdToast', 'AuthServices', '$state'];
	function payrollAppController($rootScope, $scope, $mdToast, AuthServices, $state) {
		var vm = this;

		vm.logout = logout;
		$rootScope.userDetails = {}

		function logout() {
			AuthServices.logout({user: $rootScope.userDetails.session}).then(successRedirect);

			function successRedirect(result) {
				if (result === 'success') {
					$rootScope.toasts= {message: 'Successfully logged out.'};
					$state.go('login');
					$rootScope.userDetails = {};
				}
			}
		}

		// Toast messages using $mdToast
	  $rootScope.toasts = {};

	  // Watch toast object on $rootScope.toasts and
	  // fire $mdToast when there is a new message
	  $rootScope.$watch('toasts', function() {
	    var toast = $mdToast.simple()
	      .textContent($rootScope.toasts.message)
	      .position('bottom right')
	      .theme('default')
	      .parent('body')
	      .toastClass('mt-toast')
	      .hideDelay(4000);

	    // Only show toast when there is a message and 
	    // empty toasts object after hiding
	    if ($rootScope.toasts.message) {
	      $mdToast.show(toast).then(function() {
	        $rootScope.toasts = {};
	      });
	    }
  	});
	}
})();

