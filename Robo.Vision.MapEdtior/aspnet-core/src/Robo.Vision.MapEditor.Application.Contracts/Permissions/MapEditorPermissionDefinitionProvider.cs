using Robo.Vision.MapEditor.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace Robo.Vision.MapEditor.Permissions;

public class MapEditorPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(MapEditorPermissions.GroupName);
        //Define your own permissions here. Example:
        //myGroup.AddPermission(MapEditorPermissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<MapEditorResource>(name);
    }
}
