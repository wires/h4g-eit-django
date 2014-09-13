(function () {

'use strict';

angular.module('myApp.controllers', [])
	.controller('ListController', ['$scope', '$http', '$location',
		function($scope, $http, $location) {
			$scope.foo = "hello";
		}
	])
})();