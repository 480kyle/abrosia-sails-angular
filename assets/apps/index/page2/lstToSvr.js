;(function () {
	var module = angular.module("app");

	module.config(["lstToSvrProvider", function (lstToSvrProvider) {

		lstToSvrProvider.register("observeNotify", function () {
			console.log("call");
			return Rx.Observable.create(function (observer) {
				var handler = function (message) {
					observer.onNext(message);
				};

				io.socket.on("notify", handler);

				return function unsubscribe() {
					io.socket.off("notify", handler);
				};
			});
		});
	}]);
})();
