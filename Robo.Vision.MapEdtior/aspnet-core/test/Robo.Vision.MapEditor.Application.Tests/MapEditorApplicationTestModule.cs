using Volo.Abp.Modularity;

namespace Robo.Vision.MapEditor;

[DependsOn(
    typeof(MapEditorApplicationModule),
    typeof(MapEditorDomainTestModule)
)]
public class MapEditorApplicationTestModule : AbpModule
{

}
