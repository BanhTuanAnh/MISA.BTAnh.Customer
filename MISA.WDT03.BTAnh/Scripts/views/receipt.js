
class Customer extends Base {
    constructor() {
        super();
        this.loadData();
        this.InitEvents();

    }
    //Hàm thực hiện chức năng: thêm sự kiện cho trang
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    InitEvents() {

        this.OpenDatePicker();
        $('.table-content .body-table tbody').on('click', 'tr', this.RowOnClick);
        $('.table-content .header-table ').on('click', 'div.tick-col', this.AllRowOnClick);
        //$(".cotainer-toolbar-taskbar").on('click', '.btn-search', this.FilterData.bind(this));
        $(".cotainer-toolbar-taskbar").on('click', 'button.reload', this.LoadTable.bind(this));
        $(".cotainer-toolbar-taskbar").on('click', 'button.add-new', this.OpenDialogAdd.bind(this));
        $(".cotainer-toolbar-taskbar").on('click', 'button.duplicate', this.OpenDialogDublicate.bind(this));
        $(".cotainer-toolbar-taskbar").on('click', 'button.edit', this.OpenDialogEdit.bind(this));
        $(".cotainer-toolbar-taskbar").on('click', 'button.delete', this.OpenDialogConfirmDelete.bind(this));
        $(".confirm-dialog").on('click', 'button.no-btn', this.CloseConfirmDialog);
        $(".confirm-dialog").on('click', 'button.yes-btn', this.ProcessDelete.bind(this));
        $(".form-dialog").on('click', 'button.save', this.ProcessSave.bind(this));
        $(".form-dialog").on('mouseenter', 'div.ic-warning', this.ShowNote).on('mouseleave', 'div.ic-warning', this.HideNote)
        $(".form-dialog").on('click', 'button.save-add', this.ProcessSaveAdd.bind(this));
        $(".form-dialog").on('click', 'button.cancel', this.CloseFormDialog);
        $("#page-controller").on('click', '.table-reload', this.LoadTable.bind(this));
        $("#page-controller").on('click', '.pagging-icon', { "jsObject": this }, this.CaculatePageIndex);
        $("#page-controller").on('keydown', '#pageIndex', this.UpdateInput).on('keyup', '#pageIndex', this.PaggingTable.bind(this));
        $("#page-controller").on('change', '#pageSize', this.LoadTable.bind(this));

    }

    //Hàm thực hiện chức năng: tính toán giá trị trang khi click tăng giảm
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    CaculatePageIndex(event) {
        var me = event.data["jsObject"]
        $("#pageIndex").removeClass("wrong-input")
        var pageIndex = parseInt($("#pageIndex").val());
        var totalPage = parseInt($("#totalPage").text())
        var choice = $(this).children("div[change]")
        var value = $(choice).attr("change");

        if (value == "inc") {
            pageIndex = pageIndex + 1;
            if (pageIndex > totalPage) pageIndex = totalPage

        }
        if (value == "dec") {
            pageIndex = parseInt(pageIndex) - 1;
            if (pageIndex < 1) pageIndex = 1

        }
        if (value == "last") {
            pageIndex = totalPage;
        }
        if (value == "first") {
            pageIndex = 1;
        }
        $("#pageIndex").val(pageIndex);
        me.loadData()

    }

    //Hàm thực hiện chức năng: chọn 1 dòng của bảng
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    RowOnClick(event) {
        var currCls = event.currentTarget.classList[0];
        if (currCls === "unselected") {
            $(this).children(".uncheck").addClass('check');
            $(this).children(".check").removeClass('uncheck');
            $(this).addClass('selected');
            $(this).removeClass('unselected');
            $('button.delete').removeAttr('disabled');
            $('button.duplicate').removeAttr('disabled');
            $('button.edit').removeAttr('disabled');
            $('button.view').removeAttr('disabled');

        } else {
            $(this).removeClass('selected');
            $(this).addClass('unselected');
            $(this).children(".check").addClass('uncheck');
            $(this).children(".uncheck").removeClass('check');
            var listSelectedRow = $(".table-content .body-table tbody .selected");
            if (listSelectedRow.length <= 0) {

                $('button.delete').attr('disabled', true);
                $('button.duplicate').attr('disabled', true);
                $('button.edit').attr('disabled', true);
                $('button.view').attr('disabled', true);

            }
        }
    }

