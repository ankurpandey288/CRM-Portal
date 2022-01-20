$(document).ready(function () {
    

   // $(".open-left").click();
    var ticket_id = 0;
    //alert($.session.get("user_code"));
    //alert($.session.get("id"));

    //< button class="button-menu-mobile open-left waves-light waves-effect" >
    //    <i class="mdi mdi-menu"></i>
    //                </button >
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
    $(document).on('click', '.cb-element', function () {
        if ($(this).is(':checked')) {
            $("#btnEdit").show();
            $("#btnCancel").removeAttr("disabled");
            $(".FeedBack").removeAttr("disabled");
            $("#btnReOpen").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
            $("#btnStatusUpdate").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnCancel").attr("disabled", "disabled");
            $(".FeedBack").attr("disabled", "disabled");
            $("#btnReOpen").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnStatusUpdate").attr("disabled", "disabled");
            $("#btnEdit").hide();
        }
        else {
            $("#btnCancel").attr("disabled", "disabled");
            $(".FeedBack").attr("disabled", "disabled");
            $("#btnReOpen").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnStatusUpdate").attr("disabled", "disabled");
            $("#btnEdit").hide();
        }

    });
    $("#CheckAll").click(function () {
        if ($(this).is(':checked')) {
            $("#btnCancel").removeAttr("disabled");
            //$("#btnFeedBack").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
            $("#btnStatusUpdate").removeAttr("disabled");
            $("#btnEdit").show();
        } else if (!$(this).is(':checked')) {
            $("#btnCancel").attr("disabled", "disabled");
            //$("#btnFeedBack").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnStatusUpdate").attr("disabled", "disabled");
            $("#btnEdit").hide();
        }
        else {
            $("#btnCancel").attr("disabled", "disabled");
            //$("#btnFeedBack").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnStatusUpdate").attr("disabled", "disabled");
            $("#btnEdit").hide();
            $("#btnNew").show();
        }
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $("#btnConfirmDeleteYes").click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            UpdateTicketStatus($(this).attr("name"));
           // UpdateTicketStatus($(this).attr('name'));
        });
        
    });
    $("#CheckAllStatus").click(function () {
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#btnStatusUpdate').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            UpdateTicketStatus($(this).attr('name'));
        });
    });
    $("#CheckAllAsignTo").click(function () {
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#btnAsignToUpdate').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            UpdateTicketAsignTo($(this).attr('name'));
        });
    });
    $("#btnReOpen").click(function () {
        //$('.select2').select2(
        //    { dropdownParent: $('#myModalChangeStatus') });
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            GetTicketStatusListsConditionWise($(this).attr('name'));
        });
    });
    GetCommonCategory();
    $(".ddlCategory").change(function () {
        if ($(this).val() != 0) {
            GetCommonSubCategory($(this).val());
        } else {
            $("#ddlSubCategory").html("").append('<option value="0">Select Sub Category</option>');
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
    $("#btnSubmit").click(function () {
        if (validateTickets() == true) {
            InsAddNewTicket();
        } else {
            return false;
        }
    });
    $("#btnSubmitOther").click(function () { 
        if (validateTicketsOther() == true) { 
            InsAddNewTicketOther(); 
        } else {
            return false;
        }
    });
    $(document).on('click', '.editview', function () {
        // alert($(this).attr("name"));
        if ($.session.get("ticket_id_pk") != '' || $.session.get("ticket_id_pk") != null || $.session.get("ticket_id_pk") == undefined) {
            $.session.remove("ticket_id_pk");
            $.session.set("ticket_id_pk", $(this).attr("name"));
            //  window.open('/Ticket/TicketDetails');
        }

    });
    var id = $.session.get("user_code");
    var number = id.substring(4);
    var u_id = 0;
    u_id = number;
    $(".gst").change(function () {
        if ($(this).is(":checked") == true) {
            //   alert($(this).attr('id'));
            if ($(this).attr('id') == 'chkSatisfied') {
                // chkIGST
                $("#chkNotSatisfied").prop("checked", false);
            }
            else {
                $("#chkSatisfied").prop("checked", false);
            }
        }
    });
    GetTicketListsByUserId(u_id);
    //$('#btnFeedBack').click(function () {
    //    var feedbackval = $("input[name='rating']:checked").val();
    //    if (feedbackval) {
    //      //  alert(feedbackval);
    //        var val = [];
    //        $(':checkbox:checked').each(function (i) {
    //            val[i] = $(this).val();
    //          //  UpdateTicketAsignTo($(this).attr('name'));
    //            UpdateTicketFeedBack($(this).attr('name'), feedbackval);
    //        });
            
    //    }
    //});
    $('#btnFeedBack').click(function () {
        var feedbackval = $("input[name='feedback']:checked").val();
        if (feedbackval == 2) {
            var val = [];
            $(':checkbox:checked').each(function (i) {
                val[i] = $(this).val();
                UpdateTicketFeedBack($(this).attr('name'), feedbackval);
                ReopenTicketStatus($(this).attr('name'));
            });
            alert("Unsatisfied");
        } else {
            var val = [];
            $(':checkbox:checked').each(function (i) {
                val[i] = $(this).val();
                UpdateTicketFeedBack($(this).attr('name'), feedbackval);
            });
        }
        alert(feedbackval);

        //if (feedbackval) {
        //    //  alert(feedbackval);
        //    var val = [];
        //    $(':checkbox:checked').each(function (i) {
        //        val[i] = $(this).val();
        //        //  UpdateTicketAsignTo($(this).attr('name'));
        //        UpdateTicketFeedBack($(this).attr('name'), feedbackval);
        //    });

        //}
    });
    $(document).on('click', '.adminview', function () {
        GetAdminDetails($(this).attr("name"));
    });
    $(document).on('click', '.editview', function () {
        // alert($(this).attr("name"));
        if ($.session.get("ticket_id_pk") != '' || $.session.get("ticket_id_pk") != null || $.session.get("ticket_id_pk") == undefined) {
            $.session.remove("ticket_id_pk");
            $.session.set("ticket_id_pk", $(this).attr("name"));
            //  window.open('/Ticket/TicketDetails');
        }

    });
    GetSupportDepartment();
    GetClientLists();
    GetEmployeesLists();
    GetAssetList(number);
    GetPriorityList();
    //GetServiceRequest();
    GetImpact();
    GetUrgency();
    GetLocation();
    GetUser();
    GetDepartmentLists();
    $("#ddlServiceReqCategory").change(function () {
        if ($(this).val() != 0) {
            GetCommonSubCategoryServiceRequest($(this).val());
        } else {
            $("#ddlServiceReqCategory").html("").append('<option value="0">Select Sub Category</option>');
        }
    });
    $("#ddlServiceReqSubCategory").change(function () {
        if ($(this).val() != 0) {
            GetTaskTempleteTitleList($(this).val());
        } else {
            $("#ddlTitle").html("").append('<option value="0">Select Title</option>');
        }
    });
    $("#ddlTitle").change(function () {
        if ($(this).val() != 0) {
            GetServiceRequestTempleteByTitle($(this).val());
        } else {
            $("#ddlSubCategory").html("").append('<option value="0">Select Sub Category</option>');
        }
    });
    $("#btnNew").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModalNew') }
        );
    });
    $("#btnNewOther").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModalNewOther') }
        );
    });
    $("#ddlUser").change(function () {
        if ($(this).val() != 0) {
            GetAssetListForOther($(this).val());
        } else {
            $("#ddlAssetOther").html("").append('<option value="0">Select </option>');
        }
    });
});

