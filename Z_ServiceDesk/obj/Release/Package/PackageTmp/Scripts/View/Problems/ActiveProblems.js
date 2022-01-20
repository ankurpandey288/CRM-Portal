$(document).ready(function () {
    var problem = 0;
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
    $('#BtnDelete').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            deleteProblem($(this).attr('name'));
            //  alert($(this).val());
        });
    });
    $('#btnKnowledgeBase').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            GetProblemForKB($(this).attr('name'));
        });
        $('.select2').select2(
            { dropdownParent: $('#myModalKB') });
    });
    $("#btnNew").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModalNew') }
        );
    });
    //$("#btnKnowledgeBase").click(function () {
    //    $('.select2').select2(
    //        { dropdownParent: $('#myModalAsignTo') });
    //});
    $("#btnChangeStatus").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModalChangeStatus') });
    });
    $(document).on('click', '.cb-element', function () {
        if ($(this).is(':checked')) {
            $("#btnEdit").show();
          
            $("#BtnDelete").removeAttr("disabled");
            $("#btnKnowledgeBase").removeAttr("disabled");

        } else if (!$(this).is(':checked')) {
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnKnowledgeBase").attr("disabled", "disabled");
            $("#btnEdit").hide();
        }
        else {
           
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnKnowledgeBase").attr("disabled", "disabled");
            $("#btnEdit").hide();
        }

    });
    $("#CheckAll").click(function () {
        if ($(this).is(':checked')) {
            $("#BtnDelete").removeAttr("disabled");
            $("#btnKnowledgeBase").removeAttr("disabled");
            $("#btnEdit").show();
        } else if (!$(this).is(':checked')) {
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnKnowledgeBase").attr("disabled", "disabled");
            $("#btnEdit").hide();
        }
        else {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnStatusUpdate").attr("disabled", "disabled");
            $("#btnKnowledgeBase").attr("disabled", "disabled");
            $("#btnEdit").hide();
            $("#btnNew").show();
        }
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    GetEmployees();
    GetStatus();
    GetCommonCategory();
    GetBusinessUnit();
    GetLocation();
  //  GetImpact();
    GetUrgency(); 
    GetSupportDepartment();
    GetAssets();
    GetProblemMagementList();
    GetPriority();
    GetUser();
    GetDepartmentLists();
    GetAllSubCategory();
    $("#dllCategoryForSolutions").change(function () {
        if ($(this).val() != 0) {
            GetCategoryList($(this).val());
        } else {
            $("#ddlSubCategoryForSolution").html("").append('<option value="0">Select Sub Category</option>');
        }
    });
    GetKnowledgeBaseCategory();
    $('#btnSaveSolution').click(function () {
        InsSolutionForIncidentAndProblem();
    });
    $("#ddlSupportGroup").change(function () {
        if ($(this).val() != 0) {
            GetEmployeeListSGD($(this).val());
        } else {
            $("#ddlTechnician").html("").append('<option value="0">Select Employee</option>');
        }
    });
    $("#btnSubmit").click(function () {
        if (validateareamaster() == true) {
            InsProblems();
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
        // alert($(this).attr("name"));
        if ($.session.get("promblems_id_pk") != '' || $.session.get("promblems_id_pk") != null || $.session.get("promblems_id_pk") == undefined) {
            $.session.remove("promblems_id_pk");
            $.session.set("promblems_id_pk", $(this).attr("name"));
           // window.open('/Problems/ProblemsRecord');
        }
    });
    $(document).on('click', '.btnview', function () {
        //("#ChangeManagement")
        //alert($(this).parent("td").parent("tr").find("td:eq(1)").html());
        alert($(this).attr("name"));
        //window.open('/Changes/ChangesRecords');
        if ($.session.get("promblems_id_pk") != '' || $.session.get("promblems_id_pk") != null || $.session.get("promblems_id_pk") == undefined) {
            $.session.remove("promblems_id_pk");
            $.session.set("promblems_id_pk", $(this).attr("name"));
          //  window.open('/Problems/ProblemsRecord');
        }
    });
    $("#ddlSupportDepartment").change(function () {
        if ($(this).val() != 0) {
            GetSupportGroup($(this).val());
        } else {
            $("#ddlSupportGroup").html("").append('<option value="0">Select Support Group</option>');
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
    $("#btnFilter").click(function () {
        GetProblemMagementList();
    });
});
function validateareamaster() {
    var return_val = true;
    if ($('#txtSubject').val().trim() == "" || $('#txtSubject').val() == null) {
        $('#SpnSubject').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnSubject').hide();
    }
    if ($('#ddlSubmittedBy option:selected').val() == 0) {
        $('#SpnSubmittedBy').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnSubmittedBy').hide();
    }
    if ($('#ddlStatus option:selected').val() == 0) {
        $('#SpnStatus').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnStatus').hide();
    }
    if ($('#ddlPriority option:selected').val() == 0) {
        $('#SpnPriority').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnPriority').hide();
    }
    if ($('#ddlTechnician option:selected').val() == 0) {
        $('#SpnTechnician').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnTechnician').hide();
    }
    if ($('#ddlDepartmentName option:selected').val() == 0) {
        $('#SpnDepartmentName').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnDepartmentName').hide();
    }
    if ($('#ddlUser option:selected').val() == 0) {
        $('#SpnUser').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnUser').hide();
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
    if ($('#ddlBusinessUnit option:selected').val() == 0) {
        $('#SpnBusinessUnit').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnBusinessUnit').hide();
    }
    if ($('#ddlLocation option:selected').val() == 0) {
        $('#SpnLocation').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnLocation').hide();
    }
    if ($('#ddlImpact option:selected').val() == 0) {
        $('#SpnImpact').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnImpact').hide();
    }
    if ($('#ddlUrgency option:selected').val() == 0) {
        $('#SpnUrgency').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnUrgency').hide();
    }
    if ($('#ddlSupportDepartment option:selected').val() == 0) {
        $('#SpnSupportDepartment').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnSupportDepartment').hide();
    }
    if ($('#ddlAssign option:selected').val() == 0) {
        $('#SpnAssign').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnAssign').hide();
    }
    if ($('#ddlAsset option:selected').val() == 0) {
        $('#SpnAsset').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnAsset').hide();
    }
    //if ($('#ddlProject option:selected').val() == 0) {
    //    $('#SpnProject').show();
    //    return_val = false;
    //} else {
    //    $('#SpnProject').hide();
    //}
    if ($('#txtduedate').val().trim() == "" || $('#txtduedate').val() == null) {
        $('#Spnduedate').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#Spnduedate').hide();
    }
    //if ($('#txtCCRecipients').val().trim() == "" || $('#txtCCRecipients').val() == null) {
    //    $('#SpnCCRecipients').show();
    //    return_val = false;
    //} else {
    //    $('#SpnCCRecipients').hide();
    //}
    if ($('#txtDescription').val().trim() == "" || $('#txtDescription').val() == null) {
        $('#SpnDescription').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnDescription').hide();
    }
    //if ($('#txtNotification').val().trim() == "" || $('#txtSubject').val() == null) {
    //    $('#SpnNotification').show();
    //    return_val = false;
    //} else {
    //    $('#SpnNotification').hide();
    //}
    if ($('#txtChooseFile').val().trim() == "" || $('#txtSubject').val() == null) {
        $('#SpnChooseFile').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnChooseFile').hide();
    }
    return return_val;
};
//get All Employee List from People
function GetEmployees() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Consumable/GetEmployees',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          //  $(".EMP").html("").append('<option value="0">Select </option>');
            $(data).each(function () {
            //    $('.EMP').append('<option value=' + this.id + '>' + this.name + '</option>');
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
//Get All Business Unit Lists
function GetBusinessUnit() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Change/GetBusinessUnit',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlBusinessUnit').html("").append('<option value="0">Select Location</option>');
            $('#ddlClientFltr').html("").append('<option value="0">Select Clients</option>');
            $(data).each(function () {
                $('#ddlBusinessUnit').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
                $('#ddlClientFltr').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
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
        url: 'http://playmediahouse.com/api/api/Software/GetLocation',
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
//Get All Support Department 
function GetSupportDepartment() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/SLA/GetSupportDepartment',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlSupportDepartment").html("").append('<option value="0">Select Support Department</option>');
            $(data).each(function () {
                $('#ddlSupportDepartment').append('<option value=' + this.support_dep_id_pk + '>' + this.support_dep_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get Support Group  
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
//Get All Assets 
function GetAssets() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Problems/GetAssets',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlAsset").html("").append('<option value="0">Select Assets</option>');
            $(data).each(function () {
                $('#ddlAsset').append('<option value=' + this.asset_id_pk + '>' + this.asset_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Insert Problems 
function InsProblems() {
    var parm = {
        "subject": $("#txtSubject").val(),
        "submitted_by_id": $("#ddlSubmittedBy option:selected").val(),
        "status_id_fk": $("#ddlStatus option:selected").val(),
        "common_cat_id_pk": $("#ddlCategory option:selected").val(),
        "sub_category_id_pk": $("#ddlSubCategory option:selected").val(),
        "support_group_id_fk": $("#ddlSupportGroup option:selected").val(),
        "business_unit_id_pk": $("#ddlBusinessUnit option:selected").val(),
        "location_id_fk": $("#ddlLocation option:selected").val(),
        "impact_id_pk": $("#ddlImpact option:selected").val(),
        "urgency_id_fk": $("#ddlUrgency option:selected").val(),
        "support_dep_id_pk": $("#ddlSupportDepartment option:selected").val(),
        "assign_to": $("#ddlAssign option:selected").val(),
        "asset_id_pk": $("#ddlAsset option:selected").val(),
        "due_date":  $("#txtduedate").val(),
        "cc_recipients": $("#txtCCRecipients").val(),
        "description": $("#txtDescription").val(),
        "notification": $("#txtNotification").val(),
        "file": null,
        "user_id_fk": $("#ddlUser option:selected").val(),
        "department_id_fk": $("#ddlAssign option:selected").val(),
        "priority_id_fk": $("#ddlAssign option:selected").val(),
        "is_send_email": $("#chkSEmailNotifi").is(":checked") == true ? 1 : 0,
        "is_send_message": $("#chkSSMSNotif").is(":checked") == true ? 1 : 0
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Problems/InsProblems',  
        success: function (data) {
            // alert("Inserted Successfully");
            if (data.status_id != 0) {
                successnotify(data.status);

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
// Get Problem Management Lists
function GetProblemMagementList() { 
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
        url: 'http://playmediahouse.com/api/api/Problems/GetProblemMagementListFilter', 
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblProblemManagement')) {
                table = $('#tblProblemManagement').DataTable();
            } else {
                table = $('#tblProblemManagement').DataTable();
            }
            table.destroy();
            $("#tblProblemManagement").DataTable({
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
                        data: 'promblems_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (promblems_id_pk) {
                            return '<input id="check" class="cb-element checkbox" name="' + promblems_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    {
                        data: 'promblems_id_pk', render: function (promblems_id_pk, type, row) {
                            return '<a href="/Admin/Problems/ProblemsRecord" class="editview"  name="' + promblems_id_pk + '"> <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp; ' + row.prefix + + row.promblems_id_pk + '</a>'; 

                        }
                    },
                    //{
                    //    data: 'promblems_id_pk',
                    //    sWidth: '2px',
                    //    sClass: "view",
                    //    bSortable: false,
                    //    render: function (promblems_id_pk) {
                    //        return '<a class="editview" href="/Problems/ProblemsRecord"  name="' + promblems_id_pk + '"> ' + promblems_id_pk + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                    //    }
                    //},

                    { data: 'category_name' },
                    { data: 'subject' },
                    { data: 'submitter' },
                    //{ data: 'assign' },
                    //{ data: 'status' },
                  //  {
                  //      data: 'promblems_id_pk',
                  //      sWidth: '2px',
                  //      sClass: "view",
                  //      bSortable: false,
                  //      render: function (promblems_id_pk) {
                  //          return '<button class="btn btn btn - primary btn - xs btnview" name="' + promblems_id_pk + '">view</button>';
                  //}
                  //  },
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
function deleteProblem(promblems_id) { 
    var parm = {
        "promblems_id_pk": promblems_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Problems/DeleteProblemByID',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetProblemMagementList();

            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};
// Get Supplier Details For Edit
function GetProblemForKB(promblems_id) {
    var parm = {
        'promblems_id_pk': promblems_id // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Problems/GetProblemForKB',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            problem = data.promblems_id_pk;
            alert(problem);
           // InsSolutionForIncidentAndProblem(data.subject, data.description, 0, data.promblems_id_pk, $.session.get("id"))
            $("#txtSolutionTitle").val(data.subject);
            $("#txtContentsKB").val(data.description);
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//// Insert Knowledge Base 
//function InsSolutionForIncidentAndProblem(title, contents, ticket_id, problem_id, updated_by) {
//    var parm = {
//        "solution_title": title,
//        "contents": contents,
//        "ticket_id_fk": ticket_id,
//        "problem_id_fk": problem_id,
//        "updated_by": updated_by
//    };
//    var josnstr = JSON.stringify(parm);
//    $.ajax({
//        type: "Post",
//        data: josnstr,
//        dataType: "json",
//        contentType: "application/json; charset=utf-8",
//        url: 'http://playmediahouse.com/api/api/KnowledgeBase/InsSolutionForIncidentAndProblem',
//        success: function (data) {
//            // alert("Inserted Successfully");
//            if (data.status_id != 0) {
//                successnotify(data.status);

//            } else {
//                warningnotify(data.status);
                
//            }
//        },
//        error: function (result) {
//            alert("Error : data");
//        }
//    });
//};
//Get KB Category
// Insert Knowledge Base 
function InsSolutionForIncidentAndProblem() {
    var parm = {
        "category_id_fk": $("#dllCategoryForSolutions option:selected").val().trim(),
        "sub_catogory_id_fk": $("#ddlSubCategoryForSolution option:selected").val().trim(),
        "solution_title": $("#txtSolutionTitle").val().trim(),
        "contents": $("#txtContentsKB").val().trim(),
        "ticket_id_fk": 0,
        "problem_id_fk": problem, 
        "updated_by": $.session.get("id")
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/KnowledgeBase/InsSolutionForIncidentAndProblem',
        success: function (data) {
            // alert("Inserted Successfully");
            if (data.status_id != 0) {
                successnotify(data.status);

            } else {
                warningnotify(data.status);

            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
function GetKnowledgeBaseCategory() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/KnowledgeBase/GetKnowledgeBaseCategoryList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".dllCategory").html("").append('<option value="0">Select Category</option>');
            $(data).each(function () {
                $('.dllCategory').append('<option value=' + this.catogory_id_pk + '>' + this.category_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Category Lists 
function GetCategoryList(category_id) {
    var parm = {
        "category_id_fk": category_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/KnowledgeBase/GetCategoryList',
        success: function (data) {
            $("#ddlSubCategoryForSolution").html("").append('<option value="0">Select Sub Category</option>');
            $(data).each(function () {
                $("#ddlSubCategoryForSolution").append('<option value=' + this.sub_catogory_id_pk + '>' + this.sub_category_name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
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
