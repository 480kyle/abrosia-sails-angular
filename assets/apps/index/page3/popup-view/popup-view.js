;(function (window, _, $, angular, undefined) {
	var module = angular.module("app");

	module.directive("popupView", function () {
		var scope = {data: "@"};

		var templateUrl = "/apps/index/page3/popup-view/popup-view.html";

		var controller = ["$scope", "$element", "popupManager", function ($scope, $element, popupManager) {

			var tmp = JSON.parse($scope.data);

			$scope.title = tmp.title;
			$scope.contents = tmp.contents;
			$scope.owner = tmp.owner;

			console.log("popup view data",$scope.data);
			console.log("popup view data(parsing)", tmp);

			$scope.cancel = function () {
				popupManager.close($scope, {viewParam: "view!"});
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
