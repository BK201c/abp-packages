using Xunit;

namespace Robo.Vision.MapEditor.EntityFrameworkCore;

[CollectionDefinition(MapEditorTestConsts.CollectionDefinitionName)]
public class MapEditorEntityFrameworkCoreCollection : ICollectionFixture<MapEditorEntityFrameworkCoreFixture>
{

}
