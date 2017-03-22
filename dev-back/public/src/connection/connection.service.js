(function(){
	'use strict';
	var app = angular.module('connection');

	app.factory('connectionService', function($http){

        function connect(formData) {
			var request = {
					url: 'http://localhost/api/connect',
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
