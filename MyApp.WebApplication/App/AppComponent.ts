class AppComponent {
    constructor(private $scope: ng.IScope) { }

    asyncContentError: any;

    $onInit() {
        this.$scope.$on('asyncContentError', (ev, error) => this.asyncContentError = error);
        this.$scope.$on('$locationChangeSuccess', () => this.asyncContentError = null);
    }

    clearAsyncContentError() {
        this.asyncContentError = null;
    }
}

angular.module('app').component('app', {
    templateUrl: 'App/AppComponent.html',
    controller: AppComponent
});