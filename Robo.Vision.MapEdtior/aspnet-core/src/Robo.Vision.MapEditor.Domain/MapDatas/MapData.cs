using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace Robo.Vision.MapEditor.MapDatas
{
    public class  MapData : AuditedAggregateRoot<Guid>
    {
        
        public string MapName { get; set; }
        
      
        public string MapVersion { get; set; }

    
        public string MapProject { get; set; }
        
        
        public string MapJsonStr { get; set; }

        public string MapServiceUrl { get; set; }

    }
}
