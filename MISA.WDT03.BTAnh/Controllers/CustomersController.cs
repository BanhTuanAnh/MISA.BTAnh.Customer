using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using MISA.Entities;
using MISA.BL;
using System.Threading.Tasks;

namespace MISA.WDT03.BTAnh
{
    public class CustomersController : ApiController
    {

        private CustomerBL CustomerBL = new CustomerBL();

        /// <summary>
        /// Route thực hiện chức năng trả về kết quả tìm kiếm khách hàng theo ID
        /// </summary>
        /// <param name="customerID"></param>
        /// <returns>AjaxResult</returns>
        [Route("customers/{customerID}")]
        [HttpGet]
        public AjaxResult GetCustomerByCustomerID(Guid customerID)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _ajaxResult = CustomerBL.GetCustomerByCustomerID(customerID);
            }
            catch (Exception ex)
            {

            }
            return _ajaxResult;
        }

        /// <summary>
        /// Route thực hiện chức năng trả về danh sách toàn bộ danh sách khách hàng
        /// </summary>
        /// <returns>AjaxResult</returns>
        [Route("customers")]
        [HttpGet]
        public AjaxResult GetCustomer()
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _ajaxResult = CustomerBL.GetAllCustomerData();
            }
            catch (Exception ex)
            {

            }
            return _ajaxResult;
        }

        /// <summary>
        /// Route thực hiện chức năng lọc dữ liệu người dùng ( chưa active )
        /// </summary>
        /// <param name="searchType"></param>
        /// <param name="searchValue"></param>
        /// <returns></returns>
        [Route("customers/filtering/{searchType}/{searchValue}")]
        [HttpGet]
        public AjaxResult FilterCustomers([FromUri] int searchType, string searchValue)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _ajaxResult = CustomerBL.FilterData(searchType, searchValue);
            }
            catch (Exception e)
            {

            }

            return _ajaxResult;
        }

        /// <summary>
        /// Route thực hiện chức năng lấy dữ liệu khách hàng theo số lượng và vị trí yêu cầu
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns>AjaxResult</returns>
        [Route("customers/{pageIndex}/{pageSize}")]
        [HttpGet]

        public async Task<AjaxResult> GetCustomers([FromUri]int pageIndex, int pageSize)
        {
            await Task.Delay(1000);
            return CustomerBL.GetCustomerData(pageIndex, pageSize);
        }


        /// <summary>
        /// Route thực hiện chức năng thêm mới khách hàng
        /// </summary>
        /// <param name="customer"></param>
        /// <returns>AjaxResult</returns>
        [Route("customers")]
        [HttpPost]
        public AjaxResult AddCustomerData([FromBody] Customer customer)

        {
            return CustomerBL.AddCustomerData(customer);
        }

        /// <summary>
        /// Route thực hiện chức năng xóa khách hàng theo ID
        /// </summary>
        /// <param name="customerIDs"></param>
        /// <returns>AjaxResult</returns>
        [Route("customers")]
        [HttpDelete]
        public AjaxResult DeleteMultiple([FromBody] List<Guid> customerIDs)
        {
            return CustomerBL.DeleteMultiple(customerIDs);
        }

        /// <summary>
        /// Route thực hiện chức năng cập nhật thông tin khách hàng
        /// </summary>
        /// <param name="customer"></param>
        /// <returns>AjaxResult</returns>
        [Route("customers")]
        [HttpPut]
        public AjaxResult Update([FromBody]Customer customer)
        {
            return CustomerBL.UpdateKhachHangData(customer);
        }

    }

}