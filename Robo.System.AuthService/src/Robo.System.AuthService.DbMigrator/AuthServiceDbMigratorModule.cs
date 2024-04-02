using Robo.System.AuthService.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace Robo.System.AuthService.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(AuthServiceEntityFrameworkCoreModule),
    typeof(AuthServiceApplicationContractsModule)
    )]
public class AuthServiceDbMigratorModule : AbpModule
{
}
