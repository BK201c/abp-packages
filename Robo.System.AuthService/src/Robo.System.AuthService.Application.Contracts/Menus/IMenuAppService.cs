using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Robo.System.AuthService.Menus
{
    public interface IMenuAppService : ICrudAppService<
            MenuDto,
            Guid,
            PagedAndSortedResultRequestDto,
            CreateUpdateMenuDto>
    {
 


    }
}
