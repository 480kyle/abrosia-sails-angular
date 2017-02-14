;(function (window, _, $, angular, undefined) {
	var module = angular.module("app");

	module.config(["$stateProvider", "$urlRouterProvider",
		function ($stateProvider, $urlRouterProvider) {
			$stateProvider.state("main.content1", {
				url: "",
				abstract: true,
				template: "<main-content></main-content>"
			});

			$stateProvider.state("main.content1.item1", {
				url: "",
				template: "<main-content-item1></main-content-item1>"
			});

			$stateProvider.state("main.content1.item2", {
				url: "/content1/item2",
				template: "<main-content-item2></main-content-item2>"
			});

			//--------------------------------------------------------------------------------

			$stateProvider.state("main.content2", {
				url: "/content2",
				template: "<main-content2></main-content2>"
			});

			//--------------------------------------------------------------------------------

			$stateProvider.state("main.content3", {
				url: "/content3",
				template: "<main-content3></main-content3>"
			});
		}]);
})(window, _, jQuery, angular);
