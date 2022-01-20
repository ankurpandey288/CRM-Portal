$(document).ready(function () {
    $("#btnLogin").click(function () {
        var rtn_val = validatelogin();
        if (rtn_val == true) {
            // Login();
        } else {
            return false;
        }
    });
});
function validatelogin() {
    var return_val = true;
    if ($("#emailaddress").val().trim() == "") {
        return_val = false;
        $("#SpnEmail").show();
    } else {
        $("#SpnEmail").hide();
    }
    if ($("#password").val().trim() == "") {
        return_val = false;
        $("#SpnPassword").show();
    } else {
        $("#SpnPassword").hide();
    }
    return return_val;
}
function Login() {
    var param = {
        "emp_email": $("#txtUserName").val().trim(),
        "emp_password": $("#txtpassword").val().trim()
    }
    var jsondata = JSON.stringify(param);
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        //url: 'http://api.dmishraphysio.com/api/Login/ValidateUser',
        url: 'http://playmediahouse.com/api/api/Login/ValidateUser',
        data: jsondata,
        dataType: "json",
        success: function (data) {
            //alert(data.emp_id_pk);
            //if (data.emp_id_pk != 0) {
            //    window.location.href = '/User/EmployeeMaster';
            //}
        },
        error: function (data) {
            alert("Error");
        }
    });
}