using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace LR2.Models
{
    public class SMTPModel
    {
        public static string Host { get; set; }
        public static string Port { get; set; }
        public static string Login { get; set; }
        public static string Password { get; set; }
        public static string Receiver { get; set; }

        public static void SetConf(IConfiguration conf)
        {
            Host = conf["SMTP:HOST"];
            Port = conf["SMTP:PORT"];
            Login = conf["SMTP:LOGIN"];
            Password = conf["SMTP:PASSWORD"];
            Receiver = conf["SMTP:RECEIVER"];
        }

    }
}