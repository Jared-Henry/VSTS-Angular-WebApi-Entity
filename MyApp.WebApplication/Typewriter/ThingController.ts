class ThingService {
    constructor(private $http: ng.IHttpService) { }
    get(id: number): ng.IHttpPromise<Thing> {            
        return this.$http<Thing>({
            url: `api/things/${id}`, 
            method: "get", 
            data: typeof(null) === 'string' ? '"' + null + '"' : null
        });
    }
    getAll(): ng.IHttpPromise<Thing[]> {            
        return this.$http<Thing[]>({
            url: `api/things`, 
            method: "get", 
            data: typeof(null) === 'string' ? '"' + null + '"' : null
        });
    }
    insert(dto: Thing): ng.IHttpPromise<number> {            
        return this.$http<number>({
            url: `api/things`, 
            method: "post", 
            data: typeof(dto) === 'string' ? '"' + dto + '"' : dto
        });
    }
    update(id: number, dto: Thing): ng.IHttpPromise<void> {            
        return this.$http<void>({
            url: `api/things/${id}`, 
            method: "put", 
            data: typeof(dto) === 'string' ? '"' + dto + '"' : dto
        });
    }
    delete(id: number): ng.IHttpPromise<void> {            
        return this.$http<void>({
            url: `api/things/${id}`, 
            method: "delete", 
            data: typeof(null) === 'string' ? '"' + null + '"' : null
        });
    } 
} 
angular.module("app").service("ThingService", ["$http", ThingService]);
