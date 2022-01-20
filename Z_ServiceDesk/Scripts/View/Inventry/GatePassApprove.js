$(document).ready(function () {
    var id = GetParameterValues('gatepass');
    alert("your ID is " + id);
    UpdateGatePassStatus(id)
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
});
// Update  GatePass  Status 
function UpdateGatePassStatus(gate_pass_id) {
    var parm = {
        "gate_pass_id_pk": gate_pass_id,
        "gate_pass_status": 1,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/UpdGatePassStatus',
        success: function (data) {
            if (data.status_id != 0) {
                successnotify(data.status);
                //alert(data.status); 
            } else {
                warningnotify(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};