    //Hàm thực hiện chức năng: chọn toàn bộ dòng của bảng
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    AllRowOnClick(event) {
        var currCls = event.currentTarget.classList[2];
        var listRow = $(".table-content .body-table tbody tr");
        if (currCls === "uncheck") {
            $.each(listRow, function (index, item) {
                $(item).children(".uncheck").addClass('check');
                $(item).children(".check").removeClass('uncheck');
                $(item).addClass('selected');
                $(item).removeClass('unselected');
                $('button.delete').removeAttr('disabled');
                $('button.duplicate').removeAttr('disabled');
                $('button.edit').removeAttr('disabled');
                $('button.view').removeAttr('disabled');
            });
            $(this).addClass("check");
            $(this).removeClass("uncheck");
        } else {
            $(this).addClass("uncheck");
            $(this).removeClass("check");
            $.each(listRow, function (index, item) {
                $(item).children(".check").addClass('uncheck');
                $(item).children(".uncheck").removeClass('check');
                $(item).removeClass('selected');
                $(item).addClass('unselected');
                $('button.delete').attr('disabled', true);
                $('button.duplicate').attr('disabled', true);
                $('button.edit').attr('disabled', true);
                $('button.view').attr('disabled', true);
            });
        }

    }
    UpdateInput(event) {
        if (!isNumber(event.key)) {
            event.preventDefault();
        }
    }
    //Hàm thực hiện chức năng:load lại bảng khi ấn enter ở ô input số trang
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    PaggingTable(event) {

        var me = this;
        if (event.keyCode == 13) {
            me.loadData();
        }

    }

    //Hàm thực hiện chức năng: load lại bảng
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    LoadTable() {
        var me = this;
        me.loadData();
    }

    //Hàm thực hiện chức năng: sinh mã tự động cho khách hàng
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    GenCode() {
        var listCustomerCode = [];

        $.ajax({
            method: 'GET',
            async: false,
            url: '/customers',
            success: function (res) {
                var customers = res.Data.listCustomerFind;
                $.each(customers, function (index, item) {
                    listCustomerCode.push(item["CustomerCode"]);
                })
            }
        })
        listCustomerCode
        var code = ""
        var ok = 1
        for (var i0 = 0; i0 < 10; i0++) {
            for (var i1 = 0; i1 < 10; i1++) {
                for (var i2 = 0; i2 < 10; i2++) {
                    for (var i3 = 0; i3 < 10; i3++) {
                        code = "KH{0}{1}{2}{3}".format(i0.toString(), i1.toString(), i2.toString(), i3.toString())
                        ok = 1;
                        for (var i = 0; i < listCustomerCode.length; i++) {
                            if (code == listCustomerCode[i]) {
                                ok = 0;
                                break
                            }
                        }
                        code
                        ok
                        debugger
                        if (ok == 1) return code
                    }
                }
            }
        }
    }

    //Hàm thực hiện chức năng: lọc dữ liệu ( chưa được active )
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    FilterData() {
        var me = this;
        var searchValue = $('.search-value').val();
        var searchType = $('.search-type option:selected').val();
        var data = [];
        $.ajax({
            method: 'GET',
            async: false,
            url: '/customers/filtering/{0}/{1}'.format(searchType, (searchValue != "") ? searchValue : null),

            success: function (res) {

                data = res.Data;

            }
        })
        data

        me.loadFiltedData(data);

    }


    //Hàm thực hiện chức năng: mở dialog xác nhận xóa
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    OpenDialogConfirmDelete() {
        var me = this;
        this.RefreshDialog();
        var confirmString = ""
        var listCustomerID = [];
        var listSelectedRow = $('.table-content .body-table tbody .selected');
        if (listSelectedRow.length > 1) {
            confirmString = "Bạn có chắc chắn muốn xóa những Khách hàng đã chọn không ?"
        }
        else {
            if (listSelectedRow.length == 1) {
                var row = listSelectedRow.get(0);
                var customerCode = $(row).children("td.CustomerCode").text()
                var Name = $(row).children("td.Name").text()
                confirmString = "Bạn có chắc chắn muốn xóa Khách hàng << {0}-{1} >> không ?".format(customerCode, Name)
            }
        }
        $(".confirm-dialog .confirm-text span").text(confirmString)

        $('.confirm-dialog').dialog({
            modal: true,
            title: "Xóa khách hàng",
            width: 550,
            height: 150,
            resizable: false,
            dialogClass: "dialog-data"
        });

    }

