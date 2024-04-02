using Robo.System.AuthService.Localization;
using Volo.Abp.AspNetCore.Mvc.UI.RazorPages;

namespace Robo.System.AuthService.Web.Pages;

/* Inherit your PageModel classes from this class.
 */
public abstract class AuthServicePageModel : AbpPageModel
{
    protected AuthServicePageModel()
    {
        LocalizationResourceType = typeof(AuthServiceResource);
    }
}
