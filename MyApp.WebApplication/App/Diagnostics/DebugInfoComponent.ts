class DebugInfoComponent {
    constructor(private debugInfo: any) { }
}

angular.module('app').component('debugInfo', {
    templateUrl: 'App/Diagnostics/DebugInfoComponent.html',
    controller: DebugInfoComponent
});