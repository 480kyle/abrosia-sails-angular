;(function () {
	var module = angular.module("app");

	module.config(["reqToSvrProvider", function (reqToSvrProvider) {

		reqToSvrProvider.register("notify", ["$http", "message", function ($http, message) {
			console.log("massage :", message);
			return $http.post("/notify", {message: message});
		}]);

		reqToSvrProvider.register("socketLogin", ["$q", function ($q) {
			return $q(function (resolve, reject) {
				io.socket.post("/socketLogin", function (resData, jwres) {
					if (jwres.statusCode !== 200)
						reject(jwres);
					else
						resolve(resData);
				});
			});
		}]);
	}]);
})();
