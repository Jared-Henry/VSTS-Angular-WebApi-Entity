${    
    using Typewriter.Extensions.Types;
	using Typewriter.Extensions.WebApi;   
    
    Template(Settings settings)
    {
        settings.IncludeProject("MyApp.Api");
    }
        
	string ReturnType(Method m) => (m.Type.Name == "HttpResponseMessage" || m.Type.Name == "IHttpActionResult")  ? "any" : m.Type.Name;
    string ServiceName(Class c) => c.Name.Replace("Controller", "Service");
    ICollection<Parameter> CleanParameters(Method m) => m.Parameters.Where(p => p.Type.Name != "CancellationToken").ToArray(); 
    string BaseClassWithExtends(Class c) => c.BaseClass == null ? "" : (" extends " + c.BaseClass.Name);
    string parameterName(Parameter p) => p.HasDefaultValue ? p.name + '?' : p.name;  
    string Imports(Class c) => "";
    string ReturnTypeClean(Method m) => m.Type.Name.Replace("Dto", "");
    string TypeClean(Parameter p) => p.Type.Name.Replace("Dto", "");

}$Classes(:BaseController)[class $ServiceName {
    constructor(private $http: ng.IHttpService) { }
    $Methods[$name($CleanParameters[$parameterName: $TypeClean][, ]): ng.IHttpPromise<$ReturnTypeClean> {            
        return this.$http<$ReturnTypeClean>({
            url: `$Url`, 
            method: "$HttpMethod", 
            data: typeof($RequestData) === 'string' ? '"' + $RequestData + '"' : $RequestData
        });
    }][
    ] 
} 
angular.module("app").service("$ServiceName", ["$http", $ServiceName]);
]