using Volo.Abp.Modularity;

namespace Robo.System.AuthService;

public abstract class AuthServiceApplicationTestBase<TStartupModule> : AuthServiceTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
