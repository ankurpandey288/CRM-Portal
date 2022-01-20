$(document).ready(function () {
   
   // GetDefaultBusinessUnit();
    GetCommonCategory();
    GetAllAssetList();
    GetSupportDepartment();
    GetClientLists();
    GetPriority();
    GetImpactList();
    GetUrgency();
    GetLocation();
    GetUser();
    GetDepartmentLists();
    GetSection();
    GetSubLocation();
    GetFloor();
    GetConsultant();
    $("#ddlCategory").change(function () {
        if ($(this).val() != 0) {
            GetCommonSubCategory($(this).val());
        } else {
            $("#ddlSubCategory").html("").append('<option value="0">Select Sub Category</option>');
        }
    });
    $('#BtnDelete').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            DeleteAssetCategory($(this).attr('name'));
        });
    });
    $("#ddlSupportOrgnisation").change(function () {
        if ($(this).val() != 0) {
            GetSupportGroup($(this).val());
        } else {
            $("#ddlSupportGroup").html("").append('<option value="0">Select Support Group</option>');
        }
    });
    $("#ddlSupportGroup").change(function () {
        if ($(this).val() != 0) {
            GetEmployeeListSGD($(this).val());
        } else {
            $("#ddlTechnician").html("").append('<option value="0">Select Technician</option>');
        }
    });
    $('#SLAcbk').click(function () {
        if ($(this).is(':checked')) {
            $(".SLAApplicable").hide();
            $(".SLAApplicable").find("select").val(0).change();
        } else {
            $(".SLAApplicable").show();
            GetImpactList();
            GetUrgency();
            GetPriority();
        }
    });
});

function ValidateTicket() {
    var return_val = true;
    if ($("#ddlCategory option:selected").val() == 0) {
      //  $("#ddlCategory").addClass("is-invalid");
      //  $("#ddlCategory").addClass("was-validated");
        $("#ddlCategory").parentsUntil(".col-md-6").addClass("was-validated");
        alert("Test alert For DDL");
        return_val = false;
    } else {
        $("#ddlCategory").removeClass("was-validated");
        $("#ddlCategory").parentsUntil(".form-group").addClass("was-validated");
        $("#ddlCategory").addClass("was-validated");
        alert("Test alert1");
    }
    if ($("#txtSubject").val() == "") {
        alert("Wrong");
      //  $("#txtTest").parentsUntil(".col-lg-9").addClass("parsley-error");
        $("#txtSubject").addClass("is-invalid");
        return_val = false;
    } else {
        alert("Right");
        $("#txtSubject").removeClass("is-invalid");
        $("#txtSubject").parentsUntil(".form-group").addClass("was-validated");
        $("#txtSubject").addClass("was-validated");
      //  $("#txtLastNameBillingTest").parentsUntil(".col-lg-9").removeClass("invalid-feedback");
    }
    //if ($("#txtIFSCCode").val().trim() == "") {
    //    $("#txtIFSCCode").parentsUntil(".col-md-6").addClass("has-error");
    //    return_val = false;
    //} else {
    //    $("#txtIFSCCode").parentsUntil(".col-md-6").removeClass("has-error");
    //}
   
    
    return return_val;
}

function Test() {
    if (ValidateTicket() == true) {
       InsAddNewTicket();
    } else {
        return false;
    }
};

