;(function (window, _, $, angular, undefined) {
	var module = angular.module("app");

	module.directive("main", function () {
		var scope = {};

		var templateUrl = "/apps/index/main/main.html";

		var controller = ["$scope", "$element", "reqToSvr", function ($scope, $element, reqToSvr) {
			// reqToSvr 사용 예

			var getTest = function (param1, param2) {
				reqToSvr("getTest", {param1: param1, param2: param2}).then(
					function (data) {
						console.log(data);
					},
					function (res) {
						console.log(res);
						alert("조회 실패!");
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
