using System;
using System.Collections.Generic;
using System.Text;

namespace Robo.System.AuthService.Menus
{
    public class CreateUpdateMenuDto
    {
        public string GroupName { get; set; }
        public string Name { get; set; }
        public string ParentName { get; set; }
        public string DisplayName { get; set; }
        public int IsEnabled { get; set; }
        public int MultiTenancySide { get; set; }
        public string Providers { get; set; }
        public string StateCheckers { get; set; }
        public string ExtraProperties { get; set; }
    }
}
