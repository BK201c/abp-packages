using Robo.System.AuthService.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace Robo.System.AuthService.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class AuthServiceController : AbpControllerBase
{
    protected AuthServiceController()
    {
        LocalizationResource = typeof(AuthServiceResource);
    }
}
