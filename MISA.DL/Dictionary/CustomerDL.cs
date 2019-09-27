using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Entities;

namespace MISA.DL
{
    public class CustomerDL
    {
        private MISAWDT03BTAnhContext db = new MISAWDT03BTAnhContext();

        /// <summary>
        /// Hàm thực hiện chức năng lấy khách hàng theo số lượng và vị trí yêu cầu từ database
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public IEnumerable<Customer> GetCustomerData(int pageIndex, int pageSize)
        {
            var customers = db.Customers.OrderBy(p => p.CustomerCode)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize);
            return customers;
        }

        /// <summary>
        /// Hàm thực hiện chức năng lấy tổng số khách hàng đang có trong database
        /// </summary>
        /// <returns></returns>
        public int GetNumberOfCustomer()
        {
            var size = 0;
            var customers = db.Customers;
            size = customers.Count();
            return size;
        }

        /// <summary>
        /// Hàm thực hiện chức năng lấy toàn bộ khách hàng đang có trong database
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Customer> GetAllCustomerData()
        {
            var customers = db.Customers;
            return customers;
        }

        /// <summary>
        /// Hàm thực hiện chức năng xóa nhiều khách hàng
        /// </summary>
        /// <param name="_customerIDs"></param>
        public void DelMulCustomer(List<Guid> _customerIDs)
        {
            foreach (var _khachHangID in _customerIDs)
            {
                var khachHang = db.Customers.Where(p => p.CustomerID == _khachHangID).FirstOrDefault();
                db.Customers.Remove(khachHang);
            }
            db.SaveChanges();
        }

        /// <summary>
        /// Hàm thực hiện chức năng thêm 1 khách hàng vào database
        /// </summary>
        /// <param name="customer"></param>
        public void AddCustomer(Customer customer)
        {
            customer.CustomerID = Guid.NewGuid();
            db.Customers.Add(customer);
            db.SaveChanges();
        }

        /// <summary>
        /// Hàm thực hiện chức năng lấy 1 khách hàng theo ID
        /// </summary>
        /// <param name="customerID"></param>
        /// <returns></returns>
        public Customer GetCustomerByCustomerID(Guid customerID)
        {

            var _customerItem = db.Customers.Where(p => p.CustomerID == customerID).FirstOrDefault();
            return _customerItem;


        }

        /// <summary>
        /// Hàm thực hiện chức năng cập nhật thông tin khách hàng trong database
        /// </summary>
        /// <param name="customer"></param>
        /// <returns></returns>
        public int UpdateCustomer(Customer customer)
        {
            try
            {
                var customerFind = db.Customers.Where(p => p.CustomerID == customer.CustomerID).FirstOrDefault();
               
                customerFind.CustomerCode = customer.CustomerCode;
                customerFind.Name = customer.Name;
                customerFind.DateOfBirth = customer.DateOfBirth;
                customerFind.Debt = customer.Debt;
                customerFind.Kind = customer.Kind;
                customerFind.MemberRank = customer.MemberRank;
                customerFind.MemberCode = customer.MemberCode;
                customerFind.Note = customer.Note;
                customerFind.PhoneNumber = customer.PhoneNumber;
                customerFind.TaxCode = customer.TaxCode;
                customerFind.Address = customer.Address;
                customerFind.CompanyName = customer.CompanyName;
                customerFind.Email = customer.Email;
                customerFind.Unfollow = customer.Unfollow;

                db.SaveChanges();
                return 1;

            }
            catch (Exception)
            {
                return 0;
                throw;
            }
        }
    }
}

