$(document).ready(function () {
  //  var servicereqid = 0;
    var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');
    allWells.hide();
    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });
    allNextBtn.click(function () {
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
            if (!curInputs[i].validity.valid) {
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });
    $('div.setup-panel div a.btn-primary').trigger('click');
    $('.cb-element').click(function () {
        if (!$(this).is(':checked')) {
            return confirm("Are you sure?");
          //  alert("Value Checked");
        }
    });
    $(document).on('click', '.cb-element', function () {
        if ($(this).is(':checked')) {
            $("#btnEdit").removeAttr("disabled");
            $("#btnAssignTo").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
        }
        else {
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
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
    $("#CheckAll").click(function () {
        if ($(this).is(':checked')) {
            $("#btnEdit").removeAttr("disabled");
            $("#btnAssignTo").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
            $("#btnEdit").show();
        } else if (!$(this).is(':checked')) {
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
        }
        else {
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
        }
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#BtnDelete').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            $("#btnEdit").hide();
            DeleteServiceReq($(this).attr('name'));
            $(".cb-element").prop("checked", false);
        });
    });
    $("#CheckAllStatus").click(function () {
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#btnStatusUpdate').click(function () {
        var val = [];
        $('.servcbk:checked').each(function (i) {
            val[i] = $(this).val();
            UpdateServiceRequestStatus($(this).attr('name'));
            //$(".cb-element").prop("checked", false);
        });
    });
    $('#btnStatusUpdateAssign').click(function () {
        var val = [];
        $('.servcbk:checked').each(function (i) {
            //alert($(this).attr('name'));
            val[i] = $(this).val();
            UpdateServiceRequestStatus($(this).attr('name'));
          //  UpdateTicketAsignToChangeStatus($(this).attr('name'));
            UpdateServiceRequestAsignToChangeStatus($(this).attr('name'));
        });
    });
    $("#CheckAllAsignTo").click(function () {
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#btnAsignToUpdate').click(function () {
        var val = [];
        $('.servcbk:checked').each(function (i) {
            val[i] = $(this).val();
            UpdateServiceRequestAsignTo($(this).attr('name')); 
            //$(".cb-element").prop("checked", false);
        });
    });
    $("#ddlCategory").change(function () {
        if ($(this).val() != 0) {
            GetCommonSubCategory($(this).val());
        } else {
            $("#ddlSubCategory").html("").append('<option value="0">Select Sub Category</option>');
        }
    });
    $("#ddlSubCategory").change(function () {
        if ($(this).val() != 0) {
            GetTaskTempleteTitleList($(this).val());
        } else {
            $("#ddlTitle").html("").append('<option value="0">Select Title</option>');
        }
    });
    $("#ddlTitle").change(function () {
      //  alert($(this).val());
        if ($(this).val() != 0) {
            GetServiceRequestTempleteByTitle($(this).val());
          //  $("#SupportGroupNew").hide(); $("#SupportGroupEdit").show(); 
          //  $("#NewTechnician").hide(); $("#EditTechnician").show(); 
        } else {
            $("#ddlSubCategory").html("").append('<option value="0">Select Sub Category</option>');
        }
    });
    $("#ddlClient").change(function () {
        if ($(this).val() != 0) {
            GetLocationAccToBusinessUnitList($(this).val());
            GetDepartmentAccToBusinessUnitList($(this).val());
        } else {
            $("#ddlLocation").html("").append('<option value="0">Select Location</option>');
        }
    });
    $("#ddlSupportOrgnisationAsgnStatus").change(function () {
        if ($(this).val() != 0) {
            GetSupportGroup($(this).val());
        } else {
            $("#ddlSupportGroupAsgnStatus").html("").append('<option value="0">Select Support Group</option>');
        }
    });
    $("#ddlSupportGroupAsgnStatus").change(function () {
        if ($(this).val() != 0) {
            GetEmployeeListSGD($(this).val());
        } else {
            $("#ddlUserListStatus").html("").append('<option value="0">Select Technician</option>');
        }
    });
    GetConsultant();
    $("#ddlDepartmentName").change(function () {
        if ($(this).val() != 0) {
          //  GetConsultantName($(this).val());
        } else {
          //  $("#ddlConsultant").html("").append('<option value="0">Select Consultant</option>');
        }
    });
	GetConsultant();
    GetAssetCategory();
    GetPendingReason();
    GetCloserCode();
    GetSupplierDetails();
    GetServiceReqStatusLists();
    GetSupportGroupEdit();
    GetImpactListForedit();
    GetCommonCategory();
    GetViewWorkloadList()
    GetSupportDepartment();
    GetClientLists();
    GetEmployeesLists();
   // GetAssetList();
    GetAllAssetList();
    GetPriority();
    GetServiceRequest();
    GetImpactList();
    GetUrgency();
    GetLocation();
    GetUser();
    GetDepartmentLists();
    GetAllSubCategory();
    GetSubLocation();
	GetSection();
    $(document).on('click', '.consultant', function () {
        GetConsultantDetails($(this).attr("name"));
    });
    $("#ddlDepartmentName").change(function () {
        if ($(this).val() != 0) {
            GetSectionDepartmentWise($(this).val());
        } else {
            $("#ddlSection").html("").append('<option value="0">Select Section</option>');
        }
    });
    GetFloor();
    $("#btnNew").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModalNew') }
        );
    });
    $("#btnAssignTo").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModalAsignTo') });
    });
    $("#ddlServiceReqStatus").change(function () {
        if ($(this).val() == 6) {
            $("#DivPendingBox").show();
            $("#DivCommentBox").show();
            $("#divCloser").hide();
            $("#Assigned").hide();
            $("#btnStatusUpdateAssign").hide();
            $("#btnStatusUpdate").show();
        } else if ($(this).val() == 4) {
            $("#Assigned").show();
            $("#btnStatusUpdateAssign").show();
            $("#btnStatusUpdate").hide();
            $("#DivPendingBox").hide();
            $("#DivCommentBox").hide();
        } else if ($(this).val() == 9) {
            $("#divCloser").show();
            $("#btnStatusUpdateAssign").hide();
            $("#btnStatusUpdate").show();
            $("#DivPendingBox").hide();
            $("#DivCommentBox").hide();
            $("#Assigned").hide();
        }
        else {
            $("#divCloser").hide();
            $("#DivPendingBox").hide();
            $("#DivVendor").hide();
            $("#DivCommentBox").hide();
            $("#Assigned").hide();
            $("#btnStatusUpdateAssign").hide();
            $("#btnStatusUpdate").show();
        }
    });
    $("#btnChangeStatus").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModalChangeStatus') });
        var val = [];
        $('.servcbk:checked').each(function (i) {
            val[i] = $(this).val(); 
            GetServiceReqStatusListsConditionWise($(this).attr('name'));
          //  alert($(this).attr('name'));
           
           // GetServiceReqStatusListsConditionWise(22);
        });
       
       
    });
    $("#ddlPending").change(function () {
        if ($(this).val() == 1) {
            $("#DivVendor").show();
            $("#DivPendingReason").hide();
        } else if ($(this).val() == 0) {
            $("#DivVendor").hide();
            $("#DivPendingReason").hide();
        } else if ($(this).val() == 3) {
            $("#DivVendor").hide();
            $("#DivPendingReason").hide();
        }
        else {
            $("#DivPendingReason").show();
            $("#DivVendor").hide();
        }
    });
    $("#ddlSupportOrgnisation").click(function () {
           $("#SupportGroupNew").show(); $("#SupportGroupEdit").hide();
           $("#NewTechnician").show(); $("#EditTechnician").hide(); 
    });
    $("#ddlSupportGroup").change(function () {
        if ($(this).val() != 0) {
            GetEmployeeListSGD($(this).val());
        } else {
            $("#ddlTechnician").html("").append('<option value="0">Select Technician</option>');
        }
    });
    $("#ddlSupportOrgnisation").change(function () {
        if ($(this).val() != 0) {
            GetSupportGroup($(this).val());
        } else {
            $("#ddlSupportGroup").html("").append('<option value="0">Select Support Group</option>');
        }
    });
    $("#btnSubmit").click(function () {
        if (validateServiceRequest() == true) {
            InsServiceRequest();
        } else {
            return false;
        }
    });
    $(document).on('click', '.editview', function () {
        if ($.session.get("service_req_id_pk") != '' || $.session.get("service_req_id_pk") != null || $.session.get("service_req_id_pk") == undefined) {
            $.session.remove("service_req_id_pk");
            $.session.set("service_req_id_pk", $(this).attr("name"));
        }
    });
    $(document).on('click', '.adminview', function () {
        GetAdminDetails($(this).attr("name"));
    });
    $(document).on('click', '.adminviewsubmitter', function () {
        GetAdminDetailsSubmitter($(this).attr("name"));
    });
    $("#ddlAsset").change(function () {
        if ($(this).val() != 0) {
            GetAssetDetailsEdit($(this).val());
        } else {
            //  $("#ddlDepartmentName").html("").append('<option value="0">Select </option>');
        }
    });
    //$("#ddlUrgency").change(function () {
    //    if ($(this).val() != 0) {
    //        GetImpact($(this).val());
    //    } else {
    //        $("#ddlImpact").html("").append('<option value="0">Select</option>');
    //    }
    //});
    //$("#ddlImpact").change(function () {
    //    if ($(this).val() != 0) {
    //        GetPriorityList($(this).val());
    //    } else {
    //        $("#ddlPriority").html("").append('<option value="0">Select</option>');
    //    }
    //});
    //$("#ddlImpactEdit").change(function () {
    //    if ($(this).val() != 0) {
    //        GetPriorityList($(this).val());
    //    } else {
    //        $("#ddlPriority").html("").append('<option value="0">Select</option>');
    //    }
    //});
    $("#ddlSupportOrgnisationAsgn").change(function () {
        if ($(this).val() != 0) {
          //  alert($(this).val());
            GetSupportGroup($(this).val());
        } else {
            $("#ddlSupportGroupAsgn").html("").append('<option value="0">Select Support Group</option>');
        }
    });
    $("#ddlSupportGroupAsgn").change(function () {
        if ($(this).val() != 0) {
            GetEmployeeListSGD($(this).val());
        } else {
            $("#ddlTechnician").html("").append('<option value="0">Select Technician</option>');
        }
    });
    $("#btnEdit").click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            GetServiceRequestAllDetails($(this).attr('name'));
        });
        $('.select2').select2(
            { dropdownParent: $('#myModalNew') }
        );
        $("#myModalLabelNew").hide(); $("#myModalLabelEdit").show();
        $(".divNewRequest").hide(); $("#divEditReq").show();
        //$("#LocationNew").hide(); $("#LocationEdit").show();
        //$("#DepartmentNew").hide(); $("#DepartmentEdit").show();
        //$("#SupportGroupNew").hide(); $("#SupportGroupEdit").show(); 
        //$("#ImpactNew").hide(); $("#ImpactEdit").show();
        $("#btnSubmit").hide(); $("#btnUpdate").show();
        
    });
    $("#btnFilter").click(function () {
        GetServiceRequest();
    });
    $("#btnUpdate").click(function () {
        if (validateServiceRequest() == true) {
            var val = [];
            $(':checkbox:checked').each(function (i) {
                val[i] = $(this).val();
                UpdServiceRequest($(this).attr('name'));
            });
        } else {
            return false;
        }
    });
});

