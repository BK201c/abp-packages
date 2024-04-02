using Robo.System.AuthService.Samples;
using Xunit;

namespace Robo.System.AuthService.EntityFrameworkCore.Applications;

[Collection(AuthServiceTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<AuthServiceEntityFrameworkCoreTestModule>
{

}
