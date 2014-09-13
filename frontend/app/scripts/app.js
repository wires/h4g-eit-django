(function () {
'use strict';


// Declare app level module which depends on filters, and services
angular
	.module('myApp', [
	  'ngRoute',
	  'myApp.filters',
	  'myApp.services',
	  'myApp.directives',
	  'myApp.controllers'
	])

	// allow DI for use in controllers, unit tests
	.constant('_', window._)

	// use in views, ng-repeat="x in _.range(3)"
	.run(function ($rootScope) {
		$rootScope._ = window._;
	})

	.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider
				.when('/bar', {
					templateUrl: 'partials/game.html',
					controller: 'ListController'
				})
				.otherwise({redirectTo: '/'});
		}
	]);
})();