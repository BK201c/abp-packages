using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace Robo.System.AuthService.Data;

/* This is used if database provider does't define
 * IAuthServiceDbSchemaMigrator implementation.
 */
public class NullAuthServiceDbSchemaMigrator : IAuthServiceDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
