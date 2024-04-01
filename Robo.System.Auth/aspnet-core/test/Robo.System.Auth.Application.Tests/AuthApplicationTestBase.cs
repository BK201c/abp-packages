using Volo.Abp.Modularity;

namespace Robo.System.Auth;

public abstract class AuthApplicationTestBase<TStartupModule> : AuthTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
