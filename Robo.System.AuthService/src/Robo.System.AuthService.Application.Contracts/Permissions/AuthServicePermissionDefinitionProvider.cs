using Robo.System.AuthService.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace Robo.System.AuthService.Permissions;

public class AuthServicePermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(AuthServicePermissions.GroupName);
        //Define your own permissions here. Example:
        //myGroup.AddPermission(AuthServicePermissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<AuthServiceResource>(name);
    }
}
