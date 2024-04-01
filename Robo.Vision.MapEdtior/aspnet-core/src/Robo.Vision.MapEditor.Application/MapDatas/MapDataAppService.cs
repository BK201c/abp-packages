using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Robo.Vision.MapEditor.MapDatas
{
    public class MapDataAppService:
        CrudAppService<MapData,MapDataDto,Guid,PagedAndSortedResultRequestDto,CreateUpdateMapDataDto>,IMapDataAppService
    {
        public MapDataAppService(IRepository<MapData, Guid> repository):base(repository) 
        { 

        }
    }
}
