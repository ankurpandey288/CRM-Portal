$(document).ready(function () {
    if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
        window.location.href = "/Login/Index/";
    };
    GetRole();
    GetUser();
    GetLocation();
   // GetLocation();
    GetUserLists(); 
    GetSupportGroup();
    GetBusinessUnit();
   // GetDepartmentLists();
    // GetStaffDetails(1);
    $('.cb-element').click(function () {
        if (!$(this).is(':checked')) {
            return confirm("Are you sure?");
            alert("Value Checked");
        }
    });
    $("#BtnSubmit").click(function () {
        if (validateUser() == true) {
            InsStaff();
        } else {
          return false;
        }
    });
    $("#BtnUpdate").click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            if (validateUser() == true) {
                UpdUserDetails($(this).attr('name'));
            } else {
                return false;
            }
        });

        
    });
    $(document).on('click', '.cb-element', function () {
        if ($(this).is(':checked')) {
            //$("#btnEdit").show();
            $("#btnNew").attr("disabled", "disabled");
            $("#btnEdit").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnNew").removeAttr("disabled");
            $("#btnEdit").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            //$("#btnEdit").hide();
            //$("#btnNew").show();
        }
        else {
            $("#btnNew").removeAttr("disabled");
            $("#btnEdit").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            //$("#btnEdit").hide();
            //$("#btnNew").show();
        }
    });
    $('#btnNew').click(function () {
        $(document).on('change', '#ddlBusinessUnit', function () {
            if ($(this).val() != 0) {
                GetLocationAccToBusinessUnitList($(this).val());
                GetDepartmentAccToBusinessUnitList($(this).val());
            } else {
                $("#ddlLocation").html("").append('<option value="0">Select Location</option>');
            }
        });
    });
    $("#CheckAll").click(function () {
        if ($(this).is(':checked')) {
            $("#btnEdit").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
            $("#btnNew").attr("disabled", "disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnEdit").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnNew").removeAttr("disabled");
        }
        else {
            $("#btnEdit").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnNew").removeAttr("disabled");
        }
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#BtnDelete').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            $("#btnEdit").hide();
            DeleteTechnician($(this).attr('name'));
            $(".cb-element").prop("checked", false);
        });
    });

   
    //$("#ddlBusinessUnit").change(function () {
    //    if ($(this).val() != 0) {
    //        GetLocationAccToBusinessUnitList($(this).val());
    //        GetDepartmentAccToBusinessUnitList($(this).val());
    //    } else {
    //        $("#ddlLocation").html("").append('<option value="0">Select Location</option>');
    //    }
    //});
    $('#btnEdit').click(function () {
        // var val = [];
        $(':checkbox:checked').each(function () {
            GetStaffDetails($(this).attr('name'));
        });
        $("#myModalLabelNew").hide(); $("#myModalLabelEdit").show();
        $("#BtnSubmit").hide(); $("#BtnUpdate").show();
    });

});

