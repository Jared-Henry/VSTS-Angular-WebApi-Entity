angular.module('app', ['ui.router']).config(($stateProvider: ng.ui.IStateProvider, $locationProvider: ng.ILocationProvider) => {
    var states: ng.ui.IState[] = [
        {
            name: 'test',
            url: '/test',
            template: '<p>This is a test</p>'
        },
        {
            name: 'blurg',
            url: '/blurg',
            template: '<blurg name="$resolve.name"></blurg>',
            resolve: {
                name: function () {
                    return "Blurg";
                }
            }
        },
        {
            name: 'thing',
            url: '/things/{id}',
            template: '<thing-view thing-id="$resolve.thingId"></thing-view>',
            resolve: {
                thingId: function ($stateParams: ng.ui.IStateParamsService) {
                    return $stateParams["id"];
                }
            }
        },
        {
            name: 'things',
            url: '/things',
            template: '<thing-list></thing-list>'
        }
    ];
    states.forEach(state => $stateProvider.state(state));
});

angular.module('app').component('blurg', {
    template: '<p>name: {{$ctrl.name}}</p>',
    controller: function () {

    },
    bindings: {
        name: '<?'
    }
})