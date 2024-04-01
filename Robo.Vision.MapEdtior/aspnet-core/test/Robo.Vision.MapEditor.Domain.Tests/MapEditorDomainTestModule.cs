using Volo.Abp.Modularity;

namespace Robo.Vision.MapEditor;

[DependsOn(
    typeof(MapEditorDomainModule),
    typeof(MapEditorTestBaseModule)
)]
public class MapEditorDomainTestModule : AbpModule
{

}
