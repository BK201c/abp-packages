using Robo.System.Auth.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace Robo.System.Auth.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(AuthEntityFrameworkCoreModule),
    typeof(AuthApplicationContractsModule)
    )]
public class AuthDbMigratorModule : AbpModule
{
}