    //Hàm thực hiện chức năng: xử lý yêu cầu xóa
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    ProcessDelete(event) {
        var me = this;
        var listCustomerID = [];
        var listSelectedRow = $('.table-content .body-table tbody .selected');
        $.each(listSelectedRow, function (index, item) {
            var customerID = $(item).data('recordid');
            listCustomerID.push(customerID);
        });

        $.ajax({
            method: 'DELETE',
            url: '/customers',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(listCustomerID),
            success: function (res) {
                if (res.Success) {
                    alert(res.Message);
                    $(".confirm-dialog").dialog('close')
                    me.loadData();
                }
                else
                    alert(res.Message)
            }
        });
    }

    //Hàm thực hiện chức năng: đóng dialog xác nhận
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    CloseConfirmDialog() {
        $('.confirm-dialog').dialog('close');
    }

    //Hàm thực hiện chức năng: đóng form
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    CloseFormDialog() {
        $('.form-dialog').dialog('close');
    }

    //Hàm thực hiện chức năng: mở form nhân bản
    //Người tạo: Bành Tuấn Anh  
    //Ngày tạo: 27/8/2019
    OpenDialogDublicate() {
        var me = this;
        this.RefreshDialog();
        $('.form-dialog').dialog({
            modal: true,
            title: "Nhân bản khách hàng",
            width: 800,
            height: 550,
            resizable: false,
            dialogClass: "dialog-data"
        });
        var customerID = me.GetRowID();
        $.ajax({
            method: 'GET',
            url: '/customers/' + customerID,
            success: function (res) {

                if (res.Success) {
                    var listInput = $('.form-dialog input[property]');

                    $.each(listInput, function (index, item) {
                        var propertyName = item.getAttribute('property');
                        var value = res.Data[propertyName];
                        if (propertyName == "Unfollow") {
                            $(item).prop("checked", value)
                        }
                        else {
                            $(item).val(value);

                        }

                    });
                    var code = me.GenCode()
                    $('.form-dialog input[property="CustomerCode"]').val(code)
                } else {
                    alert(res.Message);
                }
            },
            error: function (res) {
                alert("Lỗi cấu hình ajax!");
            }
        });

        $('#mode').val("add");
    }

    //Hàm thực hiện chức năng: làm mới form
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    RefreshDialog() {
        var listValidateItem = $('.validate');

        $.each(listValidateItem, function (index, item) {
            $(item).children("div.ic-warning").remove()
            $(item).children(".validate-input").removeClass("empty-input")
        })
        $('#dialog input').val("");
        $("#dialog input[type='checkbox']").prop("checked", false);
    }

    //Hàm thực hiện chức năng: hiển thị cảnh báo
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    ShowNote() {
        var validateForm = $(this).parent(".validate")
        $(validateForm).children("div.warning-note").css("display", "flex")

    }

    //Hàm thực hiện chức năng: ẩn cảnh báo
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    HideNote() {
        var validateForm = $(this).parent(".validate")
        $(validateForm).children("div.warning-note").css("display", "none")

    }
    //Hàm thực hiện chức năng: thêm thuộc tính cảnh báo
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    BeWrong(item, fault) {
        var warning = $('<div class="ic-warning"></div>')
        $(item).children(".validate-input").addClass("empty-input")
        $(item).append(warning)
        var note = $('<div class="warning-note"><div>')
        var icon = $('<span class="iccls-warning"></span>')
        var label = $(item).children("label").text()
        var explain = $('<span class="warning-text"></span>').text("{0} {1}".format(label, fault));
        $(note).append(icon).append(explain);
        $(item).append(note)
    }

    //Hàm thực hiện chức năng: kiểm tra dữ liệu nhập vào form
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    Validate() {
        var me = this;
        var ok = 1;
        var listValidateItem = $('.form-dialog .validate');
        $.each(listValidateItem, function (index, item) {
            var inputValue = $(item).children(".validate-input").val();
            if (inputValue === "") inputValue = $(item).children(".validate-input").children("input").val()
            $(item).children(".validate-input").removeClass("empty-input")
            $(item).children("div.ic-warning").remove()
            if (!inputValue || inputValue.trim() === "") {

               me.BeWrong(item, "không hợp lệ")
                ok = 0;

            }
            else {
                var field = $(item).children(".validate-input").attr("property")
                if (field == "CustomerCode") {
                    if ($('#mode').val() != "edit") {
                        var listRow = $('.table-content .body-table tbody tr td.CustomerCode');
                        for (var i = 0; i < listRow.length; i++) {
                            var customerCode = $(listRow[i]).text();
                            if (inputValue == customerCode) {
                                ok = 0;
                                me.BeWrong(item, "bị trùng")
                                break
                            }
                        }
                    }
                    if (!isCustomerCode(inputValue)) {
                        ok = 0;
                        me.BeWrong(item, "không hợp lệ")
                    }
                }
                else if (field == "PhoneNumber") {
                    if (!isCustomerCode(inputValue)) {
                        ok = 0;
                       me.BeWrong(item, "không hợp lệ")
                    }
                    else {

                        $(item).children(".validate-input").removeClass("empty-input")
                        $(item).children("div.ic-warning").remove()

                    }
                }
            }
        })
        return ok
    }

