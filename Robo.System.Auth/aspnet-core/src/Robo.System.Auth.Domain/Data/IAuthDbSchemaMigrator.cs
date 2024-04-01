using System.Threading.Tasks;

namespace Robo.System.Auth.Data;

public interface IAuthDbSchemaMigrator
{
    Task MigrateAsync();
}