//Get Common Category Lists
function GetCommonCategory() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Change/GetCommonCategory',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlCategoryFltr').html("").append('<option value="0">Select Category</option>');
            $('#ddlCategory').html("").append('<option value="0">Select Category</option>');
            $(data).each(function () {
                $('#ddlCategoryFltr').append('<option value=' + this.common_cat_id_pk + '>' + this.category_name + '</option>');
                $('#ddlCategory').append('<option value=' + this.common_cat_id_pk + '>' + this.category_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get Support Department 
function GetSupportGroup(support_dep_id) {
    var parm = {
        "support_dep_id_pk": support_dep_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Ticket/GetSupportDepartmentGroupList',
        success: function (data) {
            $("#ddlSupportGroup").html("").append('<option value="0">Select Support Group</option>');
            $("#ddlSupportGroupAsgn").html("").append('<option value="0">Select Support Group</option>');
            $("#ddlSupportGroupAsgnStatus").html("").append('<option value="0">Select Support Group</option>');
            $(data).each(function () {
                $("#ddlSupportGroup").append('<option value=' + this.support_group_id_pk + '>' + this.support_dep_group_name + '</option>');
                $("#ddlSupportGroupAsgn").append('<option value=' + this.support_group_id_pk + '>' + this.support_dep_group_name + '</option>');
                $("#ddlSupportGroupAsgnStatus").append('<option value=' + this.support_group_id_pk + '>' + this.support_dep_group_name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//Get Department Lists
function GetSupportDepartment() {

    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Masters/GetSupportDepartment',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlSupportOrgnisation').html("").append('<option value="0">Select Support Department</option>');
            $('#ddlSupportOrgnisationAsgn').html("").append('<option value="0">Select Support Department</option>');
            $('#ddlSupportOrgnisationAsgnStatus').html("").append('<option value="0">Select Support Department</option>');
            $(data).each(function () {
                $('#ddlSupportOrgnisation').append('<option value=' + this.support_dep_id_pk + '>' + this.support_dep_name + '</option>');
                $('#ddlSupportOrgnisationAsgn').append('<option value=' + this.support_dep_id_pk + '>' + this.support_dep_name + '</option>');
                $('#ddlSupportOrgnisationAsgnStatus').append('<option value=' + this.support_dep_id_pk + '>' + this.support_dep_name + '</option>');
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
            // $('#ddlClient').html("").append('<option value="3"> </option>');
            //$('#ddlClient').append('<option value='+ 3 +'>' + this.business_unit + '</option>');
            $('#ddlClientFltr').html("").append('<option value="0">Select Clients</option>');
            $(data).each(function () {
                if (this.is_default == 1) {
                   // $('#ddlClient').html("").append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
                }
                $('#ddlClient').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
                $('#ddlClientFltr').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get set As Default Client Lists 
function GetDefaultBusinessUnit() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Change/GetDefaultBusinessUnit',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('.ddlClient').html("").append('<option value=' + data.business_unit_id_pk + '>' + data.business_unit + '</option>');
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Sub Category Lists
function GetCommonSubCategory(common_cat_id_fk) {
    var parm = {
        "common_cat_id_fk": common_cat_id_fk,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Change/GetCommonSubCategory',
        success: function (data) {

            $("#ddlSubCategoryFltr").html("").append('<option value="0">Select Sub Category</option>');
            $("#ddlSubCategory").html("").append('<option value="0">Select Sub Category</option>');
            $(data).each(function () {
                $("#ddlSubCategoryFltr").append('<option value=' + this.sub_category_id_pk + '>' + this.sub_category_name + '</option>');
                $("#ddlSubCategory").append('<option value=' + this.sub_category_id_pk + '>' + this.sub_category_name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//Get All Employee List from People by Support Department
function GetEmployeeListSGD(DataItem_id) {
    var parm = {
        "DataItem": DataItem_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Commonapi/GetEmployeeListSGD',
        success: function (data) {
            $("#ddlAssignTo").html("").append('<option value="0">Select </option>');
            $("#ddlUserList").html("").append('<option value="0">Select Employee</option>');
            $("#ddlUserListStatus").html("").append('<option value="0">Select Employee</option>');
            $("#ddlTechnician").html("").append('<option value="0">Select Employee</option>');
            $(data).each(function () {
                $("#ddlUserListStatus").append('<option value=' + this.Id + '>' + this.name + '</option>');
                $("#ddlAssignTo").append('<option value=' + this.Id + '>' + this.name + '</option>');
                $('#ddlUserList').append('<option value=' + this.Id + '>' + this.name + '</option>');
                //$('#ddlUserListStatus').append('<option value=' + this.Id + '>' + this.name + '</option>'); 
                $('#ddlTechnician').append('<option value=' + this.Id + '>' + this.name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
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
            //$("#ddlTechnician").html("").append('<option value="0">Select Technician</option>');
            $(data).each(function () {
                //$('#ddlTechnician').append('<option value=' + this.id + '>' + this.name + '</option>');
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
//get All Asign To List from People
function GetAsignLists() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Ticket/GetAsignLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlAssignTo").html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $('#ddlAssignTo').append('<option value=' + this.id + '>' + this.title + '</option>');
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
//get All Asign To List from People
function GetAssetList(user_id) {
    var parm = {
        "user_id_fk": user_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetListForAssetNonAssPeriphe',
        success: function (data) {
            $("#ddlAsset").html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $('#ddlAsset').append('<option value=' + this.asset_id_pk + '>' + this.asset_tag + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// get all asset list 
function GetAllAssetList() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetListForAssetNonAssPeripherals',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlAsset").html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $('#ddlAsset').append('<option value=' + this.asset_id_pk + '>' + this.asset_tag + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function GetPriority() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/SLA/GetPriorityList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".ddlPriority").html("").append('<option value="0">Select Priority</option>');
            $("#ddlPriorityFltr").html("").append('<option value="0">Select Priority</option>');
            $(data).each(function () {
                if (this.priority_id_pk == 3) {
                    $('#ddlPriority').append('<option selected value=' + this.priority_id_pk + '>' + this.priority_name + '</option>');
                }
                else {
                    $('#ddlPriority').append('<option value=' + this.priority_id_pk + '>' + this.priority_name + '</option>');
                }
                // $('.ddlPriority').append('<option value=' + this.priority_id_pk + '>' + this.priority_name + '</option>');
                $('#ddlPriorityFltr').append('<option value=' + this.priority_id_pk + '>' + this.priority_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Priority List
function GetPriorityList(impact_id) {
    var parm = {
        "mapping_priority_id_pk": impact_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/SLA/GetTransactionTablePriorityList',
        success: function (data) {
            //  $("#ddlPriority").val(data.priority_name).change();
            $("#ddlPriority").val(data.priority_id_pk).change();
            //  $('#ddlPriority').append('<option value=' + data.priority_id_pk + '>' + data.priority_name + '</option>');

            //  alert(data.priority_id_pk);
            //  $("#ddlPriority").val(data.priority_id_pk).change();
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//Get All Impact Lists
//function GetImpact(urgency_id) {
//    var parm = {
//        "urgency_id_fk": urgency_id,
//    };
//    var josnstr = JSON.stringify(parm);
//    $.ajax({
//        type: "Post",
//        data: josnstr,
//        dataType: "json",
//        contentType: "application/json; charset=utf-8",
//        url: 'http://playmediahouse.com/api/api/SLA/GetTransactionTableImpactList',
//        success: function (data) {
//            $('#ddlImpact').html("").append('<option value="0">Select </option>');
//            $(data).each(function () {
//                $('#ddlImpact').append('<option value=' + this.mapping_priority_id_pk + '>' + this.impact_name + '</option>');
//            });
//        },
//        error: function (result) {
//            alert("Error : data");
//        }
//    });
//};
//Get All  Impact List
function GetImpactList() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/SLA/GetImpactList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlImpact").html("").append('<option value="0">Select Impact</option>');
            $(data).each(function () {
                if (this.impact_id_pk == 3) {
                    $('#ddlImpact').append('<option selected value=' + this.impact_id_pk + '>' + this.impact_name + '</option>');
                }
                else {
                    $('#ddlImpact').append('<option value=' + this.impact_id_pk + '>' + this.impact_name + '</option>');
                }
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Urgency Lists
function GetUrgency() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/SLA/GetTransactionTableUrgencyList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#ddlUrgency').html("").append('<option value="0">Select Urgency</option>');
            $(data).each(function () {
                if (this.urgency_id_pk == 3) {
                    $('#ddlUrgency').append('<option selected value=' + this.urgency_id_pk + '>' + this.urgency_name + '</option>');
                }
                else {
                    $('#ddlUrgency').append('<option value=' + this.urgency_id_pk + '>' + this.urgency_name + '</option>');
                }
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
            //$('#ddlLocationFltr').html("").append('<option value="0">Select Location</option>');
            $(data).each(function () {
                $('#ddlLocationFltr').append('<option value=' + this.location_id_pk + '>' + this.location_name + '</option>');
                $('#ddlLocation').append('<option value=' + this.location_id_pk + '>' + this.location_name + '</option>');
                $('#ddlLocationAsset').append('<option value=' + this.location_id_pk + '>' + this.location_name + '</option>');
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
//Get All Department Lists
function GetDepartmentLists() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Ticket/GetDepartmentLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlDepartmentName').html("").append('<option value="0">Select Department</option>');
            $('#ddlDepartmentNameFltr').html("").append('<option value="0">Select Department</option>');

            $('#ddlDepartmentNameAsset').html("").append('<option value="0">Select Department</option>');
            $(data).each(function () {
                $('#ddlDepartmentName').append('<option value=' + this.department_id_pk + '>' + this.department_name + '</option>');
                $('#ddlDepartmentNameFltr').append('<option value=' + this.department_id_pk + '>' + this.department_name + '</option>');
                $('#ddlDepartmentNameAsset').append('<option value=' + this.department_id_pk + '>' + this.department_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get Department List According To User
function GetDepartmentAccToUserList(user_id) {
    var parm = {
        "user_id_pk": user_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Commonapi/GetDepartmentAccToUserList',
        success: function (data) {
            //  $('#ddlDepartmentName').html("").append('<option value="0">Select Department</option>');
            $(data).each(function () {
                //     $('#ddlDepartmentName').append('<option value=' + this.department_id_pk + '>' + this.department_name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
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
            $('#ddlUserFltr').html("").append('<option value="0">Select User</option>');
            $('#ddlUser').html("").append('<option value="0">Select User</option>');
            $(data).each(function () {
                $('#ddlUserFltr').append('<option value=' + this.user_id_pk + '>' + this.user_name + ' - ' + this.email + '</option>');
                $('#ddlUser').append('<option value=' + this.user_id_pk + '>' + this.user_name + ' - ' + this.email + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function GetSection() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Masters/GetSection',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlSection').html("").append('<option value="0">Select Section</option>');
            $(data).each(function () {
                $('#ddlSection').append('<option value=' + this.section_id_pk + '>' + this.section_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function GetSubLocation() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Masters/GetSubLocation',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlSubLocations').html("").append('<option value="0">Select Building</option>');
            $('#ddlSubLocationsAsset').html("").append('<option value="0">Select Building</option>');
            $(data).each(function () {
                $('#ddlSubLocations').append('<option value=' + this.sub_location_id_pk + '>' + this.sub_location + '</option>');
                $('#ddlSubLocationsAsset').append('<option value=' + this.sub_location_id_pk + '>' + this.sub_location + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Floor Lists 
function GetFloor() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Masters/GetFloor',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlFloor').html("").append('<option value="0">Select Floor</option>');
            $(data).each(function () {
                $('#ddlFloor').append('<option value=' + this.floor_id_pk + '>' + this.floor_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Get Consultant List
function GetConsultant() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Masters/GetConsultant',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlConsultant').html("").append('<option value="0">Select Consultant</option>');
            $(data).each(function () {
                $('#ddlConsultant').append('<option value=' + this.consultant_id_pk + '>' + this.consultant_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Add New Tickets 
function InsAddNewTicket() {
    var parm = {
        "subject": $("#txtSubject").val().trim(),
        "support_dep_id_pk": $("#ddlSupportOrgnisation option:selected").val().trim(),
        "support_group_id_fk": $("#ddlSupportGroup option:selected").val().trim(),
        "client_id_pk": $("#ddlClient option:selected").val().trim(),
        "asset_id_pk": $("#ddlAsset option:selected").val().trim(),
        "asset_tag": $("#ddlAsset option:selected").text(),
        "common_cat_id_pk": $("#ddlCategory option:selected").val().trim(),
        "asign_to": $("#ddlTechnician option:selected").val().trim(),
        "sub_category_id_pk": $("#ddlSubCategory option:selected").val().trim(),
        "message": $("#elm1").val(),
        "send_ticket_notification": $("#chkSNTN").is(":checked") == true ? 1 : 0,
        "priority_id_pk": $("#ddlPriority option:selected").val().trim(),
        "logged_via": $("#ddlLoggedVia option:selected").val().trim(),
        "department_id_fk": $("#ddlDepartmentName option:selected").val().trim(),
        "user_id_fk": $("#ddlUser option:selected").val().trim(),
        "urgency_id_fk": $("#ddlUrgency option:selected").val().trim(),
        "impact_id_fk": $("#ddlImpact option:selected").val().trim(),
        "location_id_fk": $("#ddlLocation option:selected").val().trim(),
        "is_send_email": $("#chkSEmailNotifi").is(":checked") == true ? 1 : 0,
        "is_send_message": $("#chkSSMSNotif").is(":checked") == true ? 1 : 0,
        "is_sla_applicable": $("#SLAcbk").is(":checked") == true ? 0 : 1,
        "sub_location_id_fk": $("#ddlSubLocations option:selected").val(),
        "section_id_fk": $("#ddlSection option:selected").val(),
        "floor_id_fk": $("#ddlFloor option:selected").val(),
        "building_room_no": $("#txtBuildingAndRoomNo").val().trim(),
        "gate": $("#txtGate").val().trim(),
        "consultant_id_fk": $("#ddlConsultant option:selected").val(),
        "call_type": $("#ddlCallType option:selected").val(),
        "custom_field_s_no": $("#txtSerialNo").val(),
        "custom_field_make": $("#txtMake").val(),
        "custom_field_model": $("#txtModel").val(),
        "user_name": $("#txtUserName").val(),
        "user_con_no": $("#txtUserContactNumber").val(),
        "support_type": $("#ddlSupportType option:selected").val(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Ticket/InsAddNewTicket',
        success: function (data) {
            //alert("Inserted Successfully");
            if (data.status_id != 0) {
              //  GetUserForSendEmail(data.user_id_fk, data.ticket_id_pk, data.subject)
                InsTicketReplyConversation(data.ticket_id_pk, $("#elm1").val() , 1)  // $.session.get("id")
                $("#ClrTicket").find("input").val("");
                $("#ClrTicket").find("select").val(0).change();
                successnotify(data.status);
                window.location.href = "/Ticket/Index";

            } else {
                // alert(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// insert ticket reply Conversation  
function InsTicketReplyConversation(ticket_id, reply_description, technician_id) {
    var parm = {
        "ticket_id_fk": ticket_id,
        "reply_description": reply_description,
        "technician_id_fk": technician_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Ticket/InsTicketReplyConversation',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {

            } else {
            }
        },
        error: function (result) {
            alert("Not Update data");
        }
    });
};