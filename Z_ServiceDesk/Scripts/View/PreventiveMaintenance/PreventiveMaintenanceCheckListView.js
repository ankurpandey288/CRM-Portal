$(document).ready(function () {
   // console.log($.session.get("p_m_activity_id_pk"));
    //alert($.session.get("p_m_activity_id_pk"));
    if ($.session.get("p_m_activity_id_pk") != '' || $.session.get("p_m_activity_id_pk") != null || $.session.get("p_m_activity_id_pk") == undefined) {
      //  GetPreventiveMaintainanceActivityViewCheckList();
    }
    GetPreventiveMaintainanceActivityViewCheckList();
    GetAssetCategory();
    $('#btnSubmit').click(function () {
        UpdatePreventiveMaintenanceEngRemarks($.session.get("p_m_activity_id_pk"));
    });
    
});
function validatePreventiveCheckList() {
    var return_val = true;
    if ($('#ddlAssetCategory option:selected').val() == 0) {
        $('#SpnAssetCategory').show();
        return_val = false;
    } else {
        $('#SpnAssetCategory').hide();
    }

    return return_val;
};
//Get Asset Category Lists
function GetAssetCategory() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetCategory',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlAssetCategory').html("").append('<option value="0">Select Asset Category</option>');
            $(data).each(function () {
                $('#ddlAssetCategory').append('<option value=' + this.asset_category_id_pk + '>' + this.asset_cat_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function InsPreventiveMaintenanceCheckList() {
    var trcount = $('#tbodyPreventiveMaintainanceCheckList tr').length;
    $("#tbodyPreventiveMaintainanceCheckList tr").each(function () {
        var parm = {
            "asset_category_id_fk": $("#ddlAssetCategory option:selected").val().trim(),
            "check_list_content": $(this).find('td:eq(1)').find("input").val() // 
        };
        var josnstr = JSON.stringify(parm);
        $.ajax({
            type: "Post",
            url: 'http://playmediahouse.com/api/api/PreventiveMaintenance/InsPreventiveMaintenanceCheckList',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: josnstr,
            success: function (data) {
                // if (data.status_id != 0) {
                //    alert(data.status);
                //} else {
                //    alert(data.status);
                //}
                trcount = trcount - 1;
                if (trcount == 0) {
                    successnotify(data.status);
                }
            },
            error: function (result) {
                alert("Error : data");
            }
        });
    });
};
// Get Preventive Maintainance Check Lists
function GetPreventiveMaintenanceLists(asset_category_id_fk) {
    var parm = {
        "asset_category_id_fk": asset_category_id_fk,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/PreventiveMaintenance/GetPreventiveMaintenanceCheckList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: josnstr,
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable("#tblPreventiveMaintainanceCheckList")) {
                table = $("#tblPreventiveMaintainanceCheckList").DataTable();
            } else {
                table = $("#tblPreventiveMaintainanceCheckList").DataTable();
            }
            table.destroy();
            $("#tblPreventiveMaintainanceCheckList").DataTable({
                data: data,
                paging: true,
                sort: true,
                searching: true,
                ordering: true,
                order: [],
                lengthMenu: [
                    [10, 25, 50, -1],
                    ['10 rows', '25 rows', '50 rows', 'Show all']
                ],
                responsive: true,
                columns: [
                    { data: 'check_list_content' }
                ],
                dom: 'Bfrtip',
                buttons: [
                    //'copyHtml5',
                    //'excelHtml5',
                    //'csvHtml5',
                    //'pdfHtml5'
                    //{
                    //    extend: 'pdfHtml5',
                    //    orientation: 'landscape',
                    //    pageSize: 'LEGAL'
                    //}
                ]
            });
        },
        error: function (edata) {
            $(edata).each(function () {
                InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            });
            alert("error while geting record.");
        }
    });
};
// Get Preventive Maintainance View Check List
function GetPreventiveMaintainanceActivityViewCheckList() {
    debugger
    var parm = {
        "p_m_activity_id_pk" : $.session.get("p_m_activity_id_pk")
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/PreventiveMaintenance/GetPreventiveMaintainanceActivityViewCheckList',
        success: function (data) {
            //alert("First");
            //console.log(data);
            //debugger
            GetPreventiveMaintenanceLists(data.asset_category_id);
                $("#txtAssetId").val(data.asset_id);
                $("#txtAssetTag").val(data.asset_tag);
                $("#ddlAssetCategory").val(data.asset_cat_name);
                $("#txtLocation").val(data.location_name);
                $("#txtPlannedDate").val(data.created_date);
                $("#txtDueDate").val(data.due_date);
                $("#txtFeedback").val(data.feedback);
                $("#txtStatus").val(data.status);
                
                $("#txtRemarkFromEngineer").val(data.remark_engineer); 
        },
        error: function (result) {
            debugger
            console.log(result);

            alert("Error : data");
        }
    });
};
// Update Tickets Status Reopen
function UpdatePreventiveMaintenanceEngRemarks(p_m_activity_id) {  
    var parm = {
        "p_m_activity_id_pk": p_m_activity_id,
        "remark_engineer": $("#txtRemarkFromEngineer").val().trim() 
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/PreventiveMaintenance/UpdatePreventiveMaintenanceEngRemarks', 
        success: function (data) {
            if (data.status_id == 1) {
                CreateSuccess(data.status);
                $('#closedModelStatus').click();
               
                $(".cb-element").prop("checked", false);
            } else {
                $('#closedModelStatus').click();
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};