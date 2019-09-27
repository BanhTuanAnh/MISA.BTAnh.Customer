using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Entities;
using MISA.DL;
using MISA.BL.Properties;
namespace MISA.BL
{
    public class CustomerBL
    {
        private CustomerDL CustomerDL = new CustomerDL();

        public AjaxResult FilterData(int _searchType, string _searchValue)
        {
        //    var khachHangs = CustomerDL.GetCustomerData();
        //    switch (_searchType)
        //    {
        //        case 0:
        //            break;
        //        case 1:
        //            khachHangs = khachHangs.Where(p => p.MaKhachHang == _searchValue);
        //            break;
        //        case 2:
        //            khachHangs = khachHangs.Where(p => p.Ten.Contains(_searchValue));
        //            break;
        //        case 3:
        //            khachHangs = khachHangs.Where(p => p.NhomKhachHang == _searchValue);

        //            break;
        //        case 4:
        //            khachHangs = khachHangs.Where(p => p.SoDienThoai.Contains(_searchValue));

        //            break;
        //        case 5:
        //            khachHangs = khachHangs.Where(p => p.GhiChu.Contains(_searchValue));
        //            break;
        //        case 6:
        //            khachHangs = khachHangs.Where(p => p.TrangThai == _searchValue);
        //            break;

        //    }
        //    AjaxResult ajaxResult = new AjaxResult();
        //    ajaxResult.Data = khachHangs;
        //    ajaxResult.Message = Resources.successVN;
            return null;
        }

        /// <summary>
        /// Hàm thực hiện chức năng lấy thông tin khách hàng bằng ID
        /// </summary>
        /// <param name="customerID"></param>
        /// <returns></returns>
        public AjaxResult GetCustomerByCustomerID(Guid customerID)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _ajaxResult.Data = CustomerDL.GetCustomerByCustomerID(customerID);
                _ajaxResult.Message = Resources.successVN;
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Data = ex;
                _ajaxResult.Message = Resources.errorVN;
            }
            return _ajaxResult;
        }

        /// <summary>
        /// Hàm thực hiện thức năng lấy khách hàng theo số lượng và vị trí yêu cầu
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public AjaxResult GetCustomerData(int pageIndex, int pageSize)
        {
            
            AjaxResult ajaxResult = new AjaxResult();
            try
            {
               
                
                ajaxResult.Data.listCustomerFind = CustomerDL.GetCustomerData(pageIndex, pageSize);
                ajaxResult.Data.totalCustomer = CustomerDL.GetNumberOfCustomer();
                ajaxResult.Message = Resources.successVN;
            }
            catch (Exception ex)
            {
                ajaxResult.Data = ex;
                ajaxResult.Success = false;
                ajaxResult.Message = Resources.errorVN;
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm thực hiện chức năng lấy toàn bộ danh sách khách hàng
        /// </summary>
        /// <returns></returns>
        public AjaxResult GetAllCustomerData()
        {

            AjaxResult ajaxResult = new AjaxResult();
            try
            {


                ajaxResult.Data.listCustomerFind = CustomerDL.GetAllCustomerData();
                ajaxResult.Data.totalCustomer = CustomerDL.GetNumberOfCustomer();
                ajaxResult.Message = Resources.successVN;
            }
            catch (Exception ex)
            {
                ajaxResult.Data = ex;
                ajaxResult.Success = false;
                ajaxResult.Message = Resources.errorVN;
            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm thực hiện chức năng xóa nhiều khách hàng
        /// </summary>
        /// <param name="_customerIDs"></param>
        /// <returns></returns>
        public AjaxResult DeleteMultiple(List<Guid> _customerIDs)
        {

            AjaxResult ajaxResult = new AjaxResult();
            try
            {
                CustomerDL.DelMulCustomer(_customerIDs);
                ajaxResult.Message = Resources.successVN;
                ajaxResult.Data.totalCustomer = CustomerDL.GetNumberOfCustomer();
            }
            catch (Exception ex)
            {
                ajaxResult.Data = ex;
                ajaxResult.Success = false;
                ajaxResult.Message = Resources.errorVN;
            }
            return ajaxResult;

        }

        /// <summary>
        /// Hàm thực hiện chức năng thêm khách hàng
        /// </summary>
        /// <param name="customer"></param>
        /// <returns></returns>
        public AjaxResult AddCustomerData(Customer customer)
        {
            AjaxResult ajaxResult = new AjaxResult();
            try
            {
                CustomerDL.AddCustomer(customer);
                ajaxResult.Message = Resources.successVN;
                ajaxResult.Data.totalCustomer = CustomerDL.GetNumberOfCustomer();
            }
            catch (Exception ex)
            {
                ajaxResult.Message = Resources.errorVN;
                ajaxResult.Success = false;
                ajaxResult.Data = ex;

            }
            return ajaxResult;
        }

        /// <summary>
        /// Hàm thực hiện chức năng cập nhật khách hàng
        /// </summary>
        /// <param name="customer"></param>
        /// <returns></returns>
        public AjaxResult UpdateKhachHangData(Customer customer)
        {
            AjaxResult ajaxResult = new AjaxResult();
            try
            {
                CustomerDL.UpdateCustomer(customer);
                ajaxResult.Message = Resources.successVN;
            }
            catch (Exception ex)
            {
                ajaxResult.Message = Resources.errorVN;
                ajaxResult.Success = false;
                ajaxResult.Data = ex;

            }
            return ajaxResult;

        }
    }
}

