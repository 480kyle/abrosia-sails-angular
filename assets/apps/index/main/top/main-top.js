;(function( window, _, $, angular, undefined )
{
	var module = angular.module( "app" );

	module.directive( "mainTop", function()
	{
		var scope = {};

		var templateUrl = "/apps/index/main/top/main-top.html";

		var controller = [ "$scope", "$element", function( $scope, $element )
		{

		}];

		return {
			restrict : "E",
			scope : scope,
			templateUrl : templateUrl,
			replace : true,
			controller : controller
		};
	});

})( window, _, jQuery, angular );
