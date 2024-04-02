using Volo.Abp.Modularity;

namespace Robo.System.AuthService;

[DependsOn(
    typeof(AuthServiceApplicationModule),
    typeof(AuthServiceDomainTestModule)
)]
public class AuthServiceApplicationTestModule : AbpModule
{

}
