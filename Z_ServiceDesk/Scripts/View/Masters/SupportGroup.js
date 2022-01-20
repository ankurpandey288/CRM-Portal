$(document).ready(function () {
    if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
        window.location.href = "/Login/Index/";
    };
    $("#btnUpdate").attr("disabled", "disabled");
    GetSupportGroup();
    GetSupportDepartment();
    GetEmployeesLists();
    // GetStoreLocationAction();
    $(document).on('click', '.btnedit', function () {
        // GetPreventiveMaintainanceActivityViewCheckList($(this).attr('name'));
    });
    $(document).on('click', '.btneditstatus', function () {
        // GetPreventiveMaintainanceActivityChangeStatus($(this).attr('name'));
    });
    $("#btnSubmit").click(function () {
        if (validateSupportGroup() == true) {
            InsSupportGroup();
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
            DeleteCommonSubCategory($(this).attr('name'));
        })
    });
});
//Get Support Department 
function GetSupportDepartment() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Masters/GetSupportDepartment',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlSupportOrganization").html("").append('<option value="0">Select Support Orgnisation</option>');
            $(data).each(function () {
                $('#ddlSupportOrganization').append('<option value=' + this.support_dep_id_pk + '>' + this.support_dep_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function validateSupportGroup() {
    var return_val = true;
    if ($('#ddlSupportOrganization option:selected').val() == 0) {
        $('#SpnSupportOrganization').show();
        return_val = false;
    } else {
        $('#SpnSupportOrganization').hide();
    }
    if ($('#txtSupportGroup').val().trim() == "" || $('#txtSupportGroup').val() == null) {
        $('#SpnSupportGroup').show();
        return_val = false;
    } else {
        $('#SpnSupportGroup').hide();
    }
    return return_val;
};
function InsSupportGroup() {
    var parm = {
        "support_dep_id_pk": $("#ddlSupportOrganization option:selected").val(),
        "support_dep_group_name": $("#txtSupportGroup").val(),
        "support_group_head": $("#ddlSupportGroupHead option:selected").val()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/InsSupportGroup', 
        success: function (data) {
            if (data.status_id != 0) {
                successnotify(data.status);
                GetSupportDepartment();
                $('#closedModel').click();
            } else {
                warningnotify(data.status);
                GetSupportDepartment();
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};

// Get Store Location List For Action
function GetSupportGroup() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/GetSupportGroup',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblSupportGroup')) {
                table = $('#tblSupportGroup').DataTable();
            } else {
                table = $('#tblSupportGroup').DataTable();
            }
            table.destroy();
            $("#tblSupportGroup").DataTable({
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
                    //{
                    //    data: 'stored_location_id_pk',
                    //    sWidth: '2px',
                    //    sClass: "view",
                    //    bSortable: false,
                    //    render: function (stored_location_id_pk) {
                    //        return '<a class="editview"  name="' + stored_location_id_pk + '"><i class="fa fa-flag fa-fw" data-toggle="tooltip" title="" style="color:#1a4ba9 !important" data-original-title="Normal priority"></i>  ' + stored_location_id_pk + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                    //    }
                    //},
                    {
                        data: 'support_group_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (support_group_id_pk) {
                            return '<input id="checkbox0" name="' + support_group_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'support_group_id_pk' },
                    { data: 'support_dep_name' },
                    { data: 'support_dep_group_name' }
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

function DeleteCommonSubCategory(sub_category_id) {
    var parm = {
        "sub_category_id_pk": sub_category_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/DeleteCommonSubCategoryByID',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetAllSubCategory();

            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};
//get All Employee List from People
function GetEmployeesLists() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Ticket/GetEmployeesLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".ddlTechnician").html("").append('<option value="0">Select Technician</option>');
            $(data).each(function () {
                $('.ddlTechnician').append('<option value=' + this.id + '>' + this.name + '</option>');
            });
            //$('#ddlRegisteredOfficeinState').val(10).change();
        },
        error: function (edata) {
            //$(edata).each(function () {
            //    InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            //});
            alert("error while feching record.");
        }
    });
};