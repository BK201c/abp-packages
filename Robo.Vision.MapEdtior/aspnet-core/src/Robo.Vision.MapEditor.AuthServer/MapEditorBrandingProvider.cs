using Volo.Abp.Ui.Branding;
using Volo.Abp.DependencyInjection;

namespace Robo.Vision.MapEditor;

[Dependency(ReplaceServices = true)]
public class MapEditorBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "MapEditor";
}
