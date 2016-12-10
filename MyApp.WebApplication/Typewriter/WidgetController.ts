class WidgetService {
    constructor(private $http: ng.IHttpService) { }
    get(id: number): ng.IHttpPromise<Widget> {            
        return this.$http<Widget>({
            url: `api/widgets/${id}`, 
            method: "get", 
            data: typeof(null) === 'string' ? '"' + null + '"' : null
        });
    }
    getAll(): ng.IHttpPromise<Widget[]> {            
        return this.$http<Widget[]>({
            url: `api/widgets`, 
            method: "get", 
            data: typeof(null) === 'string' ? '"' + null + '"' : null
        });
    }
    insert(dto: Widget): ng.IHttpPromise<number> {            
        return this.$http<number>({
            url: `api/widgets`, 
            method: "post", 
            data: typeof(dto) === 'string' ? '"' + dto + '"' : dto
        });
    }
    update(id: number, dto: Widget): ng.IHttpPromise<void> {            
        return this.$http<void>({
            url: `api/widgets/${id}`, 
            method: "put", 
            data: typeof(dto) === 'string' ? '"' + dto + '"' : dto
        });
    }
    delete(id: number): ng.IHttpPromise<void> {            
        return this.$http<void>({
            url: `api/widgets/${id}`, 
            method: "delete", 
            data: typeof(null) === 'string' ? '"' + null + '"' : null
        });
    } 
} 
angular.module("app").service("WidgetService", ["$http", WidgetService]);
