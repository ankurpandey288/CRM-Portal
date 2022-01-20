$(document).ready(function () {
    if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
        window.location.href = "/Login/Index/";
    };
    $("#btnUpdate").attr("disabled", "disabled");
    GetConsultant();
    GetDepartmentLists();
    $("#btnSubmit").click(function () {
        if (validateConsultant() == true) { 
            InsConsultant();
        } else {
            return false;
        }
    });
    $("#CheckAll").click(function () {
        if ($(this).is(':checked')) {
            $("#btnEdit").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnEdit").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
        }
        else {
            $("#btnEdit").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
        }
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#BtnDelete').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            DeleteConsultant($(this).attr('name'));
        })
    });
    $('#btnNew').click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModal') }
        );
    });
    $('#btnEdit').click(function () {
        var val = [];
        $('.cb-element:checked').each(function (i) {
            val[i] = $(this).val();
            GetConsultantDetails($(this).attr('name'));
        });
        $('.select2').select2(
            { dropdownParent: $('#myModal') }
        );
        $("#btnSubmit").hide(); $("#BtnUpdate").show();
        $("#myModalLabel").hide(); $("#myModalLabelEdit").show();
    });
    $(document).on('click', '.cb-element', function () {
        if ($(this).is(':checked')) {
            $("#btnEdit").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnEdit").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
        }
        else {
            $("#btnEdit").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
        }
    });
    $("#BtnUpdate").click(function () {
        var val = [];
        $('.cb-element:checked').each(function (i) {
            val[i] = $(this).val();
            if (validateConsultant() == true) {
                UpdConsultant($(this).attr('name'));
            } else {
                return false;
            }
        });


    });
});
//Get All Holiday Calender Location
function GetDepartmentLists() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Ticket/GetDepartmentLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlDepartment").html("").append('<option value="0">Select Department</option>');
            $(data).each(function () {
                $('#ddlDepartment').append('<option value=' + this.department_id_pk + '>' + this.department_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function validateConsultant() {
    var return_val = true;
    if ($('#ddlDepartment option:selected').val() == 0) {
        $('#SpnDepartment').show();
        return_val = false;
    } else {
        $('#SpnDepartment').hide();
    }
    if ($('#txtConsultantName').val().trim() == "" || $('#txtConsultantName').val() == null) {
        $('#SpnConsultantName').show();
        return_val = false;
    } else {
        $('#SpnConsultantName').hide();
    }
    return return_val;
}; 
function InsConsultant() {
    var parm = {
        "department_id_fk": $("#ddlDepartment option:selected").val(),
        "consultant_name": $("#txtConsultantName").val(),
        "consultant_email": $("#txtConsultantEmail").val(),
        "consultant_contact_no": $("#txtConsultantContactNo").val()  
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/InsConsultant',
        success: function (data) {
            if (data.status_id != 0) {
                successnotify(data.status);
                GetConsultant();
                $('#closedModel').click();
            } else {
                warningnotify(data.status);
                GetConsultant();
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get Consultant 
function GetConsultant() { 
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/GetConsultant',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblConsultant')) {
                table = $('#tblConsultant').DataTable();
            } else {
                table = $('#tblConsultant').DataTable();
            }
            table.destroy();
            $("#tblConsultant").DataTable({
                data: data,
                paging: true,
                sort: false,
                searching: true,
                order: [],
                lengthMenu: [
                    [10, 25, 50, -1],
                    ['10 rows', '25 rows', '50 rows', 'Show all']
                ],
                responsive: true,
                columns: [
                    {
                        data: 'consultant_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (consultant_id_pk) {
                            return '<input class="cb-element checkbox" id="checkbox0" name="' + consultant_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'consultant_id_pk' },
                    { data: 'department_name' },
                    { data: 'consultant_name' },
                    { data: 'consultant_email' },
                    { data: 'consultant_contact_no' }
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
                //    //'copyHtml5',
                //    //'excelHtml5',
                //    //'csvHtml5',
                //    //'pdfHtml5'
                //]
            });
        },

        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function DeleteConsultant(consultant_id) {  
    var parm = {
        "consultant_id_pk": consultant_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/DeleteConsultantByID',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetConsultant();

            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};
// Get Consultant  Details
function GetConsultantDetails(consultant_id) {
    var parm = {
        'consultant_id_pk': consultant_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Masters/GetConsultantDetails',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#ddlDepartment").val(data.department_id_fk).change();
            $("#txtConsultantName").val(data.consultant_name);
            $("#txtConsultantEmail").val(data.consultant_email);
            $("#txtConsultantContactNo").val(data.consultant_contact_no);
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Update Consultant Details   
function UpdConsultant(consultant_id) { 
    var parm = {
        "consultant_id_pk": consultant_id,
        "department_id_fk": $("#ddlDepartment option:selected").val(),
        "consultant_name": $("#txtConsultantName").val(),
        "consultant_email": $("#txtConsultantEmail").val(),
        "consultant_contact_no": $("#txtConsultantContactNo").val(), 
        "updated_by": $.session.get("id")
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/UpdConsultant',
        success: function (data) {
            if (data.status_id != 0) {
                CreateSuccess(data.status);
                $('#closedModel').click();
                GetConsultant();
                $(".cb-element").prop("checked", false);
            } else {
                $('#closedModel').click();
                //CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};