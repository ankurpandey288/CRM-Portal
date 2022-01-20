$(document).ready(function () {
    if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
        window.location.href = "/Login/Index/";
    };
    GetReasonForChange();
    $("#btnUpdate").attr("disabled", "disabled");

    $(document).on('click', '.btnedit', function () {
        // GetPreventiveMaintainanceActivityViewCheckList($(this).attr('name'));
    });
    $(document).on('click', '.btneditstatus', function () {
        // GetPreventiveMaintainanceActivityChangeStatus($(this).attr('name'));
    });
    $("#btnSubmit").click(function () {
        if (validateReasonForChange() == true) {
            InsReasonForChange();
        } else {
            return false;
        }
    });
    $("#CheckAll").click(function () {
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#BtnDelete').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            DeleteReasonForChange($(this).attr('name'));
        })
        });
});
function validateReasonForChange() { 
    var return_val = true;
    if ($('#txtReasonForChange').val().trim() == "" || $('#txtReasonForChange').val() == null) {
        $('#SpnReasonForChange').show();
        return_val = false;
    } else {
        $('#SpnReasonForChange').hide();
    }

    return return_val;
};
function InsReasonForChange() {
    var parm = {
        "reason_name": $("#txtReasonForChange").val().trim()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/InsReasonForChange',
        success: function (data) {
            if (data.status_id != 0) {
                successnotify(data.status);
                GetReasonForChange();
                $('#closedModel').click();
            } else {
                warningnotify(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get GetReason For Change List
function GetReasonForChange() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/GetReasonForChange',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblReasonForChange ')) {
                table = $('#tblReasonForChange ').DataTable();
            } else {
                table = $('#tblReasonForChange ').DataTable();
            }
            table.destroy();
            $("#tblReasonForChange ").DataTable({
                data: data,
                paging: true,
                sort: false,
                searching: true,
                ordering: true,
                order: [],
                lengthMenu: [
                    [10, 25, 50, -1],
                    ['10 rows', '25 rows', '50 rows', 'Show all']
                ],
                responsive: true,
                columns: [
                    {
                        data: 'reason_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (reason_id_pk) {
                            return '<input id="checkbox0" name="' + reason_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'reason_id_pk' },
                    { data: 'reason_name' }
                ],
                dom: 'Bflrtip',
                buttons: [
                    {
                        extend: 'copyHtml5',
                        text: '<i class="fa fa-files-o fa-2x"></i>',
                        titleAttr: 'Copy'
                    },
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fa fa-file-excel-o fa-2x" style="color:green"></i>',
                        titleAttr: 'Excel'
                    },
                    {
                        extend: 'pdfHtml5',
                        text: '<i class="fa fa-file-pdf-o fa-2x" style="color:red"></i>',
                        titleAttr: 'PDF'
                    }
                ]
                //dom: 'Bfrtip',
                //buttons: [
                //    'copyHtml5',
                //    'excelHtml5',
                //    'csvHtml5',
                //    'pdfHtml5'
                //]
            });
        },

        error: function (edata) {
            alert("error while feching record.");
        }
    });
    };

function DeleteReasonForChange(reason_id) {
        var parm = {
            "reason_id_pk": reason_id
        };
        var josnstr = JSON.stringify(parm);
        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: 'http://playmediahouse.com/api/api/Masters/DeleteReasonForChangeByID', 
            data: josnstr,
            dataType: "json",
            success: function (data) {
                if (data.status_id == "1") {
                    DeleteSuccess(data.status);
                    GetReasonForChange(); 

                } else {
                    DeleteSuccess(data.status);
                }
            },
            error: function (result) {
                alert("Error Occured");
            }
        });
    };