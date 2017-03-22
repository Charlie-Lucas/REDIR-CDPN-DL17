(function(){
    'use strict';

    var app = angular.module('register');

    app.controller('RegisterController', function($location, $scope, registerService){
        var vm = this;

        vm.sendForm = function() {
			registerService.register(vm.formData);
		};
    });
})();
