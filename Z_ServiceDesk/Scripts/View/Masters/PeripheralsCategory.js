$(document).ready(function () {
    if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
        window.location.href = "/Login/Index/";
    };
    GetPeripheralsCategory();
    $("#btnUpdate").attr("disabled", "disabled");

    $(document).on('click', '.btnedit', function () {
        // GetPreventiveMaintainanceActivityViewCheckList($(this).attr('name'));
    });
    $(document).on('click', '.btneditstatus', function () {
        // GetPreventiveMaintainanceActivityChangeStatus($(this).attr('name'));
    });
    $("#btnSubmit").click(function () {
        if (validatePeripheralsCategory() == true) { 
            InsPeripheralsCategory();
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
            DeletePeripheralsCtegory($(this).attr('name'));
        })
    });
});
function validatePeripheralsCategory() { 
    var return_val = true;
    if ($('#txtPeripheralsCategory').val().trim() == "" || $('#txtPeripheralsCategory').val() == null) {
        $('#SpnPeripheralsCategory').show();
        return_val = false;
    } else {
        $('#SpnPeripheralsCategory').hide();
    }

    return return_val;
};
function InsPeripheralsCategory() {
    var parm = {
        "category_name": $("#txtPeripheralsCategory").val().trim()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/InsPeripheralsCategory',
        success: function (data) {
            if (data.status_id != 0) {
                successnotify(data.status);
                GetPeripheralsCategory();
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
// Get Location List 
function GetPeripheralsCategory() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/GetPeripheralsCategory',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblPeripheralsCategory')) {
                table = $('#tblPeripheralsCategory').DataTable();
            } else {
                table = $('#tblPeripheralsCategory').DataTable();
            }
            table.destroy();
            $("#tblPeripheralsCategory").DataTable({
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
                        data: 'p_category_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (p_category_id_pk) {
                            return '<input id="checkbox0" name="' + p_category_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'p_category_id_pk'},
                    { data: 'category_name' }
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

function DeletePeripheralsCtegory(p_category_id) {
        var parm = {
            "p_category_id_pk": p_category_id
        };
        var josnstr = JSON.stringify(parm);
        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: 'http://playmediahouse.com/api/api/Masters/DeletePeripheralsCtegoryByID',
            data: josnstr,
            dataType: "json",
            success: function (data) {
                if (data.status_id == "1") {
                    DeleteSuccess(data.status);
                    GetPeripheralsCategory();

                } else {
                    DeleteSuccess(data.status);
                }
            },
            error: function (result) {
                alert("Error Occured");
            }
        });
    };