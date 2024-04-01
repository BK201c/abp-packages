using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Robo.Vision.MapEditor.MapDatas
{
    public class CreateUpdateMapDataDto
    {
        public string MapName { get; set; }

        public string MapVersion { get; set; }

        public string MapProject { get; set; }
   
        public string MapJsonStr { get; set; }
        public string MapServiceUrl { get; set; }


     
    }
}
