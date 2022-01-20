$(document).ready(function () {
    //$(".open-left").click();
    //var id = $(this).attr("id");
    //var number = id.substring(1);
    var id = $.session.get("user_code");
    var number = id.substring(4);
    var u_id = 0;
    u_id = number;
    //alert(u_id);
    GetServiceRequestDetailsByUserId(u_id);

   // alert(number);
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
            $("#btnAssignTo").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
            $("#btnStatusUpdate").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnStatusUpdate").attr("disabled", "disabled");
            $("#btnEdit").hide();
        }
        else {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnStatusUpdate").attr("disabled", "disabled");
            $("#btnEdit").hide();
        }

    });
    $("#CheckAll").click(function () {
        if ($(this).is(':checked')) {
            $("#btnAssignTo").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
            $("#btnStatusUpdate").removeAttr("disabled");
            $("#btnEdit").show();
        } else if (!$(this).is(':checked')) {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnStatusUpdate").attr("disabled", "disabled");
            $("#btnEdit").hide();
        }
        else {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnStatusUpdate").attr("disabled", "disabled");
            $("#btnEdit").hide();
            $("#btnNew").show();
        }
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#BtnDelete').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            $("#btnEdit").hide();
            deleteTicket($(this).attr('name'));
            $(".cb-element").prop("checked", false);
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
    GetCommonCategory();
    $("#ddlCategory").change(function () {
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
    $("#btnSubmitRequest").click(function () {
        if (validateServiceRequest() == true) {
            InsServiceRequest();
        } else {
            return false;
        }
    });

   
    $(document).on('click', '.adminview', function () {
        GetAdminDetails($(this).attr("name"));
    });

    GetCommonCategoryServiceRequest();
    // GetTicketLists();
    GetSupportDepartment();
    GetClientLists();
    GetEmployeesLists();
    GetAssetList();
    GetPriorityList();
    // GetServiceRequest();
   // GetServiceRequestDetailsByUserId($.session.get("user_code"));
    GetTicketListsByUserId($.session.get("user_code"));
    GetServiceRequestDetailsByUserIdTopLatest($.session.get("user_code"));
    GetTicketListsByUserIdTopLatest($.session.get("user_code"));
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
            //alert("Inserted Successfully");
            if (data.status_id != 0) {
                //  alert(data.status);
                successnotify(data.status);
                $("#ClrTicket").find("input").val("");
                $("#ClrTicket").find("select").val(0).change();
                $('#closedModel').click();
                GetTicketLists();
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
function GetTicketLists() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Ticket/GetTicketLists',
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

                    //{
                    //    data: 'ticket_id_pk',
                    //    sWidth: '2px',
                    //    sClass: "view",
                    //    bSortable: false,
                    //    render: function (ticket_id_pk) {
                    //        return '<input id="check" class="cb-element checkbox" name="' + ticket_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                    //    }
                    //},
                    {
                        data: 'ticket_id_pk', render: function (ticket_id_pk, type, row) {
                            // Combine the first and last names into a single table field
                            //return '<a href="/Ticket/TicketDetails" class="editview"  name="' + ticket_id_pk + '">' + row.prefix + + row.ticket_id_pk +'  <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="" style="color:#f39c12 !important" data-original-title="Normal priority"></i></a>';
                            if (row.priority_id_pk === 1) {
                                return ' <a href="/Ticket/TicketDetails" title="Critical" class="editview"  name="' + ticket_id_pk + '">  <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Critical" style="color:#ea2d2d !important" title="Normal priority" data-original-title="Normal priority"></i>   &nbsp;' + row.prefix + + row.ticket_id_pk + ' </a>';
                                // return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + status + '">' + status + '</span>';
                            }
                            else if (row.priority_id_pk === 2) {
                                return ' <a href="/Ticket/TicketDetails" title="High" class="editview"  name="' + ticket_id_pk + '">  <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="High" style="color:#b38909 !important" title="Normal priority" data-original-title="Normal priority"></i>   &nbsp;' + row.prefix + + row.ticket_id_pk + '</a>';
                                // return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (row.priority_id_pk === 3) {
                                return ' <a href="/Ticket/TicketDetails" title="Medium" class="editview"  name="' + ticket_id_pk + '"> <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Medium" style="color:#ffee07 !important" data-original-title="Normal priority"></i>   &nbsp;' + row.prefix + + row.ticket_id_pk + '</a>';
                                // return '<span class="badge badge-primary ENABLED" style="background-color:#b3ae1f;" name="' + status + '">' + status + '</span>';
                            }
                            else if (row.priority_id_pk === 4) {
                                return ' <a href="/Ticket/TicketDetails" title="Low" class="editview"  name="' + ticket_id_pk + '"> <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Low" style="color:#067304ad  !important" data-original-title="Normal priority"></i>   &nbsp;' + row.prefix + + row.ticket_id_pk + '</a>';
                                //  return '<span class="badge badge-primary ENABLED" style="background-color:#3bc0c3 !important;" name="' + status + '">' + status + '</span>';
                            }

                        }
                    },
                    //{
                    //    data: 'prefix',
                    //    sWidth: '140px',
                    //    sClass: "view",
                    //    bSortable: false,
                    //    render: function (prefix) {
                    //    //    if (status == "Closed") {
                    //            return '<a href="/Ticket/TicketDetails" class="editview"  name="' + ticket_id_pk + '"><i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#1a4ba9 !important" data-original-title="Normal priority"></i>' + prefix + '</a>';
                    //      //  }
                    //        //else {
                    //        //    return '<a href="/Ticket/TicketDetails" class="editview"  name="' + ticket_id_pk + '">  ' + ticket_id_pk + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                    //        //}

                    //    }
                    //},
                    //{ data: 'ticket_id_pk' },
                    { data: 'subject' },
                    { data: 'email' },
                    {
                        data: 'name',
                        sWidth: '140px',
                        sClass: "view",
                        bSortable: false,
                        render: function (name) {
                            return '<a href="#" class="adminview"  name="' + name + '" data-toggle="modal" data-target="#myModal" >  <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i>  &nbsp;  ' + name + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    //{ data: 'name' },
                    // { data: 'created_date' },
                    {
                        "data": "created_date",
                        "type": "date",
                        "render":
                            function (data, type, full) {
                                return (data) ? moment(data).format('DD/MM/YYYY  -  HH:mm:ss') : '';
                            }
                    },
                    //  { data: 'status' }
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
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Reopened") {
                                return '<span class="badge badge-primary" style="background-color:#f24f7c !important;" name="' + status + '">' + status + '</span>';
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
            });
        },

        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
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
                $("#tbodyEmployeeDetails").append("<tr><td>" + this.id + "</td><td>" + this.email + "</td><td>" + this.Name + "</td><td>" + this.mobile + "</td><td>" + this.title + "</td></tr>");
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
function deleteTicket(ticket_id) {
    var parm = {
        "ticket_id_pk": ticket_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Ticket/DeleteTicketByID',
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



function validateServiceRequest() {
    var return_val = true;
    if ($('#ddlTitle option:selected').val() == 0) {
        $('#SpnTitle').show();
        return_val = false;
    } else {
        $('#SpnTitle').hide();
    }
    if ($('#ddlServiceReqCategory option:selected').val() == 0) {
        $('#SpnServiceReqCategory').show();
        return_val = false;
    } else {
        $('#SpnServiceReqCategory').hide();
    }
    if ($('#ddlServiceReqSubCategory option:selected').val() == 0) {
        $('#SpnServiceReqSubCategory').show();
        return_val = false;
    } else {
        $('#SpnServiceReqSubCategory').hide();
    }
    if ($('#txtContentsServiceRequest').val().trim() == "" || $('#txtContentsServiceRequest').val() == null) {
        $('#SpnContentsServiceRequest').show();
        return_val = false;
    } else {
        $('#SpnContentsServiceRequest').hide();
    }
    return return_val;
};


//Get Common Category Lists
function GetCommonCategoryServiceRequest() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/GetServiceRequestTempleteCategory',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlServiceReqCategory').html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $('#ddlServiceReqCategory').append('<option value=' + this.common_cat_id_pk + '>' + this.category_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Sub Category Lists
function GetCommonSubCategoryServiceRequest(common_cat_id_pk) {
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
            $("#ddlServiceReqSubCategory").html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $("#ddlServiceReqSubCategory").append('<option value=' + this.sub_category_id_pk + '>' + this.sub_category_name + '</option>');
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
//Get Task For Edit
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
            $("#ddlSupportOrgnisation").val(data.support_dep_id_pk).change();
            $("#ddlSupportGroup").val(data.support_group_id_fk).change();
            $("#ddlClient").val(data.client_id_pk).change();
            $("#ddlAsset").val(data.asset_id_pk).change();
            // $("#ddlCategory").val(data.common_cat_id_pk).change();
            $("#ddlTechnician").val(data.admin_id).change().change();
            $("#txtContents").val(data.message);
            $("#ddlPriority").val(data.priority_id_pk).change();
            $("#ddlLoggedVia").val(data.logged_via);
            $("#ddlDepartmentName").val(data.department_id_fk).change();
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
        url: 'http://playmediahouse.com/api/api/ServiceRequests/InsServiceRequestByUser',
        success: function (data) {
            //alert("Inserted Successfully");
            if (data.status_id != 0) {
                //  alert(data.status);
                successnotify(data.status);
                $("#ClrTicket").find("input").val("");
                $("#ClrTicket").find("select").val(0).change();
                // GetServiceRequest();
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
//function GetServiceRequest() {
//    $.ajax({
//        type: "Get",
//        contentType: "application/json; charset=utf-8",
//        url: 'http://playmediahouse.com/api/api/ServiceRequests/GetServiceRequest',
//        dataType: "json",
//        success: function (data) {


//            //alert(data.status);
//            var table;
//            if ($.fn.dataTable.isDataTable('#tblServiceRequest')) {
//                table = $('#tblServiceRequest').DataTable();
//            } else {
//                table = $('#tblServiceRequest').DataTable();
//            }
//            table.destroy();
//            $("#tblServiceRequest").DataTable({
//                data: data,
//                paging: true,
//                sort: false,
//                searching: true,
//                ordering: true,
//                order: [],
//                lengthMenu: [
//                    [10, 25, 50, -1],
//                    ['10 rows', '25 rows', '50 rows', 'Show all']
//                ],
//                responsive: true,
//                columns: [

//                    //{
//                    //    data: 'service_req_id_pk',
//                    //    sWidth: '2px',
//                    //    sClass: "view",
//                    //    bSortable: false,
//                    //    render: function (service_req_id_pk) {
//                    //        return '<input id="check" class="cb-element checkbox" name="' + service_req_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
//                    //    }
//                    //},

//                    {
//                        data: 'service_req_id_pk', render: function (service_req_id_pk, type, row) {
//                            //  return row.ticket_id_pk + ' ' + row.prefix;
//                            // return '<a href="/ServiceRequests/ServiceRequestsDetails" class="editview"  name="' + service_req_id_pk + '">' + row.prefix + + row.service_req_id_pk + '</a>';

//                            if (row.priority_id_pk === 1) {
//                                return ' <a href="/ServiceRequests/ServiceRequestsDetails" title="Critical" class="editview"  name="' + service_req_id_pk + '"> <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Critical" style="color:#ea2d2d !important" title="Normal priority" data-original-title="Normal priority"></i> &nbsp;' + row.prefix + + row.service_req_id_pk + ' </a>';
//                                // return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + status + '">' + status + '</span>';
//                            }
//                            else if (row.priority_id_pk === 2) {
//                                return ' <a href="/ServiceRequests/ServiceRequestsDetails" title="High" class="editview"  name="' + service_req_id_pk + '"><i class="fa fa-flag fa-fw" data-toggle="tooltip" title="High" style="color:#f1a008 !important" title="Normal priority" data-original-title="Normal priority"></i> &nbsp;' + row.prefix + + row.service_req_id_pk + '</a>';
//                                // return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + status + '</span>';
//                            }
//                            else if (row.priority_id_pk === 3) {
//                                return ' <a href="/ServiceRequests/ServiceRequestsDetails" title="Medium" class="editview"  name="' + service_req_id_pk + '"> <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Medium" style="color:#ffc107 !important" data-original-title="Normal priority"></i>  &nbsp;' + row.prefix + + row.service_req_id_pk + '</a>';
//                                // return '<span class="badge badge-primary ENABLED" style="background-color:#b3ae1f;" name="' + status + '">' + status + '</span>';
//                            }
//                            else if (row.priority_id_pk === 4) {
//                                return ' <a href="/ServiceRequests/ServiceRequestsDetails" title="Low" class="editview"  name="' + service_req_id_pk + '"> <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Low" style="color:#067304ad  !important" data-original-title="Normal priority"></i>  &nbsp;' + row.prefix + + row.service_req_id_pk + '</a>';
//                                //  return '<span class="badge badge-primary ENABLED" style="background-color:#3bc0c3 !important;" name="' + status + '">' + status + '</span>';
//                            }
//                        }
//                    },
//                    //{
//                    //    data: 'prefix',
//                    //    sWidth: '140px',
//                    //    sClass: "view",
//                    //    bSortable: false,
//                    //    render: function (prefix) {
//                    //    //    if (status == "Closed") {
//                    //            return '<a href="/Ticket/TicketDetails" class="editview"  name="' + ticket_id_pk + '"><i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#1a4ba9 !important" data-original-title="Normal priority"></i>' + prefix + '</a>';
//                    //      //  }
//                    //        //else {
//                    //        //    return '<a href="/Ticket/TicketDetails" class="editview"  name="' + ticket_id_pk + '">  ' + ticket_id_pk + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
//                    //        //}

//                    //    }
//                    //},
//                    //{ data: 'ticket_id_pk' },
//                    {
//                        data: 'subject',
//                        sWidth: '200px'
//                    },
//                    { data: 'email' },
//                    {
//                        data: 'name',
//                        sWidth: '140px',
//                        sClass: "view",
//                        bSortable: false,
//                        render: function (name) {
//                            return '<a href="#" class="adminview"  name="' + name + '" data-toggle="modal" data-target="#myModal" ><i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#1a4ba9 !important" data-original-title="Normal priority"></i>  &nbsp;' + name + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
//                        }
//                    },
//                    //{ data: 'name' },
//                    {
//                        "data": "created_date",
//                        "type": "date",
//                        "render":
//                            function (data, type, full) {
//                                return (data) ? moment(data).format('DD/MM/YYYY  -  HH:mm:ss') : '';
//                            }
//                    },
//                    //{
//                    //    "data": "created_date",
//                    //    "type": "date",
//                    //    "render":
//                    //        function (data, type, full) {
//                    //            return (data) ? moment(data).format('DD/MM/YYYY') : '';
//                    //        }
//                    //},
//                    //  { data: 'status' }
//                    {
//                        data: "status",
//                        render: function (status) {
//                            // Check if blank
//                            if (status === "New") {
//                                return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + status + '">' + status + '</span>';
//                            }
//                            else if (status === "Closed") {
//                                return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + status + '</span>';
//                            }
//                            else if (status === "Assigned") {
//                                return '<span class="badge badge-primary ENABLED" style="background-color:#b3ae1f;" name="' + status + '">' + status + '</span>';
//                            }
//                            else if (status === "In Progress") {
//                                return '<span class="badge badge-primary ENABLED" style="background-color:#3bc0c3 !important;" name="' + status + '">' + status + '</span>';
//                            }
//                            else if (status === "Pending") {
//                                return '<span class="badge badge-primary ENABLED" style="background-color:#de7b00;" name="' + status + '">' + status + '</span>';
//                            }
//                            else if (status === "Resolved") {
//                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
//                            }
//                            else if (status === "Reopened") {
//                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
//                            }
//                            // If not blank display data normally
//                            //   return '<span class="badge badge-primary DISABLED" style="background-color:#2ca04a;" name="' + status + '">' + status + '</span>';
//                            //  return ' <input type="checkbox" class="custom-switch" checked name="switch1" data-textOn="ON" data-textOff="OFF" data - trackColorOn="#512DA8" data - trackColorOff="#616161" data - textColorOff="#fff" data - trackBorderColor="#555" >'; 
//                        }
//                    },
//                ],
//                dom: 'Bflrtip',
//                buttons: [
//                    {
//                        extend: 'copyHtml5',
//                        text: '<i class="fa fa-files-o fa-2x"></i>',
//                        titleAttr: 'Copy'
//                    },
//                    {
//                        extend: 'excelHtml5',
//                        text: '<i class="fa fa-file-excel-o fa-2x" style="color:green"></i>',
//                        titleAttr: 'Excel'
//                    },
//                    {
//                        extend: 'pdfHtml5',
//                        text: '<i class="fa fa-file-pdf-o fa-2x" style="color:red"></i>',
//                        titleAttr: 'PDF'
//                    }
//                ]
//            });
//        },

//        error: function (edata) {
//            alert("error while feching record.");
//        }
//    });
//};
//Get Task For Edit
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
            $("#txtContentsServiceRequest").val(data.message);
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};

function GetServiceRequestDetailsByUserId(user_id) {
    var parm = {
        'user_id_fk': user_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/GetServiceRequestDetailsByUserId',
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
                            return ' <a href="#" title="Critical" class="editview"  name="' + service_req_id_pk + '">  &nbsp;' + row.prefix + + row.service_req_id_pk + ' </a>';
                        }
                    },
                    {
                        data: 'subject',
                        sWidth: '200px'
                    },
                    {
                        data: 'name',
                        sWidth: '140px',
                        sClass: "view",
                        bSortable: false,
                        render: function (name) {
                            return '<a href="#" class="adminview"  name="' + name + '" data-toggle="modal" data-target="#myModal" ><i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#1a4ba9 !important" data-original-title="Normal priority"></i>  &nbsp;' + name + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
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
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Reopened") {
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            // If not blank display data normally
                            //   return '<span class="badge badge-primary DISABLED" style="background-color:#2ca04a;" name="' + status + '">' + status + '</span>';
                            //  return ' <input type="checkbox" class="custom-switch" checked name="switch1" data-textOn="ON" data-textOff="OFF" data - trackColorOn="#512DA8" data - trackColorOff="#616161" data - textColorOff="#fff" data - trackBorderColor="#555" >'; 
                        }
                    },
                    {
                        data: 'status', render: function (status, type, row) {
                            if (status != "Closed") {
                                // alert(status);
                                if (row.feedback == null) {
                                    //  alert(row.ticket_id_pk);
                                    return '<a  href="" data-toggle="modal" data-target="#myModalFeedBack" name="' + status + '">' + 'Submit Feedback' + '<a>';
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
function GetTicketListsByUserId(created_by) {
    var parm = {
        'created_by': created_by
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
                            return '<input id="check" class="cb-element checkbox" name="' + ticket_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    {
                        data: 'ticket_id_pk', render: function (ticket_id_pk, type, row) {
                            return ' <a href="#" title="Critical" class="editview"  name="' + ticket_id_pk + '">  <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Critical" style="color:#ea2d2d !important" title="Normal priority" data-original-title="Normal priority"></i>   &nbsp;' + row.prefix + + row.ticket_id_pk + ' </a>';


                        }
                    },
                    { data: 'subject' },
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
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Reopened") {
                                return '<span class="badge badge-primary" style="background-color:#f24f7c !important;" name="' + status + '">' + status + '</span>';
                            }
                            // If not blank display data normally
                            //   return '<span class="badge badge-primary DISABLED" style="background-color:#2ca04a;" name="' + status + '">' + status + '</span>';
                            //  return ' <input type="checkbox" class="custom-switch" checked name="switch1" data-textOn="ON" data-textOff="OFF" data - trackColorOn="#512DA8" data - trackColorOff="#616161" data - textColorOff="#fff" data - trackBorderColor="#555" >'; 
                        }
                    },
                    {
                        data: 'status', render: function (status, type, row) {
                            if (status === "Closed") {
                                //if (row. === "Closed") {

                                //}
                            }
                            else {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + 'N/A' + '</span>';
                            }

                            return ' <a href="#" title="Critical" class="editview"  name="' + ticket_id_pk + '">  <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Critical" style="color:#ea2d2d !important" title="Normal priority" data-original-title="Normal priority"></i>   &nbsp;' + row.prefix + + row.ticket_id_pk + ' </a>';


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

// Ticket Details List Top 5
function GetTicketListsByUserIdTopLatest(created_by) {
    var parm = {
        'created_by': created_by
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Ticket/GetTicketListsByUserIdTopLatest',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            //alert(data.status);
            var table;
            if ($.fn.dataTable.isDataTable('#tblTicketLatest')) {
                table = $('#tblTicketLatest').DataTable();
            } else {
                table = $('#tblTicketLatest').DataTable();
            }
            table.destroy();
            $("#tblTicketLatest").DataTable({
                data: data,
                paging: false,
                sort: false,
                searching: false,
                ordering: true,
                order: [],
                lengthMenu: [
                    [10, 25, 50, -1],
                    ['10 rows', '25 rows', '50 rows', 'Show all']
                ],
                responsive: true,
                columns: [
                    {
                        data: 'ticket_id_pk', render: function (ticket_id_pk, type, row) {
                            return ' <a href="#" title="Critical" class="editview"  name="' + ticket_id_pk + '">  <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Critical" style="color:#ea2d2d !important" title="Normal priority" data-original-title="Normal priority"></i>   &nbsp;' + row.prefix + + row.ticket_id_pk + ' </a>';
                        }
                    },
                    { data: 'subject' },
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
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Reopened") {
                                return '<span class="badge badge-primary" style="background-color:#f24f7c !important;" name="' + status + '">' + status + '</span>';
                            }
                            // If not blank display data normally
                            //   return '<span class="badge badge-primary DISABLED" style="background-color:#2ca04a;" name="' + status + '">' + status + '</span>';
                            //  return ' <input type="checkbox" class="custom-switch" checked name="switch1" data-textOn="ON" data-textOff="OFF" data - trackColorOn="#512DA8" data - trackColorOff="#616161" data - textColorOff="#fff" data - trackBorderColor="#555" >'; 
                        }
                    },
                ],

            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Service Request Details List Top 5
function GetServiceRequestDetailsByUserIdTopLatest(created_by) {
    var parm = {
        'created_by': created_by
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/GetServiceRequestDetailsByUserIdTopLatest',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            //alert(data.status);
            var table;
            if ($.fn.dataTable.isDataTable('#tblServiceRequestLatest')) {
                table = $('#tblServiceRequestLatest').DataTable();
            } else {
                table = $('#tblServiceRequestLatest').DataTable();
            }
            table.destroy();
            $("#tblServiceRequestLatest").DataTable({
                data: data,
                paging: false,
                sort: false,
                searching: false,
                ordering: true,
                order: [],
                lengthMenu: [
                    [10, 25, 50, -1],
                    ['10 rows', '25 rows', '50 rows', 'Show all']
                ],
                responsive: true,
                columns: [
                    {
                        data: 'service_req_id_pk', render: function (service_req_id_pk, type, row) {
                            return ' <a href="#" title="Critical" class="editview"  name="' + service_req_id_pk + '">  &nbsp;' + row.prefix + + row.service_req_id_pk + ' </a>';
                        }
                    },
                    {
                        data: 'subject',
                        sWidth: '200px'
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
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Reopened") {
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            // If not blank display data normally
                            //   return '<span class="badge badge-primary DISABLED" style="background-color:#2ca04a;" name="' + status + '">' + status + '</span>';
                            //  return ' <input type="checkbox" class="custom-switch" checked name="switch1" data-textOn="ON" data-textOff="OFF" data - trackColorOn="#512DA8" data - trackColorOff="#616161" data - textColorOff="#fff" data - trackBorderColor="#555" >'; 
                        }
                    },
                ],

            });
        },
        error: function (edata) {
            alert("error while feching record.");
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
