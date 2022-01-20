$(document).ready(function () {
    if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
        window.location.href = "/Login/Index/";
    };
   //// $("#ddlUrgency").val("4").change();
   // $('#ddlUrgency').html("").append('<option value="4"> Low </option>').change();
  //  $("#ddlUrgency select").val("4");
    $('#ddlApprovalRequired').change(function () {
        if ($(this).val() == 2) {
            $(".LstOrNotLst").show();
        } else {
            $(".LstOrNotLst").hide();
        }
    });
    $('#ddlPurchaseRequired').change(function () {
        if ($(this).val() == 2) {
            $("#DivPurCost").show();
        } else {
            $("#DivPurCost").hide();
        }
    });
    
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
            alert("Value Checked");
        }
    });
    $(document).on('click', '.cb-element', function () {
        if ($(this).is(':checked')) {
            $("#btnAssignTo").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
        }
        else {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
        }
    });
    $("#CheckAll").click(function () {
        if ($(this).is(':checked')) {
            $("#btnAssignTo").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
        }
        else {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
        }
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#btnAssignTo').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            GetServiceRequestTempleteByTitle($(this).attr('name'));
        });
        $("#myModalLabelNew").hide(); $("#myModalLabelEdit").show();
        $("#btnSubmit").hide(); $("#btnUpdate").show();
    });
    $("#btnUpdate").click(function () {
        if (validateServiceRequest() == true) {
            var val = [];
            $(':checkbox:checked').each(function (i) {
                val[i] = $(this).val();
                var countries = [];
                $.each($(".country option:selected"), function () {
                    countries.push($(this).val());
                });
                UpdateServiceRequestTemplete($(this).attr('name'), countries.join(", "));
            });
        } else {
            return false;
        }
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
            $(".cb-element").prop("checked", false);
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
            $(".cb-element").prop("checked", false);
        });
    });
    GetCommonCategory();
    GetSupportDepartment();
    GetClientLists();
    GetEmployeesLists();
    GetAssetList();
    GetPriority();
    GetServiceRequest();
   // GetImpact();
    GetUrgency();
    GetLocation();
    GetUser();
    GetDepartmentLists();
    GetImpactList();
  //  GetPriorityList();
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
        //var countries = [];
        //$.each($(".country option:selected"), function () {
        //    countries.push($(this).text());
        //});
        //alert(countries.join(", "));

        //var selectedValues = $('#ddlOtherApprover').text();
        //alert(selectedValues);
        
        if (validateServiceRequest() == true) {
          var countries = [];
          $.each($(".country option:selected"), function () {
              countries.push($(this).val());
            });
            InsServiceRequestTemplete(countries.join(", "));
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
    $("#btnNew").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModalNew') }
        );
    });
});