function validateTickets() {
    var return_val = true;
    if ($('#txtSubject').val().trim() == "" || $('#txtSubject').val() == null) {
        $('#SpnSubject').show();
        return_val = false;
    } else {
        $('#SpnSubject').hide();
    }
    if ($('#ddlCategory option:selected').val() == 0) {
        $('#SpnCategory').show();
        return_val = false;
    } else {
        $('#SpnCategory').hide();
    }
    if ($('#ddlAsset option:selected').val() == 0) {
        $('#SpnAsset').show();
        return_val = false;
    } else {
        $('#SpnAsset').hide();
    }
    if ($('#ddlSubCategory option:selected').val() == 0) {
        $('#SpnSubCategory').show();
        return_val = false;
    } else {
        $('#SpnSubCategory').hide();
    }
    if ($('#txtContents').val().trim() == "" || $('#txtContents').val() == null) {
        $('#SpnContents').show();
        return_val = false;
    } else {
        $('#SpnContents').hide();
    }

    return return_val;
};
function validateTicketsOther() { 
    var return_val = true;
    if ($('#txtSubjectOther').val().trim() == "" || $('#txtSubjectOther').val() == null) {
        $('#SpnSubjectOther').show();
        return_val = false;
    } else {
        $('#SpnSubjectOther').hide();
    }
    if ($('#ddlCategoryOther option:selected').val() == 0) {
        $('#SpnCategoryOther').show();
        return_val = false;
    } else {
        $('#SpnCategoryOther').hide();
    }
    if ($('#ddlAssetOther option:selected').val() == 0) {
        $('#SpnAssetOther').show();
        return_val = false;
    } else {
        $('#SpnAssetOther').hide();
    }
    if ($('#ddlUser option:selected').val() == 0) {
        $('#SpnUser').show();
        return_val = false;
    } else {
        $('#SpnUser').hide();
    }
    if ($('#ddlSubCategoryOther option:selected').val() == 0) {
        $('#SpnSubCategoryOther').show();
        return_val = false;
    } else {
        $('#SpnSubCategoryOther').hide();
    }
    if ($('#txtContentsOther').val().trim() == "" || $('#txtContentsOther').val() == null) {
        $('#SpnContentsOther').show();
        return_val = false;
    } else {
        $('#SpnContentsOther').hide();
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
            $('.ddlCategory').html("").append('<option value="0">Select Category</option>');
            $(data).each(function () {
                $('.ddlCategory').append('<option value=' + this.common_cat_id_pk + '>' + this.category_name + '</option>');
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
            $(data).each(function () {
                $("#ddlSupportGroup").append('<option value=' + this.support_group_id_pk + '>' + this.support_dep_group_name + '</option>');
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
            $(data).each(function () {
                $('#ddlSupportOrgnisation').append('<option value=' + this.support_dep_id_pk + '>' + this.support_dep_name + '</option>');
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
            $(".ddlSubCategory").html("").append('<option value="0">Select Sub Category</option>');
            $(data).each(function () {
                $(".ddlSubCategory").append('<option value=' + this.sub_category_id_pk + '>' + this.sub_category_name + '</option>');
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
            $("#ddlAssignTo").html("").append('<option value="0">Select Employee</option>');
            $(data).each(function () {
                $("#ddlAssignTo").append('<option value=' + this.Id + '>' + this.name + '</option>');
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
            $("#ddlTechnician").html("").append('<option value="0">Select Technician</option>');
            $(data).each(function () {
                $('#ddlTechnician').append('<option value=' + this.id + '>' + this.name + '</option>');
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

//Get Assets 
function GetAssetList(asset_user) {  
    var parm = {
        "asset_user_id": asset_user,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetByUserId',
        success: function (data) {
            $("#ddlAsset").html("").append('<option value="0">Select</option>');
            $(data).each(function () {
                $("#ddlAsset").append('<option value=' + this.asset_id_pk + '>' + this.asset_name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//Get Assets Other
function GetAssetListForOther(asset_user) {
    var parm = {
        "asset_user_id": asset_user,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetByUserId',
        success: function (data) {
            $("#ddlAssetOther").html("").append('<option value="0">Select</option>');
            $(data).each(function () {
                $("#ddlAssetOther").append('<option value=' + this.asset_id_pk + '>' + this.asset_name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
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
//Get All Impact Lists
function GetImpact() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Change/GetImpact',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#ddlImpact').html("").append('<option value="0">Select Impact</option>');
            $(data).each(function () {
                $('#ddlImpact').append('<option value=' + this.impact_id_pk + '>' + this.impact_name + '</option>');
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
        url: 'http://playmediahouse.com/api/api/SLA/GetUrgencyList',
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
//Get All Location Lists
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
//Get All User Lists
function GetUser() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Staff/GetUserLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#ddlUser').html("").append('<option value="0">Select User</option>');
            $(data).each(function () {
                $('#ddlUser').append('<option value=' + this.user_id_pk + '>' + this.user_name + '</option>');
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
        "asset_id_pk": $("#ddlAsset option:selected").val().trim(),
        "common_cat_id_pk": $("#ddlCategory option:selected").val().trim(),
        "sub_category_id_pk": $("#ddlSubCategory option:selected").val().trim(),
        "message": $("#txtContents").val().trim(),
        "created_by": $.session.get("user_code")

    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Ticket/InsAddNewTicketUserSide',
        success: function (data) {
            ticket_id = data.ticket_id_pk
            //alert(ticket_id);
            if (data.status_id != 0) {
                //  alert(data.status);
                successnotify(data.status);
                $("#ClrTicket").find("input").val("");
                $("#ClrTicket").find("select").val(0).change();
                $('#closedModel').click();
                GetTicketListsByUserId($.session.get("user_code"));
                var id = $.session.get("user_code");
                var number = id.substring(4);
                GetUserForSendEmail(number);
            } else {
                // alert(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Add New Tickets Other User
function InsAddNewTicketOther() { 
    var parm = {
        "subject": $("#txtSubjectOther").val().trim(),
        "asset_id_pk": $("#ddlAssetOther option:selected").val().trim(),
        "common_cat_id_pk": $("#ddlCategoryOther option:selected").val().trim(),
        "sub_category_id_pk": $("#ddlSubCategoryOther option:selected").val().trim(),
        "message": $("#txtContentsOther").val().trim(),
        "created_by": $.session.get("user_code"),
        "user_id_fk": $("#ddlUser option:selected").val().trim()  
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Ticket/InsAddNewTicketUserSideForOther',
        success: function (data) {
            ticket_id = data.ticket_id_pk
            //alert(ticket_id);
            if (data.status_id != 0) {
                //  alert(data.status);
                successnotify(data.status);
                $("#ClrTicket").find("input").val("");
                $("#ClrTicket").find("select").val(0).change();
                $('#closedModel').click();
                GetTicketListsByUserId($.session.get("user_code"));
                var id = $.session.get("user_code");
                var number = id.substring(4);
                GetUserForSendEmail(number);
            } else {
                // alert(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get Ticket Lists 
function GetTicketListsByUserId(user_id) {
    var parm = {
        'user_id_fk': user_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Ticket/GetTicketListsByUserId',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            //alert(data.status);
            var table;
            if ($.fn.dataTable.isDataTable('#tblTicket')) {
                table = $('#tblTicket').DataTable();
            } else {
                table = $('#tblTicket').DataTable();
            }
            table.destroy();
            $("#tblTicket").DataTable({
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
                        data: 'ticket_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (ticket_id_pk) {
                            return '<input id="check" class="cb-element checkbox feedback" name="' + ticket_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    {
                        data: 'ticket_id_pk', render: function (ticket_id_pk, type, row) {
                            return ' <a href="/UserDashBoard/IncidentDetails" title="Critical" class="editview"  name="' + ticket_id_pk + '">  <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Critical" style="color:#ea2d2d !important" title="Normal priority" data-original-title="Normal priority"></i>   &nbsp; <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp;' + row.prefix + + row.ticket_id_pk + ' </a>';


                        }
                    },
                    { data: 'subject' },
                    {
                        data: 'name',
                        sWidth: '140px',
                        sClass: "view",
                        bSortable: false,
                        render: function (name) {
                            return '<a href="#" class="adminview"  name="' + name + '" data-toggle="modal" data-target="#myModalAdminDetails" >  <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i>  &nbsp;  ' + name + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
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
                        data: "status",
                        render: function (status) {
                            // Check if blank
                            if (status === "New") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Closed") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Assigned") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#b3ae1f;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "In Progress") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#3bc0c3 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Pending") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#de7b00;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Resolved") {
                                //$("#btnReOpen").removeAttr("disabled");
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Reopened") {
                                return '<span class="badge badge-primary" style="background-color:#f24f7c !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Cancel") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + status + '</span>';
                            }
                            // If not blank display data normally
                            //   return '<span class="badge badge-primary DISABLED" style="background-color:#2ca04a;" name="' + status + '">' + status + '</span>';
                            //  return ' <input type="checkbox" class="custom-switch" checked name="switch1" data-textOn="ON" data-textOff="OFF" data - trackColorOn="#512DA8" data - trackColorOff="#616161" data - textColorOff="#fff" data - trackBorderColor="#555" >'; 
                        }
                    },
                    {
                        data: 'status', render: function (status, type, row) {
                            if (status == "Closed") {
                               // alert(status);
                                if (row.feedback == null) {
                                   
                                    return '<button  href="" disabled="disabled" class="FeedBack" data-toggle="modal" data-target="#myModalFeedBack" name="' + status + '">'+ 'Submit Feedback' +  '</button>';
                                } else if (row.feedback == 1) {
                                    return '<span class="fa fa-star checked"> </span>';
                                } else if (row.feedback == 2) {
                                    return '<span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span>';
                                } else if (row.feedback == 3) {
                                    return '<span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span>';
                                } else if (row.feedback == 4) {
                                    return '<span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span>';
                                } else if (row.feedback == 5) {
                                    return '<span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span>';
                                }
                            } else if (status == "Resolved") {
                                if (row.feedback == null) {
                                    //  alert(row.ticket_id_pk); 
                                    return '<button  href="" disabled="disabled" class="FeedBack" data-toggle="modal" data-target="#myModalFeedBack" name="' + status + '">' + 'Submit Feedback' + '</button>';
                                } else if (row.feedback == 1) {
                                    return '<span class="fa fa-star checked"> </span>';
                                } else if (row.feedback == 2) {
                                    return '<span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span>';
                                } else if (row.feedback == 3) {
                                    return '<span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span>';
                                } else if (row.feedback == 4) {
                                    return '<span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span>';
                                } else if (row.feedback == 5) {
                                    return '<span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span>';
                                }
                            }
                            else {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + 'N/A' + '</span>';
                            }

                         //   return ' <a href="#" title="Critical" class="editview"  name="' + ticket_id_pk + '">  <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Critical" style="color:#ea2d2d !important" title="Normal priority" data-original-title="Normal priority"></i>   &nbsp;' + row.prefix + + row.ticket_id_pk + ' </a>';


                        }
                    },
                    //{
                    //    data: "status",
                    //    render: function (status) {
                    //        // Check if blank
                    //        if (status === "New") {
                    //            return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + status + '">' + status + '</span> <i class="fa fa-pencil-square-o" aria-hidden="true"></i>';
                    //        }
                    //        else if (status === "Closed") {
                    //            return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + status + '</span>';
                    //        }
                    //        else if (status === "Assigned") {
                    //            return '<span class="badge badge-primary ENABLED" style="background-color:#b3ae1f;" name="' + status + '">' + status + '</span>';
                    //        }
                    //        else if (status === "In Progress") {
                    //            return '<span class="badge badge-primary ENABLED" style="background-color:#3bc0c3 !important;" name="' + status + '">' + status + '</span>';
                    //        }
                    //        else if (status === "Pending") {
                    //            return '<span class="badge badge-primary ENABLED" style="background-color:#de7b00;" name="' + status + '">' + status + '</span>';
                    //        }
                    //        else if (status === "Resolved") {
                    //            return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                    //        }
                    //        else if (status === "Reopened") {
                    //            return '<span class="badge badge-primary" style="background-color:#f24f7c !important;" name="' + status + '">' + status + '</span>';
                    //        }
                    //        // If not blank display data normally
                    //        //   return '<span class="badge badge-primary DISABLED" style="background-color:#2ca04a;" name="' + status + '">' + status + '</span>';
                    //        //  return ' <input type="checkbox" class="custom-switch" checked name="switch1" data-textOn="ON" data-textOff="OFF" data - trackColorOn="#512DA8" data - trackColorOff="#616161" data - textColorOff="#fff" data - trackBorderColor="#555" >'; 
                    //    }
                    //},
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
//Get Ticket Status Condition Wise 
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
        url: 'http://playmediahouse.com/api/api/Ticket/GetTicketStatusListsConditionWiseUserSide',
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
// Get User Details
function GetUserForSendEmail(user_id_pk) {
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
            SendEmailTicketCreate(data.email,'INC00'+''+ticket_id, data.user_name, 'Ticket Status :  New ')
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Update Tickets Status  
function UpdateTicketFeedBack(ticket_id,feedback) { 
    var parm = {
        "ticket_id_pk": ticket_id,
        "feedback": feedback,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Ticket/UpdateTicketFeedBack',
        success: function (data) {
            //alert(data.ticket_id_pk);
            //alert(data.ticket_status_id_pk);
            if (data.status_id != 0) {
                CreateSuccess(data.status);
                $('#closedModelFeedBack').click();
                var id = $.session.get("user_code");
                var number = id.substring(4);
                var u_id = 0;
                u_id = number;
                GetTicketListsByUserId(u_id);
               // $(".cb-element").prop("checked", false);
            } else {
                $('#closedModelStatus').click();
                //CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
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
// 
// Update Tickets Status  
function UpdateTicketStatus(ticket_id) {
    var parm = {
        "ticket_id_pk": ticket_id,
        "ticket_status_id_pk": 8,
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
        url: 'http://playmediahouse.com/api/api/Ticket/UpdateTicketStatus',
        success: function (data) {
            if (data.status_id != 0) {
                CreateSuccess(data.status);
                var id = $.session.get("user_code");
                var number = id.substring(4);
                var u_id = 0;
                u_id = number;
                GetTicketListsByUserId(u_id);
                $('#ModalClose').click();
              
                $(".cb-element").prop("checked", false);
            } else {
                $('#closedModelStatus').click();
                //CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Update Tickets Status  
function ReopenTicketStatus(ticket_id) {
    var parm = {
        "ticket_id_pk": ticket_id,
        "ticket_status_id_pk": 6, 
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
        url: 'http://playmediahouse.com/api/api/Ticket/UpdateTicketStatus',
        success: function (data) {
            if (data.status_id != 0) {
                CreateSuccess(data.status);
                var id = $.session.get("user_code");
                var number = id.substring(4);
                var u_id = 0;
                u_id = number;
                GetTicketListsByUserId(u_id);
                $('#ModalClose').click();

                $(".cb-element").prop("checked", false);
            } else {
                $('#closedModelStatus').click();
                //CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
