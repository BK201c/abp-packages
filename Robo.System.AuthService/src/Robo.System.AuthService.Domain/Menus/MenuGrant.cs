using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace Robo.System.AuthService.Menus
{
    public class MenuGrant : AuditedAggregateRoot<Guid>
    {
        public string Name { get; set; }
        public string ProviderName { get; set; }
        public string ProviderKey { get; set; }
    }
}
