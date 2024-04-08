using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace Robo.System.AuthService.Menus
{
    public class MenuGrantDto : AuditedEntityDto<Guid>
    {
        public string? PermissionCode { get; set; }
        public string? RoleCode { get; set; }
    }
}
