using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace Robo.Vision.MapEditor.MapDatas
{
    public class MapDataDto : AuditedEntityDto<Guid>
    {
        [MaxLength(128)]
        public string MapName { get; set; }

        [MaxLength(128)]
        public string MapVersion { get; set; }

        [MaxLength(128)]
        public string MapProject { get; set; }

        [MaxLength(int.MaxValue)]
        public string MapJsonStr { get; set; }        
        
        [MaxLength(256)]
        public string MapServiceUrl { get; set; }
    }
}
