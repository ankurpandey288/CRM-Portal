$(document).ready(function () {
    var assettag = " ";
    alert($.session.get("gate_pass_id_pk"));
    GetGatePassForPrintById($.session.get("gate_pass_id_pk"));
    var id = GetParameterValues('gatepass');
    alert("your ID is " + id);
    GetGatePassForPrintById(id)
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
// Get GatePass Details
function GetGatePassForPrintById(gate_pass_id) {
    var parm = {
        'gate_pass_id_pk': gate_pass_id // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetGatePassForPrintById',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {

            $(data).each(function () {
             //   GetAssetListByTag(this.asset_name);
                //alert(this.business_unit); 
                //alert(this.asset_name);
                //alert(this.prefix);
                //alert(this.moment_type);
                //alert(this.gate_pass_type);

                $("#txtGatePassNo").text(this.gate_pass_id_pk);
                $("#txtBusinessUnit").text(this.business_unit); 
                $("#txtInvoiceDate").text(this.expected_date);
                $("#txtAddress").text(this.address);
                $("#txtAddress1").text(this.to_address);
                $("#txtApprovalBy").text(this.approver_id);
                if (this.gate_pass_status == 0) {
                    $("#txtApprovalStatus").text("Pending");
                } else if (this.gate_pass_status == 1) {
                    $("#txtApprovalStatus").text("Approve");
                } else {
                    $("#txtApprovalStatus").text("Rejected");
                }

                $("#tbodyGatePass").append("<tr><td>" + this.asset_id_pk + "</td><td>" + this.asset_cat_name + "</td><td>" + this.model_name + "</td><td>" + this.serial_number + "</td></tr>");

                //$("#txtBusinessUnit").text(data.business_unit);
                //$("#txtSupportDepartment").text(data.support_dep_name);
                //$("#txtSupportGroup").text(data.support_dep_group_name);

                //GetAssetListByTag(this.asset_name);
                //alert(this.business_unit); 
                //alert(this.asset_name);
                //alert(this.prefix);
                //alert(this.moment_type);
                //alert(this.gate_pass_type);
              //  GetAssetListByTag(this.asset_name);
               // assettag = this.asset_name;
                //alert(assettag);
              //  $("#tbodyGatePass").append("<tr><td>" + this.gate_pass_id_pk + "</td><td>" + this.asset_name + "</td><td>" + this.gate_pass_type + "</td><td>" + this.business_unit + "</td></tr>");
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Get Asset Details
function GetAssetListByTag(asset_tag, assettag) {
    var parm = {
        'asset_tag': asset_tag // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetListByTag',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $(data).each(function () {
               // alert(assettag);
                $("#tbodyGatePass").append("<tr><td>" + this.asset_id_pk + "</td><td>" + this.asset_cat_name + "</td><td>" + this.model_name + "</td><td>" + this.serial_number + "</td></tr>");
                //alert(this.asset_id_pk);
                //alert(this.asset_cat_name);
                //alert(this.model_name);
                //alert(this.serial_number);
               
                });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};