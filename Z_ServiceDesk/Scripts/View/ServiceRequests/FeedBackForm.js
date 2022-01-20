$(document).ready(function () {
    var id = GetParameterValues('ServiceReqID');
  
    // UpdateGatePassStatus(id)
    $("#txtRequestID").text("SR00" + id);
    function GetParameterValues(param) {
        var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < url.length; i++) {
            var urlparam = url[i].split('=');
            if (urlparam[0] == param) {
                return urlparam[1];
            }
        }
        //window.location.href = "http://localhost:49829/Inventry/PrintGatePass";
    }
    alert("your ID is " + id);
    $(".gst").change(function () {
        if ($(this).is(":checked") == true) {
            //   alert($(this).attr('id'));
            if ($(this).attr('id') == 'chkSatisfied') {
                // chkIGST
                $("#chkNotSatisfied").prop("checked", false);
            }
            else {
                $("#chkSatisfied").prop("checked", false);
            }
        }
    });
    $('#btnFeedBack').click(function () {
        var feedbackval = $("input[name='feedback']:checked").val();
        if (feedbackval == 2) {
            var val = [];
            $(':checkbox:checked').each(function (i) {
                val[i] = $(this).val();
                UpdateServiceRequestFeedBack(id,feedbackval);
                UpdateServiceRequestStatus(id);
            });
        } else {
            var val = [];
            $(':checkbox:checked').each(function (i) {
                val[i] = $(this).val();
                UpdateServiceRequestFeedBack(id, feedbackval);
            });
        }
      //  alert(feedbackval);
    });
});
// Update Tickets Status  
function UpdateServiceRequestStatus(service_req_id) {
    var parm = {
        "service_req_id_pk": service_req_id,
        "ser_req_status_id_pk": 12
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/UpdateServiceRequestStatus',
        success: function (data) {
            if (data.status_id == 1) {
                alert(data.status);
                alert(data.service_req_id_pk);
                alert(data.ser_req_status_id_pk);
                //if (data.ser_req_status_id_pk == 9) {
                //    SendEmailChangeServiceRequestStatusAprooved(data.service_req_id_pk);
                //} else {
                //    SendEmailChangeServiceRequest(data.service_req_id_pk);
                //}

                //$("#ClrTicket").find("input").val("");
                //$("#ClrTicket").find("select").val(0).change();
              //  GetServiceRequest();
            } else {
                alert(data.service_req_id_pk);
                //CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Update Tickets Status  
function UpdateServiceRequestFeedBack(service_req_id, is_satisfied_id) { 
    var parm = {
        "service_req_id_pk": service_req_id,
        "is_satisfied_id": is_satisfied_id,
        "feedback": $("#txtFeedback").val(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/UpdateServiceRequestFeedbackStatus',
        success: function (data) {
            if (data.status_id != 0) {
                alert(data.status);
            } else {
                alert(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};