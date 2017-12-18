using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LR2.Models;
using System.Net.Mail;
using Microsoft.AspNetCore.Razor.Language.Extensions;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols;

namespace LR2.Controllers
{
    public class ContactController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Send(FormModel msg)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    MailMessage mail = new MailMessage();
                    SmtpClient smtp = new SmtpClient();
                    smtp.Port = 587;
                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtp.Host = SMTPModel.Host;
                    smtp.EnableSsl = true;
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = new NetworkCredential(SMTPModel.Login, SMTPModel.Password);
                    mail.To.Add(SMTPModel.Receiver);
                    mail.To.Add(msg.Email);
                    mail.From = new MailAddress(SMTPModel.Login);
                    mail.Subject = msg.Subject;
                    mail.Body = msg.Text;
                    smtp.Send(mail);
                    ViewData["Message"] = "Email successfully sent";
                }
                else
                {
                    throw new Exception("Invalid input");
                }
            }
            catch (Exception e)
            {
                ViewData["Message"] = "Message not sent: "+e;
            }
            return View("Index");
        }
    }
}
