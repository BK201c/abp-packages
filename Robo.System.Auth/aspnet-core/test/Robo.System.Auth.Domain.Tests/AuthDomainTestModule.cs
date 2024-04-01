using Volo.Abp.Modularity;

namespace Robo.System.Auth;

[DependsOn(
    typeof(AuthDomainModule),
    typeof(AuthTestBaseModule)
)]
public class AuthDomainTestModule : AbpModule
{

}
