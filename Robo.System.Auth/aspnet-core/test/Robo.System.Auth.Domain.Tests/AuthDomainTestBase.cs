using Volo.Abp.Modularity;

namespace Robo.System.Auth;

/* Inherit from this class for your domain layer tests. */
public abstract class AuthDomainTestBase<TStartupModule> : AuthTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
