$(document).ready(function () {
    $("#BtnSlide").click();
    //$(".open-left").click();
    //$('.select2').select2(
    //    { dropdownParent: $('#myModalNew') });
   // $('.select').select2();
    //var id = $.session.get("user_code");
    //var number = id.substring(4);
    // $(".user-name").html("").html("<p>" + $.session.get("emp_f_name") + "<span>Administrator</span></p>");
    //alert($.session.get("emp_state"));
    //if ($.session.get("emp_code") != undefined) {
    //    $(".hidden-xs").text("").text($.session.get("emp_f_name"));
    //    $(".user-header").find("p").text($.session.get("emp_f_name"));
    //};
    //if ($.session.get("id") != undefined) {
    //    $(".user-name").text("").text($.session.get("name"));
    //    $(".user-name").find("p").text($.session.get("name"));
    //};
    //if ($.session.get("roleid") == 0 || $.session.get("roleid") == undefined) { 
    //    $("#MenuConfiguration").hide();
    //    $("#MenuFeedback").hide();
    //    $("#MenuSla").hide();
    //    $(".btndelete").hide();
    //};
    //alert($.session.get("roleid"));
    //if ($.session.get("id") == undefined) {
    //    window.location.href = "/Login/Index/";
    //} 
   
    // Numeric 
    $(document).on('keypress', '.numericonly', function (e) {
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
    //Number
    $(document).on('keypress', '.numberonly', function (e) {
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
    //Date picker
    $('.datepicker').datepicker({
        //autoclose: true,
        format: "yyyy-mm-dd",
        forceParse: false,
      //  startDate: '01/01/2017',// '1900/01/01',
       // endDate: '+1d',
        autoclose: true,
        todayHighlight: true
    });
   // $(".js-example-basic-multiple").select2();
   // GetDefaultLocation();
});
function onlyNumbersWithColon(e) {
    var charCode;
    if (e.keyCode > 0) {
        charCode = e.which || e.keyCode;
    }
    else if (typeof (e.charCode) != "undefined") {
        charCode = e.which || e.keyCode;
    }
    if (charCode == 58)
        return true
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function SaveSuccess(){
    swal({
        title: 'Done',
        text: 'Saved Successfully',
        type: 'success',
       // showCancelButton: true,
        confirmButtonText: 'Ok',
        //cancelButtonText: 'Not at all'
    });
};
function DeleteSuccess(txt) {
    swal({
        title: 'Deleted',
        text: txt,
        type: 'success',
        // showCancelButton: true,
        confirmButtonText: 'Ok',
        //cancelButtonText: 'Not at all'
    });
};
function RequiredField(txt) {
    swal({
        title: 'Required',
        text: txt,
        type: 'error', 
        // showCancelButton: true,
        confirmButtonText: 'Ok',
        //cancelButtonText: 'Not at all'
    });
};
function successnotify(txt) {
    Swal.fire(
        'Sucess!',
         txt,
     // 'You clicked the button!',
        'success'
    )
};
function warningnotify(txt) {
    swal({
        title: 'Warning',
        text: txt, //'Created Successfully',
        type: 'success',
        // showCancelButton: true,
        confirmButtonText: 'Ok',
        //cancelButtonText: 'Not at all'
    });
};
function CreateSuccess(txt) { 
    swal({
        title: 'Done',
        text: txt, //'Created Successfully',
        type: 'success',
        // showCancelButton: true,
        confirmButtonText: 'Ok',
        //cancelButtonText: 'Not at all'
    });
};
function errornotify(message) {
    $.notice({
        //canAutoHide: true,
        holdup: "9000",
        // fadeTime: "500",
        //canFadeHover: true,
        //hasCloseBtn: true,
        //canCloseClick: false,
        //position: 'top-right',
        //zIndex: '9999',
        //custom: ''
        text: message,
        type: "error"
    });
};
//function successnotify(message) {
//    $.notice({
//        holdup: "9000",
//        text: message,
//        type: "success"
//    });
//};

//function warningnotify(message) {
//    $.notice({
//        holdup: "10000",
//        text: message,
//        type: "warning"
//    });
//};
function infonotify(message) {
    $.notice({
        text: message,
        type: "info"
    });
};
// Send Payment Request
function SendPaymentRequest(tomail, url, name) {
    var parm = {
        "Tomail": tomail,
        "Name": name,
        "Url": url,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
       // url: apiurl + 'Controllers/Email/SendPaymentRequest',
        url: 'http://playmediahouse.com/api/api/Email/SendPaymentRequest',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: josnstr,
        success: function (data) {
        },
        error: function (edata) {
            $(edata).each(function () {
                InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            });
        }
    });
};
//Send Mail from index page to initior
function SendEmail(tomail, name, businessname, contact_number, url) {
    var parm = {
        "Tomail": tomail,
        "Name": name,
        "BusinessType": businessname,
        "Url": url,
        "contact_number": contact_number
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
       // url: apiurl + 'Controllers/Email/SendPasswordLink',
        url: 'http://playmediahouse.com/api/api/Email/SendPaymentRequest',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: josnstr,
        success: function (data) {
        },
        error: function (edata) {
            $(edata).each(function () {
                InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            });
            alert("error while Sending mail.");
        }
    });
};
//Send Mail from index page to Sales team
function SendmailToAdmin(mail, name, businessname, contact_number) {
    var parm = {
        "Tomail": SalesMailid,
        "FromMail": mail,
        "Name": name,
        "BusinessType": businessname,
        "contact_number": contact_number
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
       // url: apiurl + 'Controllers/Email/SendmailToAdmin',
        url: 'http://playmediahouse.com/api/api/Email/SendmailToAdmin',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: josnstr,
        success: function (data) {
        },
        error: function (edata) {
            $(edata).each(function () {
                InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            });
            alert("error while Sending mail.");
        }
    });
};
// This method is used to send mail to all directors after submitted the application from submitapplication page.
function sendSatusMail() {
    var parm = {
        "user_mst_fk": $.session.get("user_mst_pk")
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
       // url: apiurl + 'Controllers/Email/sendSatusMail',
        url: 'http://playmediahouse.com/api/api/Email/sendSatusMail',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: josnstr,
        success: function (data) {
        },
        error: function () {
            alert("error while Sending mail.");
        }
    });
};
//Send Mail When New Ticket Create
function SendEmailTicketCreate(receiptemail, ticketid, username, ticketstatus) {
    var parm = {
        "ReceiptEmail": receiptemail,
        "TicketId": ticketid,
        "Name": username,
        "Status": ticketstatus
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Email/SendNewTicketsCreate',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: josnstr,
        success: function (data) {
        },
        error: function (edata) {
            $(edata).each(function () {
                InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            });
            alert("error while Sending mail.");
        }
    });
};
//Send Mail When New Service Request Create
function SendNewServiceRequestCreate(receiptemail, servicereqid, username, ticketstatus) {
    var parm = {
        "ReceiptEmail": receiptemail,
        "ServiceRequestId": servicereqid,
        "Name": username,
        "Status": ticketstatus
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Email/SendNewServiceRequestCreate',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: josnstr,
        success: function (data) {
        },
        error: function (edata) {
            $(edata).each(function () {
                InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            });
            alert("error while Sending mail.");
        }
    });
};
//Send Mail When Change Status Service Request 
function SendServiceRequestChangeStatus(receiptemail, servicereqid, username, servicereqstatus) {
    var parm = {
        "ReceiptEmail": receiptemail,
        "ServiceRequestId": servicereqid,
        "Name": username,
        "Status": servicereqstatus 
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Email/SendServiceRequestChangeStatus', 
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: josnstr,
        success: function (data) {
        },
        error: function (edata) {
            $(edata).each(function () {
                InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            });
            alert("error while Sending mail.");
        }
    });
};
//Send Mail When Change Status Aprooved Service Request 
function SendServiceRequestChangeStatusAprooved(receiptemail, servicereqid, username, servicereqstatus, url) {
    var parm = {
        "ReceiptEmail": receiptemail,
        "ServiceRequestId": servicereqid,
        "Name": username,
        "Status": servicereqstatus,
        "Url": url
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Email/SendServiceRequestChangeStatusAprooved',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: josnstr,
        success: function (data) {
        },
        error: function (edata) {
            $(edata).each(function () {
                InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            });
            alert("error while Sending mail.");
        }
    });
};
//Send Mail For Status Aprooved Or Reject Service Request 
function SendServiceRequestChangeStatusAproovedOrRejected(receiptemail, servicereqid, subject, useremail, url1, url2) {
    var parm = {
        "ReceiptEmail": receiptemail,
        "ServiceRequestId": servicereqid,
        "Subject": subject,
        "UserEmail": useremail,
       // "ApproverID" : approverid, 
        "UrlApp": url1,
        "UrlRej": url2
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Email/SendServiceRequestChangeStatusAproovedOrRejected',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: josnstr,
        success: function (data) {
        },
        error: function (edata) {
            $(edata).each(function () {
                InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            });
            alert("error while Sending mail.");
        }
    });
};
//Send Mail TO User For Technician Predefine Reply Status
function SendEmailTicketReplyStatus(receiptemail, ticketid, description) {
    var parm = {
        "ReceiptEmail": receiptemail,
        "TicketId": ticketid,
        "Description": description  
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Email/SendEmailTicketReplyStatus',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: josnstr,
        success: function (data) {
        },
        error: function (edata) {
            $(edata).each(function () {
                InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            });
            alert("error while Sending mail.");
        }
    });
};
//Send Mail TO User For Technician Predefine Reply Status
function SendEmailServiceRequestReplyStatus(receiptemail, requestid, description) {
    var parm = {
        "ReceiptEmail": receiptemail,
        "RequestID": requestid,
        "Description": description
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Email/SendEmailServiceRequestReplyStatus',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: josnstr,
        success: function (data) {
        },
        error: function (edata) {
            $(edata).each(function () {
                InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            });
            alert("error while Sending mail.");
        }
    });
};
//to insert exception
function InsException(status, message, exception_message, exception_type) {
    var parm = { "status": status, "message": message, "exception_message": exception_message, "exception_type": exception_type };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
      // url: apiurl + 'Controllers/Commonapi/InsException',
        url: 'http://playmediahouse.com/api/api/Commonapi/InsException',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: josnstr,
        success: function (data) {
        },
        error: function (error) {
        }
    });
};
// Send Email To user For Ticket Create And Change Status
function SendNewTickets(receiptemail, ticketid, username, ticketstatus) {
    var parm = {
        "ReceiptEmail": receiptemail,
        "TicketId": ticketid,
        "Name": username,
        "Status": ticketstatus 
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        // url: apiurl + 'Controllers/Email/SendCourierDetails',
        url: 'http://playmediahouse.com/api/api/Email/SendNewTickets', 
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: josnstr,
        success: function (data) {
        },
        error: function (edata) {
            $(edata).each(function () {
                InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            });
            alert("error while Sending mail.");
        }
    });
};
//Send Mail TO User for Change GatePass Status
function SendEmailChangeGatePassStatus(receiptemail, GatePassID, MomentType, GatePasType, Name) {
    var parm = {
        "ReceiptEmail": receiptemail,
        "GatePassID": GatePassID,
        "MomentType": MomentType,
        "GatePasType": GatePasType,
        "Name": Name
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Email/SendEmailChangeGatePassStatus',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: josnstr,
        success: function (data) {
        },
        error: function (edata) {
            $(edata).each(function () {
                InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            });
            alert("error while Sending mail.");
        }
    });
};
//Get Default Location 
function GetDefaultLocation() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Peripherals/GetDefaultLocation',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('.ddlLocation').html("").append('<option value=' + data.location_id_pk + '>' + data.location_name + '</option>');
           
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
$("#adminlogout").click(function () {
   // UpdateTechnicianSessionId($.session.get("id"));
    $.session.clear();
    window.location.href = 'http://10.96.62.58/Admin/Login';
});
// Update Technician Session id
function UpdateTechnicianSessionId(id) {
    var parm = {
        "id": id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Login/UpdateTechnicianSessionId',
        success: function (data) {
            if (data.status_id != 0) {
                CreateSuccess(data.status);
            } else {
                CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};