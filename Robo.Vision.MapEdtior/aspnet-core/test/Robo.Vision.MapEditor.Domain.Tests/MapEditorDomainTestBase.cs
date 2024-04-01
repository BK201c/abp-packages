using Volo.Abp.Modularity;

namespace Robo.Vision.MapEditor;

/* Inherit from this class for your domain layer tests. */
public abstract class MapEditorDomainTestBase<TStartupModule> : MapEditorTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
