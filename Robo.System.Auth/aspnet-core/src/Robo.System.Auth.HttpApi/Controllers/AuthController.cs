using Robo.System.Auth.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace Robo.System.Auth.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class AuthController : AbpControllerBase
{
    protected AuthController()
    {
        LocalizationResource = typeof(AuthResource);
    }
}
