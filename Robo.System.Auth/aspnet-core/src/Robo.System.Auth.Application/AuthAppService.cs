using System;
using System.Collections.Generic;
using System.Text;
using Robo.System.Auth.Localization;
using Volo.Abp.Application.Services;

namespace Robo.System.Auth;

/* Inherit your application services from this class.
 */
public abstract class AuthAppService : ApplicationService
{
    protected AuthAppService()
    {
        LocalizationResource = typeof(AuthResource);
    }
}