function validateServiceRequest() {
    var return_val = true;
    if ($('#txtSubject').val().trim() == "" || $('#txtSubject').val() == null) {
        $('#SpnSubject').show();
        return_val = false;
    } else {
        $('#SpnSubject').hide();
    }
    if ($('#ddlDepartmentName option:selected').val() == 0) {
        $('#SpnDepartmentName').show();
        return_val = false;
    } else {
        $('#SpnDepartmentName').hide();
    }
    if ($('#ddlLoggedVia option:selected').val() == 0) {
        $('#SpnLoggedVia').show();
        return_val = false;
    } else {
        $('#SpnLoggedVia').hide();
    }
    if ($('#ddlLocation option:selected').val() == 0) {
        $('#SpnLocation').show();
        return_val = false;
    } else {
        $('#SpnLocation').hide();
    }
    //if ($('#ddlUrgency option:selected').val() == 0) {
    //    $('#SpnUrgency').show();
    //    return_val = false;
    //} else {
    //    $('#SpnUrgency').hide();
    //}
    //if ($('#ddlImpact option:selected').val() == 0) {
    //    $('#SpnImpact').show();
    //    return_val = false;
    //} else {
    //    $('#SpnImpact').hide();
    //}
    //if ($('#ddlSupportOrgnisation option:selected').val() == 0) {
    //    $('#SpnSupportOrgnisation').show();
    //    return_val = false;
    //} else {
    //    $('#SpnSupportOrgnisation').hide();
    //}
    //if ($('#ddlSupportGroup option:selected').val() == 0) {
    //    $('#SpnSupportGroup').show();
    //    return_val = false;
    //} else {
    //    $('#SpnSupportGroup').hide();
    //}
    if ($('#ddlClient option:selected').val() == 0) {
        $('#SpnClient').show();
        return_val = false;
    } else {
        $('#SpnClient').hide();
    }
    if ($('#ddlAsset option:selected').val() == 0) {
        $('#SpnAsset').show();
        return_val = false;
    } else {
        $('#SpnAsset').hide();
    }

    if ($('#ddlCategory option:selected').val() == 0) {
        $('#SpnCategory').show();
        return_val = false;
    } else {
        $('#SpnCategory').hide();
    }

    //if ($('#ddlTechnician option:selected').val() == 0) {
    //    $('#SpnTechnician').show();
    //    return_val = false;
    //} else {
    //    $('#SpnTechnician').hide();
    //}
    if ($('#ddlUser option:selected').val() == 0) {
        $('#SpnUser').show();
        return_val = false;
    } else {
        $('#SpnUser').hide();
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
    if ($('#ddlPriority option:selected').val() == 0) {
        $('#SpnPriority').show();
        return_val = false;
    } else {
        $('#SpnPriority').hide();
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
            $("#ddlTechnician").html("").append('<option value="0">Select Employee</option>');
            $(data).each(function () {
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
        url: 'http://playmediahouse.com/api/api/Staff/GetAllApproverLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".ddlTechnician").html("").append('<option value="0">Select Technician</option>');
            $(data).each(function () {
                $('.ddlTechnician').append('<option value=' + this.id + '>' + this.name + '</option>');
                $('.ddlUserList').append('<option value=' + this.id + '>' + this.name + '</option>');
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
            //$("#ddlPriority").val(data.priority_name).change();
            $("#ddlPriority").val(data.priority_id_pk).change();
            //  $('#ddlPriority').append('<option value=' + data.priority_id_pk + '>' + data.priority_name + '</option>');

            //alert(data.priority_id_pk);
            //  $("#ddlPriority").val(data.priority_id_pk).change();
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//Get All Priority List
//function GetPriorityListAll() { 
//    $.ajax({
//        type: "Get",
//        url: 'http://playmediahouse.com/api/api/SLA/GetPriorityList',
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (data) {
//            $("#ddlPriority").html("").append('<option value="0">Select Priority</option>');
//            $(data).each(function () {
//                if (this.priority_id_pk == 4) {
//                    $('#ddlPriority').append('<option selected value=' + this.priority_id_pk + '>' + this.priority_name + '</option>');
//                }
//                else {
//                    $('#ddlPriority').append('<option value=' + this.priority_id_pk + '>' + this.priority_name + '</option>');
//                }
//              //  $('#ddlPriority').append('<option value=' + this.priority_id_pk + '>' + this.priority_name + '</option>');
//            });
//        },
//        error: function (edata) {
//            alert("error while feching record.");
//        }
//    });
//};
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
         //  $('#ddlUrgency').html("").append('<option value="4" selected>Low </option> ');
            $(data).each(function () {
              //  $("#ddlUrgency").val("4").change();
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

            $('.ddlUser').html("").append('<option value="0">Select User</option>');
            $(data).each(function () {
                $('.ddlUser').append('<option value=' + this.user_id_pk + '>' + this.user_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Create New Service Request 
function InsServiceRequestTemplete(country) {
    var parm = {
        "common_cat_id_pk": $("#ddlCategory option:selected").val().trim(),
        "sub_category_id_pk": $("#ddlSubCategory option:selected").val().trim(),
        "subject": $("#txtSubject").val().trim(),
        "message": $("#txtContents").val().trim(),
        "catalogue_description": $("#txtCatalogueDescription").val().trim(),
        "is_purchase_required": $("#ddlPurchaseRequired option:selected").val().trim(),
        "cost": $("#txtCost").val().trim(),
        "fulfilment_time": $("#txtApproxFullfilment").val().trim(),
        "approval_required": $("#ddlApprovalRequired option:selected").val().trim(),
        "reporting_manager": $("#ddlReportingManager option:selected").val().trim(),
        "department_head": $("#ddlDepartmentHead option:selected").val().trim(),
        "business_head": $("#ddlBusinessHead option:selected").val().trim(),
        "supp_group_head": $("#ddlSupportGroupHonor option:selected").val().trim(),
        "supp_org_head": $("#ddlSupportOrgnizationHonor option:selected").val().trim(),
        "other_approver": country,//$("#ddlOtherApprover option:selected").text().trim(),
        "urgency_id_fk":  4 , //$("#ddlUrgency option:selected").val().trim(),
        "impact_id_fk":  4 , //$("#ddlImpact option:selected").val().trim(),
        "priority_id_pk": $("#ddlPriority option:selected").val().trim(),
        "support_dep_id_pk": $("#ddlSupportOrgnisation option:selected").val().trim(),
        "support_group_id_fk": $("#ddlSupportGroup option:selected").val().trim(),
        "admin_id": $("#ddlTechnician option:selected").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/InsServiceRequestTemplete',
        success: function (data) {
            //alert("Inserted Successfully");
            if (data.status_id != 0) {
                //  alert(data.status);
                successnotify(data.status);
                $("#ClrTicket").find("input").val("");
                $("#ClrTicket").find("select").val(0).change();
                GetServiceRequest();
                $('#closedModel').click();
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
function GetServiceRequest() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/GetServiceRequestTemplete', 
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
                        data: 'service_req_templete_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (service_req_templete_id_pk) {
                            return '<input id="check" class="cb-element checkbox" name="' + service_req_templete_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'service_req_templete_id_pk' },
                    { data: 'category_name' },
                    { data: 'sub_category_name' },
                    { data: 'subject' }
                  
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
//Get All Priority List
function GetPriority() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/SLA/GetPriorityList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".ddlPriority").html("").append('<option value="0">Select Priority</option>');
            $(data).each(function () {
                if (this.priority_id_pk == 4) {
                    $('#ddlPriority').append('<option selected value=' + this.priority_id_pk + '>' + this.priority_name + '</option>');
                }
                else {
                    $('#ddlPriority').append('<option value=' + this.priority_id_pk + '>' + this.priority_name + '</option>');
                }

             //   $('.ddlPriority').append('<option value=' + this.priority_id_pk + '>' + this.priority_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
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
            //var names = 'Harry,John,Clark,Peter,Rohn,Alice';
            //var nameArr = names.split(',');
            //console.log(nameArr);
            var str = data.other_approver;
            var strarray = str.split(',');
            for (var i = 0; i < strarray.length; i++) {
                //  alert(strarray[i])
            }

            $("#ddlCategory").val(data.common_cat_id_pk).change();
            $("#ddlSubCategory").val(data.sub_category_id_pk).change();
            $("#txtSubject").val(data.subject);
            $("#ddlSupportOrgnisation").val(data.support_dep_id_pk).change();
            $("#ddlSupportGroup").val(data.support_group_id_fk).change();
            $("#txtContents").html(data.message).text();
            $("#txtCatalogueDescription").val(data.catalogue_description); 

            $("#ddlClient").val(data.client_id_pk).change();
            $("#ddlAsset").val(data.asset_id_pk).change();
            $("#ddlTechnician").val(data.admin_id).change().change();
          
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
// Update Service Request Templete
function UpdateServiceRequestTemplete(service_req_templete_id , country) {
    var parm = {
        "service_req_templete_id_pk": service_req_templete_id,
        "common_cat_id_pk": $("#ddlCategory option:selected").val().trim(),
        "sub_category_id_pk": $("#ddlSubCategory option:selected").val().trim(),
        "subject": $("#txtSubject").val().trim(),
        "message": $("#txtContents").val().trim(),
        "catalogue_description": $("#txtCatalogueDescription").val().trim(),
        "is_purchase_required": $("#ddlPurchaseRequired option:selected").val().trim(),
        "cost": $("#txtCost").val().trim(),
        "fulfilment_time": $("#txtApproxFullfilment").val().trim(),
        "approval_required": $("#ddlApprovalRequired option:selected").val().trim(),
        "reporting_manager": $("#ddlReportingManager option:selected").val().trim(),
        "department_head": $("#ddlDepartmentHead option:selected").val().trim(),
        "business_head": $("#ddlBusinessHead option:selected").val().trim(),
        "supp_group_head": $("#ddlSupportGroupHonor option:selected").val().trim(),
        "supp_org_head": $("#ddlSupportOrgnizationHonor option:selected").val().trim(),
        "other_approver": country,//$("#ddlOtherApprover option:selected").text().trim(),
        "urgency_id_fk": 4, //$("#ddlUrgency option:selected").val().trim(),
        "impact_id_fk": 4, //$("#ddlImpact option:selected").val().trim(),
        "priority_id_pk": $("#ddlPriority option:selected").val().trim(),
        "support_dep_id_pk": $("#ddlSupportOrgnisation option:selected").val().trim(),
        "support_group_id_fk": $("#ddlSupportGroup option:selected").val().trim(),
        "admin_id": $("#ddlTechnician option:selected").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/UpdateServiceRequestTemplete',
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



