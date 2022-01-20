$(document).ready(function () {
    if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
        window.location.href = "/Login/Index/";
    };
    GetDepartmentLists();
    GetClientLists();
    GetUser();
    $("#btnUpdate").attr("disabled", "disabled");
    $(document).on('click', '.btnedit', function () {
        // GetPreventiveMaintainanceActivityViewCheckList($(this).attr('name'));
    });
    $(document).on('click', '.btneditstatus', function () {
        // GetPreventiveMaintainanceActivityChangeStatus($(this).attr('name'));
    });
    $("#btnSubmit").click(function () {
        if (validateDepartment() == true) {
            InsDepartment();
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
            DeleteBusinessUnit($(this).attr('name'));
        });
    });
});
function validateDepartment() {
    var return_val = true;
    if ($('#txtDepartmentName').val().trim() == "" || $('#txtDepartmentName').val() == null) {
        $('#SpnDepartmentName').show();
        return_val = false;
    } else {
        $('#SpnDepartmentName').hide();
    }

    return return_val;
};
function InsDepartment() { 
    var parm = {
        "business_unit_id_fk": $("#ddlClient option:selected").val().trim(),
        "department_name": $("#txtDepartmentName").val().trim(),
        "department_head": $("#ddlDepartmentHead option:selected").val().trim()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/InsDepartment', 
        success: function (data) {

            if (data.status_id != 0) {
                successnotify(data.status);
                GetDepartmentLists();
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
function GetDepartmentLists() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Ticket/GetDepartmentLists',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblDepartment')) {
                table = $('#tblDepartment').DataTable();
            } else {
                table = $('#tblDepartment').DataTable();
            }
            table.destroy();
            $("#tblDepartment").DataTable({
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
                        data: 'department_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (department_id_pk) {
                            return '<input id="checkbox0" name="' + department_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'department_id_pk' },
                    { data: 'business_unit' },
                    { data: 'department_name' } 
                ],
                // dom: 'Bfrtip',
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
//Get Client Lists
function GetClientLists() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Change/GetBusinessUnit',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlClientFltr').html("").append('<option value="0">Select Clients</option>');
            $('#ddlClient').html("").append('<option value="0">Select Clients</option>');
            $(data).each(function () {
                $('#ddlClientFltr').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
                $('#ddlClient').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};  
function DeleteBusinessUnit(business_unit_id) {
    var parm = {
        "business_unit_id_pk": business_unit_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/DeleteBusinessUnitByID',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetBusinessUnit();

            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};
//Get All User Lists
function GetUser() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Staff/GetUserLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('.ddlUser').html("").append('<option value="0">Select</option>');
            $(data).each(function () {
                $('.ddlUser').append('<option value=' + this.user_id_pk + '>' + this.user_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};