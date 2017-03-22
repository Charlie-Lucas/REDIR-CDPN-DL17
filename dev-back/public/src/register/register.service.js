(function(){
	'use strict';
	var app = angular.module('register');

	app.factory('registerService', function($http){

        function checkPasswords(formData) {
            return formData.password === formData.confirmPassword;
        }

        function register(formData) {
            var result = undefined;

            if(checkPasswords(formData) === true) {
                var request = {
                        url: 'http://api.com/register', // TODO
                        method: 'POST',
                        data: {
                            email: formData.email,
                            password: formData.password
                        }
                };

                result = $http(request);
            } else {
                result = 'Les mots de passe saisis ne correspondent pas !';
            }

            return result;
        }

		return {
            register:register
		};
	});
})();
