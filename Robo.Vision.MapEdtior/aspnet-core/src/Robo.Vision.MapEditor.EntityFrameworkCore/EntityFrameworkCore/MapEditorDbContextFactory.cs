using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Robo.Vision.MapEditor.EntityFrameworkCore;

/* This class is needed for EF Core console commands
 * (like Add-Migration and Update-Database commands) */
public class MapEditorDbContextFactory : IDesignTimeDbContextFactory<MapEditorDbContext>
{
    public MapEditorDbContext CreateDbContext(string[] args)
    {
        MapEditorEfCoreEntityExtensionMappings.Configure();

        var configuration = BuildConfiguration();

        var builder = new DbContextOptionsBuilder<MapEditorDbContext>()
            .UseSqlServer(configuration.GetConnectionString("Default"));

        return new MapEditorDbContext(builder.Options);
    }

    private static IConfigurationRoot BuildConfiguration()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../Robo.Vision.MapEditor.DbMigrator/"))
            .AddJsonFile("appsettings.json", optional: false);

        return builder.Build();
    }
}
