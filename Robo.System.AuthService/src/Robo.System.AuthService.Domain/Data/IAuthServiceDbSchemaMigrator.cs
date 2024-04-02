using System.Threading.Tasks;

namespace Robo.System.AuthService.Data;

public interface IAuthServiceDbSchemaMigrator
{
    Task MigrateAsync();
}
