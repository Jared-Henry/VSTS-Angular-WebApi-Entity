class ErrorViewComponent {
    error: any;

    isJavascriptException(): boolean {
        return this.error && this.error.message && this.error.stack;
    }

    isWebApiException(): boolean {
        return this.error && this.error.statusCode;
    }

    isUnknownException() {
        return !this.isWebApiException && !this.isJavascriptException();
    }
}

angular.module('app').component('errorView', {
    templateUrl: 'App/Diagnostics/ErrorViewComponent.html',
    controller: ErrorViewComponent,
    bindings: {
        error: '<'
    }
});