// import maSwichButton from "./categories/maSwichButton.js"
// import maTreeCategory from "./categories/maTreeCategory.js"
// import maEmbeddedListColumnEdit from './fields/maEmbeddedListColumnEdit';
//import dragndrop from "./../../node_modules/ng-dragndrop/index"

// import dragndrop from "./../../node_modules/angular-drag-drop/dist/angular-drag-drop"




(function(){


    var i8App = angular.module('icons8', [
       'ngResource',
        'ui.router',
        'ui.bootstrap',
         'ngSanitize',
         'color.picker',
        // 'html5DragDrop'
         'ang-drag-drop'
      //   dragndrop
    ]);


    i8App.config(function($provide) {
        $provide.decorator('ColorPickerOptions', function($delegate) {
            var options = angular.copy($delegate);
        //    options.round = true;
            options.alpha = false;
            options.format = 'hex';
            return options;
        });
    });
    i8App.constant('api', {
        url: config.url
    });

    //i8App.directive('ngDragndrop', dragndrop);

    i8App.config(function ($stateProvider, $urlRouterProvider) {

  //      $locationProvider.html5Mode(false).hashPrefix('!');

    //    $urlMatcherFactoryProvider.strictMode(false);
        
        $stateProvider
            // .state('catalog', {
            //     abstract: true,
            //     templateUrl: "/templates/indexcatalog.html",
            //     controller: 'indexCatalogCtr'
            // })
            .state('home', {
                url: "",
                templateUrl: "templates/layout.html",
                controller: 'layoutCtr'
            })
    })



    // i8App.config(['$httpProvider', '$urlMatcherFactoryProvider', function ($httpProvider, $urlMatcherFactoryProvider) {
    //     $httpProvider.defaults.withCredentials = true;
    //     $httpProvider.defaults.useXDomain = true;
    //     $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    //     $httpProvider.defaults.headers.common['Content-type'] = 'application/json';
    //     $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    //     $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    //     $httpProvider.interceptors.push('sessionRecoverer');
    // }]);
   



})();
