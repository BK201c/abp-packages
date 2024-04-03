using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace Robo.System.AuthService.Menus
{
    public class MenuDto : AuditedEntityDto<Guid>

    {
        public string? ParentId { get; set; }
        public string? ParentPermissionCode { get; set; }
        public string? ServiceIdentification { get; set; }
        public string? PermissionCode { get; set; }
        public string? PermissionName { get; set; }
        public string? PermissionNameEn { get; set; }
        public string? PermissionNameAlias { get; set; }
        public int DelFlag { get; set; }
        public int OrderNo { get; set; }
        public string? PermissionType { get; set; }
        public string? PermissionIcon { get; set; }
        public string? PermissionDesc { get; set; }
        public string? ClientRoute { get; set; }
        public int KeepAliveFlag { get; set; }
        public string? CreateBy { get; set; }
        public string? UpdateBy { get; set; }
    }
}
