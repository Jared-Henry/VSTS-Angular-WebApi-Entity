class AsyncContentComponent {
    constructor(private $q: ng.IQService, private $scope: ng.IScope) { }

    static DEFAULT_MESSAGE = '';
    static DEFAULT_ERROR_MESSAGE = 'An error occured while processing your request.';

    promise: ng.IPromise<any>;
    hideOnNullPromise: boolean;
    state: AsyncContentComponentState;  
    error: any;
    errorMessage: string;
    message: string;

    showContent() {
        return this.state === AsyncContentComponentState.Content;
    }

    showMessage() {
        return this.state === AsyncContentComponentState.Message;
    }

    showError() {
        return this.state === AsyncContentComponentState.Error;
    }

    getMessage() {
        return this.message || AsyncContentComponent.DEFAULT_MESSAGE;
    }

    getErrorMessage() {
        return this.errorMessage || AsyncContentComponent.DEFAULT_ERROR_MESSAGE;
    }

    emitAsyncContentError() {
        this.$scope.$emit('asyncContentError', this.error);
    }

    $onInit() {
        if (this.promise)
            this.handlePromise();
        else
            this.state = AsyncContentComponentState.Content;
    }

    $onChanges(changes: ng.IOnChangesObject) {
        if (changes["promise"])
            if (this.promise)
                this.handlePromise();
            else
                this.state = AsyncContentComponentState.Content;
    }

    handlePromise() {
        this.state = AsyncContentComponentState.Message;
        this.promise.then(() => {
            this.state = AsyncContentComponentState.Content;
        }).catch((error) => {
            this.error = error;
            this.state = AsyncContentComponentState.Error;
        });
    } 
}

enum AsyncContentComponentState {
    Content,
    Message,
    Error
}

angular.module('app').component('asyncContent', {
    transclude: true,
    templateUrl: 'app/AsyncContentComponent.html',
    controller: AsyncContentComponent,
    bindings: {
        promise: '<',
        hideOnNullPromise: '<',
        message: '@',
        errorMessage: '@'
    }
});