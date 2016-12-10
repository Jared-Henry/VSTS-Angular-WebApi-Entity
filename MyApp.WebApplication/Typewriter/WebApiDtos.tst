${    
    using Typewriter.Extensions.Types;
	using Typewriter.Extensions.WebApi;   
    
    Template(Settings settings)
    {
        settings.IncludeProject("MyApp.Api");
    }     
     
    string BaseClassWithExtends(Class c) => c.BaseClass == null ? "" : (" extends " + c.BaseClass.Name);
    string NameClean(Class c) => c.Name.Replace("Dto", "");

}$Classes(*Dto)[class $NameClean$BaseClassWithExtends {
    $Properties[$name?: $Type;][
    ]
}][
]