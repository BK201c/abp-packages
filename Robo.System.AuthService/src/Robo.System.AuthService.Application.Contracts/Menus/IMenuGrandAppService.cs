using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Robo.System.AuthService.Menus
{
    public interface IMenuGrandAppService : ICrudAppService<
            MenuDto,
            Guid,
            PagedAndSortedResultRequestDto,
            CreateUpdateMenuGrantDto>
    {
        public Task<string> Test(string id);

    }
}
