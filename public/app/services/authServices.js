(function() {
	'use strict';

	angular
		.module('payrollApp.authServices', [])
		.factory('AuthServices', authFactory);

	authFactory.$inject = ['$http', '$window'];
	function authFactory($http, $window) {
		var services = {
			login: login,
			logout: logout,
			userDetails: userDetails,
			isAuthenticated: isAuthenticated
		}

		return services;

		function login(data) {
			return $http.post('/api/login', data)
				.then(loginSuccess)
				.catch(loginError);

			function loginSuccess(response) {
				var res = response.data;
				if (res.error === false) {
					$window.localStorage['user'] = data.user;
					$window.localStorage['session'] = res.session;

					return 'success';
				}
				// return something either way for testing
				else { return response }
			}

			function loginError(error) {
				console.log(error);
			}
		}

		function logout(data) {
			return $http.post('/api/logout', data)
				.then(logoutSuccess)
				.catch(logoutError)

			function logoutSuccess(response) {
				var res = response.data;
				if (res.error === false) {
					$window.localStorage.removeItem('user');
					$window.localStorage.removeItem('session');

					return 'success';
				}
				//return something either way for testing
				else { return response }
			}

			function logoutError(error) {
				console.log(error.data);
			}
		}

		function userDetails() {
			var details = {};

			if (services.isAuthenticated()) {
				details.user = $window.localStorage['user'];
				details.session = $window.localStorage['session'];

				return details;
			}
			else { return false }
		}

		function isAuthenticated() {
			if ($window.localStorage['user'] && $window.localStorage['session']) {
				return true;
			}
			else { return false; }
		}
	}

})();
