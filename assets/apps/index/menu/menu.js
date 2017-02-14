;(function (window, _, $, angular, undefined) {
	var module = angular.module("app");

	module.directive("menu", function () {
		var scope = {};

		var templateUrl = "/apps/index/menu/menu.html";

		var controller = ["$scope", "$element", "reqToSvr", function ($scope, $element, reqToSvr) {

		}];

		return {
			restrict: "E",
			scope: scope,
			templateUrl: templateUrl,
			replace: true,
			controller: controller
		};
	});

})(window, _, jQuery, angular);
