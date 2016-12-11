angular.module('app').constant('routerStates', [

    //Home Page
    {
        name: 'home',
        url: '/',
        template: '<home/>'
    },

    //Widgets
    {
        name: 'widgets',
        url: '/widgets',
        template: '<widget-list/>'
    },
    {
        name: 'widget',
        url: '/widgets/{id}',
        template: '<widget-view widget-id="$resolve.widgetId"/>',
        resolve: {
            widgetId: ($stateParams: ng.ui.IStateParamsService) => $stateParams["id"]
        }
    },

    //Things
    {
        name: 'things',
        url: '/things',
        template: '<thing-list/>'
    },
    {
        name: 'thing',
        url: '/things/{id}',
        template: '<thing-view thing-id="$resolve.thingId"/>',
        resolve: {
            thingId: ($stateParams: ng.ui.IStateParamsService) => $stateParams["id"]
        }
    },

    //Diagnostics
    {
        name: 'tester',
        url: '/tester',
        template: '<tester/>'
    }
]);

