;(function (window, _, $, angular, undefined) {
	var module = angular.module("app");

	module.directive("page2", function () {
		var scope = {};

		var templateUrl = "/apps/index/page2/page2.html";

		var controller = ["$scope", "$element", "reqToSvr", "lstToSvr",
			function ($scope, $element, reqToSvr, lstToSvr) {

				$scope.recvMessages = [];

				$scope.message = "";

				$scope.notify = function () {
					reqToSvr("notify", {message: $scope.message}).then(
						function (response) {
							console.log(response);
						},
						function (response) {
							alert("notify error");
						}
					);
				};

				reqToSvr("socketLogin").then(
					function (data) {
						console.log(data);
					},
					function (res) {
						console.log(res);
						alert("socket login error");
					}
				);

				var ob = lstToSvr("observeNotify").map(function (message) {
					return {
						title: new Date().toLocaleDateString(),
						content: message
					};
				}).subscribe(function (message) {
					$scope.recvMessages.push(message);
					$scope.$apply();
				});

				$scope.$on("$destroy", function () {
					ob.dispose();
				});
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
