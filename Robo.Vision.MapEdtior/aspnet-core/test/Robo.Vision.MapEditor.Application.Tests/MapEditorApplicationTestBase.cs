using Volo.Abp.Modularity;

namespace Robo.Vision.MapEditor;

public abstract class MapEditorApplicationTestBase<TStartupModule> : MapEditorTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
