using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Robo.System.AuthService.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "PermissionType",
                table: "System_Menu",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                comment: "权限类型(应用app、模块module、页面page、按钮button)",
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true,
                oldComment: "权限类型(模块module、菜单menu、按钮button)");

            migrationBuilder.AlterColumn<int>(
                name: "Level",
                table: "System_Menu",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldComment: "层级");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "PermissionType",
                table: "System_Menu",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true,
                comment: "权限类型(模块module、菜单menu、按钮button)",
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldNullable: true,
                oldComment: "权限类型(应用app、模块module、页面page、按钮button)");

            migrationBuilder.AlterColumn<int>(
                name: "Level",
                table: "System_Menu",
                type: "int",
                nullable: false,
                comment: "层级",
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
