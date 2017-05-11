(function() {
	'use strict';

	angular
		.module('payrollApp.payslipServices', [])
		.factory('PayslipServices', payslipFactory);

	payslipFactory.$inject = ['$http', '$window'];
	function payslipFactory($http, $window) {
		var services = {
			save: save,
			get: get
		}

		return services;

		function save(data, user) {
			return $http.post('/api/payslip', data, {
				headers: {
					'myob-user': user.user,
					'myob-token': user.session
				}
			})
				.then(saveSuccess)
				.catch(saveError)
		}

		function get(key, user) {
			return $http.get('/api/payslip/' + key, {
				headers: {
					'myob-user': user.user,
					'myob-token': user.session
				}
			})
				.then(saveSuccess)
				.catch(saveError)
		}

		function saveSuccess(response) {
			return response.data;
		}

		function saveError(error) {
			console.log('Payslip error', error);
		}
	}

})();
