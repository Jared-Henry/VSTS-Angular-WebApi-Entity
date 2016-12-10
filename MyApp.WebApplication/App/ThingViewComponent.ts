class ThingViewComponent {

    constructor(private ThingService: ThingService, private $q: ng.IQService, private $location: ng.ILocationService) { }

    thingId: number | string;
    thing: Thing
    initPromise: ng.IPromise<any>;
    savePromise: ng.IPromise<any>;

    $onInit() {
        if (this.thingId == 'new') {
            this.thing = {};
            this.initPromise = this.$q.all([]);
        }
        else
            this.initPromise = this.ThingService.get(<number>this.thingId).then(response => this.thing = response.data);
    }

    save() {
        if (this.thing.id)
            this.savePromise = this.ThingService.update(this.thing.id, this.thing);
        else
            this.savePromise = this.ThingService.insert(this.thing).then(response => {
                this.thing.id = response.data;
                this.thingId = response.data;
            });
    }
}

angular.module('app').component('thingView', {
    templateUrl: 'app/ThingViewComponent.html',
    controller: ThingViewComponent,
    bindings: {
        thingId: '<'
    }
}); 