'use strict';

/* App Module */

angular.module('app', [
    'ui.router',
    'ui.bootstrap',
    'oitozero.ngSweetAlert',
    'angular-loading-bar',
    'app.controllers',
    'app.filters',
    'app.services',
    'app.directives'
])
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('test', {
                url: '/test',
                templateUrl: 'templates/test.html',
                controller: 'TestCtrl'
            });

        $urlRouterProvider.otherwise("/test");
    });
