class ThingListComponent {

    constructor(private ThingService: ThingService) { }

    things: Thing[];
    initPromise: ng.IPromise<any>;

    $onInit() {
        this.initPromise = this.ThingService.getAll().then(response => this.things = response.data);
    }
}

angular.module('app').component('thingList', {
    templateUrl: 'App/ThingListComponent.html',
    controller: ThingListComponent
});