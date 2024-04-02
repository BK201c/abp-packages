using Robo.System.AuthService.Samples;
using Xunit;

namespace Robo.System.AuthService.EntityFrameworkCore.Domains;

[Collection(AuthServiceTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<AuthServiceEntityFrameworkCoreTestModule>
{

}
