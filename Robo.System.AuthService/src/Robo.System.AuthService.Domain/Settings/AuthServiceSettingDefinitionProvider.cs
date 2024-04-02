using Volo.Abp.Settings;

namespace Robo.System.AuthService.Settings;

public class AuthServiceSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(AuthServiceSettings.MySetting1));
    }
}
