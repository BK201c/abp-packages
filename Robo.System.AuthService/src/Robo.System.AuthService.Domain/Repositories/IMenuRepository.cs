using Robo.System.AuthService.Menus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace Robo.System.AuthService.Repositories
{
    public interface IMenuRepository:IBasicRepository<Menu, Guid>
    {
    }
}
