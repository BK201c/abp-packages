using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Robo.Vision.MapEditor.Data;
using Volo.Abp.DependencyInjection;

namespace Robo.Vision.MapEditor.EntityFrameworkCore;

public class EntityFrameworkCoreMapEditorDbSchemaMigrator
    : IMapEditorDbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCoreMapEditorDbSchemaMigrator(
        IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolve the MapEditorDbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider
            .GetRequiredService<MapEditorDbContext>()
            .Database
            .MigrateAsync();
    }
}
