(function(){
    'use strict';

    var app = angular.module('connection');

    app.controller('ConnectionController', function($location, connectionService){
        var vm = this;

        vm.sendForm = function($scope) {
            connectionService.connect(vm.formData);
		};
    });
})();
