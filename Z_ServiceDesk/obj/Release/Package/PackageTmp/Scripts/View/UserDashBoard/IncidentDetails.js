$(document).ready(function () {
   
   
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
    GetTicketConversationReplyLists($.session.get("ticket_id_pk"));
    GetAssetDetailsByTicketID($.session.get("ticket_id_pk"));
    GetProblemMagementList()
    GetPredefineReplyList();
    GetCommonCategory();
    GetDepartmentLists();
    GetClientLists();
    GetEmployeesLists();
    GetUser();
    GetAsignLists();
    GetAssetList();
    // GetPriorityList();
    GetTicketStatus();
    GetCloserCode();
    GetPendingReason();
    GetUrgency();
    GetPriority();
    GetSupportDepartment();
    $("#ddlClient").change(function () {
        if ($(this).val() != 0) {
            GetLocationAccToBusinessUnitList($(this).val());
        } else {
            $("#ddlLocation").html("").append('<option value="0">Select Location</option>');
        }
    });
    //GetCommonSubCategory(1);
    $("#ddlCategoryEdit").change(function () {
        if ($(this).val() != 0) {
            GetCommonSubCategory($(this).val());
        } else {
            $("#ddlSubCategory").html("").append('<option value="0">Select Sub Category</option>');
        }
    });
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
    $("#ddlDepartmentName").change(function () {
        if ($(this).val() != 0) {
            GetSupportGroup($(this).val());
        } else {
            $("#ddlSupportGroup").html("").append('<option value="0">Select Support Group</option>');
        }
    });
    $("#btnEdit").click(function () {
        GetTicketsAllDetailsEdit($.session.get("ticket_id_pk"));
        // alert($.session.get("ticket_id_pk"));
        // GetTicketsAllDetails(1);

    });

    $("#btnReply").click(function () {
        SendEmailTicketReplyStatus($("#txtEmail").text(), $.session.get("ticket_id_pk"), $("#txtPredefineRepl").text());
        InsTicketReplyConversation($.session.get("ticket_id_pk"), $("#txtPredefineRepl").text(), $("#hdntxtTechnicianId").text());

        // alert($.session.get("ticket_id_pk")); // $("#txtPredefineRepl").text(),  $("#hdntxtPredefineRepl").text()
        // alert($("#txtEmail").text());
        // alert($("#hdntxtTechnicianId").text());
    });
    $("#btnSubmit").click(function () {
        UpdateTicket($.session.get("ticket_id_pk"));
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
    $("#dllCategoryForSolutions").change(function () {
        if ($(this).val() != 0) {
            GetCategoryList($(this).val());
        } else {
            $("#ddlSubCategoryForSolution").html("").append('<option value="0">Select Sub Category</option>');
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
    //$("#txtAssetId").click(function () {
    //    GetAssetDetailsByTicketID($("#txtAssetId").text()); 

    //});

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
//Get Common Category Lists
function GetCommonCategory() {

    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Change/GetCommonCategory',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlCategoryEdit').html("").append('<option value="0">Select Category</option>');
            $(data).each(function () {
                $('#ddlCategoryEdit').append('<option value=' + this.common_cat_id_pk + '>' + this.category_name + '</option>');
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
        url: 'http://playmediahouse.com/api/api/Masters/GetPendingReason',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#ddlPendingRegion').html("").append('<option value="0">Select Pending Reason</option>');
            $(data).each(function () {
                $('#ddlPendingRegion').append('<option value=' + this.pending_reason_id_pk + '>' + this.pending_reason_name + '</option>');
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
        url: 'http://playmediahouse.com/api/api/Ticket/GetDepartmentLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#ddlDepartmentName').html("").append('<option value="0">Select Category</option>');
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
function GetTicketsDetails(ticket_id_pk) {
    var parm = {
        'ticket_id_pk': ticket_id_pk // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Ticket/GetTicketsDetails',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            //  alert(data.email_id);
            // var asgn_email =
            $("#hdntxtTechnicianId").text(data.tecnician_id);



            // SendEmailTicketCreate(data.email_id, ticket_id_pk, 'Ravish', $("#hdntxtPredefineRepl").val());
            $("#txtIncidentID").text(data.prefix + '' + data.ticket_id_pk);
            $("#txtStatus").text(data.status);
            if (data.status == "Open") {
                $("#txtStatus").css('background-color', 'green');
            }
            else if (status === "Reopened") {
                $("#txtStatus").css('background-color', '#edc755');
            }
            else if (data.status == "Answered") {
                $("#txtStatus").css('background-color', 'orange');
            }
            else if (data.status == "IN PROGRESS") {
                $("#txtStatus").css('background-color', '#3bc0c3');
            }
            else if (data.status == "Closed") {
                $("#txtStatus").css('background-color', '#bd2130');
            }
            else if (data.status == "Cancel") { 
                $("#txtStatus").css('background-color', '#bd2130');
            }
            else if (data.status == "Pending") {
                $("#tdPending").show();
                $("#txtView").text(data.ticket_status_id_pk);
                GetTicketStatusPendingDetails(data.ticket_status_id_pk);
                // alert("Hello");
            }

            $("#txtPriority").text(data.priority_name);
            $("#txtSubject").text(data.subject);
            $("#txtDepartment").text(data.support_dep_name);
            $("#txtSupportDepartmentGroup").text(data.support_dep_group_name);
            $("#txtEmail").text(data.email);
            $("#txtClient").text(data.business_unit);
            $("#txtAsset").text(data.asset_name);
            $("#txtAssetId").text(data.asset_id_pk);
            $("#txtUser").text(data.user_name);
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



            // Date(this.login_date).toLocaleDateString()
            //  $("#txtLoggedTime").text(data.logged_date); 
            //$("#txtHddSize").text(data.HddSize);
            //$("#txtHddSerialNo").text(data.HddSerialNo);
            //$("#txtHddUsage").text(data.HddUsage);
            //$("#txtNoRam").text(data.NoRam);
            //$("#txtSizeOfRam").text(data.SizeOfRam);
            //$("#txtOS").text(data.OS);
            //$("#txtOSServicePack").text(data.OSServicePack);
            //$("#txtOSSerialNo").text(data.OSSerialNo);
            //$("#txtOSManufacture").text(data.OSManufacture);
            //$("#txtComputerName").text(data.ComputerName);
            //$("#txtDriveName").text(data.DriveName);
            //$("#txtHddTotalSize").text(data.HddTotalSize);
            //$("#txtGraphisCardName").text(data.GraphisCardName);
            //$("#txtGraphisCardDeviceID").text(data.GraphisCardDeviceID);
            //$("#txtGraphisCardInstalledDisplayDrivers").text(data.GraphisCardInstalledDisplayDrivers);
            //$("#txtGraphisCardInstalledDisplayDrivers1").text(data.GraphisCardInstalledDisplayDrivers1);
            //$("#txtGraphisCardDriverVersion").text(data.GraphisCardDriverVersion);
            //$("#txtGraphisCardRam").text(data.GraphisCardRam);
            //$("#txtOSVersion").text(data.OSVersion);
            //$("#txtLastUpdateDate").text(data.lu_date);

            //$.each(data, function () {
            //    alert(this.ram_uses);
            //    alert(this.cpu_uses);

            //});

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
        url: 'http://playmediahouse.com/api/api/Ticket/GetTicketStatusPendingDetails',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#txtPendingCategory").text(data.pending_category);
            $("#txtVendor").text(data.status);
            $("#txtPendingReason").text(data.status);
            $("#txtRemarks").text(data.pending_remarks);



        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Get Tickets Details
function GetTicketsAllDetailsEdit(id) {
    var parm = {
        'ticket_id_pk': id ///$.session.get("ticket_id_pk")// $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Ticket/GetTicketsAllDetails',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            //alert(data.logged_via);
            //alert(data.department_id_fk);


            $("#ddlCategoryEdit").val(data.common_cat_id_pk).change();
            $("#ddlDepartmentName").val(data.department_id_fk).change();
            $("#txtSubjectEdit").val(data.subject);
            $(".EdtContents").html(data.message).text();

            $("#ddlSupportOrgnisation").val(data.support_dep_id_pk).change();
            $("#ddlSupportGroup").val(data.support_group_id_fk).change();
            $("#ddlClient").val(data.client_id_pk).change();
            $("#ddlAsset").val(data.asset_id_pk).change();

            $("#ddlTechnician").val(data.admin_id).change();
            $("#ddlSubCategory").val(data.sub_category_id_pk).change();
            // $(".EdtContents").val(data.message);
            $(".EdtContents").html(data.message).text();
            $("#ddlPriority").val(data.priority_id_pk).change();
            $("#ddlLoggedVia").val(data.logged_via);
            $("#ddlUser").val(data.user_id_fk).change();
            $("#ddlUrgency").val(data.urgency_id_fk).change();
            $("#ddlImpact").val(data.impact_id_fk).change();
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
            GetCommonSubCategory($("#ddlCategoryEdit option:selected").val());
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
        "common_cat_id_pk": $("#ddlCategoryEdit option:selected").val().trim(),
        "admin_id": $("#ddlTechnician option:selected").val().trim(),
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
        "is_send_email": $("#chkSEmailNotifi").is(":checked") == true ? 1 : 0,
        "is_send_message": $("#chkSSMSNotif").is(":checked") == true ? 1 : 0
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Ticket/UpdateTicket',
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
//get All Predefine Reply List 
function GetPredefineReplyList() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Ticket/GetPredefineReplyList',
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
        url: 'http://playmediahouse.com/api/api/Ticket/UpdateTicketPredefineReply',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                CreateSuccess(data.status);
                $('#closedModel').click();
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
        url: 'http://playmediahouse.com/api/api/Ticket/GetTicketPredefineReply',
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
        'ticket_id_pk': $.session.get("asset_id_pk")
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Ticket/GetTicketPredefineReply',
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
        url: 'http://playmediahouse.com/api/api/Ticket/UpdateTicketResolutionNotes',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                CreateSuccess(data.status);
                $('#closedModel').click();
                //GetTicketPredefineReply($.session.get("ticket_id_pk"));
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
// Get Get Ticket Resolution Notes
function GetTicketResolutionNotes(ticket_id) {
    var parm = {
        'ticket_id_pk': ticket_id// $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Ticket/GetTicketResolutionNotes',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#txtResolutionNote").html(data.resolution_notes).text();
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
        url: 'http://playmediahouse.com/api/api/Problems/GetProblemMagementList',
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
            $("#ddlPriority").val(data.priority_id_pk).change();
            //  $('#ddlPriority').append('<option value=' + data.priority_id_pk + '>' + data.priority_name + '</option>');

            // alert(data.priority_id_pk);
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
function GetPriority() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/SLA/GetPriorityList',
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
//get All Employee List from People
function GetEmployeesLists() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Ticket/GetEmployeesLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlTechnician").html("").append('<option value="0">Select Technician</option>');
            $(data).each(function () {
                $('#ddlTechnician').append('<option value=' + this.id + '>' + this.name + '</option>');
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
// Get Support Group 
function GetSupportGroupEdit() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Masters/GetSupportGroup',
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
        url: 'http://playmediahouse.com/api/api/Ticket/GetAdminDetails',
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
        url: 'http://playmediahouse.com/api/api/Ticket/InsTicketReplyConversation',
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
        url: 'http://playmediahouse.com/api/api/Ticket/GetTicketConversationReplyLists',
        success: function (data) {
            $("#ddlSupportGroup").html("").append('<option value="0">Select Sub Category</option>');
            $(data).each(function () {
                //  $("#txtTechnician").append(this.ticket_id_fk);
                //$(".timeline-date text-muted").append(this.ticket_id_fk);
                // $(".timeline-item").append('<p >' + this.ticket_id_fk + '</P>');

                $(".cnv").append('<article class="timeline-item"><div class="timeline-desk"><div class= "panel"><div class="timeline-box"><span class="arrow"></span><span class="timeline-icon bg-success"><i class="mdi mdi-checkbox-blank-circle-outline"></i></span><h4 class="text-success"> ' + this.name + '</h4><p class="timeline-date text-muted"><small>' + this.created_date + '</small></p><p>' + this.reply_description + '</p><p style="margin:10px"></p></div></div></div></article>');


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
        url: 'http://playmediahouse.com/api/api/Ticket/GetAssetDetailsByTicketID',
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