;(function () {
	var module = angular.module("app");

	module.config(["reqToSvrProvider", function (reqToSvrProvider) {

		reqToSvrProvider.register("testRequest", ["$http", "myParam1", "myParam2", function ($http, myParam1, myParam2) {
			return $http.get("/test", {params: {my_param1: myParam1, my_param2: myParam2}});
		}]);

	}]);
})();