function validateUser() { 
    var return_val = true;
    if ($('#txtName').val().trim() == "" || $('#txtName').val() == null) {
        $('#SpnName').show();
        return_val = false;
    } else {
        $('#SpnName').hide();
    }
    if ($('#txtEmailAddress').val().trim() == "" || $('#txtEmailAddress').val() == null) {
        $('#SpnEmailAddress').show();
        return_val = false;
    } else {
        $('#SpnEmailAddress').hide();
    }
    if ($('#txtMobileNumber').val().trim() == "" || $('#txtMobileNumber').val() == null) {
        $('#SpnMobileNumber').show();
        return_val = false;
    } else {
        $('#SpnMobileNumber').hide();
    }
    if ($('#ddlLocation option:selected').val() == 0) {
        $('#SpnLocation').show();
        return_val = false;
    } else {
        $('#SpnLocation').hide();
    }
    if ($('#txtJobTitle').val().trim() == "" || $('#txtJobTitle').val() == null) {
        $('#SpnJobTitle').show();
        return_val = false;
    } else {
        $('#SpnJobTitle').hide();
    }
    if ($('#txtpwd').val().trim() == "" || $('#txtpwd').val() == null) {
        $('#Spnpwd').show();
        return_val = false;
    } else {
        $('#Spnpwd').hide();
    }
    if ($('#ddlSupportGroup option:selected').val() == 0) {
        $('#SpnSupportGroup').show();
        return_val = false;
    } else {
        $('#SpnSupportGroup').hide();
    }
    return return_val;
};
//Get All Support Department 
function GetRole() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Staff/GetRole',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlRole").html("").append('<option value="0">Select Staff Role</option>');
            $(data).each(function () {
                $('#ddlRole').append('<option value=' + this.id + '>' + this.type + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Support Group Department 
function GetSupportGroup() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Masters/GetSupportGroup',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(data).each(function () {
                $('#ddlSupportGroup').append('<option value=' + this.support_group_id_pk + '>' + this.support_dep_group_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Location Lists
function GetLocation() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Peripherals/GetLocation',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlLocation').html("").append('<option value="0">Select Location</option>');
            $(data).each(function () {
                $('#ddlLocation').append('<option value=' + this.location_id_pk + '>' + this.location_name + '</option>');

            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get Location According To Business Unit 
function GetLocationAccToBusinessUnitList(business_unit_id) {
    var parm = {
        "business_unit_id_fk": business_unit_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Commonapi/GetLocationAccToBusinessUnitList',
        success: function (data) {
            $('#ddlLocation').html("").append('<option value="0">Select Location</option>');
            $(data).each(function () {
                $('#ddlLocation').append('<option value=' + this.location_id_pk + '>' + this.location_name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//Get Department List According To Business Unit
function GetDepartmentAccToBusinessUnitList(business_unit_id) {
    var parm = {
        "business_unit_id_fk": business_unit_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Commonapi/GetDepartmentAccToBusinessUnitList',
        success: function (data) {
            $('#ddlDepartmentName').html("").append('<option value="0">Select Department</option>');
            $(data).each(function () {
                $('#ddlDepartmentName').append('<option value=' + this.department_id_pk + '>' + this.department_name + '</option>');
            });
            
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//Get Business Unit Lists
function GetBusinessUnit() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Change/GetBusinessUnit',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#ddlBusinessUnit').html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $('#ddlBusinessUnit').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};

// Insert Staff  
function InsStaff() {
    var parm = {
        "user_name": $("#txtName").val(),
        "email": $("#txtEmailAddress").val(),
        "mobile_no": $("#txtMobileNumber").val(),
        "location_id_fk": $("#ddlLocation option:selected").val(),
        "title": $("#txtJobTitle").val(),
        "password": $("#txtpwd").val(),
        "business_unit_id_fk": $("#ddlBusinessUnit option:selected").val(),
        "department_id_fk": $("#ddlDepartmentName option:selected").val(),
        "reporting_manager": $("#ddlReportingManager option:selected").val(),
        "department_head": $("#ddlDepartmentHead option:selected").val(),
        "is_vip": $("#ddlVIPUser option:selected").val()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Staff/InsUser',
        success: function (data) {
            if (data.status_id != 0) {
                successnotify(data.status);
                $('#closedModel').click();
                GetUserLists();
            } else {
                // alert(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get Staff Lists 
function GetUserLists() { 
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Staff/GetUserLists',  
        dataType: "json",
        success: function (data) {
            //alert(data.status);
            var table;
            if ($.fn.dataTable.isDataTable('#tblStaff')) {
                table = $('#tblStaff').DataTable();
            } else {
                table = $('#tblStaff').DataTable();
            }
            table.destroy();
            $("#tblStaff").DataTable({
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
                        data: 'user_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (user_id_pk) {
                            return '<input id="check" class="cb-element checkbox" name="' + user_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'user_id_pk' },
                    { data: 'user_name' },
                    { data: 'email' },
                    { data: 'title' }
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
            });
        },

        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function DeleteTechnician(id) {
    var parm = {
        "id": id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Staff/DeleteTechnicianByID',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetStaffLists();

            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};
function GetStaffDetails(user_id) {
    var parm = {
        'user_id_pk': user_id  // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Staff/GetUserDetails',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#txtName").val(data.user_name);
            $("#txtEmailAddress").val(data.email);
            $("#txtMobileNumber").val(data.mobile_no);
            $(".Location").val(data.location_id_fk).change();
            $("#txtJobTitle").val(data.title);
            $("#txtpwd").val(data.password);
            $("#ddlBusinessUnit").val(data.business_unit_id_fk).change();
            $("#ddlDepartmentName").val(data.department_id_fk).change();
            $("#ddlReportingManager").val(data.reporting_manager).change();
            $("#ddlDepartmentHead").val(data.department_head).change();
            $("#ddlVIPUser").val(data.is_vip).change();
        },
        error: function (edata) {
            alert("error while feching record.");
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
// Update User Details   
function UpdUserDetails(user_id) { 
    var parm = {
        "user_id_pk": user_id,
        "user_name": $("#txtName").val(),
        "email": $("#txtEmailAddress").val(),
        "mobile_no": $("#txtMobileNumber").val(),
        "location_id_fk": $("#ddlLocation option:selected").val(),
        "title": $("#txtJobTitle").val().trim(),
        "password": $("#txtpwd").val().trim(),
        "business_unit_id_fk": $("#ddlBusinessUnit option:selected").val(),
        "department_id_fk": $("#ddlDepartmentName option:selected").val(),
        "reporting_manager": $("#ddlReportingManager option:selected").val(),
        "department_head": $("#ddlDepartmentHead option:selected").val(),
        "is_vip": $("#ddlVIPUser option:selected").val(),
        "updated_by": $.session.get("id")
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Staff/UpdUser', 
        success: function (data) {
            
            if (data.status_id != 0) {
                CreateSuccess(data.status);
                $('#closedModel').click();
                 GetUserLists();
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