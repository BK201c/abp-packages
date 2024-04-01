﻿using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace Robo.System.Auth.Data;

/* This is used if database provider does't define
 * IAuthDbSchemaMigrator implementation.
 */
public class NullAuthDbSchemaMigrator : IAuthDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
