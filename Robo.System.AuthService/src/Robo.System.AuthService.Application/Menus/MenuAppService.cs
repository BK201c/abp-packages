using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Robo.System.AuthService.Menus
{
    public class MenuAppService
       : CrudAppService<Menu, MenuDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateMenuDto>,
       IMenuAppService,
       IApplicationService
    {
        private readonly IRepository<Menu, Guid> _menuRepository;

        public MenuAppService(IRepository<Menu, Guid> repository) : base(repository)
        {
            _menuRepository = repository;
        }

 
    }

}
