$(document).ready(function () {
    if ($.session.get("p_m_activity_id_pk") != '' || $.session.get("p_m_activity_id_pk") != null || $.session.get("p_m_activity_id_pk") == undefined) {
        //result alert("hello");
        //  GetPreventiveMaintainanceActivityViewCheckList();
    }
    GetPreventiveMaintainanceActivityViewCheckList();
});
// Get Preventive Maintainance View Check List
function GetPreventiveMaintainanceActivityViewCheckList() {
    var parm = {
        "per_prev_activity_id_pk": $.session.get("per_prev_activity_id_pk")
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/PreventiveMaintenance/GetPeripheralsPreventiveMaintainanceActivityViewCheckList',
        success: function (data) {
            $("#txtAssetId").val(data.peripherals_id_fk);
            $("#txtAssetTag").val(data.assets_tag);
            $("#ddlAssetCategory").val(data.category_name);
            $("#txtLocation").val(data.location_name);
            $("#txtPlannedDate").val(data.maintainance_date);
            $("#txtDueDate").val(data.maintainance_date_comp);
            $("#txtFeedback").val(data.feedback);
            $("#txtStatus").val(data.status);
            
        },
        error: function (result) {
            debugger
            console.log(result);

            alert("Error : data");
        }
    });
};