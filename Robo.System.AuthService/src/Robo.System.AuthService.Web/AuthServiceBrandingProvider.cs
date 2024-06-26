﻿using Volo.Abp.Ui.Branding;
using Volo.Abp.DependencyInjection;

namespace Robo.System.AuthService.Web;

[Dependency(ReplaceServices = true)]
public class AuthServiceBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "AuthService";
}
