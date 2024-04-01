using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace Robo.Vision.MapEditor.Data;

/* This is used if database provider does't define
 * IMapEditorDbSchemaMigrator implementation.
 */
public class NullMapEditorDbSchemaMigrator : IMapEditorDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
