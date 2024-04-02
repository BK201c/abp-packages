using Volo.Abp.Modularity;

namespace Robo.System.AuthService;

/* Inherit from this class for your domain layer tests. */
public abstract class AuthServiceDomainTestBase<TStartupModule> : AuthServiceTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
