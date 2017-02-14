;(function (window, _, $, angular, undefined) {
	var module = angular.module("app");

	module.directive("popupWrite", function () {
		var scope = {data: "="};

		var templateUrl = "/apps/index/page3/popup-write/popup-write.html";

		var controller = ["$scope", "$element", "popupManager", function ($scope, $element, popupManager) {
			console.log("popup write data",$scope.data);

			$scope.cancel = function () {
				popupManager.close($scope, {writeParam: "write!"});
			};
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
