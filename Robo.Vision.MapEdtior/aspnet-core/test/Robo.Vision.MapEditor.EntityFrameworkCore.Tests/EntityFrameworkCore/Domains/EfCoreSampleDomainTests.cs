using Robo.Vision.MapEditor.Samples;
using Xunit;

namespace Robo.Vision.MapEditor.EntityFrameworkCore.Domains;

[Collection(MapEditorTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<MapEditorEntityFrameworkCoreTestModule>
{

}
