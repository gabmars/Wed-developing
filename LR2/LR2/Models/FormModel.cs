using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LR2.Models
{
    public class FormModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [StringLength(50)]
        public string Subject { get; set; }

        [Required]
        [StringLength(2000)]
        public string Text { get; set; }

    }
}