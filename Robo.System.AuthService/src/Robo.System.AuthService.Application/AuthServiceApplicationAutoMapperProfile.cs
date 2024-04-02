using AutoMapper;
using Robo.System.AuthService.Menus;

namespace Robo.System.AuthService;

public class AuthServiceApplicationAutoMapperProfile : Profile
{
    public AuthServiceApplicationAutoMapperProfile()
    {
        /* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */
        CreateMap<Menu, MenuDto>();
        CreateMap<CreateUpdateMenuDto, Menu>();

        CreateMap<MenuGrant,MenuGrantDto>();
        CreateMap<CreateUpdateMenuGrantDto, MenuGrant>();

    }
}
