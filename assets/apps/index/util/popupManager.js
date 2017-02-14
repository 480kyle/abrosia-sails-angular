;(function( window, _, $, angular, undefined )
{
     var module = angular.module( "app" );

     module.factory( "popupManager", [ "$rootScope", "$rootElement", "$compile", "$q",
    function( $rootScope, $rootElement, $compile, $q )
     {
        var openCnt = 0;

        var open = function( popupComp, params, parentScope, popupAnchorSelector )
        {
            popupAnchorSelector = popupAnchorSelector || "#popup_anchor";
            var popupAnchor = $( $rootElement.find( popupAnchorSelector )[0] );

            params = params || {};
            parentScope = parentScope || $rootScope;

            //popupComp = '<' + popupComp +  ' />';

            var popupScope = parentScope.$new();
            popupScope.$$$is_popup_scope$$$ = true;

            for( var key in params )
                popupScope[key] = params[key];

            var defer = $q.defer();
            popupScope.$$$popup_defer$$$ = defer;

            $compile( popupComp )( popupScope, function( clone )
            {
                popupScope.$$$popup_element$$$ = clone;
                popupAnchor.before( clone );
            });
            
            var ret = {
                isClosed : function()
                {
                    return !(popupScope.$$$is_popup_scope$$$)
                },
                close : function( /* ... */ )
                {
                    if( !(popupScope.$$$is_popup_scope$$$) )
                        return;

                    var ps = [ popupScope ];
                    for( var i = 0; i < arguments.length; i++ )
                        ps.push( arguments[i] );
                    
                    closePopup.apply( null, ps );
                },
                element : function()
                {
                    if( !(popupScope.$$$is_popup_scope$$$) )
                        return null;
                    
                    return popupScope.$$$popup_element$$$;
                }
            };

            ret.promise = defer.promise;

            openCnt++;
            $('body').css("overflow","hidden");

            return ret;
        };

        var findPopupScope = function( scope )
        {
            if( scope.$$$is_popup_scope$$$ )
                return scope;

            if( !(scope.$parent) )
                return null;

            return findPopupScope( scope.$parent );
        };

        var closePopup = function( scope, returnParams )
        {
            var popupScope = findPopupScope( scope );
            if( !popupScope )
                return;
            
            var popupElement = popupScope.$$$popup_element$$$;
            if( !popupElement )
                return;

            var popupDefer = popupScope.$$$popup_defer$$$;

            $( popupElement ).remove();
            popupScope.$$$is_popup_scope$$$ = false;
            popupScope.$destroy();
            popupDefer.resolve( returnParams );

            // $( popupElement ).fadeOut( millis, function()
            // {
            //     $( popupElement ).remove();
            //     popupScope.$$$is_popup_scope$$$ = false;
            //     popupScope.$destroy();
            // });

            openCnt--;

            if(openCnt < 1) {
                openCnt = 0;
                $('body').css("overflow", "auto");
            }
        };

        return {
            open : open,
            close : closePopup
        };
     }]);

})( window, _, jQuery, angular );
