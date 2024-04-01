using System;
using System.Collections.Generic;
using System.Text;
using Robo.Vision.MapEditor.Localization;
using Volo.Abp.Application.Services;

namespace Robo.Vision.MapEditor;

/* Inherit your application services from this class.
 */
public abstract class MapEditorAppService : ApplicationService
{
    protected MapEditorAppService()
    {
        LocalizationResource = typeof(MapEditorResource);
    }
}
