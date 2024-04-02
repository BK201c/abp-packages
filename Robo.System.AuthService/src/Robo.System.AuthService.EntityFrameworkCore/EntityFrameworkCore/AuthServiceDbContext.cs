using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Robo.System.AuthService.Menus;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using Volo.Abp.PermissionManagement;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.TenantManagement;
using Volo.Abp.TenantManagement.EntityFrameworkCore;

namespace Robo.System.AuthService.EntityFrameworkCore;

[ReplaceDbContext(typeof(IIdentityDbContext))]
[ReplaceDbContext(typeof(ITenantManagementDbContext))]
[ConnectionStringName("Default")]
public class AuthServiceDbContext :
    AbpDbContext<AuthServiceDbContext>,
    IIdentityDbContext,
    ITenantManagementDbContext
{
    /* Add DbSet properties for your Aggregate Roots / Entities here. */

    #region Entities from the modules

    /* Notice: We only implemented IIdentityDbContext and ITenantManagementDbContext
     * and replaced them for this DbContext. This allows you to perform JOIN
     * queries for the entities of these modules over the repositories easily. You
     * typically don't need that for other modules. But, if you need, you can
     * implement the DbContext interface of the needed module and use ReplaceDbContext
     * attribute just like IIdentityDbContext and ITenantManagementDbContext.
     *
     * More info: Replacing a DbContext of a module ensures that the related module
     * uses this DbContext on runtime. Otherwise, it will use its own DbContext class.
     */

    //Identity
    public DbSet<IdentityUser> Users { get; set; }
    public DbSet<IdentityRole> Roles { get; set; }
    public DbSet<IdentityClaimType> ClaimTypes { get; set; }
    public DbSet<OrganizationUnit> OrganizationUnits { get; set; }
    public DbSet<IdentitySecurityLog> SecurityLogs { get; set; }
    public DbSet<IdentityLinkUser> LinkUsers { get; set; }
    public DbSet<IdentityUserDelegation> UserDelegations { get; set; }

    // Tenant Management
    public DbSet<Tenant> Tenants { get; set; }
    public DbSet<TenantConnectionString> TenantConnectionStrings { get; set; }

    #endregion

    //custom
    public DbSet<Menu> Menus { get; set; }
    public DbSet<MenuGrant> MenuGrants { get; set; }


    public AuthServiceDbContext(DbContextOptions<AuthServiceDbContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        /* Include modules to your migration db context */

        builder.ConfigurePermissionManagement();
        builder.ConfigureSettingManagement();
        builder.ConfigureBackgroundJobs();
        builder.ConfigureAuditLogging();
        builder.ConfigureIdentity();
        builder.ConfigureOpenIddict();
        builder.ConfigureFeatureManagement();
        builder.ConfigureTenantManagement();

        /* Configure your own tables/entities inside here */

        //builder.Entity<YourEntity>(b =>
        //{
        //    b.ToTable(AuthServiceConsts.DbTablePrefix + "YourEntities", AuthServiceConsts.DbSchema);
        //    b.ConfigureByConvention(); //auto configure for the base class props
        //    //...
        //});
        builder.Entity<MenuGrant>(b =>
        {
            b.ToTable("System_Menu_Grant");

            b.ConfigureByConvention();

            b.Property(x => x.Name).HasMaxLength(256).IsRequired();
            b.Property(x => x.ProviderName).HasMaxLength(PermissionGrantConsts.MaxProviderNameLength).IsRequired();
            b.Property(x => x.ProviderKey).HasMaxLength(PermissionGrantConsts.MaxProviderKeyLength).IsRequired();
            b.HasIndex(x => new { x.Name, x.ProviderName, x.ProviderKey });
        });

        builder.Entity<Menu>(b =>
        {
            b.ToTable("System_Menu");
            b.ConfigureByConvention();

            b.Property(x => x.ParentId).HasComment("父级权限ID");
            b.Property(x => x.ParentPermissionCode).HasComment("父级权限编号").HasMaxLength(512);
            b.Property(x => x.ServiceIdentification).HasComment("注册服务实例的前缀").HasMaxLength(512);
            b.Property(x => x.PermissionCode).HasComment("权限编号").IsRequired().HasMaxLength(512);
            b.Property(x => x.PermissionName).HasComment("权限名称").HasMaxLength(512);
            b.Property(x => x.PermissionNameEn).HasComment("权限名称(英文)").HasMaxLength(512);
            b.Property(x => x.PermissionNameAlias).HasComment("权限名称(第三语言)").HasMaxLength(512);
            b.Property(x => x.DelFlag).HasComment("是否删除--0:未删除;1:已删除");
            b.Property(x => x.PermissionType).HasComment("权限类型(模块module、菜单menu、按钮button)").HasMaxLength(50);
            b.Property(x => x.OrderNo).HasComment("权限顺序");
            b.Property(x => x.PermissionIcon).HasComment("权限标识，一般指图标").HasMaxLength(50);
            b.Property(x => x.PermissionDesc).HasComment("权限描述").HasMaxLength(500);
            b.Property(x => x.ClientRoute).HasComment("路径（菜单权限时使用）").HasMaxLength(500);
            b.Property(x => x.KeepAliveFlag).HasComment("存活标识");
            b.Property(x => x.CreateBy).HasComment("创建人").HasMaxLength(100);
            b.Property(x => x.CreationTime).HasComment("创建时间").IsRequired();
            b.Property(x => x.UpdateBy).HasComment("更新人").HasMaxLength(100);
            b.Property(x => x.LastModificationTime).HasComment("更新时间");
  
            b.HasIndex(ou => ou.PermissionCode);

            b.HasQueryFilter(t => t.DelFlag == 0);
        });
    }
}
