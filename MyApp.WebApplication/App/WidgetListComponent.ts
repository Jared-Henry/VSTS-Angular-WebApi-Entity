class WidgetListComponent {
    constructor(private WidgetService: WidgetService) { }

    widgets: Widget[];

    initPromise: ng.IPromise<any>;

    $onInit() {
        this.initPromise = this.WidgetService.getAll().then(response => this.widgets = response.data);
    }
}

angular.module('app').component('widgetList', {
    templateUrl: 'App/WidgetListComponent.html',
    controller: WidgetListComponent
});