function validateServiceRequest() { 
    var return_val = true;
    if ($('#ddlCategory option:selected').val() == 0) {
        $('#SpnCategory').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnCategory').hide();
    }
    if ($('#ddlSubCategory option:selected').val() == 0) {
        $('#SpnSubCategory').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnSubCategory').hide();
    }
    if ($('#ddlTitle option:selected').val() == 0) {
        $('#SpnTitle').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnTitle').hide();
    }
    if ($('#ddlLoggedVia option:selected').val() == 0) {
        $('#SpnLoggedVia').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnLoggedVia').hide();
    }
    if ($('#ddlClient option:selected').val() == 0) {
        $('#SpnClient').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnClient').hide();
    }
    if ($('#ddlLocation option:selected').val() == 0) {
        $('#SpnLocation').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnLocation').hide();
    }
    if ($('#ddlUser option:selected').val() == 0) {
        $('#SpnUser').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnUser').hide();
    }
    //if ($('#ddlAsset option:selected').val() == 0) {
    //    $('#SpnAsset').show();
    //    RequiredField("Please Check Required Field");
    //    return_val = false;
    //} else {
    //    $('#SpnAsset').hide();
    //}
    if ($('#ddlDepartmentName option:selected').val() == 0) {
        $('#SpnDepartmentName').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnDepartmentName').hide();
    }
    //if ($('#ddlSection option:selected').val() == 0) {
    //    $('#SpnSection').show();
    //    RequiredField("Please Check Required Field");
    //    return_val = false;
    //} else {
    //    $('#SpnSection').hide();
    //}
    if ($('#ddlSubLocations option:selected').val() == 0) {
        $('#SpnSubLocations').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnSubLocations').hide();
    }
    if ($('#ddlFloor option:selected').val() == 0) {
        $('#SpnFloor').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnFloor').hide();
    }
    if ($('#txtBuildingAndRoomNo').val().trim() == "" || $('#txtBuildingAndRoomNo').val() == null) {
        $('#SpnBuildingAndRoomNo').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnBuildingAndRoomNo').hide();
    }
    if ($('#txtGate').val().trim() == "" || $('#txtGate').val() == null) {
        $('#SpnGate').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnGate').hide();
    }
    if ($('#ddlSLAApplicable option:selected').val() == 1) {
        if ($('#ddlUrgency option:selected').val() == 0) {
            $('#SpnUrgency').show();
            RequiredField("Please Check Required Field");
            return_val = false;
        } else {
            $('#SpnUrgency').hide();
        if ($('#ddlImpact option:selected').val() == 0) {
                $('#SpnImpact').show();
                RequiredField("Please Check Required Field");
                return_val = false;
            } else {
                $('#SpnImpact').hide();
            }
        }
        if ($('#ddlPriority option:selected').val() == 0) {
            $('#SpnPriority').show();
            RequiredField("Please Check Required Field");
            return_val = false;
        } else {
            $('#SpnPriority').hide();
        }
    } else {
        $('#SpnUrgency').hide();
        $('#SpnImpact').hide();
        $('#SpnPriority').hide();
    }
    if ($('#ddlConsultant option:selected').val() == 0) {
        $('#SpnConsultant').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnConsultant').hide();
    }
    if ($('#ddlSupportOrgnisation option:selected').val() == 0) {
        $('#SpnSupportOrgnisation').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnSupportOrgnisation').hide();
    }
    if ($('#ddlSupportGroup option:selected').val() == 0) {
        $('#SpnSupportGroup').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnSupportGroup').hide();
    }
    if ($('#ddlTechnician option:selected').val() == 0) {
        $('#SpnTechnician').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnTechnician').hide();
    }
    if ($('#ddlTechnician option:selected').val() == 0) {
        $('#SpnTechnician').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnTechnician').hide();
    }
    if ($('#txtContents').val().trim() == "" || $('#txtContents').val() == null) {
        $('#SpnContents').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnContents').hide();
    }
    return return_val;
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
                $(".ddlSupportGroupAsgn").append('<option value=' + this.support_group_id_pk + '>' + this.support_dep_group_name + '</option>');
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
//Get Business Unit Lists
function GetClientLists() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Change/GetBusinessUnit',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //  $('#ddlClient').html("").append('<option value="0">Select Business Unit</option>');
            $('#ddlClientFltr').html("").append('<option value="0">Select Clients</option>');
            $(data).each(function () {
                $('#ddlClient').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
                $('#ddlClientFltr').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Get Employees According 
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
            $("#ddlAssignTo").html("").append('<option value="0">Select Employee</option>');
            $("#ddlUserList").html("").append('<option value="0">Select Employee</option>');
            $("#ddlUserListStatus").html("").append('<option value="0">Select Employee</option>');
            $("#ddlTechnician").html("").append('<option value="0">Select Technician</option>');
            $(data).each(function () {
                $("#ddlUserListStatus").append('<option value=' + this.Id + '>' + this.name + '</option>'); 
                $("#ddlAssignTo").append('<option value=' + this.Id + '>' + this.name + '</option>');
                $('#ddlUserList').append('<option value=' + this.Id + '>' + this.name + '</option>');
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
        url: 'http://playmediahouse.com/api/api/Staff/GetStaffLists', 
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
               $("#ddlTechnicianEdit").html("").append('<option value="0">Select Technician</option>');
            $(data).each(function () {
               $('#ddlTechnicianEdit').append('<option value=' + this.id + '>' + this.name + '</option>');
                //$('#ddlUserList').append('<option value=' + this.id + '>' + this.name + '</option>');
            });
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
function GetAssetList() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlAsset").html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $('#ddlAsset').append('<option value=' + this.asset_id_pk + '>' + this.asset_name + '</option>');
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
// // get all asset list 
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
            //$("#ddlPriority").val(data.priority_name).change();
        //    $("#ddlPriority").val(data.priority_id_pk).change();
          //  $('#ddlPriority').append('<option value=' + data.priority_id_pk + '>' + data.priority_name + '</option>');
           
            //alert(data.priority_id_pk);
          //  $("#ddlPriority").val(data.priority_id_pk).change();
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//Get All Impact Lists
function GetImpact(urgency_id) {
    var parm = {
        "urgency_id_fk": urgency_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/SLA/GetTransactionTableImpactList',
        success: function (data) {
         //   $('#ddlImpact').html("").append('<option value="0">Select </option>');
            $(data).each(function () {
         //       $('#ddlImpact').append('<option value=' + this.mapping_priority_id_pk + '>' + this.impact_name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
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
                if (this.impact_id_pk == 4) {
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
                if (this.urgency_id_pk == 4) {
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
//Get All Location Lists
function GetDepartmentLists() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Ticket/GetDepartmentLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#ddlDepartmentNameEdit').html("").append('<option value="0">Select Department</option>');
            $('#ddlDepartmentNameFltr').html("").append('<option value="0">Select Department</option>');
            $(data).each(function () {
                $('#ddlDepartmentNameEdit').append('<option value=' + this.department_id_pk + '>' + this.department_name + '</option>');
                $('#ddlDepartmentNameFltr').append('<option value=' + this.department_id_pk + '>' + this.department_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
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
                $('#ddlUser').append('<option value=' + this.user_id_pk + '>' + this.user_name + '</option>');
                $('#ddlUserFltr').append('<option value=' + this.user_id_pk + '>' + this.user_name + ' - ' + this.email + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get Common Category Lists
function GetCommonCategory() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/GetServiceRequestTempleteCategory',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlCategory').html("").append('<option value="0">Select </option>');
            $('#ddlCategoryFltr').html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $('#ddlCategory').append('<option value=' + this.common_cat_id_pk + '>' + this.category_name + '</option>');
                $('#ddlCategoryFltr').append('<option value=' + this.common_cat_id_pk + '>' + this.category_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Sub Category Lists
function GetCommonSubCategory(common_cat_id_pk) { 
    var parm = {
        "common_cat_id_pk": common_cat_id_pk,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/GetServiceRequestTempleteSubCategory',
        success: function (data) {
            $("#ddlSubCategory").html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $("#ddlSubCategory").append('<option value=' + this.sub_category_id_pk + '>' + this.sub_category_name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//Get All Sub Title Lists
function GetTaskTempleteTitleList(sub_category_id_pk) {
    var parm = {
        "sub_category_id_pk": sub_category_id_pk,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/GetServiceRequestTempleteTitleList',
        success: function (data) {
            $("#ddlTitle").html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $("#ddlTitle").append('<option value=' + this.service_req_templete_id_pk + '>' + this.subject + '</option>'); 
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//Get Service Request Templete 
function GetServiceRequestTempleteByTitle(service_req_templete_id) { 
    var parm = {
        'service_req_templete_id_pk': service_req_templete_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/GetServiceRequestTempleteByTitle',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            var str = data.other_approver;
            var strarray = str.split(',');
            for (var i = 0; i < strarray.length; i++) {
              //  alert(strarray[i])
            }
           // alert(data.approval_required);
            $("#txtServiceReqStatus").val(data.approval_required)
            $("#ddlSupportOrgnisation").val(data.support_dep_id_pk).change();
            $("#ddlSupportGroupEdit").val(data.support_group_id_fk).change();
            $("#ddlClient").val(data.client_id_pk).change();
            $("#ddlAsset").val(data.asset_id_pk).change();
           // $("#ddlCategory").val(data.common_cat_id_pk).change();
            $("#ddlTechnicianEdit").val(data.admin_id).change().change();
            $("#txtContents").val(data.message);
            //$("#txtTempContent").html(data.message).text();
            $("#txtCatalogueDescription").val(data.catalogue_description);
            $("#ddlPurchaseRequired").val(data.is_purchase_required).change();
            $("#ddlApprovalRequired").val(data.approval_required).change();
            $("#txtCost").val(data.cost).text();
            $("#ddlClient").val(1).change();
           // $("#txtContents").val(data.message);
            $("#ddlPriority").val(data.priority_id_pk).change();
            $("#ddlLoggedVia").val(data.logged_via);
            $("#ddlDepartmentName").val(data.department_id_fk).change();
            $("#ddlUser").val(data.user_id_fk).change();
           // $("#ddlUrgency").val(data.urgency_id_fk).change();
          //  $("#ddlImpact").val(data.impact_id_fk).change();
            $("#ddlLocation").val(data.location_id_fk).change();
            if (data.is_send_email == 1) {
                $("#chkSEmailNotifi").prop('checked', true);
            } else {
                $("#chkSEmailNotifi").prop('checked', false);
            }
            if (data.is_send_message == 1) {
                $("#chkSSMSNotif").prop('checked', true);
            } else {
                $("#chkSSMSNotif").prop('checked', false);
            }
 
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Send Approver Mail When Service Request Created 
function SendMailToApprover(service_req_templete_id, servicereqid, subject, useremail) {
    var parm = {
        'service_req_templete_id_pk': service_req_templete_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/GetServiceRequestTempleteByTitle',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            //var names = 'Harry,John,Clark,Peter,Rohn,Alice';
            //var nameArr = names.split(',');
            //console.log(nameArr);
            var str = data.other_approver;
            var strarray = str.split(',');
            for (var i = 0; i < strarray.length; i++) {
               // alert(strarray[i])
                GetUserForSendEmailServiceRequestApporRej(strarray[i], servicereqid, subject, useremail);
                UpdateServiceRequestApprovalStatus(strarray[i], servicereqid);
            }
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Create New Service Request 
function InsServiceRequest() {
    var parm = {
        "subject": $("#ddlTitle option:selected").text(),
        "support_dep_id_pk": $("#ddlSupportOrgnisation option:selected").val().trim(),
        "support_group_id_fk": $("#ddlSupportGroup option:selected").val().trim(),
        "client_id_pk": $("#ddlClient option:selected").val().trim(),
        "asset_id_pk": $("#ddlAsset option:selected").val().trim(),
        "common_cat_id_pk": $("#ddlCategory option:selected").val().trim(),
        "asign_to": $("#ddlTechnician option:selected").val().trim(),
        "sub_category_id_pk": $("#ddlSubCategory option:selected").val().trim(),
        "message": $("#txtContents").val().trim(),
        "send_ticket_notification": $("#chkSNTN").is(":checked") == true ? 1 : 0,
        "priority_id_pk": $("#ddlPriority option:selected").val().trim(),
        "logged_via": $("#ddlLoggedVia option:selected").val().trim(),
        "department_id_fk": $("#ddlDepartmentName option:selected").val().trim(),
        "user_id_fk": $("#ddlUser option:selected").val().trim(),
        "urgency_id_fk": $("#ddlUrgency option:selected").val().trim(),
        "impact_id_fk": $("#ddlImpact option:selected").val().trim(),
        "location_id_fk": $("#ddlLocation option:selected").val().trim(),
        "ser_req_status_id_pk": $("#txtServiceReqStatus").val() == 2 ? 2 : 1,
        "is_send_message": $("#chkSSMSNotif").is(":checked") == true ? 1 : 0,
        "catalogue_description": $("#txtCatalogueDescription").val().trim(),
        "is_purchase_required": $("#ddlPurchaseRequired option:selected").val(),
        "approval_required": $("#ddlApprovalRequired option:selected").val(),
        "cost": $("#txtCost").val().trim(), 
        "is_sla_applicable": $("#SLAcbk").is(":checked") == true ? 0 : 1,
        "sub_location_id_fk": $("#ddlSubLocations option:selected").val(),
        "section_id_fk": $("#ddlSection option:selected").val(),
        "floor_id_fk": $("#ddlFloor option:selected").val(),
        "building_room_no": $("#txtBuildingAndRoomNo").val().trim(),
        "gate": $("#txtGate").val().trim(),
        "consultant_id_fk": $("#ddlConsultant option:selected").val(),
        "user_name": $("#txtUserName").val(),
        "user_con_no": $("#txtUserContactNumber").val(),
        "custom_field_s_no": $("#txtSerialNo").val(),
        "custom_field_make": $("#txtMake").val(),
        "custom_field_model": $("#txtModel").val(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/InsServiceRequest', 
        success: function (data) {
            if (data.status_id != 0) {
                InsServiceRequestReplyConversation(data.service_req_id_pk, $("#txtContents").val(), $.session.get("id"));
                GetUserForSendEmail($("#ddlUser option:selected").val(), data.service_req_id_pk, $("#ddlTitle option:selected").text());
               // SendMailToApprover($("#ddlTitle option:selected").val());
                SendMailToApprover($("#ddlTitle option:selected").val(), data.service_req_id_pk, $("#ddlTitle option:selected").text(), $("#ddlUser option:selected").text());
                successnotify(data.status);
                $("#ClrTicket").find("input").val("");
                $("#ClrTicket").find("select").val(0).change();
                GetServiceRequest();
                $("#closedModel").click();
            } else {
                // alert(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get Service Request Lists 
function GetServiceRequest() {
    var fdate = ''
    fdate = $('#txtFromDatefltr').val();
    var tdate = ''
    tdate = $('#txtToDatefltr').val();
    var location = null
    $("#ddlLocationFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            location = $(this).val();
        }
       // alert(location);
    });
    var loggedvia = null
    $("#ddlLoggedViaFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            loggedvia = $(this).val();
        }
    });
    var user = null
    $("#ddlUserFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            user = $(this).val();
        }
    });
    var status = null
    $("#ddlStatusFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            status = $(this).val();
        }
    });
    var client = null
    $("#ddlClientFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            client = $(this).val();
        }
    });
    var department = null
    $("#ddlDepartmentNameFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            department = $(this).val();
          //  alert(department);
        }
    });
    var priority = null
    $("#ddlPriorityFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            priority = $(this).val();
        }
    });
    var category = null
    $("#ddlCategoryFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            category = $(this).val();
        }
    });
    var subcategory = null
    $("#ddlSubCategoryFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            subcategory = $(this).val();
        }
    });
    var resolutionsla = null
    $("#ddlResolutionSLAFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            resolutionsla = $(this).val();
        }
    });
    var pendingcategory = null
    $("#ddlPendingCategoryFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            pendingcategory = $(this).val();
        }
    });
    var pendingreason = null
    $("#ddlPendingReasonFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            pendingreason = $(this).val();
        }
    });
    var assetcategory = null
    $("#ddlAssetCategoryFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            pendingreason = $(this).val();
        }
    });
    var parm = {
        'from_date': fdate,
        'to_date': tdate,
        'location_id': location,
        'logged_via': loggedvia,
        'user_id': user,
        'status': status,
        'client_id': client,
        'department_id': department,
        'priority_id': priority,
        'common_cat_id': category,
        'sub_category_id': subcategory,
        'resolution_sla': resolutionsla,
        'pending_reason_id_fk': pendingcategory,
        'pending_category_id': pendingreason ,
        'asset_category_id_fk': assetcategory
    };

            var josnstr = JSON.stringify(parm);
            $.ajax({
                type: "Post",
                url: 'http://playmediahouse.com/api/api/ServiceRequests/GetServiceRequest',
                contentType: "application/json; charset=utf-8",
                data: josnstr,
                dataType: "json",
                success: function (data) {


            //alert(data.status);
            var table;
            if ($.fn.dataTable.isDataTable('#tblServiceRequest')) {
                table = $('#tblServiceRequest').DataTable();
            } else {
                table = $('#tblServiceRequest').DataTable();
            }
            table.destroy();
            $("#tblServiceRequest").DataTable({
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
                        data: 'service_req_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (service_req_id_pk) {
                            return '<input id="check" class="cb-element servcbk" name="' + service_req_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },

                    {
                        data: 'service_req_id_pk', render: function (service_req_id_pk, type, row) {
                            //  return row.ticket_id_pk + ' ' + row.prefix;
                           // return '<a href="/ServiceRequests/ServiceRequestsDetails" class="editview"  name="' + service_req_id_pk + '">' + row.prefix + + row.service_req_id_pk + '</a>';

                            if (row.priority_id_pk === 1) {
                                return ' <a href="/Admin/ServiceRequests/ServiceRequestsDetails" title="Severity-1" class="editview"  name="' + service_req_id_pk + '"> <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Severity-1" style="color:#ea2d2d !important" title="Normal priority" data-original-title="Normal priority"></i> &nbsp; <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp;' + row.prefix + + row.service_req_id_pk + ' </a>';
                                // return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + status + '">' + status + '</span>';
                            }
                            else if (row.priority_id_pk === 2) {
                                return ' <a href="/Admin/ServiceRequests/ServiceRequestsDetails" title="Severity-2" class="editview"  name="' + service_req_id_pk + '"><i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Severity-2" style="color:#f1a008 !important" title="Normal priority" data-original-title="Normal priority"></i> &nbsp; <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp;' + row.prefix + + row.service_req_id_pk + '</a>';
                                // return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (row.priority_id_pk === 3) {
                                return ' <a href="/Admin/ServiceRequests/ServiceRequestsDetails" title="Severity-3" class="editview"  name="' + service_req_id_pk + '"> <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Severity-3" style="color:#ffc107 !important" data-original-title="Normal priority"></i>  &nbsp; <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp;' + row.prefix + + row.service_req_id_pk + '</a>';
                                // return '<span class="badge badge-primary ENABLED" style="background-color:#b3ae1f;" name="' + status + '">' + status + '</span>';
                            }
                            else if (row.priority_id_pk === 4) {
                                return ' <a href="/Admin/ServiceRequests/ServiceRequestsDetails" title="Severity-4" class="editview"  name="' + service_req_id_pk + '"> <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Severity-4" style="color:#067304ad  !important" data-original-title="Normal priority"></i>  &nbsp;  <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp;' + row.prefix + + row.service_req_id_pk + '</a>';
                                //  return '<span class="badge badge-primary ENABLED" style="background-color:#3bc0c3 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (row.priority_id_pk === 0) {
                                return ' <a href="/Admin/ServiceRequests/ServiceRequestsDetails" title="Not Assigned" class="editview"  name="' + service_req_id_pk + '"> <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Not Assigned" style="color:#adb1b3  !important" data-original-title="Normal priority"></i>   &nbsp;  <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp; ' + row.prefix + + row.service_req_id_pk + '</a>';
                                //  return '<span class="badge badge-primary ENABLED" style="background-color:#3bc0c3 !important;" name="' + status + '">' + status + '</span>';
                            }
                        }
                    },
                    { data: 'subject' },
                    { data: 'department_name', "visible": false },
                    { data: 'LOCATION', "visible": false },
                    { data: 'ASSIGNED_ENGINEER', "visible": false },
                    { data: 'USER_CONTACT_NUMBER', "visible": false },
                    { data: 'USER_EMAIL', "visible": false },
                    { data: 'RESLOVED_DATE', "visible": false },
                    { data: 'PRIORITY', "visible": false },
                    { data: 'SUPPORT_DEPARTMENT', "visible": false },
                    { data: 'SUPPORT_DEPARTMENT_GROUP', "visible": false },
                    { data: 'CATEGORY', "visible": false },
                    { data: 'SUB_CATEGORY', "visible": false },
                    {
                        data: 'consultant_id_fk', render: function (consultant_id_fk, type, row) {
                            return '<a href="#" class="consultant"  name="' + consultant_id_fk + '"  data-toggle="modal" data-target="#myModalConsultant"> <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i>  &nbsp;' + row.consultant_name + '  </a>';
                        }
                    },
                    {
                         data: 'email',
                        sWidth: '140px',
                        sClass: "view",
                        bSortable: false,
                         render: function (email) {
                             return '<a href="#" class="adminviewsubmitter"  name="' + email + '" data-toggle="modal" data-target="#myModalSubmitter" ><i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf  !important" data-original-title="Normal priority"></i>  &nbsp;' + email + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'name',
                        sWidth: '140px',
                        sClass: "view",
                        bSortable: false,
                        render: function (name) {
                            return '<a href="#" class="adminview"  name="' + name + '" data-toggle="modal" data-target="#myModal" ><i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf  !important" data-original-title="Normal priority"></i>  &nbsp;' + name + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    {
                        "data": "created_date",
                        "type": "date",
                        "render":
                            function (data, type, full) {
                                return (data) ? moment(data).format('DD/MM/YYYY  -  HH:mm:ss') : '';
                            }
                    },
                    {
                        data: 'service_req_id_pk', render: function (service_req_id_pk, type, row) {
                            if (row.is_sla_applicable == 0) {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + row.non_negative + '">' + 'N/A' + '</span>';
                            }
                            var duecheck = false;
                            var str1 = row.non_negative;
                            var str2 = "-";
                            if (str1 != null && str1.indexOf(str2) != -1) {
                                duecheck = true;
                            }
                            if (duecheck == true) {
                                if (row.SlaStatus == "Pause") {
                                    return '<i class="fa fa-pause" aria-hidden="true"></i>  &nbsp;&nbsp;&nbsp;<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + row.non_negative + '">' + row.non_negative + '  OverDue' + '</span> ';
                                } else if (row.SlaStatus == "Running") {
                                    return '<i class="fa fa-play" aria-hidden="true"> </i>  &nbsp;&nbsp;&nbsp;<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d !important;" name="' + row.non_negative + '">' + row.non_negative + '  Remaining' + '</span> ';
                                }
                                // return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + row.non_negative + '">' + row.non_negative + '  OverDue' + '</span> <i class="fa fa-pause" aria-hidden="true"></i>';
                            } else if (parseFloat(row.non_negative) < 0) {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + row.non_negative + '">' + row.non_negative + '  OverDue' + '</span> </i>';
                            }
                            else if (row.non_negative == null) {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#029800;" name="' + row.non_negative + '">' + row.non_negative + '</span>';
                            } else {
                                if (row.SlaStatus == "Running") {
                                    return '<i class="fa fa-play" aria-hidden="true"></i> &nbsp;&nbsp;&nbsp;<span class="badge badge-primary ENABLED" style="background-color:#029800;" name="' + row.non_negative + '">' + row.non_negative + 'Remaining' + '</span> ';
                                } else if (row.SlaStatus == "Pause") {
                                    return '<i class="fa fa-pause" aria-hidden="true"> </i> &nbsp;&nbsp;&nbsp; <span class="badge badge-primary ENABLED" style="background-color:#ea2d2d !important;" name="' + row.non_negative + '">' + row.non_negative + '  Remaining' + '</span> ';
                                }
                            }
                        }
                    },
                    //{
                    //    data: 'service_req_id_pk', render: function (service_req_id_pk, type, row) {
                    //        if (parseFloat(row.non_negative) < 0) {
                    //            if (row.SlaStatus == "Running") {
                    //                return '<i class="fa fa-pause" aria-hidden="true"></i> &nbsp;&nbsp;&nbsp;<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + row.non_negative + '">' + row.non_negative + '  OverDue' + '</span> ';
                    //            } else if (row.SlaStatus == "Pause") {
                    //                return '<i class="fa fa-play" aria-hidden="true"> </i> &nbsp;&nbsp;&nbsp;<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d !important;" name="' + row.non_negative + '">' + row.non_negative + '  Remaining' + '</span> ';
                    //            }
                    //            // return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + row.non_negative + '">' + row.non_negative + '  OverDue' + '</span> <i class="fa fa-pause" aria-hidden="true"></i>';
                    //        } else if (parseFloat(row.non_negative) < 0) {
                    //            return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + row.non_negative + '">' + row.non_negative + '  OverDue' + '</span> </i>';
                    //        }
                    //        else if (row.non_negative == null) {
                    //            return '<span class="badge badge-primary ENABLED" style="background-color:#029800;" name="' + row.non_negative + '">' + row.non_negative + '</span>';
                    //        } else {
                    //            if (row.SlaStatus == "Running") {
                    //                return '<i class="fa fa-pause" aria-hidden="true"></i> &nbsp;&nbsp;&nbsp;<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + row.non_negative + '">' + row.non_negative + '  OverDue' + '</span> ';
                    //            } else if (row.SlaStatus == "Pause") {
                    //                return '<i class="fa fa-play" aria-hidden="true"> </i> &nbsp;&nbsp;&nbsp;<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + row.non_negative + '">' + row.non_negative + '  Remaining' + '</span> ';
                    //            }
                    //        }
                    //    }
                    //},
                    {
                        data: "status",
                        render: function (status) {
                            // Check if blank
                            if (status == "On Hold") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status == "Approval Pending") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Provisioning") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#b3ae1f;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Assigned") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#3bc0c3 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "In Progress") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#de7b00;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "On Hold") {
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Cancelled") {
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Rejected") {
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Resolved") {
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Closed") {
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "New") {
                                return '<span class="badge badge-primary" style="background-color:#ea2d2d  !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Waiting for Update") {
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Approved") {
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Reopened") {
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                           
						   }
                    },
                    { data: 'sub_location' },
                    { data: 'gate' },
                    { data: 'floor_name' },
                    { data: 'section_name' },
                    { data: 'building_room_no' },
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
function GetAdminDetailsSubmitter(name) {
    var parm = {
        "user_name": name
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/GetSubmitterDetails',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: josnstr,
        success: function (data) {
            $("#tbodyEmployeeDetailsSubmitter").html('');
            $(data).each(function () {
                $("#tbodyEmployeeDetailsSubmitter").append("<tr><td>" + this.user_id_pk + "</td><td>" + this.email + "</td><td>" + this.user_name + "</td><td>" + this.mobile_no + "</td><td>" + this.title + "</td></tr>");
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
function GetAdminDetails(name) {
    var parm = {
        "name": name
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/GetAdminDetails',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: josnstr,
        success: function (data) {
            $("#tbodyEmployeeDetails").html('');
            $(data).each(function () {
                $("#tbodyEmployeeDetails").append("<tr><td>" + this.id + "</td><td>" + this.email + "</td><td>" + this.name + "</td><td>" + this.mobile + "</td><td>" + this.title + "</td></tr>");
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
function DeleteServiceReq(service_req_id) {
    var parm = {
        "service_req_id_pk": service_req_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/DeleteServiceReqByID', 
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetTicketLists();

            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};
//Get SERVICE REQUEST STATUS List
function GetServiceReqStatusLists() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/GetServiceReqStatusLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          //  $("#ddlServiceReqStatus").html("").append('<option value="0">Select Status</option>');
            $("#ddlStatusFltr").html("").append('<option value="0">Select Status</option>');
            $(data).each(function () {
          //      $('#ddlServiceReqStatus').append('<option value=' + this.ser_req_status_id_pk + '>' + this.ser_req_status + '</option>'); 
                $('#ddlStatusFltr').append('<option value=' + this.ser_req_status_id_pk + '>' + this.ser_req_status + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get Ticket Status Condition Wise 
function GetServiceReqStatusListsConditionWise(service_req_id) {
    var parm = {
        "service_req_id_pk": service_req_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/GetServiceReqStatusListsConditionWise', 
        success: function (data) {
            $("#ddlServiceReqStatus").html("").append('<option value="0">Select Status</option>');
            $(data).each(function () {
                $('#ddlServiceReqStatus').append('<option value=' + this.ser_req_status_id_pk + '>' + this.ser_req_status + '</option>'); 
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Update Tickets Status  
function UpdateServiceRequestStatus(service_req_id) {  
    var parm = {
        "service_req_id_pk": service_req_id,
        "ser_req_status_id_pk": $("#ddlServiceReqStatus option:selected").val().trim(),
        "pending_category_id": $("#ddlPending option:selected").val().trim(),
        "pending_reason_id_fk": $("#ddlPendingReason option:selected").val().trim(),
        "supplier_id_fk": $("#ddlVendor option:selected").val().trim(),
        "pending_remarks": $("#txtCommentBox").val().trim(),
        "closer_id_fk": $("#ddlCloderCode option:selected").val().trim()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/UpdateServiceRequestStatus',
        success: function (data) {
            if (data.status_id == 1) {
                CreateSuccess(data.status);
                 $("#closedModelChangeStatus").click();
                 $("#ClrSerRequestChangeStatus").find("input").val("");
                 $("#ClrSerRequestChangeStatus").find("select").val(0).change();
                GetServiceRequest();
                if (data.ser_req_status_id_pk == 9) {
                    SendEmailChangeServiceRequestStatusAprooved(data.service_req_id_pk);
                } else {
                    SendEmailChangeServiceRequest(data.service_req_id_pk);
                }
            } else {
                CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Update Service Request Asign Admin   
function UpdateServiceRequestAsignTo(service_req_id) {
    var parm = {
        "service_req_id_pk": service_req_id,
        "asign_to": $("#ddlUserList option:selected").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/UpdateServiceRequestAsignTo',
        success: function (data) {
            if (data.status_id != 0) {
                GetServiceRequest();
                CreateSuccess(data.status);
                $("#ClrSerRequestAssign").find("input").val("");
                $("#ClrSerRequestAssign").find("select").val(0).change();
                $("#closedModelAssign").click();
            } else {
                CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Update Service Request Asign Admin   
function UpdateServiceRequestAsignToChangeStatus(service_req_id) { 
    var parm = {
        "service_req_id_pk": service_req_id,
        "asign_to": $("#ddlUserListStatus option:selected").val().trim()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/UpdateServiceRequestAsignTo',
        success: function (data) {
            if (data.status_id != 0) {
                GetServiceRequest();
                CreateSuccess(data.status);
                $("#ClrSerRequestAssign").find("input").val("");
                $("#ClrSerRequestAssign").find("select").val(0).change();
                $("#closedModelAssign").click();
            } else {
                CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// View Workload
function GetViewWorkloadList() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Commonapi/GetViewWorkloadList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#tbodyViewWorkLoad").html('');
            $(data).each(function () {
                $("#tbodyViewWorkLoad").append("<tr><td>" + this.name + "</td><td>" + this.incidents + "</td><td>" + this.service_request + "</td><td>" + this.total + "</td></tr>");
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
function GetServiceRequestAllDetails(service_req_id) {
    var parm = {
        'service_req_id_pk': service_req_id   // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/GetServiceRequestAllDetails',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            //alert(data.mapping_priority_id_pk);
            $("#txtTitle").val(data.subject).text();
            $("#ddlSupportOrgnisation").val(data.support_dep_id_pk).change();
            $("#ddlSupportGroup").val(data.support_group_id_fk).change();
            $("#ddlClient").val(data.client_id_pk).change();
            $("#ddlTechnician").val(data.asign_to).change().change();
            $("#txtContents").val(data.message);
            //$("#txtTempContent").html(data.message).text();
            $("#txtCost").val(data.cost);
            $("#ddlPriority").val(data.priority_id_pk).change();
            $("#ddlLoggedVia").val(data.logged_via).change();
            $("#ddlDepartmentName").val(data.department_id_fk).change();
            $("#ddlUser").val(data.user_id_fk).change();
            $("#ddlPurchaseRequired").val(data.is_purchase_required).change();
            $("#ddlApprovalRequired").val(data.approval_required).change();
            $("#ddlSubLocations").val(data.sub_location_id_fk).change();
            $("#ddlSection").val(data.section_id_fk).change();
            $("#ddlFloor").val(data.floor_id_fk).change();
            $("#txtBuildingAndRoomNo").val(data.building_room_no);
            $("#txtGate").val(data.gate);
            $("#ddlConsultant").val(data.consultant_id_fk).change();
            $("#txtUserName").val(data.user_name);
            $("#txtUserContactNumber").val(data.user_con_no);
            $("#ddlLocation").val(data.location_id_fk).change();
            if (data.is_send_email == 1) {
                $("#chkSEmailNotifi").prop('checked', true);
            } else {
                $("#chkSEmailNotifi").prop('checked', false);
            }
            if (data.is_send_message == 1) {
                $("#chkSSMSNotif").prop('checked', true);
            } else {
                $("#chkSSMSNotif").prop('checked', false);
            }
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
            $('#ddlLocationFltr').html("").append('<option value="0">Select Location</option>');
            $('#ddlLocationEdit').html("").append('<option value="0">Select Location</option>');
          //  $('#ddlLocation').html("").append('<option value="0">Select Location</option>');
            $(data).each(function () {
                $('#ddlLocation').append('<option value=' + this.location_id_pk + '>' + this.location_name + '</option>');
                $('#ddlLocationEdit').append('<option value=' + this.location_id_pk + '>' + this.location_name + '</option>');
                $('#ddlLocationFltr').append('<option value=' + this.location_id_pk + '>' + this.location_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Priority List
function GetPriority() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/SLA/GetPriorityList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlPriority").html("").append('<option value="0">Select Priority</option>');
            $("#ddlPriorityFltr").html("").append('<option value="0">Select Priority</option>');
            $(data).each(function () {
                if (this.priority_id_pk == 4) {
                    $('#ddlPriority').append('<option selected value=' + this.priority_id_pk + '>' + this.priority_name + '</option>');
                }
                else {
                    $('#ddlPriority').append('<option value=' + this.priority_id_pk + '>' + this.priority_name + '</option>');
                }
                $('#ddlPriorityFltr').append('<option value=' + this.priority_id_pk + '>' + this.priority_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Support Group Department 
function GetSupportGroupEdit() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Masters/GetSupportGroup',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(data).each(function () {
                $('#ddlSupportGroupEdit').append('<option value=' + this.support_group_id_pk + '>' + this.support_dep_group_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All  Impact List For Edit
function GetImpactListForedit() { 
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/SLA/GetImpactListForEdit',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlImpact").html("").append('<option value="0">Select Impact</option>');
            $(data).each(function () {
                $('#ddlImpact').append('<option value=' + this.impact_id_pk + '>' + this.impact_name + '</option>'); 
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Sub Category List 
function GetAllSubCategory() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Masters/GetAllSubCategory',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlSubCategoryFltr").html("").append('<option value="0">Select Technician</option>');
            $(data).each(function () {
                $('#ddlSubCategoryFltr').append('<option value=' + this.sub_category_id_pk + '>' + this.sub_category_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Update Service Request
function UpdServiceRequest(service_req_id) {
    var parm = {
        "service_req_id_pk": service_req_id,
        "subject": $("#txtTitle").val().trim(),
        "support_dep_id_pk": $("#ddlSupportOrgnisation option:selected").val().trim(),
        "support_group_id_fk": $("#ddlSupportGroup option:selected").val().trim(),
        "client_id_pk": $("#ddlClient option:selected").val().trim(),
        "asset_id_pk": $("#ddlAsset option:selected").val().trim(),
        "common_cat_id_pk": $("#ddlCategory option:selected").val().trim(),
        "asign_to": $("#ddlTechnician option:selected").val().trim(),
        "sub_category_id_pk": $("#ddlSubCategory option:selected").val().trim(),
        "message": $("#txtContents").val(),
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
        "catalogue_description": $("#txtCatalogueDescription").val().trim(),
        "is_purchase_required": $("#ddlPurchaseRequired option:selected").val().trim(),
        "approval_required": $("#ddlApprovalRequired option:selected").val(),
        "cost": $("#txtCost").val().trim(),
        "is_sla_applicable": $("#SLAcbk").is(":checked") == true ? 0 : 1,
        "sub_location_id_fk": $("#ddlSubLocations option:selected").val(),
        "section_id_fk": $("#ddlSection option:selected").val(),
        "floor_id_fk": $("#ddlFloor option:selected").val(),
        "building_room_no": $("#txtBuildingAndRoomNo").val().trim(),
        "gate": $("#txtGate").val().trim(),
        "consultant_id_fk": $("#ddlConsultant option:selected").val(),
        "user_name": $("#txtUserName").val(),
        "user_con_no": $("#txtUserContactNumber").val()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/UpdServiceRequest',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                CreateSuccess(data.status);
                $('#closedModel').click();
            } else {
                CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Not Update data");
        }
    });
};
// insert Service Request reply Conversation  
function InsServiceRequestReplyConversation(ser_req_id, reply_description, technician_id) {
    var parm = {
        "ser_req_id_fk": ser_req_id,
        "reply_description": reply_description,
        "technician_id_fk": technician_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/InsServiceRequestReplyConversation',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                CreateSuccess(data.status);
            } else {
                CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Not Update data");
        }
    });
};
//User Send Email
function GetUserForSendEmail(user_id_pk, servicereqid, Subject) {
    var parm = {
        'user_id_pk': user_id_pk // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Staff/GetUserForSendEmail',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            SendNewServiceRequestCreate(data.email, 'SR000' + '' + servicereqid, Subject, 'Service Request Status :  New ')
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Send Email Change Service Request Status
function SendEmailChangeServiceRequest(service_req_id_pk) {
    var parm = {
        'service_req_id_pk': service_req_id_pk // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/SendEmailChangeServiceRequest',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            //SendEmailTicketCreate(data.email, data.ticket_id_pk, data.ticket_status, data.user_name, '07/10/2019', data.mobile_no)
            SendServiceRequestChangeStatus(data.email, data.prefix + '' + data.service_req_id_pk, data.subject, data.status)
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Send Email Change Service Request Status Aprooved 
function SendEmailChangeServiceRequestStatusAprooved(service_req_id_pk) { 
    var parm = {
        'service_req_id_pk': service_req_id_pk // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/SendEmailChangeServiceRequest',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            //SendEmailTicketCreate(data.email, data.ticket_id_pk, data.ticket_status, data.user_name, '07/10/2019', data.mobile_no)
            SendServiceRequestChangeStatusAprooved(data.email, data.prefix + '' + data.service_req_id_pk, data.subject, data.status, 'http://10.96.62.58/Admin/ServiceRequests/ServiceRequestFeedBackForm?ServiceReqID='+ data.service_req_id_pk +'')
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Approver Send Email For Service Request Approve or Reject
function GetUserForSendEmailServiceRequestApporRej(user_id_pk,servicereqid,subject,useremail) {
    var parm = {
        'user_id_pk': user_id_pk // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Staff/GetUserForSendEmail',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
          //  SendServiceRequestChangeStatusAproovedOrRejected(data.email, 'SR000' + '' + servicereqid, subject, useremail, 'http://localhost:49829/Document/ServiceRequestApprove?ServiceReqID=' + servicereqid + ' ', 'http://localhost:49829/Document/ServiceRequestReject?ServiceReqID=' + servicereqid + '')
            SendServiceRequestChangeStatusAproovedOrRejected(data.email, 'SR000' + '' + servicereqid, subject, useremail, 'http://10.96.62.58/Admin/Document/ServiceRequestApprove?ServiceReqID=' + servicereqid + '&ApproverID=' + user_id_pk + '', 'http://10.96.62.58/Admin/Document/ServiceRequestReject?ServiceReqID=' + servicereqid + '&ApproverID=' + user_id_pk + '')
     
            // SendNewServiceRequestCreate(data.email, 'SR000' + '' + servicereqid, Subject, 'Service Request Status :  New ')
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get Closer Code Lists
function GetCloserCode() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Ticket/GetCloserCode',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#ddlCloderCode').html("").append('<option value="0">Select Closer Code</option>');
            $(data).each(function () {
                $('#ddlCloderCode').append('<option value=' + this.closer_id_pk + '>' + this.closer_code + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Supplier (Vendor) Lists
function GetSupplierDetails() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Supplier/GetSupplierDetails',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlVendor').html("").append('<option value="0">Select Vendor</option>');
            $(data).each(function () {
                $('#ddlVendor').append('<option value=' + this.supplier_id_pk + '>' + this.supplier_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get Pending Reason Lists
function GetPendingReason() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Masters/GetPendingReason',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlPendingReason').html("").append('<option value="0">Select Pending Reason</option>');
            $('#ddlPendingReasonFltr').html("").append('<option value="0">Select Pending Reason</option>');
            $(data).each(function () {
                $('#ddlPendingReason').append('<option value=' + this.pending_reason_id_pk + '>' + this.pending_reason_name + '</option>');
                $('#ddlPendingReasonFltr').append('<option value=' + this.pending_reason_id_pk + '>' + this.pending_reason_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Update Service Request Approval Status Status  
function UpdateServiceRequestApprovalStatus(approver_id, service_req_id) {
    var parm = {
        "approver_id_pk": approver_id,
        "ser_req_approval_status": 0,
        "service_req_id_fk": service_req_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/UpdateServiceRequestApprovalStatus',
        success: function (data) {
            if (data.status_id == 1) {
            } else {
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//Get Common Category Lists
function GetAssetCategory() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetCategory',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlAssetCategoryFltr').html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $('#ddlAssetCategoryFltr').append('<option value=' + this.asset_category_id_pk + '>' + this.asset_cat_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Sub Location Lists
function GetSubLocation() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Masters/GetSubLocation',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlSubLocations').html("").append('<option value="0">Select Building</option>');
            $(data).each(function () {
                $('#ddlSubLocations').append('<option value=' + this.sub_location_id_pk + '>' + this.sub_location + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Section Lists
function GetSectionDepartmentWise(department_id) {
    var parm = {
        "department_id_fk": department_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/GetSectionDepartmentWise',
        success: function (data) {
            $("#ddlSection").html("").append('<option value="0">Select Section</option>');
            $(data).each(function () {
                $("#ddlSection").append('<option value=' + this.section_id_pk + '>' + this.section_name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
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
//Get Consultant According To Department  
function GetConsultantName(department_id) {
    var parm = {
        "department_id_fk": department_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/GetConsultantName',
        success: function (data) {
            $('#ddlConsultant').html("").append('<option value="0">Select Consultant</option>');
            $(data).each(function () {
                $('#ddlConsultant').append('<option value=' + this.consultant_id_pk + '>' + this.consultant_name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
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
function GetConsultantDetails(consultant_id) {
    var parm = {
        "consultant_id_pk": consultant_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Ticket/GetConsultantDetails',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: josnstr,
        success: function (data) {
            $("#tbodyConsultant").html('');
            $(data).each(function () {
                $("#tbodyConsultant").append("<tr><td>" + this.consultant_name + "</td><td>" + this.consultant_email + "</td><td>" + this.consultant_contact_no + "</td></tr>");
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
// Get Asset Details For Edit
function GetAssetDetailsEdit(asset_id) {
    var parm = {
        'asset_id_pk': asset_id// $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetDetails',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#ddlDepartmentName").val(data.department_id_fk).change();
            $("#ddlSupportType").val(data.support_type).change();
            $("#ddlSection").val(data.section_id_fk).change();
            $("#ddlSubLocations").val(data.sub_location_id_fk).change();
            $("#ddlFloor").val(data.floor_id_fk).change();
            $("#txtBuildingAndRoomNo").val(data.building_room_no);
            $("#txtSerialNo").val(data.serial_number);
            $("#txtMake").val(data.asset_name);
            $("#txtModel").val(data.model_name);

        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
