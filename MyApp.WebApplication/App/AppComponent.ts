class AppComponent {
    constructor(private $scope: ng.IScope) { }

    asyncContentError: any;

    $onInit() {
        this.$scope.$on('asyncContentError', (ev, error) => this.asyncContentError = error);
    }

    clearAsyncContentError() {
        this.asyncContentError = null;
    }
}

angular.module('app').component('app', {
    templateUrl: 'App/AppComponent.html',
    controller: AppComponent
});