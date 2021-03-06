﻿using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using System.Web.Http;
using AutoMapper;
using System.Data.Entity;
using MyApp.Data;
using Newtonsoft.Json.Serialization;
using System.Web.Http.Dependencies;
using System.Collections.Generic;
using Ninject.Web.Common.OwinHost;
using Ninject;
using Ninject.Web.WebApi.OwinHost;
using System.Data.Entity.Infrastructure;
using System.Web.Routing;
using MyApp.Data.Migrations;
using System.Web.WebPages;
using System.Web;
using MyApp.Api;

[assembly: OwinStartup(typeof(WebApplication.Startup))]

namespace WebApplication
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //Configure Entity Framework
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<MyDbContext, Configuration>(true));

            //Configure AutoMapper
            Mapper.Initialize(config =>
            {
                config.CreateMap<Thing, ThingDto>();
                config.CreateMap<Widget, WidgetDto>();
                config.CreateMissingTypeMaps = true;
            });

            //Configure Web API
            var webApiConfig = new HttpConfiguration();
            webApiConfig.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            webApiConfig.MapHttpAttributeRoutes();
            webApiConfig.IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Always;

            //Configure Ninject Dependency Injection
            app.UseNinjectMiddleware(() =>
            {
                var kernel = new StandardKernel();
                kernel.Bind<IDbContextFactory<MyDbContext>>().ToConstant(new MyDbContextFactory());
                return kernel;
            });
            app.UseNinjectWebApi(webApiConfig);

            RouteTable.Routes.Add("default", new Route("{*path}", new DefaultRouteHandler()));
        }
    }

    internal class DefaultRouteHandler : IRouteHandler
    {
        public IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            return WebPageHttpHandler.CreateFromVirtualPath("~/default.cshtml");
        }
    }
}
