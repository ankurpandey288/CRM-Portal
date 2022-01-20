$(document).ready(function () {
   // alert($.session.get("service_req_id_pk"));
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
    GetServiceRequestDetails($.session.get("service_req_id_pk")); 
    GetServiceRequestPredefineReply($.session.get("service_req_id_pk"));
    GetServiceRequestConversationReplyLists($.session.get("service_req_id_pk"));
    GetServiceRequestApprovalStatusDetails($.session.get("service_req_id_pk"));
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
    $("#ddlDepartmentName").change(function () {
        if ($(this).val() != 0) {
            GetSectionDepartmentWise($(this).val());
        } else {
            $("#ddlSection").html("").append('<option value="0">Select Section</option>');
        }
    });
    GetServiceReqStatusListsConditionWise($.session.get("service_req_id_pk"));
    GetPredefineReplyList();
    GetCommonCategory();
    GetDepartmentLists();
    GetClientLists();
    GetEmployeesLists();
    GetTechnicianLists();
    GetAsignLists();
    GetAssetList();
    GetPriorityList();
    GetTicketStatus();
    GetCloserCode();
    GetPendingReason();
    GetLocation();
    GetCommonSubCategory(1);
    GetImpactList();
    GetUrgencyList();
    GetSupportDepartment();
    GetSupportGroupEdit();
    GetSupplierDetails();
    $("#ddlTicketStatus").change(function () {
        if ($(this).val() == 1) {
            $("#divPending").hide();
            $("#divCloser").hide();
            $("#txtPendingRegion").val("");
        }
        else if ($(this).val() == 2) {
            $("#divPending").hide();
            $("#divCloser").hide();
            $("#txtPendingRegion").val("");
        }
        else if ($(this).val() == 3) {
            $("#divPending").hide();
            $("#divCloser").hide();
            $("#txtPendingRegion").val("");
        }
        else if ($(this).val() == 4) {
            $("#divPending").show();
            $("#divCloser").hide();
            $("#txtPendingRegion").val("");
        }
        else if ($(this).val() == 5) {
            $("#divPending").hide();
            $("#divCloser").show();
            $("#txtPendingRegion").val("");
        }
        else if ($(this).val() == 6) {
            $("#divPending").hide();
            $("#txtPendingRegion").val("");
            $("#divCloser").hide();
        }
        else if ($(this).val() == 7) {
            $("#divPending").hide();
            $("#divCloser").hide();
            $("#txtPendingRegion").val("");
        }
    });
    $("#ddlSupportOrgnisation").change(function () {
        if ($(this).val() != 0) {
            GetSupportGroup($(this).val());
        } else {
            $("#ddlSupportGroup").html("").append('<option value="0">Select Support Group</option>');
        }
    });
    $("#btnEdit").click(function () {
        GetServiceRequestAllDetails($.session.get("service_req_id_pk"));
    });
    $("#btnSubmit").click(function () {
      //  UpdateTicket($.session.get("ticket_id_pk"));
        if (validateServiceRequest() == true) {
            UpdServiceRequest($.session.get("service_req_id_pk"));
        } else {
            return false;
        }
    });
    $("#btnSubmitPredefine").click(function () {
        UpdateServiceRequestPredefineReply($.session.get("service_req_id_pk"));
        //if (validateTickets() == true) {
        //    InsAddNewTicket();
        //} else {
        //    return false;
        //}
    });
    $("#btnReply").click(function () {
        SendEmailServiceRequestReplyStatus($("#txtEmail").text(), $.session.get("service_req_id_pk"), $("#txtPredefineRepl").text());
        InsServiceRequestReplyConversation($.session.get("service_req_id_pk"), $("#txtContentsPredefineReply").val().trim(), $("#hdntxtTechnicianId").text());

        // alert($.session.get("ticket_id_pk")); // $("#txtPredefineRepl").text(),  $("#hdntxtPredefineRepl").text()
        // alert($("#txtEmail").text());
        // alert($("#hdntxtTechnicianId").text());
    });
    $('#btnStatusUpdate').click(function () {
        UpdateServiceRequestStatus($.session.get("service_req_id_pk"));
    });
    $('#btnStatusUpdateAssign').click(function () {
        UpdateServiceRequestStatus($.session.get("service_req_id_pk"));
        UpdateServiceRequestAsignToChangeStatus($.session.get("service_req_id_pk"));
    });
    $('#btnAsignToUpdate').click(function () {
        UpdateServiceRequestAsignTo($.session.get("service_req_id_pk"));
    });
});
function validateServiceRequest() {
    var return_val = true;
    if ($('#ddlTitle option:selected').val() == 0) {
        $('#SpnTitle').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnTitle').hide();
    }
    if ($('#ddlDepartmentName option:selected').val() == 0) {
        $('#SpnDepartmentName').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnDepartmentName').hide();
    }
    if ($('#ddlLoggedVia option:selected').val() == 0) {
        $('#SpnLoggedVia').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnLoggedVia').hide();
    }
    if ($('#ddlLocation option:selected').val() == 0) {
        $('#SpnLocation').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnLocation').hide();
    }
    if ($('#ddlUrgency option:selected').val() == 0) {
        $('#SpnUrgency').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnUrgency').hide();
    }
    if ($('#ddlImpact option:selected').val() == 0) {
        $('#SpnImpact').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnImpact').hide();
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
    if ($('#ddlClient option:selected').val() == 0) {
        $('#SpnClient').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnClient').hide();
    }
    if ($('#ddlAsset option:selected').val() == 0) {
        $('#SpnAsset').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnAsset').hide();
    }
    if ($('#ddlCategory option:selected').val() == 0) {
        $('#SpnCategory').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnCategory').hide();
    }
    if ($('#ddlTechnician option:selected').val() == 0) {
        $('#SpnTechnician').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnTechnician').hide();
    }
    if ($('#ddlUser option:selected').val() == 0) {
        $('#SpnUser').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnUser').hide();
    }
    if ($('#ddlSubCategory option:selected').val() == 0) {
        $('#SpnSubCategory').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnSubCategory').hide();
    }
    if ($('#txtContents').val().trim() == "" || $('#txtContents').val() == null) {
        $('#SpnContents').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnContents').hide();
    }
    if ($('#ddlPriority').val().trim() == "" || $('#ddlPriority').val() == null) {
        $('#SpnPriority').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnPriority').hide();
    }
    //if ($('#ddlPriority option:selected').val() == 0) {
    //    $('#SpnPriority').show();
    //    return_val = false;
    //} else {
    //    $('#SpnPriority').hide();
    //}
    return return_val;
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
                $('#ddlImpact').append('<option value=' + this.impact_id_pk + '>' + this.impact_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Urgency List 
function GetUrgencyList() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/SLA/GetUrgencyList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlUrgency").html("").append('<option value="0">Select Urgency</option>');
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
//Get Common Category Lists
function GetCommonCategory() {

    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Change/GetCommonCategory',
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
//function GetPendingReason() {

//    $.ajax({
//        type: "Get",
//        url: 'http://playmediahouse.com/api/api/Masters/GetPendingReason',
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (data) {
//            $('#ddlPendingRegion').html("").append('<option value="0">Select Pending Reason</option>');
//            $(data).each(function () {
//                $('#ddlPendingRegion').append('<option value=' + this.pending_reason_id_pk + '>' + this.pending_reason_name + '</option>');
//            });
//        },
//        error: function (edata) {
//            alert("error while feching record.");
//        }
//    });
//};
//Get Department Lists
function GetDepartmentLists() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Ticket/GetDepartmentLists',
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
        url: 'http://playmediahouse.com/api/api/Ticket/GetSupportDepartmentGroupList',
        success: function (data) {
            $("#ddlSupportGroup").html("").append('<option value="0">Select Sub Category</option>');
            $(data).each(function () {
                $("#ddlSupportGroup").append('<option value=' + this.support_group_id_pk + '>' + this.support_dep_group_name + '</option>');
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
        url: 'http://playmediahouse.com/api/api/Change/GetBusinessUnit',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#ddlClient').html("").append('<option value="0">Select Client</option>');
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
//get All Employee List from People
function GetEmployeesLists() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Ticket/GetEmployeesLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlUser").html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $('#ddlUser').append('<option value=' + this.id + '>' + this.name + '</option>');
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
        url: 'http://playmediahouse.com/api/api/Ticket/GetAsignLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlAssignTo").html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $('#ddlAssignTo').append('<option value=' + this.id + '>' + this.title + '</option>');
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
        url: 'http://playmediahouse.com/api/api/SLA/GetPriorityList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlPriority").html("").append('<option value="0">Select Priority</option>');
            $(data).each(function () {
                $('#ddlPriority').append('<option value=' + this.priority_id_pk + '>' + this.priority_name + '</option>');
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
function GetServiceRequestDetails(service_req_id) { 
    var parm = {
        'service_req_id_pk': service_req_id // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/GetServiceRequestDetails', 
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            //var Prefix_Val = (data.prefix + data.ticket_id_pk);
            //alert(Prefix_Val);
            $("#hdntxtTechnicianId").text(data.tecnician_id); 

            $("#txtIncidentID").text(data.prefix + '' + data.service_req_id_pk);
            $("#txtStatus").text(data.status);
            if (data.status == "Open") {
                $("#txtStatus").css('background-color', 'green');
            }
            else if (status === "Reopened") {
                $("#txtStatus").css('background-color', '#edc755');
            }
            else if (status === "New") {
                $("#txtStatus").css('background-color', '#ea2d2d ');
            }
            else if (data.status === "Answered") {
                $("#txtStatus").css('background-color', 'orange');
            }
            else if (data.status === "IN PROGRESS") {
                $("#txtStatus").css('background-color', '#3bc0c3');
            }
            else if (data.status === "Closed") {
                $("#txtStatus").css('background-color', '#bd2130');
            }
            $("#txtPriority").text(data.priority_name);
            $("#txtSubject").text(data.subject);
            $("#txtDepartment").text(data.support_dep_name);
            $("#txtSupportDepartmentGroup").text(data.support_dep_group_name);
            $("#txtEmail").text(data.email);
            $("#txtClient").text(data.business_unit); 

            $("#txtAsset").text("View");  // asset_name
            $("#txtAssetId").text(data.asset_name);
            $("#assetid").text(data.asset_name);
            $("#txtUserName").text(data.user_name);
            $("#txtUserContactNo").text(data.user_con_no);
            
            $("#txtUser").text(data.name);
            $("#txtPhone").text(data.mobile);
            $("#txtAssignTo").text(data.name);
            $("#txtCategory").text(data.category_name);
            $("#txtSubCategory").text(data.sub_category_name);
            $("#txtResolutionSla").text(data.resolution_sla);
            $("#txtResponseSla").text(data.response_sla);
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
            $("#txtApplicableSLA").text(data.sla_applicable); 
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
            $("#txtContent").val(data.message);
            //$("#txtTempContent").html(data.message).text();
            $("#txtCatalogueDescription").val(data.message).text();
            $("#ddlSupportOrgnisation").val(data.support_dep_id_pk).change();
            $("#ddlSupportGroup").val(data.support_group_id_fk).change();
            $("#ddlClient").val(data.client_id_pk).change();
            $("#ddlTechnician").val(data.asign_to).change().change();
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
            //$("#txtTechnicalCunsultantName").val(data.consultant_name);
            //$("#txtTechnicalCusultantNo").val(data.consultant_contact);
            //$("#txtTechnicalCunsultantEmail").val(data.consultant_email);
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
// Update Service Request
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
        "message": $("#txtContent").val().trim(),
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
        "consultant_id_fk": $("#ddlConsultant option:selected").val()
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
//Get Ticket Status List
function GetTicketStatus() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Ticket/GetTicketStatusLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlTicketStatus").html("").append('<option value="0">Select Status</option>');
            $(data).each(function () {
                $('#ddlTicketStatus').append('<option value=' + this.ticket_status_id_pk + '>' + this.ticket_status + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//get All Employee List from People
function GetTechnicianLists() { 
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Ticket/GetEmployeesLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlTechnician").html("").append('<option value="0">Select Technician</option>');
            $(data).each(function () {
                $('#ddlTechnician').append('<option value=' + this.id + '>' + this.name + '</option>');
                //$('#ddlUserList').append('<option value=' + this.id + '>' + this.name + '</option>');
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
//Get All Support Group Department 
function GetSupportGroupEdit() { 
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
//get All Predefine Reply List 
function GetPredefineReplyList() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/GetPredefineReplyList',
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
function UpdateServiceRequestPredefineReply(service_req_id) {  
    var parm = {
        "service_req_id_pk": service_req_id,
        "p_def_r_id_fk": $("#ddlPredefinedReply option:selected").val().trim()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/UpdateServiceRequestPredefineReply',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                CreateSuccess(data.status);
                $('#closedModel').click();
                GetServiceRequestPredefineReply($.session.get("service_req_id_pk"));
            } else {
                CreateSuccess(data.status);
                GetServiceRequestPredefineReply($.session.get("service_req_id_pk"));
            }
        },
        error: function (result) {
            alert("Not Update data");
        }
    });
};
function GetServiceRequestPredefineReply(service_req_id) {  
    var parm = {
        'service_req_id_pk': service_req_id// $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/GetServiceRequestPredefineReply', 
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
                GetServiceRequestConversationReplyLists($.session.get("service_req_id_pk"));
            } else {
                CreateSuccess(data.status);
                GetServiceRequestConversationReplyLists($.session.get("service_req_id_pk"));
            }
        },
        error: function (result) {
            alert("Not Update data");
        }
    });
};
//Get Ticket On Reply Conversation Lists  
function GetServiceRequestConversationReplyLists(ser_req_id) { 
    var parm = {
        "ser_req_id_fk": ser_req_id, 
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/GetServiceRequestConversationReplyLists',
        success: function (data) {
            $("#ddlSupportGroup").html("").append('<option value="0">Select Sub Category</option>');
            $(data).each(function () {
                $(".cnv").append('<article class="timeline-item"><div class="timeline-desk"><div class= "panel"><div class="timeline-box"><span class="arrow"></span><span class="timeline-icon bg-success"><i class="mdi mdi-checkbox-blank-circle-outline"></i></span><h4 class="text-success"> ' + this.name + '</h4><p class="timeline-date text-muted"><small>' + this.created_date + '</small></p><p>' + this.reply_description + '</p><p style="margin:10px"></p></div></div></div></article>');
                
            });
        },
        error: function (result) {
            alert("Error : data");
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
            $("#ddlServiceReqStatus").html("").append('<option value="0">Select Status</option>');
            $("#ddlStatusFltr").html("").append('<option value="0">Select Status</option>');
            $(data).each(function () {
                $('#ddlServiceReqStatus').append('<option value=' + this.ser_req_status_id_pk + '>' + this.ser_req_status + '</option>');
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
function GetServiceRequestApprovalStatusDetails(service_req_id) { 
    var parm = {
        'service_req_id_fk': service_req_id // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/GetServiceRequestApprovalStatusDetails',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblServiceRequestApprovalStatus')) {
                table = $('#tblServiceRequestApprovalStatus').DataTable();
            } else {
                table = $('#tblServiceRequestApprovalStatus').DataTable();
            }
            table.destroy();
            $("#tblServiceRequestApprovalStatus").DataTable({
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
                    { data: 'title' },
                    { data: 'user_name' },
                    { data: 'email' },
                    { data: 'display_name' },
                    { data: 'created_date' },
                    { data: 'status' }
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
              //  alert(data.service_req_id_pk);
                //CreateSuccess(data.status);
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
            $(data).each(function () {
                $('#ddlPendingReason').append('<option value=' + this.pending_reason_id_pk + '>' + this.pending_reason_name + '</option>');
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