;(function () {
	var module = angular.module("app");

	module.config(["reqToSvrProvider", function (reqToSvrProvider) {

		reqToSvrProvider.register("getTest", ["$http", "param1", "param2", function ($http, param1, param2) {
			return $http.get("/getTest", {params: {param1: param1, param2: param2}});
		}]); // 사용 예제 >> main.js

		reqToSvrProvider.register("getTest2", ["$http", "myParam1", "myParam2", function ($http, myParam1, myParam2) {
			return $http.get("/getTest2", {params: {my_param1: myParam1, my_param2: myParam2}});
		}]);

	}]);
})();
