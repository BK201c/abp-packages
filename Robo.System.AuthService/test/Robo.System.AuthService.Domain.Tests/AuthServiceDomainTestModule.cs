using Volo.Abp.Modularity;

namespace Robo.System.AuthService;

[DependsOn(
    typeof(AuthServiceDomainModule),
    typeof(AuthServiceTestBaseModule)
)]
public class AuthServiceDomainTestModule : AbpModule
{

}
