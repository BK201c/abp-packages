using Robo.Vision.MapEditor.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace Robo.Vision.MapEditor.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class MapEditorController : AbpControllerBase
{
    protected MapEditorController()
    {
        LocalizationResource = typeof(MapEditorResource);
    }
}
