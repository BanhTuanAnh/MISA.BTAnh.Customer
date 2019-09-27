$(document).ready(function () {
    var user = {
        name: "Banh Tuan Anh",
        account: "admin",
        password: "123456"
    }
    function getVal() {
        var tempPassword = encodeURI($("#password").val());
        var tempAccount = encodeURI($("#account").val());
        return {
            account: tempAccount,
            password: tempPassword
        }
    }

    function emptyInput(inp) {
        console.log(inp)
        var ok = true;
        for (key in inp) {
            var selector1 = ".bound" + key;
            var selector2 = "#" + key + "note"
            if (inp[key] == "") {
                $(selector1).addClass("wronginput")
                $(selector2).text("enter your " + key)
                $(selector2).show()
                ok = false;
            }
            else {
                $(selector1).removeClass("wronginput")
                $(selector2).text("")
                $(selector2).hide()
            }
        }
        return ok;
    }
    function login(inp) {
        var ok = false;
        if (inp.account == user.account && inp.password == user.password)
            ok = true;
        if (ok == true) {
            $("#passwordnote").hide()
            swal({
                title: "Hi! " + user.name,
                text: "Please click the to continue!",
                icon: "success",
                button: "continue!"
            })
                .then((err) => {
                    window.location.href = "/views/receipt.html"
                });
        }
        else {
            $("#passwordnote").text("Wrong password")
            $("#passwordnote").show()
        }
        
    }
    validateData = function validateData() {
        var inp = getVal();
        console.log(inp);
        var a = emptyInput(inp);
        console.log(a);     
        if(a==true) login(inp);
    }

    $("#btnLogin").click(validateData)

    $("#passwordicon").mouseenter(function () {
        $("#password").attr("type", "text")
    })
    $("#passwordicon").mouseleave(function () {
        $("#password").attr("type", "password")
    })

});