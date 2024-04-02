using Xunit;

namespace Robo.System.AuthService.EntityFrameworkCore;

[CollectionDefinition(AuthServiceTestConsts.CollectionDefinitionName)]
public class AuthServiceEntityFrameworkCoreCollection : ICollectionFixture<AuthServiceEntityFrameworkCoreFixture>
{

}
