class JavascriptExceptionComponent {
    exception: any;
    showStackTrace = false;

    toggleStackTrace() {
        this.showStackTrace = !this.showStackTrace;
    }
}

angular.module('app').component('javascriptException', {
    templateUrl: 'App/Diagnostics/JavascriptExceptionComponent.html',
    controller: JavascriptExceptionComponent,
    bindings: {
        exception: '<'
    }
});