using System;
using System.Collections.Generic;
using System.Text;

namespace Robo.System.AuthService.Utils
{
    public class Result<T>(int status, T data, string msg)
    {
        public int Status { get; set; } = status;
        public T Data { get; set; } = data;
        public string Msg { get; set; } = msg;

        public static Result<T> Success(T data) => new Result<T>(0, data, "");

        public static Result<T> Failure(string msg) => new Result<T>(-1, default, msg);
    }

}
