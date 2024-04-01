using AutoMapper;
using Robo.Vision.MapEditor.MapDatas;

namespace Robo.Vision.MapEditor;

public class MapEditorApplicationAutoMapperProfile : Profile
{
    public MapEditorApplicationAutoMapperProfile()
    {
        /* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */
        CreateMap<MapData, MapDataDto>();
        CreateMap<CreateUpdateMapDataDto, MapData>();
    }
}
