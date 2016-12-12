angular.module('app', ['ui.router', 'ui.bootstrap']).config(($stateProvider: ng.ui.IStateProvider, $locationProvider: ng.ILocationProvider, routerStates: ng.ui.IState[], $urlRouterProvider: ng.ui.IUrlRouterProvider) => {    
    $locationProvider.html5Mode(true);    
    $urlRouterProvider.otherwise('/');
    routerStates.forEach(state => $stateProvider.state(state));
});