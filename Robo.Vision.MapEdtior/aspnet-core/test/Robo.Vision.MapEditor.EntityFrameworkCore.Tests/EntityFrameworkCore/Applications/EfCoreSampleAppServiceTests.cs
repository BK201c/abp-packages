using Robo.Vision.MapEditor.Samples;
using Xunit;

namespace Robo.Vision.MapEditor.EntityFrameworkCore.Applications;

[Collection(MapEditorTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<MapEditorEntityFrameworkCoreTestModule>
{

}
