using Robo.System.Auth.Samples;
using Xunit;

namespace Robo.System.Auth.EntityFrameworkCore.Domains;

[Collection(AuthTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<AuthEntityFrameworkCoreTestModule>
{

}
