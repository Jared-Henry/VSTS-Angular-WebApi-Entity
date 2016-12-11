angular.module('app', ['ui.router', 'ui.bootstrap']).config(($stateProvider: ng.ui.IStateProvider, $locationProvider: ng.ILocationProvider, routerStates: ng.ui.IState[]) => {
    routerStates.forEach(state => $stateProvider.state(state));
});