;(function (window, _, $, angular, undefined) {

	var module = angular.module("app", ["ui.router"]);

	module.config(["$httpProvider", function ($httpProvider) {
		$httpProvider.defaults.headers.common["ajax-request"] = "true";
	}]);

	module.provider("reqToSvr", function () {
		var map = {};

		this.register = function (name, func) {
			map[name] = func;
		};

		this.$get = ["$injector", function ($injector) {
			return function (name, paramObj) {
				var func = map[name];
				if (!func) throw Error("Not Registered");

				return $injector.invoke(func, undefined, paramObj);
			};
		}];
	});

	module.provider("lstToSvr", function () {
		var map = {};

		this.register = function (name, func) {
			map[name] = func;
		};

		this.$get = ["$injector", function ($injector) {
			return function (name, paramObj) {
				var func = map[name];
				if (!func) throw Error("Not Registered");

				return $injector.invoke(func, undefined, paramObj);
			};
		}];
	});

})(window, _, jQuery, angular);
