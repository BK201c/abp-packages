using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Robo.System.AuthService.EntityFrameworkCore;
using Robo.System.AuthService.Menus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Robo.System.AuthService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuServiceController : ControllerBase
    {
        private readonly AuthServiceDbContext _dbContext;

        public MenuServiceController(AuthServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <summary>
        /// 添加权限菜单
        /// </summary>
        /// <param name="permission"></param>
        /// <returns></returns>
        [HttpPost("AddPermission")]
        public async Task<IActionResult> AddPermission(Menu permission)
        {
            try
            {
                // 检查是否存在相同的权限组名称
                var existingGroup = await _dbContext.Menus.FirstOrDefaultAsync(g => g.PermissionCode == permission.PermissionCode);
                if (existingGroup != null)
                {
                    return Conflict("Permission group with the same name already exists.");
                }

                // 在权限组表中添加新记录
                _dbContext.Menus.Add(permission);

                // 添加新权限到数据库
                await _dbContext.SaveChangesAsync();

                return Ok("Permission added successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to add permission: {ex.Message}");
            }
        }

        /// <summary>
        /// 删除权限菜单
        /// </summary>
        /// <param name="permissionId"></param>
        /// <returns></returns>
        [HttpGet("DeletePermission")]
        public async Task<IActionResult> DeletePermission(string permissionId)
        {
            try
            {
                var permissionsToDelete = await GetPermissionsToDelete(permissionId);

                _dbContext.Menus.RemoveRange(permissionsToDelete);
                await _dbContext.SaveChangesAsync();

                return Ok("Permissions deleted successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to delete permissions: {ex.Message}");
            }
        }

        private async Task<List<Menu>> GetPermissionsToDelete(string permissionId)
        {
            var permissionsToDelete = await _dbContext.Menus
                .Where(p => p.Id == Guid.Parse(permissionId) || p.ParentId == permissionId)
                .ToListAsync();

            foreach (var permission in permissionsToDelete.ToList())
            {
                permissionsToDelete.AddRange(await GetChildPermissionsToDelete(permission.Id));
            }

            return permissionsToDelete;
        }

        private async Task<List<Menu>> GetChildPermissionsToDelete(Guid parentId)
        {
            var childPermissions = await _dbContext.Menus
                .Where(p => Guid.Parse(p.ParentId) == parentId)
                .ToListAsync();

            var permissionsToDelete = new List<Menu>();

            foreach (var permission in childPermissions)
            {
                permissionsToDelete.Add(permission);
                permissionsToDelete.AddRange(await GetChildPermissionsToDelete(permission.Id));
            }

            return permissionsToDelete;
        }


        /// <summary>
        /// 获取所有权限
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetAllPermission")]
        public async Task<IActionResult> GetAllPermission()
        {
            try
            {
                var permissions = await _dbContext.Menus.ToListAsync();
                return Ok(permissions);
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to retrieve permissions: {ex.Message}");
            }
        }

        /// <summary>
        /// 根据角色名称获取所有权限
        /// </summary>
        /// <param name="providerKey"></param>
        /// <returns></returns>
        [HttpGet("GetPermissionByRole")]
        public async Task<IActionResult> GetPermissionByRole(string providerKey)
        {
            try
            {
                // 从MenuGrants中查询角色拥有的所有权限名称
                var permissionNames = await _dbContext.MenuGrants
                    .Where(p => p.ProviderKey == providerKey)
                    .Select(p => p.Name)
                    .ToListAsync();

                // 根据权限名称查询对应的菜单数据
                var permissions = await _dbContext.Menus
                    .Where(m => permissionNames.Contains(m.PermissionCode))
                    .ToListAsync();

                return Ok(permissions);
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to get permissions for role: {ex.Message}");
            }
        }


        /// <summary>
        /// 设置角色权限菜单
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        [HttpPost("SetPermissionByRole")]
        public async Task<IActionResult> SetPermissionByRole(PermissionRoleDto query)
        {
            try
            {
                var permissionsToAdd = await _dbContext.MenuGrants
                    .Where(p => query.PermissionCodes.Contains(p.Name))
                    .ToListAsync();

                // 清空角色已有权限
                var existingPermissions = await _dbContext.MenuGrants
                    .Where(p => p.ProviderKey == query.ProviderKey)
                    .ToListAsync();

                _dbContext.MenuGrants.RemoveRange(existingPermissions);

                // 添加新的权限
                foreach (var permission in permissionsToAdd)
                {
                    permission.ProviderKey = query.ProviderKey;
                }

                _dbContext.MenuGrants.AddRange(permissionsToAdd);
                await _dbContext.SaveChangesAsync();

                return Ok("Permissions set successfully for role.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to set permissions for role {query.ProviderKey}: {ex.Message}");
            }
        }

    }

    public class PermissionRoleDto {
        public string? ProviderKey { get; set; }
        public List<string> PermissionCodes {  get; set; }
    }

}
