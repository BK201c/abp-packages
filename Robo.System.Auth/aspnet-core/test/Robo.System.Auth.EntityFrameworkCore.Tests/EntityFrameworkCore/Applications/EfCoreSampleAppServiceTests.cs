using Robo.System.Auth.Samples;
using Xunit;

namespace Robo.System.Auth.EntityFrameworkCore.Applications;

[Collection(AuthTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<AuthEntityFrameworkCoreTestModule>
{

}
