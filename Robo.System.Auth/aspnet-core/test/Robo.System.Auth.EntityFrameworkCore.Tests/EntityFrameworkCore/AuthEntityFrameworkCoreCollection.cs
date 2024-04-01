using Xunit;

namespace Robo.System.Auth.EntityFrameworkCore;

[CollectionDefinition(AuthTestConsts.CollectionDefinitionName)]
public class AuthEntityFrameworkCoreCollection : ICollectionFixture<AuthEntityFrameworkCoreFixture>
{

}
