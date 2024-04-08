using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Robo.System.AuthService.Utils;
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
                .Where(p => p.Id == Guid.Parse(permissionId) || p.ParentPermissionCode == permissionId)
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
                .Where(p => Guid.Parse(p.ParentPermissionCode) == parentId)
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
        /// 获取所有权限树数据
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetAllPermission")]
        public async Task<IActionResult> GetAllPermission()
        {
            try
            {
                // 查询所有菜单数据
                var allMenus = await _dbContext.Menus.ToListAsync();

                // 构建以菜单ID为键的子菜单字典
                var childMenusDictionary = allMenus
                    .Where(m => !string.IsNullOrEmpty(m.ParentPermissionCode))
                    .GroupBy(m => m.ParentPermissionCode)
                    .ToDictionary(g => g.Key, g => g.ToList());

                // 构建树结构
                var rootMenus = BuildTree(allMenus, childMenusDictionary, null, null);

                return Ok(Result<List<MenuItemDto>>.Success(rootMenus));
            }
            catch (Exception ex)
            {
                return BadRequest(Result<List<MenuItemDto>>.Failure($"Failed to retrieve permissions: {ex.Message}"));
            }
        }

        // 构建树结构方法
        private List<MenuItemDto> BuildTree(List<Menu> allMenus, Dictionary<string, List<Menu>> childMenusDictionary, Dictionary<Guid, string>? permissionCodesDictionary, string? parentPermissionCode)
        {
            if (!childMenusDictionary.TryGetValue(parentPermissionCode, out var childMenus))
            {
                return new List<MenuItemDto>();
            }

            return childMenus.Select(child =>
            {
                var menuDto = new MenuItemDto
                {
                    Id = child.Id,
                    ParentId = child.ParentId,
                    PermissionCode = child.PermissionCode,
                    PermissionName = child.PermissionName,
                    // 根据需要设置其他属性
                    Children = BuildTree(allMenus, childMenusDictionary, permissionCodesDictionary, child.PermissionCode)
                };

                // 如果权限字典不为空，且当前菜单拥有权限，则设置权限标志
                if (permissionCodesDictionary != null && permissionCodesDictionary.ContainsKey(child.Id))
                {
                    menuDto.HasPermission = true;
                }

                return menuDto;
            }).ToList();
        }

        /// <summary>
        /// 根据角色名称获取所有权限，并以树结构返回数据
        /// </summary>
        /// <param name="roleCode"></param>
        /// <param name="appName"></param>
        /// <returns></returns>
        [HttpGet("GetPermissionByRole")]
        public async Task<IActionResult> GetPermissionByRole(string roleCode,string appName)
        {
            try
            {
                // 从MenuGrants中查询角色拥有的所有权限名称
                var permissionCodes = await _dbContext.MenuGrants
                    .Where(p => p.RoleCode == roleCode)
                    .Select(p => p.PermissionCode)
                    .ToListAsync();

                // 查询所有菜单数据
                var allMenus = await _dbContext.Menus.ToListAsync();

                // 构建以菜单ID为键的子菜单字典
                var childMenusDictionary = allMenus
                    .Where(m => !string.IsNullOrEmpty(m.ParentPermissionCode))
                    .GroupBy(m => m.ParentPermissionCode)
                    .ToDictionary(g => g.Key, g => g.ToList());

                // 构建以菜单ID为键的权限字典
                var permissionCodesDictionary = await _dbContext.Menus
                    .Where(m => permissionCodes.Contains(m.PermissionCode))
                    .ToDictionaryAsync(m => m.Id, m => m.PermissionCode);

                // 获取根菜单列表
                var rootMenus = BuildTree(allMenus, childMenusDictionary, permissionCodesDictionary, appName);

                return Ok(rootMenus);
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
                    .Where(p => query.PermissionCodes.Contains(p.PermissionCode))
                    .ToListAsync();

                // 清空角色已有权限
                var existingPermissions = await _dbContext.MenuGrants
                    .Where(p => p.RoleCode == query.RoleCode)
                    .ToListAsync();

                _dbContext.MenuGrants.RemoveRange(existingPermissions);

                // 添加新的权限
                foreach (var permission in permissionsToAdd)
                {
                    permission.RoleCode = query.RoleCode;
                }

                _dbContext.MenuGrants.AddRange(permissionsToAdd);
                await _dbContext.SaveChangesAsync();

                return Ok("Permissions set successfully for role.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to set permissions for role {query.RoleCode}: {ex.Message}");
            }
        }

    }

    public class PermissionRoleDto {
        public required string RoleCode { get; set; }
        public required List<string> PermissionCodes {  get; set; }
    }
    
    public class MenuItemDto:MenuDto {
        public bool HasPermission { get; set; }
        public required List<MenuItemDto> Children {  get; set; }
    }

}
