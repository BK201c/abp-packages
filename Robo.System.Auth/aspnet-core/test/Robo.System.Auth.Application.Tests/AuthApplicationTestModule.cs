using Volo.Abp.Modularity;

namespace Robo.System.Auth;

[DependsOn(
    typeof(AuthApplicationModule),
    typeof(AuthDomainTestModule)
)]
public class AuthApplicationTestModule : AbpModule
{

}
