(function(){
    'use strict';

    var app = angular.module('register');

    app.controller('RegisterController', function($location){
        var vm = this;

        vm.sendForm = function($scope) {
			vm.toto = 'Toto';
		};
    });
})();
