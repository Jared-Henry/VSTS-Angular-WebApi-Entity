class WebApiExceptionComponent {
    exception: IWebApiException;
    showStackTrace = false;
    toggleStackTrace() {
        this.showStackTrace = !this.showStackTrace;
    }
}

angular.module('app').component('webApiException', {
    templateUrl: 'App/Diagnostics/WebApiExceptionComponent.html',
    controller: WebApiExceptionComponent,
    bindings: {
        exception: '<'
    }
});