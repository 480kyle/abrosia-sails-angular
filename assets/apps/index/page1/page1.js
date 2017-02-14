;(function (window, _, $, angular, undefined) {
	var module = angular.module("app");

	module.directive("page1", function () {
		var scope = {};

		var templateUrl = "/apps/index/page1/page1.html";

		var controller = ["$scope", "$element", "reqToSvr", function ($scope, $element, reqToSvr) {

			$scope.myParam1 = "p1";
			$scope.myParam2 = "p2";

			var testRequestFn = function (param1, param2) {
				reqToSvr("testRequest", {myParam1: param1, myParam2: param2}).then(
					function (data) {
						console.log(data);
						alert("success! params : " + data.data.params[0] + ", " + data.data.params[1]);
					},
					function (res) {
						console.log(res);
						alert("조회 실패!");
					}
				);
			};

			$scope.testRequest = function() {
				testRequestFn($scope.myParam1, $scope.myParam2);
			}

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