    //Hàm thực hiện chức năng: mở form thêm
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    OpenDialogAdd() {
        var me = this
        var code = me.GenCode()
        $('.form-dialog').dialog({
            modal: true,
            title: "Khách hàng",
            width: 800,
            height: 550,
            resizable: false,
            dialogClass: "dialog-data blue-border-dialog"
        });
        me.RefreshDialog();
        $('.form-dialog input[property="CustomerCode"]').val(code)
        $('#mode').val("add");
    }

    //Hàm thực hiện chức năng: lấy ID 1 hàng
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    GetRowID() {
        var customerID = $('.selected').data('recordid');

        return customerID;
    }

    //Hàm thực hiện chức năng: mở form sửa
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    OpenDialogEdit() {
        var me = this;
        this.RefreshDialog();
        $(".form-dialog").dialog({
            modal: true,
            title: "Sửa khách hàng",
            width: 800,
            height: 550,
            resizable: false,
            dialogClass: "dialog-data"
        });
        var customerID = me.GetRowID();
        $.ajax({
            method: 'GET',
            url: '/customers/' + customerID,
            success: function (res) {

                if (res.Success) {
                    var listInput = $('.form-dialog input[property]');

                    $.each(listInput, function (index, item) {
                        var propertyName = item.getAttribute('property');

                        var value = res.Data[propertyName];
                        if (propertyName == "Unfollow") {
                            $(item).prop("checked", value)
                        }
                        else {
                            $(item).val(value);

                        }

                    });
                    listInput

                    var listSelect = $('.form-dialog select[property]');

                    $.each(listSelect, function (index, item) {
                        var propertyName = item.getAttribute('property');

                        var value = res.Data[propertyName];
                        $(item).val(value);

                    })

                } else {
                    alert(res.Message);
                }
            },
            error: function (res) {
                alert("Lỗi cấu hình ajax!");
            }
        });

        $('#mode').val("edit");
    }

    //Hàm thực hiện chức năng: lưu khách hàng
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    SaveCustomer() {
        var ok = 1;
        var me = this;
        if (me.Validate() == 1) {

            var listInput = $('#dialog input[property]');
            var object = {};

            $.each(listInput, function (index, item) {
                var propertyName = item.getAttribute('property');
                var value = "";
                if (propertyName === "DateOfBirth") {
                    value = new Date($(this).val())
                }
                else {
                    if (propertyName == "Unfollow") {
                        value = $(this).is(':checked')
                    } else {
                        value = $(this).val();
                    }
                }

                object[propertyName] = value;
                debugger
            });
            object

            console.log(object);

            var mode = $('#mode').val();
            var method = "POST";

            if (mode === "edit") {
                method = "PUT";
                var customerID = $('.selected').data('recordid');
                object["CustomerID"] = customerID;
            }

            $.ajax({
                method: method,
                url: '/customers',
                async: false,
                data: JSON.stringify(object),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    if (res.Success) {
                        alert(res.Message);
                        me.loadData();
                    } else {
                        alert(res.Message);
                    }
                }
            });
        }
        else {
            ok = 0
        }
        return ok;
    }

    //Hàm thực hiện chức năng: xử lý click nút lưu
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    ProcessSave() {
        var me = this
        if (me.SaveCustomer.bind(me)() == 1) {
            setTimeout(function () {
                $(".form-dialog").dialog('close')
            }, 1000)

        }
        else {
            alert("Thao tác không thành công!. Vui lòng thực hiện lại")
        }
    }

    //Hàm thực hiện chức năng: xử lý click nút lưu và thêm
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    ProcessSaveAdd() {
        var me = this

        if (me.SaveCustomer.bind(me)() == 1) {

            setTimeout(function () {
                me.RefreshDialog()
                var code = me.GenCode()
                $('.form-dialog input[property="CustomerCode"]').val(code)
            }, 1000)

        }
        else {
            alert("Thao tác không thành công!. Vui lòng thực hiện lại")
        }
    }

    //Hàm thực hiện chức năng: kích hoạt datepicker
    //Người tạo: Bành Tuấn Anh 
    //Ngày tạo: 27/8/2019
    OpenDatePicker() {
        $("#datepicker").datepicker({
        });
    }
}
var customerJS = new Customer();
