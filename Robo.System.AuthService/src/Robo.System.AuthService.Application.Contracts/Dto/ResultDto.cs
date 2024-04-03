using System;
using System.Collections.Generic;
using System.Text;

namespace Robo.System.AuthService.Dto
{
    public class ResultDto<T>
    {
        public bool Status { get; set; }

        public string Msg { get; set; }

        public T Data { get; set; }
    }
}
