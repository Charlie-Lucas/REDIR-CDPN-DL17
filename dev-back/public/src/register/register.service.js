(function(){
	'use strict';
	var app = angular.module('register');

	app.factory('registerService', function($http){

        function register(formData) {
			var request = {
					url: 'http://localhost/api/register',
					method: 'POST',
					data: {
						email: formData.email,
						password: formData.password
					}
			};

            return $http(request);
        }

		return {
            register:register
		};
	});
})();
