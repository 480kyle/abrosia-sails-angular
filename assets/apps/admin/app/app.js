;(function (window, _, $, angular, undefined) {
	var module = angular.module("app");

	module.directive("app", function () {
		var scope = {};

		var templateUrl = "/apps/admin/app/app.html";

		var controller = ["$scope", "$element", function ($scope, $element) {

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
