;(function (window, _, $, angular, undefined) {
	var module = angular.module("app");

	module.config(["$stateProvider", "$urlRouterProvider",
		function ($stateProvider, $urlRouterProvider) {
			$stateProvider.state("main", {
				url: "/main", abstract: true,
				template: "<main></main>"
			});

			$stateProvider.state("page1", {
				url: "/page1",
				template: "<page1></page1>"
			});

			$stateProvider.state("page2", {
				url: "/page2",
				template: "<page2></page2>"
			});

			$stateProvider.state("page3", {
				url: "/page3",
				template: "<page3></page3>"
			});

			//--------------------------------------------------------------------------------

			$urlRouterProvider.otherwise("/main");
		}]);
})(window, _, jQuery, angular);
