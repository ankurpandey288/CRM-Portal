$(document).ready(function () {
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
     GetLocation();
     GetReasonForChange();
     GetEmployees();
     GetCommonCategory();
     GetStatus();
     GetChangeType();
    // GetImpact();
    GetPriority();
    GetRisk();
    GetSupportDepartment();
    GetChangeMagementList();
    GetClientLists();
    GetEmployeesLists();
    GetAsignLists();
    GetAssetList();
    GetUrgency();
    GetDepartmentLists();
    GetUser();
    GetChangeManagementStatusLists();
    GetAllSubCategory();
    $(document).on('click', '.cb-element', function () {
        if ($(this).is(':checked')) {
            $("#btnAssignTo").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#btnEditCha").removeAttr("disabled");
            
        } else if (!$(this).is(':checked')) {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#btnEditCha").attr("disabled", "disabled");
        }
        else {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#btnEditCha").attr("disabled", "disabled");
        }

    });
    $("#CheckAll").click(function () {
        if ($(this).is(':checked')) {
            $("#btnAssignTo").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#btnEditCha").attr("disabled", "disabled");
        }
        else {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#btnEditCha").attr("disabled", "disabled");
        }
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $("#ddlSupportOrgnisation").change(function () {
        if ($(this).val() != 0) {
            GetSupportGroup($(this).val());
        } else {
            $("#ddlSupportGroup").html("").append('<option value="0">Select Support Group</option>');
        }
    });
    $("#btnSubmit").click(function () {
        if (validateActiveChanges() == true) {
            InsChangeManagement();
        } else {
            return false;
        }
    });
    $("#ddlCategory").change(function () {
        if ($(this).val() != 0) {
            GetCommonSubCategory($(this).val());
        } else {
            $("#ddlSubCategory").html("").append('<option value="0">Select Sub Category</option>');
        }
    });
    $(document).on('click', '.editview', function () {
        if ($.session.get("change_category_id_pk") != '' || $.session.get("change_category_id_pk") != null || $.session.get("change_category_id_pk") == undefined) {
            $.session.remove("change_category_id_pk");
            $.session.set("change_category_id_pk", $(this).attr("name"));
          //  window.open('/Changes/ChangesRecords');
        } 
    });
    $('#btnStatusUpdate').click(function () {
        var val = [];
        $('.cmcbk:checked').each(function (i) {
            val[i] = $(this).val();
            UpdateChangeManagementStatus($(this).attr('name'));
            //$(".cb-element").prop("checked", false);
        });
    });
    $('#BtnDelete').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            deleteChanges($(this).attr('name'));
        });
    });
    $("#ddlSupportGroup").change(function () {
        if ($(this).val() != 0) {
            GetEmployeeListSGD($(this).val());
        } else {
            $("#ddlAssignTo").html("").append('<option value="0">Select Employee</option>');
        }
    });
    $("#ddlUrgency").change(function () {
        if ($(this).val() != 0) {
            GetImpact($(this).val());
        } else {
            $("#ddlImpact").html("").append('<option value="0">Select</option>');
        }
    });
    $("#ddlImpact").change(function () {
        if ($(this).val() != 0) {
            GetPriorityList($(this).val());
        } else {
            $("#ddlPriority").html("").append('<option value="0">Select</option>');
        }
    });
    $("#ddlSupportOrgnisationAsgn").change(function () {
        if ($(this).val() != 0) {
            GetSupportGroup($(this).val());
        } else {
            $("#ddlSupportGroupAsgn").html("").append('<option value="0">Select Support Group</option>');
        }
    });
    $("#ddlSupportGroupAsgn").change(function () {
        if ($(this).val() != 0) {
            GetEmployeeListSGD($(this).val());
        } else {
            $("#ddlUserList").html("").append('<option value="0">Select </option>');
        }
    });
    $('#btnAsignToUpdate').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            UpdateChangeManagementAsignTo($(this).attr('name'));
        });
    });
    $(document).on('click', '.adminview', function () {
        GetAdminDetails($(this).attr("name"));
    });
    $(document).on('click', '.adminviewsubmitter', function () {
        GetAdminDetailsSubmitter($(this).attr("name"));
    });
    $('#btnEditCha').click(function () {
        var val = [];
        $('.cmcbk:checked').each(function (i) {
            val[i] = $(this).val();
            GetChangeManagementAllDetails($(this).attr('name'));
        });
        $('.select2').select2(
            { dropdownParent: $('#myModalNew') }
        );
        $("#myModalLabelNew").hide(); $("#myModalLabelEdit").show();
        $("#btnSubmit").hide(); $("#btnUpdate").show();
    });
    $('#btnUpdate').click(function () {
        var val = [];
        $('.cmcbk:checked').each(function (i) {
            val[i] = $(this).val();
            UpdChangeManagement($(this).attr('name'));
        });
    });
    $("#btnNew").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModalNew') }
        );
    });
    $("#btnAssignTo").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModalAsignTo') }
        );
    });
    $("#btnChangeStatus").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModalChangeStatus') }
        );
    });
    $("#btnFilter").click(function () {
        GetChangeMagementList();
    });
    
});
function validateActiveChanges() { 
    var return_val = true;
    if ($('#txtSubject').val().trim() == "" || $('#txtSubject').val() == null) {
        $('#SpnSubject').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnSubject').hide();
    }
    if ($('#ddlReason option:selected').val() == 0) {
        $('#SpnReason').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnReason').hide();
    }
    if ($('#ddlUser option:selected').val() == 0) {
        $('#SpnUser').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnUser').hide();
    }
    if ($('#ddlDepartmentName option:selected').val() == 0) {
        $('#SpnDepartmentName').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnDepartmentName').hide();
    }
    if ($('#ddlUrgency option:selected').val() == 0) {
        $('#SpnUrgency').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnUrgency').hide();
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
    if ($('#ddlChange option:selected').val() == 0) {
        $('#SpnChange').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnChange').hide();
    }
    if ($('#ddlChangeRequester option:selected').val() == 0) {
        $('#SpnChangeRequester').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnChangeRequester').hide();
    }
    if ($('#ddlStatus option:selected').val() == 0) {
        $('#SpnStatus').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnStatus').hide();
    }
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
    if ($('#ddlChangeOwner option:selected').val() == 0) {
        $('#SpnChangeOwner').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnChangeOwner').hide();
    }
    if ($('#ddlChangeManager option:selected').val() == 0) {
        $('#SpnChangeManager').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnChangeManager').hide();
    }
    if ($('#ddlStage option:selected').val() == 0) {
        $('#SpnStage').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnStage').hide();
    }
    if ($('#ddlImpact option:selected').val() == 0) {
        $('#SpnImpact').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnImpact').hide();
    }
    if ($('#ddlPriority option:selected').val() == 0) {
        $('#SpnPriority').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnPriority').hide();
    }
    if ($('#ddlRisk option:selected').val() == 0) {
        $('#SpnRisk').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnRisk').hide();
    }
    if ($('#ddlAsset option:selected').val() == 0) {
        $('#SpnAsset').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnAsset').hide();
    }  
    if ($('#txtDueDate').val().trim() == "" || $('#txtDueDate').val() == null) {
        $('#SpntxtDueDate').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpntxtDueDate').hide();
    }
    if ($('#txtPlannedStartTime').val().trim() == "" || $('#txtPlannedStartTime').val() == null) {
        $('#SpnPlannedStartTime').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnPlannedStartTime').hide();
    }
    if ($('#txtPlannedEndTime').val().trim() == "" || $('#txtPlannedEndTime').val() == null) {
        $('#SpnPlannedEndTime').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnPlannedEndTime').hide();
    }
    if ($('#ddlAssignedTo option:selected').val() == 0) {
        $('#SpnAssignedTo').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnAssignedTo').hide();
    }
    if ($('#ddlReviewer option:selected').val() == 0) {
        $('#SpnReviewer').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnReviewer').hide();
    }
    if ($('#ddlChangeApprover option:selected').val() == 0) {
        $('#SpnChangeApprover').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnChangeApprover').hide();
    }
    if ($('#ddlCommunication option:selected').val() == 0) {
        $('#SpnCommunication').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnCommunication').hide();
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
//Get All Reason For Lists
function GetReasonForChange() { 
   
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Change/GetReasonForChange',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
           
            $('#ddlReason').html("").append('<option value="0">Select Reason For Change</option>');
            $(data).each(function () {
                $('#ddlReason').append('<option value=' + this.reason_id_pk + '>' + this.reason_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Change Type Lists
function GetChangeType() { 
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Change/GetChangeType',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
           
            $('#ddlChange').html("").append('<option value="0">Select Change Type</option>');
            $(data).each(function () {
                $('#ddlChange').append('<option value=' + this.change_type_id_pk + '>' + this.change_type_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Status Lists
function GetStatus() {
   
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Change/GetStatus',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlStatus').html("").append('<option value="0">Select Status</option>');
            $("#ddlStatusFltr").html("").append('<option value="0">Select Status</option>');
            $(data).each(function () {
                $('#ddlStatus').append('<option value=' + this.status_id_pk + '>' + this.status + '</option>');
                $('#ddlStatusFltr').append('<option value=' + this.status_id_pk + '>' + this.status + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//get All Employee List from People
function GetEmployees() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Consumable/GetEmployees',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".EMP").html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $('.EMP').append('<option value=' + this.id + '>' + this.name + '</option>'); 
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
//Get All Risk Lists
function GetRisk() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Change/GetRisk',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
           
            $('#ddlRisk').html("").append('<option value="0">Select Risk</option>');
            $(data).each(function () {
                $('#ddlRisk').append('<option value=' + this.risk_id_pk + '>' + this.risk_name + '</option>');
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
        url: 'http://playmediahouse.com/api/api/Change/GetCommonCategory',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlCategory').html("").append('<option value="0">Select Category</option>');
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
            $(data).each(function () {
                $("#ddlSupportGroup").append('<option value=' + this.support_group_id_pk + '>' + this.support_dep_group_name + '</option>');
                $("#ddlSupportGroupAsgn").append('<option value=' + this.support_group_id_pk + '>' + this.support_dep_group_name + '</option>');
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
            $(data).each(function () {
                $('#ddlSupportOrgnisation').append('<option value=' + this.support_dep_id_pk + '>' + this.support_dep_name + '</option>');
                $('#ddlSupportOrgnisationAsgn').append('<option value=' + this.support_dep_id_pk + '>' + this.support_dep_name + '</option>');
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
            $('#ddlClient').html("").append('<option value="0">Select Clients</option>');
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
            $("#ddlSubCategory").html("").append('<option value="0">Select Sub Category</option>');
            $(data).each(function () {
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
            $("#ddlUserList").html("").append('<option value="0">Select </option>');
            $("#ddlTechnician").html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $("#ddlAssignTo").append('<option value=' + this.Id + '>' + this.name + '</option>');
                $("#ddlUserList").append('<option value=' + this.Id + '>' + this.name + '</option>');
                $("#ddlTechnician").append('<option value=' + this.Id + '>' + this.name + '</option>');
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
          //  $("#ddlTechnician").html("").append('<option value="0">Select Technician</option>');
            $(data).each(function () {
          //      $('#ddlTechnician').append('<option value=' + this.id + '>' + this.name + '</option>');
              //  $('#ddlUserList').append('<option value=' + this.id + '>' + this.name + '</option>');
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
            $("#ddlPriority").val(data.priority_id_pk).change();
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
            $('#ddlImpact').html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $('#ddlImpact').append('<option value=' + this.mapping_priority_id_pk + '>' + this.impact_name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
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
                $('#ddlUrgency').append('<option value=' + this.urgency_id_pk + '>' + this.urgency_name + '</option>');
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
            $('#ddlLocationFltr').html("").append('<option value="0">Select Location</option>');
            $('#ddlLocation').html("").append('<option value="0">Select Location</option>');
            $(data).each(function () {
                $('#ddlLocation').append('<option value=' + this.location_id_pk + '>' + this.location_name + '</option>');
                $('#ddlLocationFltr').append('<option value=' + this.location_id_pk + '>' + this.location_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
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
            $('#ddlDepartmentName').html("").append('<option value="0">Select Department</option>');
            $('#ddlDepartmentNameFltr').html("").append('<option value="0">Select Department</option>');
            $(data).each(function () {
                $('#ddlDepartmentName').append('<option value=' + this.department_id_pk + '>' + this.department_name + '</option>');
                $('#ddlDepartmentNameFltr').append('<option value=' + this.department_id_pk + '>' + this.department_name + '</option>');
            });
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
// Insert Active Changes
function InsChangeManagement() {
    var parm = {
        "subject": $("#txtSubject").val().trim(),
        "common_cat_id_pk": $("#ddlCategory option:selected").val().trim(),
        "sub_category_id_pk": $("#ddlSubCategory option:selected").val().trim(),
        "reason_id_fk": $("#ddlReason option:selected").val(),
        "change_type_id_pk": $("#ddlChange option:selected").val(),
        "message": $("#txtContents").val().trim(),
        "business_unit_id_pk": $("#ddlClient option:selected").val(),
        "location_id_pk": $("#ddlLocation option:selected").val().trim(),
        "user_id_fk": $("#ddlUser option:selected").val().trim(),
        "department_id_fk": $("#ddlDepartmentName option:selected").val().trim(),
        "assets_id_pk": $("#ddlAsset option:selected").val().trim(),
        "change_requester_id": $("#ddlChangeRequester option:selected").val(),
        "change_owner_id": $("#ddlChangeOwner option:selected").val(),
        "change_manager_id": $("#ddlChangeManager option:selected").val(),
        "urgency_id_fk": $("#ddlUrgency option:selected").val().trim(),
        "impact_id_fk": $("#ddlImpact option:selected").val().trim(),
        "priority_id_pk": $("#ddlPriority option:selected").val().trim(),
        "risk_id_pk": $("#ddlRisk option:selected").val(),
        "support_dep_id_pk": $("#ddlSupportOrgnisation option:selected").val().trim(),
        "support_group_id_fk": $("#ddlSupportGroup option:selected").val().trim(),
        "assign_to_id": $("#ddlTechnician option:selected").val().trim(),
        "due_date": $("#txtDueDate").val(),
        "planned_start_date": $("#txtPlannedStartTime").val(),
        "planned_end_date": $("#txtPlannedEndTime").val(),
        "reviewer_id": $("#ddlReviewer option:selected").val(),
        "change_approver_id": $("#ddlChangeApprover option:selected").val(),
        "communication_plan": $("#ddlCommunication option:selected").val(),
        "is_send_email": $("#chkSEmailNotifi").is(":checked") == true ? 1 : 0,
        "is_send_message": $("#chkSSMSNotif").is(":checked") == true ? 1 : 0,
        "file": null,
        
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Change/InsChangeManagement',
        success: function (data) {
            // alert("Inserted Successfully");
            if (data.status_id != 0) {
                successnotify(data.status);
                $("#ClrActiveChanges").find("input").val("");
                $("#ClrActiveChanges").find("select").val(0).change();
                GetChangeMagementList();
               
            } else {
                warningnotify(data.status);
               
                // InsSLASchedule(data.sla_id_pk)
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get Change Management Lists
function GetChangeMagementList() {
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
        alert(location);
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
            alert(department);
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
    var parm = {
        'from_date': fdate,
        'to_date': tdate,
        'location_id': location,
        'user_id': user,
        'status': status,
        'client_id': client,
        'department_id': department,
        'priority_id': priority,
        'common_cat_id': category,
        'sub_category_id': subcategory
    };

    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Change/GetChangeMagementList',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblChangeManagement')) {
                table = $('#tblChangeManagement').DataTable();
            } else {
                table = $('#tblChangeManagement').DataTable();
            }
            table.destroy();
            $("#tblChangeManagement").DataTable({
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
                        data: 'change_category_id_pk',
                        sWidth: '10px',
                        sClass: "view",
                        bSortable: false,
                        render: function (change_category_id_pk) {
                            return '<input id="checkbox0" class="cb-element checkbox cmcbk" name="' + change_category_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    {
                        data: 'change_category_id_pk', sWidth: '90px', render: function (change_category_id_pk, type, row) {
                            //  return row.ticket_id_pk + ' ' + row.prefix;
                            // return '<a href="/ServiceRequests/ServiceRequestsDetails" class="editview"  name="' + service_req_id_pk + '">' + row.prefix + + row.service_req_id_pk + '</a>';

                            if (row.priority_id_pk === 1) {
                                return ' <a href="/Admin/Changes/ChangesRecords" title="Critical" class="editview"  name="' + change_category_id_pk + '"> <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Critical" style="color:#ea2d2d !important" title="Normal priority" data-original-title="Normal priority"></i> &nbsp; <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp;' + row.prefix + + row.change_category_id_pk + ' </a>';
                                // return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + status + '">' + status + '</span>';
                            }
                            else if (row.priority_id_pk === 2) {
                                return ' <a href="/Admin/Changes/ChangesRecords" title="High" class="editview"  name="' + change_category_id_pk + '"><i class="fa fa-flag fa-fw" data-toggle="tooltip" title="High" style="color:#f1a008 !important" title="Normal priority" data-original-title="Normal priority"></i> &nbsp; <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp;' + row.prefix + + row.change_category_id_pk + '</a>';
                                // return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (row.priority_id_pk === 3) {
                                return ' <a href="/Admin/Changes/ChangesRecords" title="Medium" class="editview"  name="' + change_category_id_pk + '"> <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Medium" style="color:#ffc107 !important" data-original-title="Normal priority"></i>  &nbsp; <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp;' + row.prefix + + row.change_category_id_pk + '</a>';
                                // return '<span class="badge badge-primary ENABLED" style="background-color:#b3ae1f;" name="' + status + '">' + status + '</span>';
                            }
                            else if (row.priority_id_pk === 4) {
                                return ' <a href="/Admin/Changes/ChangesRecords" title="Low" class="editview"  name="' + change_category_id_pk + '"> <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Low" style="color:#067304ad  !important" data-original-title="Normal priority"></i>  &nbsp;  <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp;' + row.prefix + + row.change_category_id_pk + '</a>';
                                //  return '<span class="badge badge-primary ENABLED" style="background-color:#3bc0c3 !important;" name="' + status + '">' + status + '</span>';
                            }
                        }
                    },
                    { data: 'category_name' },
                    { data: 'subject', sWidth: '170px'},
                    {
                        data: 'submitter',
                        sWidth: '140px',
                        sClass: "view",
                        bSortable: false,
                        render: function (submitter) {
                            return '<a href="#" class="adminviewsubmitter"  name="' + submitter + '" data-toggle="modal" data-target="#myModalSubmitter" >  <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i>  &nbsp;  ' + submitter + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    {
                        data: 'assign_to',
                        sWidth: '140px',
                        sClass: "view",
                        bSortable: false,
                        render: function (assign_to) {
                            return '<a href="#" class="adminview"  name="' + assign_to + '" data-toggle="modal" data-target="#myModal" >  <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i>  &nbsp;  ' + assign_to + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'change_type_name', sWidth: '90px' },
                   // { data: 'status' },
                    {
                        data: "status",
                        render: function (status) {
                            // Check if blank
                            if (status == "New") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status == "Accepted") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Approval Pending") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#b3ae1f;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Approved") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#3bc0c3 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "In Progress") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#de7b00;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Completed") {
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "In Review") {
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Closed") {
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Rejected") {
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            // If not blank display data normally
                            //   return '<span class="badge badge-primary DISABLED" style="background-color:#2ca04a;" name="' + status + '">' + status + '</span>';
                            //  return ' <input type="checkbox" class="custom-switch" checked name="switch1" data-textOn="ON" data-textOff="OFF" data - trackColorOn="#512DA8" data - trackColorOff="#616161" data - textColorOff="#fff" data - trackBorderColor="#555" >'; 
                        }
                    },
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
function deleteChanges(change_id) { 
    var parm = {
        "change_category_id_pk": change_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Change/DeleteChangesByID',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetChangeMagementList();

            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
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
            $(".ddlPriority").html("").append('<option value="0">Select Priority</option>');
            $("#ddlPriorityFltr").html("").append('<option value="0">Select Priority</option>');
            $(data).each(function () {
                $('.ddlPriority').append('<option value=' + this.priority_id_pk + '>' + this.priority_name + '</option>');
                $('#ddlPriorityFltr').append('<option value=' + this.priority_id_pk + '>' + this.priority_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get Change Management Status List 
function GetChangeManagementStatusLists() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Change/GetChangeManagementStatusLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlChangeStatus").html("").append('<option value="0">Select Status</option>');
            $(data).each(function () {
                $('#ddlChangeStatus').append('<option value=' + this.chan_manage_status_id_pk + '>' + this.chan_manage_status + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Update Tickets Status  
function UpdateChangeManagementStatus(change_category_id) {
    var parm = {
        "change_category_id_pk": change_category_id,
        "status_id_pk": $("#ddlChangeStatus option:selected").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Change/UpdateChangeManagementStatus',
        success: function (data) {
            if (data.status_id != 0) {
                CreateSuccess(data.status);
                GetChangeMagementList();
                //$("#ClrTicket").find("input").val("");
                //$("#ClrTicket").find("select").val(0).change();
                //GetTicketLists();
            } else {
                //CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Update Change Management Asign Admin   
function UpdateChangeManagementAsignTo(change_category_id_pk) {
    var parm = {
        "change_category_id_pk": change_category_id_pk,
        "assign_to_id": $("#ddlUserList option:selected").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Change/UpdateChangeManagementAsignTo',
        success: function (data) {
            if (data.status_id != 0) {
                CreateSuccess(data.status);
                GetChangeMagementList();
                $('#closedModelAssign').click();
            } else {
                CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get Assign To Details
function GetAdminDetails(name) {
    var parm = {
        "Name": name
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Change/GetAdminDetails',
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
// Get Submitter Details
function GetAdminDetailsSubmitter(name) {
    var parm = {
        "user_name": name
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Change/GetSubmitterDetails',
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
// Get Change Management Details By Id 
function GetChangeManagementAllDetails(change_category_id) {
    var parm = {
        'change_category_id_pk': change_category_id // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Change/GetChangeManagementAllDetails',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#txtSubject").val(data.subject);
            $("#ddlCategory").val(data.common_cat_id_pk).change();
            $("#ddlSubCategory").val(data.sub_category_id_pk).change();
            $("#ddlReason").val(data.reason_id_fk).change();
            $("#ddlChange").val(data.change_type_id_pk).change();
            $(".EdtContents").html(data.message).text();
            $("#ddlClient").val(data.business_unit_id_pk).change();
            $("#ddlLocation").val(data.location_id_pk);       
            $("#ddlUser").val(data.user_id_fk).change();   
            $("#ddlDepartmentName").val(data.department_id_fk).change();
            $("#ddlAsset").val(data.assets_id_pk).change();
            $("#ddlChangeRequester").val(data.change_requester_id).change();
            $("#ddlChangeOwner").val(data.change_owner_id).change();
            $("#ddlChangeManager").val(data.change_manager_id).change();
            $("#ddlUrgency").val(data.urgency_id_fk).change();
            $("#ddlImpact").val(data.impact_id_fk).change();
            $("#ddlPriority").val(data.priority_id_pk).change();
            $("#ddlRisk").val(data.risk_id_pk).change();
            $("#ddlSupportOrgnisation").val(data.support_dep_id_pk).change();
            $("#ddlTechnician").val(data.assign_to_id).change();
            $("#ddlSupportGroup").val(data.support_group_id_fk).change();
            $("#txtDueDate").val(data.due_date);
            $("#txtPlannedStartTime").val(data.planned_start_date);
            $("#txtPlannedEndTime").val(data.planned_end_date);
            $("#ddlReviewer").val(data.reviewer_id).change();
            $("#ddlChangeApprover").val(data.change_approver_id).change();
            $("#ddlCommunication").val(data.communication_plan).change();
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
// Update Active Changes
function UpdChangeManagement(change_category_id) {
    var parm = {
        "change_category_id_pk": change_category_id,
        "subject": $("#txtSubject").val().trim(),
        "common_cat_id_pk": $("#ddlCategory option:selected").val().trim(),
        "sub_category_id_pk": $("#ddlSubCategory option:selected").val().trim(),
        "reason_id_fk": $("#ddlReason option:selected").val(),
        "change_type_id_pk": $("#ddlChange option:selected").val(),
        "message": $("#txtContents").val().trim(),
        "business_unit_id_pk": $("#ddlClient option:selected").val(),
        "location_id_pk": $("#ddlLocation option:selected").val().trim(),
        "user_id_fk": $("#ddlUser option:selected").val().trim(),
        "department_id_fk": $("#ddlDepartmentName option:selected").val().trim(),
        "assets_id_pk": $("#ddlAsset option:selected").val().trim(),
        "change_requester_id": $("#ddlChangeRequester option:selected").val(),
        "change_owner_id": $("#ddlChangeOwner option:selected").val(),
        "change_manager_id": $("#ddlChangeManager option:selected").val(),
        "urgency_id_fk": $("#ddlUrgency option:selected").val().trim(),
        "impact_id_fk": $("#ddlImpact option:selected").val().trim(),
        "priority_id_pk": $("#ddlPriority option:selected").val().trim(), 
        "risk_id_pk": $("#ddlRisk option:selected").val(),
        "support_dep_id_pk": $("#ddlSupportOrgnisation option:selected").val().trim(),
        "support_group_id_fk": $("#ddlSupportGroup option:selected").val().trim(),
        "assign_to_id": $("#ddlTechnician option:selected").val().trim(),
        "due_date": $("#txtDueDate").val(),
        "planned_start_date": $("#txtPlannedStartTime").val(),
        "planned_end_date": $("#txtPlannedEndTime").val(),
        "reviewer_id": $("#ddlReviewer option:selected").val(),
        "change_approver_id": $("#ddlChangeApprover option:selected").val(),
        "communication_plan": $("#ddlCommunication option:selected").val(),
        "is_send_email": $("#chkSEmailNotifi").is(":checked") == true ? 1 : 0,
        "is_send_message": $("#chkSSMSNotif").is(":checked") == true ? 1 : 0,
        "file": null,

    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Change/UpdChangeManagement', 
        success: function (data) {
            // alert("Inserted Successfully");
            if (data.status_id != 0) {
                successnotify(data.status);
                $("#ClrActiveChanges").find("input").val("");
                $("#ClrActiveChanges").find("select").val(0).change();
                GetChangeMagementList();

            } else {
                warningnotify(data.status);

                // InsSLASchedule(data.sla_id_pk)
            }
        },
        error: function (result) {
            alert("Error : data");
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