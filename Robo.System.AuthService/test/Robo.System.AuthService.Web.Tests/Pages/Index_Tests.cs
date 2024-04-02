using System.Threading.Tasks;
using Shouldly;
using Xunit;

namespace Robo.System.AuthService.Pages;

public class Index_Tests : AuthServiceWebTestBase
{
    [Fact]
    public async Task Welcome_Page()
    {
        var response = await GetResponseAsStringAsync("/");
        response.ShouldNotBeNull();
    }
}
