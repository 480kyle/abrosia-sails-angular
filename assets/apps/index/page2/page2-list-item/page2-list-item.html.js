;(function (window, _, $, angular, undefined) {

	var module = angular.module("app");

	module.directive("page2ListItem", function () {

		var scope = {title: "=", content: "="};

		var templateUrl = "/apps/index/page2/page2-list-item/page2-list-item.html";

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
