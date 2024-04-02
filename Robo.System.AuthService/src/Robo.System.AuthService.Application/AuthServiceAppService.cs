using System;
using System.Collections.Generic;
using System.Text;
using Robo.System.AuthService.Localization;
using Volo.Abp.Application.Services;

namespace Robo.System.AuthService;

/* Inherit your application services from this class.
 */
public abstract class AuthServiceAppService : ApplicationService
{
    protected AuthServiceAppService()
    {
        LocalizationResource = typeof(AuthServiceResource);
    }
}
