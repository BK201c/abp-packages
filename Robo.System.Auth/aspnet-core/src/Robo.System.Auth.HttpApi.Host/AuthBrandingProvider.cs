using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace Robo.System.Auth;

[Dependency(ReplaceServices = true)]
public class AuthBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "Auth";
}
