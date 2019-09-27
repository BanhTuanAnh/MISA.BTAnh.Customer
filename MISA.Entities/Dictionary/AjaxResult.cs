using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entities
{
    public class AjaxResult
    {
        public dynamic Data { get; set; }
        public bool Success { get; set; }
        public string Message { get; set; }
        public AjaxResult()
        {
            Data = new ExpandoObject();
          
            Success = true;
        }
    }
}
