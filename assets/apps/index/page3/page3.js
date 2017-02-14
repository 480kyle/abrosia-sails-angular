;(function (window, _, $, angular, undefined) {
	var module = angular.module("app");

	module.directive("page3", function () {
		var scope = {};

		var templateUrl = "/apps/index/page3/page3.html";

		var controller = ["$scope", "$element", "popupManager", function ($scope, $element, popupManager) {
			$scope.data = {
				title: "view title",
				contents: "contents",
				owner: "bpnr"
			};

			var data2 = {
				title: "write title",
				contents: "contents",
				owner: "bpnr"
			};

			$scope.openPopupView = function () {
				popupManager.open('<popup-view data="{{data}}"></popup-view>',
					{data: $scope.data}, $scope).promise.then(
					function (params) {
						params.viewParam ? console.log("viewParam", params.viewParam) : void(0);
					}
				);
			};

			$scope.openPopupWrite = function () {
				popupManager.open('<popup-write data="data"></popup-write>',
					{data: data2}, $scope).promise.then(
					function (params) {
						params.writeParam ? console.log("writeParam", params.writeParam) : void(0);
					}
				);
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
