class Base {
    constructor() {

    }
    

    //Hàm thực hiện chức năng: kiểm tra input ở số trang
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    ValidatePageIndex() {
        var ok = 1
        $("#pageIndex").removeClass("wrong-input")
        var pageIndex = $("#pageIndex").val()
        for (var i = 0; i < pageIndex.length; i++) {
            var asciiValue = pageIndex.charCodeAt(i)
            if (asciiValue < 48 || asciiValue > 57) {
                ok = 0;
                break;
            }
        }
        if (ok == 1) {
            var pageIndex = parseInt(pageIndex)
            if (pageIndex >= parseInt($("#totalPage").text())) {
                $('.forward-icon').attr('disabled', 'disabled');
                $('.mul-forward-icon').attr('disabled', 'disabled');
                pageIndex = parseInt($("#totalPage").text())

            } else {
                if (pageIndex <= 1) {
                 
                    pageIndex = 1
                }
            }
            $("#pageIndex").val(pageIndex)
        }
        else {
            $("#pageIndex").addClass("wrong-input")
            debugger
        }
        return ok

    }

      //Hàm thực hiện chức năng: cập nhật thông tin dữ liệu
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    UpdatePageInfo(totalCustomer, numOfCustomerFind) {
        var pageSize = parseInt($("#pageSize").val())
        var totalResult = parseInt(totalCustomer)
        var totalPage = Math.ceil(totalResult / pageSize);
        $("#totalPage").text(totalPage)
        $("#totalResult").text(totalResult)
        $("#showResult").text(numOfCustomerFind)

    }

     //Hàm thực hiện chức năng: tải dữ liệu lên bảng 
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    loadData() {

        var me = this;
        var data = [];
        var totalCustomer = 0
        if (me.ValidatePageIndex() == 1) {
            var pageIndex = $("#pageIndex").val()
            var pageSize = $("#pageSize").val()
            var fields = $('div[fieldName]');
            $('.table-content .body-table .main-table tbody').empty();
            $.ajax({
                method: 'GET',
                url: '/customers/{0}/{1}'.format(pageIndex, pageSize),
                dataType: "json",
                beforeSend: function () {
                    $('#load-data').show();
                },
                success: function (res) {
                    if (res.Success) {
                        data = res.Data.listCustomerFind;

                        totalCustomer = res.Data.totalCustomer;
                        $.each(data, function (index, item) {
                            var rowHTML = $('<tr class="unselected"></tr>').data("recordid", item["CustomerID"]);
                            $.each(fields, function (fieldIndex, fieldItem) {
                                var fieldName = fieldItem.getAttribute('fieldName');
                                var fieldValue = item[fieldName];
                                var cls = 'text-left';
                                if (fieldName === "DateOfBirth") {
                                    fieldValue = new Date(fieldValue);
                                }
                                if (fieldName === "Member" || fieldName === "Unfollow") {
                                    var check = fieldValue;
                                    debugger
                                    fieldValue = $('<input type="checkbox" > </input>')
                                    $(fieldValue).prop("checked", check)
                                }
                                //Xác định kiểu dữ liệu của giá trị cột tương ứng
                                var type = $.type(fieldValue);

                                switch (type) {
                                    //Kiểu ngày thì căn giữa và định dạng lại hiển thị ngày
                                    case "date":
                                        cls = 'text-center';
                                        fieldValue = fieldValue.formatddMMyyyy();
                                        break;
                                    // Kiểu tiền thì căn phải và định dạng lại hiển thị tiền tệ
                                    case "number":
                                        cls = 'text-right';
                                        fieldValue = fieldValue.formatMoney();
                                        break;
                                    case "object":
                                        cls = 'text-center';
                                        break;
                                }
                                if (fieldName) {

                                    rowHTML.append('<td class = "{0} {1}"></td>'.format(cls, fieldName));
                                    rowHTML.children("td.{0}".format(fieldName)).append(fieldValue)
                                } else {
                                    rowHTML.append('<td class = "{0}"></td>'.format("icon-tick uncheck  tick-col"));
                                }
                            });
                            $('.table-content .body-table .main-table tbody').append(rowHTML);
                        });
                        me.UpdatePageInfo(totalCustomer, data.length)
                        data.length

                        $('#load-data').hide();

                    } else {
                        alert("Tính năng có lỗi, vui lòng liên hệ MISA")
                    }
                },
            });
        }
    }
}