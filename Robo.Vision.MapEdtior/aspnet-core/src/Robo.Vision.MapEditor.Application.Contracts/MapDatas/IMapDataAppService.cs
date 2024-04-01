using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Robo.Vision.MapEditor.MapDatas
{
    public interface  IMapDataAppService:
          ICrudAppService< //Defines CRUD methods
            MapDataDto, //Used to show books
            Guid, //Primary key of the book entity
            PagedAndSortedResultRequestDto, //Used for paging/sorting
            CreateUpdateMapDataDto> //Used to create/update a book
    {
    }
}
