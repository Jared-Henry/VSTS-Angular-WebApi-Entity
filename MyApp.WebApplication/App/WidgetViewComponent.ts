class WidgetViewComponent {

    constructor(private $q: ng.IQService, private WidgetService: WidgetService, private ThingService: ThingService) { }

    widgetId: number | string;
    widget: Widget;
    things: Thing[];
    initPromise: ng.IPromise<any>;
    savePromise: ng.IPromise<any>;

    $onInit() {
        let promises: ng.IPromise<any>[] = [];
        promises.push(this.ThingService.getAll().then(response => this.things = response.data));
        if (this.widgetId === 'new')
            this.widget = {};
        else
            promises.push(this.WidgetService.get(<number>this.widgetId).then(response => this.widget = response.data));
        this.initPromise = this.$q.all(promises);
    }

    save() {
        if (this.widget.id)
            this.savePromise = this.WidgetService.update(this.widget.id, this.widget);
        else
            this.savePromise = this.WidgetService.insert(this.widget).then(response => this.widget.id = response.data);
    }
}

angular.module('app').component('widgetView', {
    templateUrl: 'App/WidgetViewComponent.html',
    controller: WidgetViewComponent,
    bindings: {
        widgetId: '<'
    }
});