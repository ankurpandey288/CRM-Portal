$(document).ready(function () {
    GetAutoClosedTimeList();
    if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
        window.location.href = "/Login/Index/";
    };
    GetAutoClosedTime();
    $("#btnSubmit").click(function () {
        if (validateCLoserCode() == true) {
            UpdateAutoCloseTime()
        } else {
            return false;
        }
    });
});
function validateCLoserCode() {
    var return_val = true;
    if ($('#txtAutoClosedTime').val().trim() == "" || $('#txtAutoClosedTime').val() == null) {
        $('#SpnAutoClosedTime').show();
        return_val = false;
    } else {
        $('#SpnAutoClosedTime').hide();
    }

    return return_val;
};
// Get Risk List 
function GetAutoClosedTime() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/GetAutoSerReqClosedTime',
        dataType: "json",
        success: function (data) {
            $("#txtAutoClosedTime").val(data.auto_close_time);
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function GetAutoClosedTimeList() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/GetAutoSerReqClosedTimeList',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblAutoCloseTime')) {
                table = $('#tblAutoCloseTime').DataTable();
            } else {
                table = $('#tblAutoCloseTime').DataTable();
            }
            table.destroy();
            $("#tblAutoCloseTime").DataTable({
                data: data,
                paging: false,
                sort: false,
                searching: false,
                ordering: false,
                order: [],
                lengthMenu: [
                    [10, 25, 50, -1],
                    ['10 rows', '25 rows', '50 rows', 'Show all']
                ],
                responsive: true,
                columns: [
                    //{
                    //    data: 'auto_closed_id_pk',
                    //    sWidth: '2px',
                    //    sClass: "view",
                    //    bSortable: false,
                    //    render: function (auto_closed_id_pk) {
                    //        return '<input id="checkbox0" name="' + auto_closed_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                    //    }
                    //},
                    { data: 'auto_closed_id_pk' },
                    { data: 'auto_close_time' }
                ],
                // dom: 'Bfrtip',

            });
        },

        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Update Auto Close Time
function UpdateAutoCloseTime() {
    var parm = {
        "auto_close_time": $("#txtAutoClosedTime").val()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/UpdateSerReqAutoCloseTime',
        success: function (data) {
            if (data.status_id == 1) {
                CreateSuccess(data.status);
                $('#closedModel').click();
                GetAutoClosedTimeList();
            } else {
                $('#closedModel').click();
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};