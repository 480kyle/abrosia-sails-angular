;(function( window, _, $, angular, undefined )
{
	var module = angular.module( "app" );

	module.directive( "mainContentItem2", function()
	{
		var scope = {};

		var templateUrl = "/apps/index/main/content-item2/main-content-item2.html";

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
