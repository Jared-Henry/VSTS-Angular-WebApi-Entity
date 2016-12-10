class TesterComponent {

    constructor(private $q: ng.IQService, private $http: ng.IHttpService, private $location: ng.ILocationService, private $scope: ng.IScope) { }

    asyncContentMessage: string;
    asyncContentHideOnNullPromise = false;
    asyncContentState = 'Initial';
    asyncContentPromise: ng.IPromise<any>;
    asyncContentError: any;
    javascriptException: any;
    javascriptExceptionLevels = 0;
    tabIndex = 0;

    $onInit() {
        this.tabIndex = parseInt(this.$location.search()['tabIndex'] || '0');   
        this.$scope.$on("$locationChangeSuccess", () => {
            this.tabIndex = parseInt(this.$location.search()['tabIndex'] || '0');
        });
        this.$scope.$watch('$ctrl.tabIndex', () => {
            this.$location.replace();
            this.$location.search('tabIndex', this.tabIndex);
        });
        this.$scope.$on('asyncContentError', (ev, error) => {
            this.asyncContentError = error;
        });
    }

    asyncContentStateChange() {
        this.asyncContentError = null;
        switch (this.asyncContentState) {
            case 'Initial':
                this.asyncContentPromise = null;
                break;
            case 'Loading':
                this.asyncContentPromise = this.$q.defer().promise;
                break;
            case 'Success':
                this.asyncContentPromise = this.$q.all([]);
                break;
            case 'ErrorJavascript':
                let jsDeferred = this.$q.defer();
                this.asyncContentPromise = jsDeferred.promise.then(() => { throw new Error("An error occurred."); });
                jsDeferred.resolve();
                break;
            case 'ErrorHttp':
                let httpDeferred = this.$q.defer();
                this.asyncContentPromise = httpDeferred.promise;
                httpDeferred.reject({
                    data: {
                        exceptionMessage: 'Test exception message.',
                        exceptionType: 'TestExceptionType',
                        stackTrace: `Stack trace line 1
Stack trace line 2
Stack trace line 3
Stack trace line 4
Stack trace line 4`
                    },
                    config: {
                        method: 'POST',
                        url: 'api/diagnostics/test-method'
                    },
                    status: 500,
                    statusText: 'Internal Error'
                })                
        }
    }

    throwJavascriptException() {
        try {
            this.nestedException(this.javascriptExceptionLevels);
        }
        catch (ex) {
            this.javascriptException = ex;
        }
    }

    nestedException(level: number) {
        if (level === 0)
            throw new Error("Test javascript exception thrown.");
        try {
            this.nestedException(level - 1);
        }
        catch (ex) {
            throw ex;
        }
    }
}

class TesterComponentHttpError implements ng.IHttpPromiseCallbackArg<{}> {

}

angular.module('app').component('tester', {
    templateUrl: 'App/Diagnostics/TesterComponent.html',
    controller: TesterComponent
});