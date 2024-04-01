using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Robo.System.Auth.Data;
using Volo.Abp.DependencyInjection;

namespace Robo.System.Auth.EntityFrameworkCore;

public class EntityFrameworkCoreAuthDbSchemaMigrator
    : IAuthDbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCoreAuthDbSchemaMigrator(
        IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolve the AuthDbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider
            .GetRequiredService<AuthDbContext>()
            .Database
            .MigrateAsync();
    }
}
