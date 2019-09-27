using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entities
{
    public class Customer
    {
        public Guid CustomerID { get; set; }
        public string CustomerCode { get; set; }
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Kind { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Note { get; set; }
        public string Email { get; set; }
        public float Debt { get; set; }
        public string CompanyName { get; set; }
        public string TaxCode { get; set; }
        public bool Unfollow { get; set; }
        public bool Member { get; set; }
        public string MemberCode { get; set; }
        public string MemberRank { get; set; }
    }
}
