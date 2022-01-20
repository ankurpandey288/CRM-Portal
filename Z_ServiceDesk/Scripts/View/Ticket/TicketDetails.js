$(document).ready(function () {
   // alert($.session.get("ticket_id_pk"));
    GetSupportGroupEdit();
   // GetTicketsAllDetailsEdit(9);
   // $("#txtContentsPredefineReply").val("your text to append");
   // $('.jqte-test').append($('#txtContentsPredefineReply').val()); 
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
    GetTicketsDetails($.session.get("ticket_id_pk")); 
    GetTicketPredefineReply($.session.get("ticket_id_pk")); 
    GetTicketResolutionNotes($.session.get("ticket_id_pk")); 
    GetTicketObservationNotes($.session.get("ticket_id_pk"));
    GetTicketConversationReplyLists($.session.get("ticket_id_pk"));
    GetAssetDetailsByTicketID($.session.get("ticket_id_pk"));
    GetTicketStatusListsConditionWise($.session.get("ticket_id_pk"));
    GetTicketAuditReport($.session.get("ticket_id_pk"));
    GetProblemMagementList();
    GetPredefineReplyList();
    GetCommonCategory();
    GetDepartmentLists();
    GetClientLists();
    GetEmployeesLists();
    GetUser();
    GetAsignLists();
    GetAssetList();
    GetSupplierDetails();
    GetTicketStatus();
    GetCloserCode();
    GetPendingReason();
    GetUrgency();
    GetPriority();
    GetSupportDepartment();
    GetSubLocation();
    GetSection();
    GetFloor();
    GetPriorityList();
    $('#SLAcbk').click(function () {
        if ($(this).is(':checked')) {
            $(".SLAApplicable").hide();
            $(".SLAApplicable").find("select").val(0).change();
        } else {
            $(".SLAApplicable").show();
            GetImpact();
            GetUrgency();
            GetPriorityList();
        }
    });
    $("#ddlClient").change(function () {
        if ($(this).val() != 0) {
            GetLocationAccToBusinessUnitList($(this).val());
        } else {
            $("#ddlLocation").html("").append('<option value="0">Select Location</option>');
        }
    });
    $("#ddlCategoryEdit").change(function () {
        if ($(this).val() != 0) {
            GetCommonSubCategory($(this).val());
        } else {
            $("#ddlSubCategory").html("").append('<option value="0">Select Sub Category</option>');
        }
    });
    GetConsultantLists();
    $(document).on('change', '#ddlDepartmentName', function () {
         if ($(this).val() != 0) {
         } else {
           //  $("#ddlSupportGroup").html("").append('<option value="0">Select Support Group</option>');
         }

    });
    $("#ddlDepartmentName").change(function () {
        if ($(this).val() != 0) {
            GetSupportGroup($(this).val());
            GetConsultantName($(this).val());
        } else {
            $("#ddlSupportGroup").html("").append('<option value="0">Select Support Group</option>');
        }
    });
    $("#btnEdit").click(function () {
        GetTicketsAllDetailsEdit($.session.get("ticket_id_pk"));
      //  $("#txtarea").hide();
       // alert($.session.get("ticket_id_pk"));
       // GetTicketsAllDetails(1);
       
    });
    $("#ddlTicketStatus").change(function () {
        if ($(this).val() == 4) {
            $("#DivPendingBox").show();
            $("#DivCommentBox").show();
            $("#divCloser").hide();
            $("#Assigned").hide();
            $("#DivReopenCommentBox").hide();
            $("#btnStatusUpdateAssign").hide();
            $("#btnStatusUpdateReopen").hide();
            $("#btnStatusUpdate").show();
            $("#DivPendingReason").hide();  
        } else if ($(this).val() == 2) {
            $("#Assigned").show();
            $("#btnStatusUpdateAssign").show();
            $("#btnStatusUpdate").hide();
            $("#btnStatusUpdateReopen").hide();
            $("#DivPendingBox").hide();
            $("#DivCommentBox").hide();
            $("#DivReopenCommentBox").hide();
            $("#DivPendingReason").hide();  
        } else if ($(this).val() == 5) {
            $("#divCloser").show();
            $("#btnStatusUpdateAssign").hide();
            $("#btnStatusUpdateReopen").hide();
            $("#btnStatusUpdate").show();
            $("#DivPendingBox").hide();
            $("#DivCommentBox").hide();
            $("#Assigned").hide();
            $("#DivReopenCommentBox").hide();
        } else if ($(this).val() == 6) {
            $("#divCloser").hide();
            $("#btnStatusUpdateAssign").hide();
            $("#btnStatusUpdate").hide();
            $("#btnStatusUpdateReopen").show();
            $("#DivPendingBox").hide();
            $("#DivCommentBox").hide();
            $("#Assigned").hide();
            $("#DivReopenCommentBox").show();
            $("#DivPendingReason").hide();  
        }
        else {
            $("#divCloser").hide();
            $("#DivPendingBox").hide();
            $("#DivVendor").hide();
            $("#DivCommentBox").hide();
            $("#Assigned").hide();
            $("#btnStatusUpdateAssign").hide();
            $("#btnStatusUpdate").show();
            $("#btnStatusUpdateReopen").hide();
            $("#DivReopenCommentBox").hide();
            $("#DivPendingReason").hide();  
        }
    });
    $("#btnReply").click(function () {
        SendEmailTicketReplyStatus($("#txtEmail").text(), $.session.get("ticket_id_pk"), $("#txtPredefineRepl").text());
        InsTicketReplyConversation($.session.get("ticket_id_pk"), $("#txtContentsPredefineReply").val().trim(), $.session.get("id"));
    });
    $("#btnSubmit").click(function () {
        UpdateTicket($.session.get("ticket_id_pk"));
       // UpdateTicket();
        //if (validateTickets() == true) {
        //    InsAddNewTicket();
        //} else {
        //    return false;
        //}
    });
    $("#btnSubmitPredefine").click(function () {
        UpdateTicketPredefineReply($.session.get("ticket_id_pk"));
        //if (validateTickets() == true) {
        //    InsAddNewTicket();
        //} else {
        //    return false;
        //}
    });
    $("#btnResolutionNotes").click(function () {
        if (validateResolutionNotes() == true) {
            UpdateTicketResolutionNotes($.session.get("ticket_id_pk"));
        } else {
            return false;
        }
    });
    $("#btnIssueObserved").click(function () {
        if (validateIssueObserved() == true) {
            UpdateTicketObservationNotes($.session.get("ticket_id_pk")); 
        } else {
            return false;
        }
    });
    $("#btnDefectiveParts").click(function () {
        if (validateDefectiveParts() == true) {
            UpdateTicketDefectivePartsNotes($.session.get("ticket_id_pk"));
        } else {
            return false;
        }
    });
    $("#dllCategoryForSolutions").change(function () {
        if ($(this).val() != 0) {
            GetCategoryList($(this).val());
        } else {
            $("#ddlSubCategoryForSolution").html("").append('<option value="0">Select Sub Category</option>');
        }
    });
    //$("#ddlUrgency").change(function () {
    //    if ($(this).val() != 0) {
    //        GetImpact($(this).val());
    //    } else {
    //        $("#ddlImpact").html("").append('<option value="0">Select</option>');
    //    }
    //});
    ////$("#ddlImpact").change(function () {
    ////    if ($(this).val() != 0) {
    ////     //  GetPriorityList($(this).val());
    ////    } else {
    ////        $("#ddlPriority").html("").append('<option value="0">Select</option>');
    ////    }
    ////});
    $("#ddlSupportGroupAsgn").change(function () {
        if ($(this).val() != 0) {
            GetEmployeeListSGD($(this).val());
        } else {
            $("#ddlUserList").html("").append('<option value="0">Select </option>');
        }
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
    $("#ddlSupportOrgnisationAsgn").change(function () {
        if ($(this).val() != 0) {
            GetSupportGroup($(this).val());
        } else {
            $("#ddlSupportGroupAsgn").html("").append('<option value="0">Select Support Group</option>');
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
    $('#btnStatusUpdateReopen').click(function () {
        var val = [];
        $('.tktcbk:checked').each(function (i) {
            //alert($(this).attr('name'));
            val[i] = $(this).val();
            UpdateTicketStatusReopen($(this).attr('name'));
        });
    });
    $('#btnStatusUpdate').click(function () {
        UpdateTicketStatus($.session.get("ticket_id_pk"));
       // UpdateTicketAsignToChangeStatus($.session.get("ticket_id_pk"));
    });
    $('#btnStatusUpdateAssign').click(function () {
        UpdateTicketStatus($.session.get("ticket_id_pk"));
        UpdateTicketAsignToChangeStatus($.session.get("ticket_id_pk"));
    });
    $('#btnAsignToUpdate').click(function () {
        UpdateTicketAsignTo($.session.get("ticket_id_pk"));
        UpdateTicketStatusChangeAssignToEngi($.session.get("ticket_id_pk"));
    });
    //$("#txtAsset").click(function () {
    //    alert($("#txtAsset").attr("name"));
    //});
    $(document).on('click', '.txtAsset', function () {
        // alert($(this).attr("name"));
        if ($.session.get("asset_id_pk") != '' || $.session.get("asset_id_pk") != null || $.session.get("asset_id_pk") == undefined) {
            $.session.remove("asset_id_pk");
            $.session.set("asset_id_pk", $("#txtAsset").text());
            //  window.open('/Inventry/FixedAssetsDetails');
        }

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
        } else {
            $("#DivPendingReason").show();
            $("#DivVendor").hide();
        }
    });
});
function validateResolutionNotes() { 
    var return_val = true;
    if ($('#txtResolutionNotes').val().trim() == "" || $('#txtResolutionNotes').val() == null) {
        $('#SpnResolutionNotes').show();
        return_val = false;
    } else {
        $('#SpnResolutionNotes').hide();
    }
    return return_val;
};
function validateIssueObserved() {
    var return_val = true;
    if ($('#txtIssueObserved').val().trim() == "" || $('#txtIssueObserved').val() == null) {
        $('#SpnIssueObserved').show();
        return_val = false;
    } else {
        $('#SpnIssueObserved').hide();
    }
    return return_val;
};
function validateDefectiveParts() { 
    var return_val = true;
    if ($('#txtSpareName').val().trim() == "" || $('#txtSpareName').val() == null) {
        $('#SpnSpareName').show();
        return_val = false;
    } else {
        $('#SpnSpareName').hide();
    }
    if ($('#txtPartNo').val().trim() == "" || $('#txtPartNo').val() == null) {
        $('#SpnPartNo').show();
        return_val = false;
    } else {
        $('#SpnPartNo').hide();
    }
    if ($('#txtSpareDescription').val().trim() == "" || $('#txtSpareDescription').val() == null) {
        $('#SpnResolutionNotes').show();
        return_val = false;
    } else {
        $('#SpnResolutionNotes').hide();
    }
    return return_val;
};
//Get Common Category Lists
function GetCommonCategory() {
   
    $.ajax({
        type: "Get",
        url: 'http://EGovernance-Test.online/userapi/api/Change/GetCommonCategory',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlCategory').html("").append('<option value="0">Select Category</option>');
            $(data).each(function () {
                $('#ddlCategory').append('<option value=' + this.common_cat_id_pk + '>' + this.category_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get Pending Reason 
function GetPendingReason() {

    $.ajax({
        type: "Get",
        url: 'http://EGovernance-Test.online/userapi/api/Masters/GetPendingReason',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlPendingReason').html("").append('<option value="0">Select Pending Reason</option>');
            $(data).each(function () {
                $('#ddlPendingReason').append('<option value=' + this.pending_reason_id_pk + '>' + this.pending_reason_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get Department Lists
function GetDepartmentLists() {
   
    $.ajax({
        type: "Get",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/GetDepartmentLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
           
            $('#ddlDepartmentName').html("").append('<option value="0">Select Department</option>');
            $(data).each(function () {
                $('#ddlDepartmentName').append('<option value=' + this.department_id_pk + '>' + this.department_name + '</option>');
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
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/GetSupportDepartmentGroupList',
        success: function (data) {
            $("#ddlSupportGroup").html("").append('<option value="0">Select Sub Category</option>');
            $("#ddlSupportGroupAsgn").html("").append('<option value="0">Select Sub Category</option>');
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
//Get Client Lists
function GetClientLists() {
   
    $.ajax({
        type: "Get",
        url: 'http://EGovernance-Test.online/userapi/api/Change/GetBusinessUnit',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
           
            $('#ddlClient').html("").append('<option value="0">Select Category</option>');
            $(data).each(function () {
                $('#ddlClient').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
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
        url: 'http://EGovernance-Test.online/userapi/api/Change/GetCommonSubCategory',
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
//get All Employee List from People
function GetEmployeesLists() {
    $.ajax({
        type: "Get",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/GetEmployeesLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          //  $("#ddlUser").html("").append('<option value="0">Select </option>');
            $(data).each(function () {
              //  $('#ddlUser').append('<option value=' + this.id + '>' + this.name + '</option>'); 
                $('#ddlUserList').append('<option value=' + this.id + '>' + this.name + '</option>'); 
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
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/GetAsignLists',
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
        url: 'http://EGovernance-Test.online/userapi/api/FixedAssets/GetAssetListForAssetNonAssPeripherals',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlAsset").html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $('#ddlAsset').append('<option value=' + this.asset_id_pk + '>' + this.asset_tag + '</option>');
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
function GetPriorityList() {
    $.ajax({
        type: "Get",
        url: 'http://EGovernance-Test.online/userapi/api/SLA/GetPriorityList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlPriority").html("").append('<option value="0">Select Priority</option>');
            $(data).each(function () {
                if (this.priority_id_pk == 1) {
                    $('#ddlPriority').append('<option selected value=' + this.priority_id_pk + '>' + this.priority_name + '</option>');
                }
                else {
                    $('#ddlPriority').append('<option value=' + this.priority_id_pk + '>' + this.priority_name + '</option>');
                }
            });
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
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/GetCloserCode', 
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
//Get Ticket Status List
function GetTicketStatus() {
    $.ajax({
        type: "Get",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/GetTicketStatusLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
           // $("#ddlTicketStatus").html("").append('<option value="0">Select Status</option>');
            $(data).each(function () {
            //    $('#ddlTicketStatus').append('<option value=' + this.ticket_status_id_pk + '>' + this.ticket_status + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function GetTicketStatusListsConditionWise(ticket_id) {
    var parm = {
        "ticket_id_pk": ticket_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/GetTicketStatusListsConditionWise',
        success: function (data) {
            $("#ddlTicketStatus").html("").append('<option value="0">Select Status</option>');
            $(data).each(function () {
                $('#ddlTicketStatus').append('<option value=' + this.ticket_status_id_pk + '>' + this.ticket_status + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//get All Predefine Reply List 
function GetPredefineReplyList() {
    $.ajax({
        type: "Get",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/GetPredefineReplyList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlPredefinedReply").html("").append('<option value="0">Select Predefine Reply </option>');
            $(data).each(function () {
                $('#ddlPredefinedReply').append('<option value=' + this.p_def_r_id_pk + '>' + this.name + '</option>');
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
// Update Predefine Reply 
function UpdateTicketPredefineReply(ticket_id_pk) { 
    var parm = {
        "ticket_id_pk": ticket_id_pk,
        "p_def_r_id_fk": $("#ddlPredefinedReply option:selected").val().trim()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/UpdateTicketPredefineReply',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                CreateSuccess(data.status);
                $('#closedPredefineModel').click();
                GetTicketPredefineReply($.session.get("ticket_id_pk"));
            } else {
                CreateSuccess(data.status);
                GetTicketPredefineReply($.session.get("ticket_id_pk"));
            }
        },
        error: function (result) {
            alert("Not Update data");
        }
    });
};
function GetTicketPredefineReply(ticket_id) {
    var parm = {
        'ticket_id_pk': ticket_id// $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/GetTicketPredefineReply', 
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#txtPredefineRepl").html(data.content).text();
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// get predefine reply for send email 
function GetTicketPredefineReplyForSendEmail() {
    var parm = {
        'ticket_id_pk': $.session.get("ticket_id_pk")
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/GetTicketPredefineReply',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            //$("#txtPredefineRepl").html(data.content).text();
            $("#hdntxtPredefineRepl").html(data.content).text();
          //  $("#hdntxtPredefineRepl").text(data.content);
            //SendEmailTicketCreate('rkmgpj0@gmail.com', ticket_id, 'Ravish', data.content);
            //  alert(data.content).html();
            //$(".jqte-test").html(data.content); 

        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Update Resolution Notes  
function UpdateTicketResolutionNotes(ticket_id_pk) {
    var parm = {
        "ticket_id_pk": ticket_id_pk,
        "resolution_notes": $("#txtResolutionNotes").val().trim()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/UpdateTicketResolutionNotes',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                CreateSuccess(data.status);
               GetTicketResolutionNotes($.session.get("ticket_id_pk"));
            } else {
                CreateSuccess(data.status);
                //GetTicketPredefineReply($.session.get("ticket_id_pk"));
            }
        },
        error: function (result) {
            alert("Not Update data");
        }
    });
};
// Update Resolution Notes  
function UpdateTicketObservationNotes(ticket_id_pk) {
    var parm = {
        "ticket_id_pk": ticket_id_pk,
        "obser_notes": $("#txtIssueObserved").val().trim()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/UpdateTicketObservationNotes',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                CreateSuccess(data.status);
                GetTicketObservationNotes($.session.get("ticket_id_pk"));
            } else {
                CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Not Update data");
        }
    });
};
// Update Defective Parts  
function UpdateTicketDefectivePartsNotes(ticket_id_pk) { 
    var parm = {
        "ticket_id_pk": ticket_id_pk,
        "spare_name": $("#txtSpareName").val().trim(),
        "part_no": $("#txtPartNo").val().trim(),
        "spare_description": $("#txtSpareDescription").val().trim() 
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/UpdateTicketDefectivePartsNotes', 
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                CreateSuccess(data.status);
               // $('#closedModel').click();
                GetTicketsDetails($.session.get("ticket_id_pk")); 
            } else {
                CreateSuccess(data.status);
                GetTicketsDetails($.session.get("ticket_id_pk")); 
            }
        },
        error: function (result) {
            alert("Not Update data");
        }
    });
};
// Get Get Ticket Resolution Notes
function GetTicketResolutionNotes(ticket_id) {
    var parm = {
        'ticket_id_pk': ticket_id// $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/GetTicketResolutionNotes', 
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
           // alert(data.resolution_notes);
            $("#txtBindResolutionNote").html(data.resolution_notes).text();
            //$(".jqte-test").html(data.content); 

        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Get Get Ticket Observation Notes
function GetTicketObservationNotes(ticket_id) {
    var parm = {
        'ticket_id_pk': ticket_id// $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/GetTicketObservationNotes',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
          //  alert(data.obser_notes);
            $("#txtObservedNote").html(data.obser_notes).text();
            //$(".jqte-test").html(data.content); 

        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Problems Lists
function GetProblemMagementList() {

    $.ajax({
        type: "Get",
        url: 'http://EGovernance-Test.online/userapi/api/Problems/GetProblemMagementList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlProblem').html("").append('<option value="0">Select Problem</option>');
            $(data).each(function () {
                $('#ddlProblem').append('<option value=' + this.promblems_id_pk + '>' + this.prefix + '' + this.promblems_id_pk + '</option>');
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
        url: 'http://EGovernance-Test.online/userapi/api/Commonapi/GetLocationAccToBusinessUnitList',
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

//Get All Impact Lists
function GetImpact() {
    $.ajax({
        type: "Get",
        url: 'http://EGovernance-Test.online/userapi/api/SLA/GetImpactList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlImpact").html("").append('<option value="0">Select Impact</option>');
            $(data).each(function () {
                if (this.impact_id_pk == 1) {
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
        url: 'http://EGovernance-Test.online/userapi/api/SLA/GetTransactionTableUrgencyList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlUrgency').html("").append('<option value="0">Select Urgency</option>');
            $(data).each(function () {
                if (this.urgency_id_pk == 1) {
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
function GetPriority() {
    $.ajax({
        type: "Get",
        url: 'http://EGovernance-Test.online/userapi/api/SLA/GetPriorityList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".ddlPriority").html("").append('<option value="0">Select Priority</option>');
            $("#ddlPriorityFltr").html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $('#ddlPriorityFltr').append('<option value=' + this.priority_id_pk + '>' + this.priority_name + '</option>');
                $('.ddlPriority').append('<option value=' + this.priority_id_pk + '>' + this.priority_name + '</option>');
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
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/GetSupportDepartmentGroupList',
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
        url: 'http://EGovernance-Test.online/userapi/api/Masters/GetSupportDepartment',
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
//get All Employee List from People
function GetEmployeesLists() {
    $.ajax({
        type: "Get",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/GetEmployeesLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          //  $("#ddlTechnician").html("").append('<option value="0">Select Technician</option>');
            $(data).each(function () {
           //     $('#ddlTechnician').append('<option value=' + this.id + '>' + this.name + '</option>');
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
//Get All User Lists
function GetUser() {
    $.ajax({
        type: "Get",
        url: 'http://EGovernance-Test.online/userapi/api/Staff/GetUserLists',
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
// Get Support Group 
function GetSupportGroupEdit() {
    $.ajax({
        type: "Get",
        url: 'http://EGovernance-Test.online/userapi/api/Masters/GetSupportGroup',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(data).each(function () {
                $('.ddlSupportGroupEdit').append('<option value=' + this.support_group_id_pk + '>' + this.support_dep_group_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Assigned To Details 
function GetAdminDetails(name) {
    var parm = {
        "Name": name
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/GetAdminDetails',
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
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/InsTicketReplyConversation',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                CreateSuccess(data.status);
                GetTicketConversationReplyLists($.session.get("ticket_id_pk"));
                $('#closedPredefineModel').click();
            } else {
                CreateSuccess(data.status);
                GetTicketConversationReplyLists($.session.get("ticket_id_pk"));
            }
        },
        error: function (result) {
            alert("Not Update data");
        }
    });
};
//Get Ticket On Reply Conversation Lists  
function GetTicketConversationReplyLists(ticket_id) { 
    var parm = {
        "ticket_id_fk": ticket_id, 
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/GetTicketConversationReplyLists', 
        success: function (data) {
            $("#ddlSupportGroup").html("").append('<option value="0">Select Sub Category</option>');
            $(data).each(function () {
              //  $("#txtTechnician").append(this.ticket_id_fk);
                //$(".timeline-date text-muted").append(this.ticket_id_fk);
               // $(".timeline-item").append('<p >' + this.ticket_id_fk + '</P>');

                $(".cnv").append('<article class="timeline-item"><div class="timeline-desk"><div class= "panel"><div class="timeline-box"><span class="arrow"></span><span class="timeline-icon bg-success"><i class="mdi mdi-checkbox-blank-circle-outline"></i></span><h4 class="text-success"> ' + this.name + '</h4><p class="timeline-date text-muted"><small>' + new Date(this.created_date).toLocaleDateString() + ' - ' + new Date(this.created_date).toLocaleTimeString() + '</small></p><p>' + this.reply_description + '</p><p style="margin:10px"></p></div></div></div></article>');
               

               // $(this).append("<p>Here's a note</p>");


                ////$("#ddlSupportGroup").append('<option value=' + this.support_group_id_pk + '>' + this.support_dep_group_name + '</option>');
                ////$("#ddlSupportGroup").append('<option value=' + this.support_group_id_pk + '>' + this.support_dep_group_name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get Asset Details By Asset ID
function GetAssetDetailsByTicketID(ticket_id) {  
    var parm = {
        "ticket_id_pk": ticket_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/GetAssetDetailsByTicketID',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: josnstr,
        success: function (data) {
            $("#tbodyAssetDetails").html('');
            $(data).each(function () {
                $("#tbodyAssetDetails").append("<tr><td>" + this.asset_id_pk + "</td><td>" + this.asset_tag + "</td><td>" + this.asset_cat_name + "</td><td>" + this.asset_name + "</td></tr>");
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
        url: 'http://EGovernance-Test.online/userapi/api/Commonapi/GetEmployeeListSGD',
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
//Get All Supplier (Vendor) Lists
function GetSupplierDetails() {
    $.ajax({
        type: "Get",
        url: 'http://EGovernance-Test.online/userapi/api/Supplier/GetSupplierDetails',
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
// Update Tickets Status  
function UpdateTicketStatus(ticket_id) {
    var parm = {
        "ticket_id_pk": ticket_id,
        "ticket_status_id_pk": $("#ddlTicketStatus option:selected").val().trim(),
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
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/UpdateTicketStatus',
        success: function (data) {
            if (data.ticket_status_id_pk == 5) {
                SendEmailChangeTicketStatusResolved(data.ticket_id_pk);
            } else {
                //  SendEmailChangeTicketStatus(data.ticket_id_pk);
            }
            if (data.status_id == 1) {
                CreateSuccess(data.status);
                $('#closedModelStatus').click();
                GetTicketsDetails($.session.get("ticket_id_pk")); 
                SendEmailChangeTicketStatus(data.ticket_id_pk);
                $(".cb-element").prop("checked", false);
            } else {
                $('#closedModelStatus').click();
                SendEmailChangeTicketStatus(data.ticket_id_pk);
                CreateSuccess(data.status);
                GetTicketsDetails($.session.get("ticket_id_pk")); 
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Update Tickets Asign Admin Change Status  
function UpdateTicketAsignToChangeStatus(ticket) {
    var parm = {
        "ticket_id_pk": ticket,
        "asign_to": $("#ddlUserList option:selected").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/UpdateTicketAsignTo',
        success: function (data) {
            if (data.status_id == 1) {
                CreateSuccess(data.status);
                GetTicketsDetails($.session.get("ticket_id_pk")); 
                $('#closedModelAssign').click();
            } else {
                CreateSuccess(data.status);
                $('#closedModelAssign').click();
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Update Tickets Asign Admin   
function UpdateTicketAsignTo(ticket) {
    var parm = {
        "ticket_id_pk": ticket,
        "asign_to": $("#ddlUserList option:selected").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/UpdateTicketAsignTo',
        success: function (data) {
            //alert(data.ticket_id_pk);
            if (data.status_id == 1) {
                CreateSuccess(data.status);
                GetTicketsDetails($.session.get("ticket_id_pk")); 
                $('#closedModelAssign').click();
            } else {
                CreateSuccess(data.status);
                $('#closedModelAssign').click();
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Update Tickets Status When Ticket Assign To Engineer 
function UpdateTicketStatusChangeAssignToEngi(ticket_id) {
    var parm = {
        "ticket_id_pk": ticket_id,
        "ticket_status_id_pk": 2,
        "pending_category_id": 0,
        "pending_reason_id_fk": 0,
        "supplier_id_fk": 0,
        "pending_remarks": null,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/UpdateTicketStatus',
        success: function (data) {
            if (data.ticket_status_id_pk == 5) {
                SendEmailChangeTicketStatusResolved(data.ticket_id_pk);
            } else {
                SendEmailChangeTicketStatus(data.ticket_id_pk);
            }
            if (data.status_id != 0) {
                CreateSuccess(data.status);
                $('#closedModelStatus').click();
                GetTicketsDetails($.session.get("ticket_id_pk")); 
                $(".cb-element").prop("checked", false);
            } else {
                $('#closedModelStatus').click();
                CreateSuccess(data.status);
                GetTicketsDetails($.session.get("ticket_id_pk")); 
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
function GetTicketsDetails(ticket_id_pk) {
    var parm = {
        'ticket_id_pk': ticket_id_pk // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/GetTicketsDetails',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#txtSerialNo").text(data.SERIAL_NO);
            $("#txtMake").text(data.MAKE);
            $("#txtModel").text(data.MODEL);
            $("#txtUserName").text(data.user_name);
            $("#txtUserContactNo").text(data.user_con_no);

            $("#txtSpareName").val(data.spare_name);
            $("#txtPartNo").val(data.part_no);
            $("#txtBindSpareDescription").html(data.spare_description);
            $("#txtBindResolutionNote").html(data.obser_notes);
            $("#txtReasonforReopen").text(data.reason_for_reopen);
            $("#hdntxtTechnicianId").text(data.tecnician_id);
            $("#txtCallType").text(data.call_status); 
            $("#txtIncidentID").text(data.prefix + '' + data.ticket_id_pk);
            $("#txtStatus").text(data.status);
            if (data.status == "Open") {
                $("#txtStatus").css('background-color', 'green');
            }
            else if (data.status == "Reopened") {
                $("#txtStatus").css('background-color', '#edc755');
                $("#tdReopen").show();
              //  alert('test');
            }
            else if (data.status == "Answered") {
                $("#txtStatus").css('background-color', 'orange');
            }
            else if (data.status == "IN PROGRESS") {
                $("#txtStatus").css('background-color', '#3bc0c3');
            }
            else if (data.status == "Closed") {
                $("#txtStatus").css('background-color', '#bd2130');
                $("#tdCloserCode").show();
                $("#txtCloserCode").text(data.closer_code);
            }
            else if (data.status == "Pending") {
                $("#tdPending").show();
                //$("#txtView").text(data.ticket_status_id_pk);
                GetTicketStatusPendingDetails(data.ticket_status_id_pk);
                // alert("Hello");
            }
            if (data.feedback == 1) {
                $("#txtFeedback").text("Satisfied");
            } else if (data.feedback == 2) {
                $("#txtFeedback").text("Not Satisfied");
            }
            $("#txtPriority").text(data.priority_name);
            $("#txtMasterIncident").text(data.parent_ticket_id_fk); 
            $("#txtSubject").text(data.subject);
            $("#txtDepartment").text(data.support_dep_name);
            $("#txtSupportDepartmentGroup").text(data.support_dep_group_name);
            $("#txtEmail").text(data.email);
            $("#txtClient").text(data.business_unit);
            $("#txtAsset").text("View");  // asset_name
            $("#txtAssetId").text(data.asset_name);
            $("#assetid").text(data.asset_name);
            $("#txtUser").text(data.user_name);
            $("#txtVIPUser").text(data.vip); 
            $("#txtVIPUser").text(data.vip); 
            $("#txtPhone").text(data.mobile);
            $("#txtAssignTo").text(data.name);
            $("#txtCategory").text(data.category_name);
            $("#txtSubCategory").text(data.sub_category_name);
            // $("#txtLoggedTime").text(new Date(data.created_date).toLocaleDateString()); 
            $("#txtLoggedTime").text(new Date(data.logged_date).toLocaleDateString() + '-' + data.logged_time);
            if (data.response_date != null || data.response_time != null) {
                $("#txtResponseTime").text(new Date(data.response_date).toLocaleDateString() + '-' + data.response_time);
            } else {
                $("#txtResponseTime").text("Null");
            }
            if (data.resolution_date != null || data.resolution_time != null) {
                $("#txtResolutionTime").text(new Date(data.resolution_date).toLocaleDateString() + '-' + data.resolution_time);
            } else {
                $("#txtResolutionTime").text("Null");
            }
            $("#txtResolutionSla").text(data.resolution_sla); 
            $("#txtResponseSla").text(data.response_sla);
            if (data.response_sla == "Missed") {
                $("#txtResponseSla").css('background-color', 'red');
            }
            //else if (status === "Reopened") {
            //    $("#txtStatus").css('background-color', '#edc755');
            //}

            $("#txtTotalSlaMinute").text(data.total_sla_minute);
            $("#txtExtraTotalSlaMinute").text(data.extra_minute);
            $("#txtApplicableSLA").text(data.sla_applicable); 
            $("#txtSLAName").text(data.sla_name_type); 
            if ($.session.get("asset_id_pk") != '' || $.session.get("asset_id_pk") != null || $.session.get("asset_id_pk") == undefined) {
            $.session.remove("asset_id_pk");
                $.session.set("asset_id_pk", data.asset_id_pk);
            //  window.open('/Inventry/FixedAssetsDetails');
            }

        
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function GetTicketStatusPendingDetails(ticket_status_id) {
    var parm = {
        'ticket_status_id_pk': ticket_status_id, // $.session.get("asset_id_pk");
        'ticket_id_pk': $.session.get("ticket_id_pk")
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/GetTicketStatusPendingDetails',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#txtPendingCategory").text(data.pending_category);
            $("#txtVendor").text(data.status);
            $("#txtPendingReason").text(data.pending_reason_name);
            $("#txtRemarks").text(data.pending_remarks);



        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Get Tickets Details
function GetTicketsAllDetailsEdit(ticket_id) {
    var parm = {
        'ticket_id_pk': ticket_id// $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/GetTicketsAllDetails',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#txtSerialNoEdit").val(data.SERIAL_NO);
            $("#txtMakeEdit").val(data.MAKE);
            $("#txtModelEdit").val(data.MODEL); 

            $("#ddlCallType").val(data.call_type).change();
            $("#txtSubjectEdit").val(data.subject);
            $("#ddlSupportOrgnisation").val(data.support_dep_id_pk).change();
            $("#ddlSupportGroup").val(data.support_group_id_fk).change();
            $("#ddlClient").val(data.client_id_pk).change();
            $("#ddlAsset").val(data.asset_id_pk).change();
            $("#ddlCategory").val(data.common_cat_id_pk).change();
            $("#ddlTechnician").val(data.admin_id).change();
            $("#ddlSubCategory").val(data.sub_category_id_pk).change();
            $("#ddlDepartmentName").val(data.department_id_fk);
            $("#txtContents").val(data.message);
          //  $(".EdtContents").html(data.message);
            // $(".jqte-test").val(data.message);
            //  $("textarea#txtContents").val(data.message);
            $("#ddlPriority").val(data.priority_id_pk).change();
            // $("#ddlLoggedVia").val(data.logged_via).change();
            // $("#ddlLoggedVia").val("Web").change();
            //  $("#ddlLoggedVia option[value='United State']").attr("disabled", true);
            if (data.logged_via == 4) {
                $('#ddlLoggedVia').append($('<option selected>').val('4').text('Web'));
                $("#ddlLoggedVia").attr("disabled", "disabled");
            } else {
                $("#ddlLoggedVia").val(data.logged_via).change();
                $("#ddlLoggedVia").removeAttr("disabled");
            }

            $("#ddlUser").val(data.user_id_fk).change();
            //  $("#ddlUrgency").val(data.urgency_id_fk).change();
            $("#ddlSupportType").val(data.support_type).change();
            $("#ddlLocation").val(data.location_id_fk).change();
            $("#ddlSubLocations").val(data.sub_location_id_fk).change();
            $("#ddlSection").val(data.section_id_fk).change();
            $("#ddlFloor").val(data.floor_id_fk).change();
            $("#txtBuildingAndRoomNo").val(data.building_room_no);
            $("#txtGate").val(data.gate);
            $("#ddlConsultant").val(data.consultant_id_fk).change();
            //$("#txtTechnicalCunsultantName").val(data.consultant_name);
            //$("#txtTechnicalCusultantNo").val(data.consultant_contact);
            //$("#txtTechnicalCunsultantEmail").val(data.consultant_email);
            if (data.is_sla_applicable == 0) {
                $("#SLAcbk").prop('checked', true);
                $(".SLAApplicable").hide();
                $(".SLAApplicable").find("select").val(0).change();
            } else {
                $("#SLAcbk").prop('checked', false);
            }
            if (data.is_send_message == 1) {
                $("#chkSSMSNotif").prop('checked', true);
            } else {
                $("#chkSSMSNotif").prop('checked', false);
            }
            GetCommonSubCategory($("#ddlCategory option:selected").val());
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Update Ticket 
function UpdateTicket(ticket_id_pk) {
    var parm = {
        "ticket_id_pk": ticket_id_pk,
        "subject": $("#txtSubjectEdit").val().trim(),
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
        "sub_location_id_fk": $("#ddlSubLocations option:selected").val(),
        "section_id_fk": $("#ddlSection option:selected").val(),
        "floor_id_fk": $("#ddlFloor option:selected").val(),
        "building_room_no": $("#txtBuildingAndRoomNo").val().trim(),
        "gate": $("#txtGate").val().trim(),
        "consultant_id_fk": $("#ddlConsultant option:selected").val(),
        "is_sla_applicable": $("#SLAcbk").is(":checked") == true ? 0 : 1,
        "call_type": $("#ddlCallType option:selected").val(),
        "custom_field_s_no": $("#txtSerialNoEdit").val(),
        "custom_field_make": $("#txtMakeEdit").val(),
        "custom_field_model": $("#txtModelEdit").val(),
        "support_type": $("#ddlSupportType option:selected").val(),
        "updated_by": $.session.get("id")
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/UpdateTicket',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                CreateSuccess(data.status);
                $('#closedModel').click();
                GetTicketAuditReport($.session.get("ticket_id_pk"));
                GetTicketsDetails($.session.get("ticket_id_pk"));
            } else {
                CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Not Update data");
        }
    });
};
// Get User Details by Ticket Id
function SendEmailChangeTicketStatusResolved(ticket_id_pk) {
    var parm = {
        'ticket_id_pk': ticket_id_pk // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/SendEmailChangeTicketStatus',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            SendEmail(data.email, data.user_name, "Testing Purpose", "8766235849", "http://localhost:49829/Feedbacks/PreviewForm")
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
        url: 'http://EGovernance-Test.online/userapi/api/Masters/GetSubLocation',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlSubLocations').html("").append('<option value="0">Select Sub Location</option>');
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
function GetSection() {
    $.ajax({
        type: "Get",
        url: 'http://EGovernance-Test.online/userapi/api/Masters/GetSection',
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
        url: 'http://EGovernance-Test.online/userapi/api/Masters/GetFloor',
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
// Get Ticket Audit  Lists 
function GetTicketAuditReport(change_set) { 
    var parm = {
        'change_set_id': change_set
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/GetTicketAuditReport',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblAuditReport')) {
                table = $('#tblAuditReport').DataTable();
            } else {
                table = $('#tblAuditReport').DataTable();
            }
            table.destroy();
            $("#tblAuditReport").DataTable({
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

                    { data: 'audit_id_pk' },
                    { data: 'field_name' },
                    { data: 'old_value' },
                    { data: 'new_value' },
                    { data: 'Updated_by' }, 
                    {
                        "data": "update_date",
                        "type": "date",
                        "render":
                            function (data, type, full) {
                                return (data) ? moment(data).format('DD/MM/YYYY  -  HH:mm:ss') : '';
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
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Update Tickets Status Reopen
function UpdateTicketStatusReopen(ticket_id) {
    var parm = {
        "ticket_id_pk": ticket_id,
        "ticket_status_id_pk": $("#ddlTicketStatus option:selected").val().trim(),
        "reason_for_reopen": $("#txtReopenCommentBox").val().trim()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://EGovernance-Test.online/userapi/api/Ticket/UpdateTicketStatusReopen',
        success: function (data) {
            if (data.status_id == 1) {
                CreateSuccess(data.status);
                $('#closedModelStatus').click();
                GetTicketLists();
                SendEmailChangeTicketStatus(data.ticket_id_pk);
                $(".cb-element").prop("checked", false);
            } else {
                $('#closedModelStatus').click();
                SendEmailChangeTicketStatus(data.ticket_id_pk);
                //CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
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
        url: 'http://EGovernance-Test.online/userapi/api/Masters/GetConsultantName',
        success: function (data) {
            $('.Consultant').html("").append('<option value="0">Select Consultant</option>');
            $(data).each(function () {
                $('.Consultant').append('<option value=' + this.consultant_id_pk + '>' + this.consultant_name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//Get All Consultant List
function GetConsultantLists() {
    $.ajax({
        type: "Get",
        url: 'http://EGovernance-Test.online/userapi/api/Masters/GetConsultant',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".Consultant").html("").append('<option value="0">Select Department</option>');
            $(data).each(function () {
                $('.Consultant').append('<option value=' + this.consultant_id_pk + '>' + this.consultant_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
