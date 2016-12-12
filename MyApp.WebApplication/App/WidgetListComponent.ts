class WidgetListComponent {
    constructor(private $q: ng.IQService, private WidgetService: WidgetService, private ThingService: ThingService) { }

    widgets: Widget[];
    things: _.Dictionary<Thing>;

    initPromise: ng.IPromise<any>;

    $onInit() {
        this.initPromise = this.$q.all([
            this.WidgetService.getAll().then(response => this.widgets = response.data),
            this.ThingService.getAll().then(response => this.things = _.keyBy(response.data, t => t.id))
        ]);
    }
}

angular.module('app').component('widgetList', {
    templateUrl: 'App/WidgetListComponent.html',
    controller: WidgetListComponent
});