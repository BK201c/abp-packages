using Microsoft.AspNetCore.Builder;
using Robo.System.AuthService;
using Volo.Abp.AspNetCore.TestBase;

var builder = WebApplication.CreateBuilder();
await builder.RunAbpModuleAsync<AuthServiceWebTestModule>();

public partial class Program
{
}
