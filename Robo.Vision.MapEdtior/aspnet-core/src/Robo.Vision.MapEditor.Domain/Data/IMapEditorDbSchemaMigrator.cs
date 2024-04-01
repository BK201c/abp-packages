using System.Threading.Tasks;

namespace Robo.Vision.MapEditor.Data;

public interface IMapEditorDbSchemaMigrator
{
    Task MigrateAsync();
}
