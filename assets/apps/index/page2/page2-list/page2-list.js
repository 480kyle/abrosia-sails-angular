;(function (window, _, $, angular, undefined) {

	var module = angular.module("app");

	module.directive("page2List", function () {

		var scope = {list: "="};

		var templateUrl = "/apps/index/page2/page2-list/page2-list.html";

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
