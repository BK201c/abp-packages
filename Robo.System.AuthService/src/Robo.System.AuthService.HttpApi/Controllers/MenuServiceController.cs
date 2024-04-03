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

        [HttpDelete("DeletePermission/{permissionId}")]
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


        [HttpGet("GetAllPermission")]
        //获取所有权限
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

        [HttpGet("GetPermissionByRole")]
        //根据角色名称获取所有权限
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


        [HttpPost("SetPermissionByRole")]
        //设置角色权限菜单
        public async Task<IActionResult> SetPermissionByRole(string providerKey, List<string> permissionCodes)
        {
            try
            {
                var permissionsToAdd = await _dbContext.MenuGrants
                    .Where(p => permissionCodes.Contains(p.Name))
                    .ToListAsync();

                // Remove existing permissions for the role
                var existingPermissions = await _dbContext.MenuGrants
                    .Where(p => p.ProviderKey == providerKey)
                    .ToListAsync();

                _dbContext.MenuGrants.RemoveRange(existingPermissions);

                // Add new permissions for the role
                foreach (var permission in permissionsToAdd)
                {
                    permission.ProviderKey = providerKey;
                }

                _dbContext.MenuGrants.AddRange(permissionsToAdd);
                await _dbContext.SaveChangesAsync();

                return Ok("Permissions set successfully for role.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to set permissions for role {providerKey}: {ex.Message}");
            }
        }


    }
}
