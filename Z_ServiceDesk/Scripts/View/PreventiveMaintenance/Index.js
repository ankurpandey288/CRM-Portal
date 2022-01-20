$(document).ready(function () {
    $("#btnUpdate").attr("disabled", "disabled");
    $("#btnUpdateStatus").attr("disabled", "disabled");
    $('#BtnDelete').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            deletePreventiveMaintainance($(this).attr('name'));
        });
    });
    $("#CheckAll").click(function () {
        if ($(this).is(':checked')) {
            $("#btnAssignTo").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
            $("#btnStatusUpdate").removeAttr("disabled");
            $("#btnKnowledgeBase").removeAttr("disabled");
            $("#btnAddproblem").removeAttr("disabled");
            $("#btnMasterIncident").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnAssetLocation").attr("disabled", "disabled");
            $("#btnEditInc").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnStatusUpdate").attr("disabled", "disabled");
            $("#btnKnowledgeBase").attr("disabled", "disabled");
            $("#btnAddproblem").attr("disabled", "disabled");
            $("#btnMasterIncident").attr("disabled", "disabled");
        }
        else {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnAssetLocation").attr("disabled", "disabled");
            $("#btnEditInc").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnStatusUpdate").attr("disabled", "disabled");
            $("#btnKnowledgeBase").attr("disabled", "disabled");
            $("#btnAddproblem").attr("disabled", "disabled");
            $("#btnMasterIncident").attr("disabled", "disabled");
        }
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $(document).on('click', '.cb-element', function () {
        if ($(this).is(':checked')) {
            $("#btnAssignTo").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
            $("#btnStatusUpdate").removeAttr("disabled");
            $("#btnKnowledgeBase").removeAttr("disabled");
            $("#btnAddproblem").removeAttr("disabled");
            $("#btnMasterIncident").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnAssetLocation").attr("disabled", "disabled");
            $("#btnEditInc").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnStatusUpdate").attr("disabled", "disabled");
            $("#btnKnowledgeBase").attr("disabled", "disabled");
            $("#btnAddproblem").attr("disabled", "disabled");
            $("#btnMasterIncident").attr("disabled", "disabled");
        }
        else {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnAssetLocation").attr("disabled", "disabled");
            $("#btnEditInc").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnStatusUpdate").attr("disabled", "disabled");
            $("#btnKnowledgeBase").attr("disabled", "disabled");
            $("#btnAddproblem").attr("disabled", "disabled");
            $("#btnMasterIncident").attr("disabled", "disabled");
        }
    });
    $("#checkboxPrevMaint").click(function () {
        $(".prevcbk").attr('checked', this.checked);
       // $('.prevcbk').not(this).prop('checked', this.checked);
    });
    GetChangeAsignStatus();
  //  GetPreventiveMaintainanceActivityChangeStatusList();
  //  GetStatus();
    GetLocation();
    GetAssetCategory();
    GetPreventiveMaintainanceActivity();
    GetSupportDepartment();
    $("#btnSubmit").click(function () {
      InsPreventiveMaintainance();
    });
    $("#btnChangeStatus").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModalStatus') });
        var val = [];
        $('.cb-element:checked').each(function (i) {
            val[i] = $(this).val();
            GetPreventiveMaintananceStatusConditionWise($(this).attr('name'));
        });
    });
    $('#btnStatusUpdate').click(function () {
        var val = [];
        $('.cb-element:checked').each(function (i) {
            val[i] = $(this).val();
            if (validateStatus() == true) {
                UpdatePreventiveMaintananceStatus($(this).attr('name'));
            } else {
                return false;
            }
        });
    });
    $("#btnAssignTo").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModalChangeStatus') });
    });
    $('#btnAssignUpdate').click(function () {
        var val = [];
        $('.cb-element:checked').each(function (i) {
            val[i] = $(this).val();
            if (validateAssign() == true) {
                UpdatePreventiveMaintananceAssignTo($(this).attr('name'));
            } else {
                return false;
            }
        });
    });
    $("#btnSearch").click(function () {
        GetPreventiveMaintenanceLists();
    });
    $(document).on('click', '.editview', function () {
        // alert($(this).attr("name"));
        if ($.session.get("p_m_activity_id_pk") != '' || $.session.get("p_m_activity_id_pk") != null || $.session.get("p_m_activity_id_pk") == undefined) {
            $.session.remove("p_m_activity_id_pk");
            $.session.set("p_m_activity_id_pk", $(this).attr("name"));
         //   window.open('/PreventiveMaintenance/PreventiveMaintenanceCheckListView');
        } 

    });
    $("#ddlSupportGroup").change(function () {
        if ($(this).val() != 0) {
            GetEmployeeListSGD($(this).val());
        } else {
            $("#ddlUser").html("").append('<option value="0">Select Employee</option>');
        }
    });
    $("#ddlSupportDepartment").change(function () {
        if ($(this).val() != 0) {
            GetSupportGroup($(this).val());
        } else {
            $("#ddlSupportGroup").html("").append('<option value="0">Select Support Group</option>');
        }
    });
    $("#btnNew").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModal') }
        );
    });
    $("#ddlStatus").change(function () {
        if ($(this).val() == 3) {
            $("#DivDescripency").show();
        } else if ($(this).val() == 2) {
            $("#DivDescripency").hide();
        }
        //else {
        //    $("#DivDescripency").hide();
        //}
    });
});
function validateStatus() { 
    var return_val = true;
    if ($('#ddlStatus option:selected').val() == 0) {
        $('#SpnStatus').show();
        return_val = false;
    } else {
        $('#SpnStatus').hide();
    }
    return return_val;
};
function validateAssign() {
    var return_val = true;
    if ($('#ddlAssign option:selected').val() == 0) {
        $('#SpnAssign').show();
        return_val = false;
    } else {
        $('#SpnAssign').hide();
    }
    return return_val;
};
function validateareamaster() {
    var return_val = true;
    if ($('#txtSubject').val().trim() == "" || $('#txtSubject').val() == null) {
        $('#SpnSubject').show();
        return_val = false;
    } else {
        $('#SpnSubject').hide();
    }
    if ($('#ddlSubmittedBy option:selected').val() == 0) {
        $('#SpnSubmittedBy').show();
        return_val = false;
    } else {
        $('#SpnSubmittedBy').hide();
    }
    if ($('#ddlStatus option:selected').val() == 0) {
        $('#SpnStatus').show();
        return_val = false;
    } else {
        $('#SpnStatus').hide();
    }
    if ($('#ddlCategory option:selected').val() == 0) {
        $('#SpnCategory').show();
        return_val = false;
    } else {
        $('#SpnCategory').hide();
    }
    if ($('#ddlSubCategory option:selected').val() == 0) {
        $('#SpnSubCategory').show();
        return_val = false;
    } else {
        $('#SpnSubCategory').hide();
    }

    if ($('#ddlBusinessUnit option:selected').val() == 0) {
        $('#SpnBusinessUnit').show();
        return_val = false;
    } else {
        $('#SpnBusinessUnit').hide();
    }

    if ($('#ddlLocation option:selected').val() == 0) {
        $('#SpnLocation').show();
        return_val = false;
    } else {
        $('#SpnLocation').hide();
    }
    if ($('#ddlImpact option:selected').val() == 0) {
        $('#SpnImpact').show();
        return_val = false;
    } else {
        $('#SpnImpact').hide();
    }

    if ($('#ddlpriority option:selected').val() == 0) {
        $('#Spnpriority').show();
        return_val = false;
    } else {
        $('#Spnpriority').hide();
    }
    if ($('#ddlSupportDepartment option:selected').val() == 0) {
        $('#SpnSupportDepartment').show();
        return_val = false;
    } else {
        $('#SpnSupportDepartment').hide();
    }
    if ($('#ddlAssign option:selected').val() == 0) {
        $('#SpnAssign').show();
        return_val = false;
    } else {
        $('#SpnAssign').hide();
    }
    if ($('#ddlAsset option:selected').val() == 0) {
        $('#SpnAsset').show();
        return_val = false;
    } else {
        $('#SpnAsset').hide();
    }
    if ($('#ddlProject option:selected').val() == 0) {
        $('#SpnProject').show();
        return_val = false;
    } else {
        $('#SpnProject').hide();
    }
    if ($('#txtduedate').val().trim() == "" || $('#txtSubject').val() == null) {
        $('#Spnduedate').show();
        return_val = false;
    } else {
        $('#Spnduedate').hide();
    }
    if ($('#txtCCRecipients').val().trim() == "" || $('#txtSubject').val() == null) {
        $('#SpnCCRecipients').show();
        return_val = false;
    } else {
        $('#SpnCCRecipients').hide();
    }
    if ($('#txtDescription').val().trim() == "" || $('#txtSubject').val() == null) {
        $('#SpnDescription').show();
        return_val = false;
    } else {
        $('#SpnDescription').hide();
    }
    if ($('#txtNotification').val().trim() == "" || $('#txtSubject').val() == null) {
        $('#SpnNotification').show();
        return_val = false;
    } else {
        $('#SpnNotification').hide();
    }
    if ($('#txtChooseFile').val().trim() == "" || $('#txtSubject').val() == null) {
        $('#SpnChooseFile').show();
        return_val = false;
    } else {
        $('#SpnChooseFile').hide();
    }
    return return_val;
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
//Get All Location Lists
function GetLocation() {
   
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Software/GetLocation',
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
//get All Employee List from People
function GetEmployees() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Consumable/GetEmployees',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlAssignTo").html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $('#ddlAssignTo').append('<option value=' + this.id + '>' + this.name + '</option>'); 
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
//get All Status
function GetStatus() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/PreventiveMaintenance/GetPreventiveMaintainanceStatus',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlStatus").html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $('#ddlStatus').append('<option value=' + this.p_m_status_id_pk + '>' + this.status + '</option>');
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
//Get Status Condition Wise 
function GetPreventiveMaintananceStatusConditionWise(p_m_activity_id) { 
    var parm = {
        "p_m_activity_id_pk": p_m_activity_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/PreventiveMaintenance/GetPreventiveMaintananceStatusConditionWise',
        success: function (data) {
            $("#ddlStatus").html("").append('<option value="0">Select Status</option>');
            $(data).each(function () {
                $('#ddlStatus').append('<option value=' + this.p_m_status_id_pk + '>' + this.status + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//Change Asign Status
function GetChangeAsignStatus() { 
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Consumable/GetEmployees',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlAssign").html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $('#ddlAssign').append('<option value=' + this.id + '>' + this.name + '</option>'); 
            });
            //$('#ddlRegisteredOfficeinState').val(10).change();
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get Asset Category Lists
function GetAssetCategory() { 
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetCategory',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {          
            $('#ddlAssetType').html("").append('<option value="0">Select Asset Category</option>');
            $(data).each(function () {
                $('#ddlAssetType').append('<option value=' + this.asset_category_id_pk + '>' + this.asset_cat_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function GetPreventiveMaintenanceLists() { 
    var parm = {
        "asset_category_id_fk" : $("#ddlAssetType option:selected").val(),
        "location_id_pk": $("#ddlLocation option:selected").val(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/PreventiveMaintenance/GetCommonSubCategory',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: josnstr,
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable("#tblPreventiveMaintenance")) {
                table = $("#tblPreventiveMaintenance").DataTable();
            } else {
                table = $("#tblPreventiveMaintenance").DataTable();
            }
            table.destroy();
            $("#tblPreventiveMaintenance").DataTable({
                data: data,
                paging: true,
                sort: true,
                searching: false, 
                ordering: true,
                order: [],
                lengthMenu: [
                [3],
                ['10 rows', '25 rows', '50 rows', 'Show all']
                ],
                responsive: true,
                columns: [
                   {
                       data: 'asset_id_pk',
                       sWidth: '2px',
                       sClass: "view",
                       bSortable: false,
                       render: function (asset_id_pk) {
                           return '<input id="checkbox' + asset_id_pk + '" class="prevcbk" name="' + asset_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                       }
                   },
                    { data: 'asset_id_pk' },
                    { data: 'asset_cat_name' },
                    { data: 'asset_name' },
                    { data: 'asset_tag'},
                    { data: 'model_name' },
                    { data: 'serial_number' },
                    { data: 'location_name', "visible": false },
                    { data: 'SupplierName' },
                    { data: 'status'}
                ],
                dom: 'Bfrtip',
                buttons: [
                    //'copyHtml5',
                    //'excelHtml5',
                    //'csvHtml5',
                    //'pdfHtml5'
                 
                ]
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
function InsPreventiveMaintainance() { 
    var parm = {
        "asset_category_id_fk": $("#ddlAssetType option:selected").val().trim(),
        "due_date": $("#txtduedate").val().trim(),
        "support_dep_id_fk": $("#ddlSupportDepartment option:selected").val().trim(),
        "support_group_id_fk": $("#ddlSupportGroup option:selected").val().trim(),
        "location_id_fk": $("#ddlLocation option:selected").val().trim(),
        "assign_to_id": $("#ddlAssignTo option:selected").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/PreventiveMaintenance/InsPreventiveMaintenance',
        success: function (data) {
            if (data.status_id != 0) {
                InsPreventiveMaintenanceActivity(data.preventive_id_pk);
                successnotify(data.status);
                GetPreventiveMaintainanceActivityAssignTo();
            } else {
                warningnotify(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
function InsPreventiveMaintenanceActivity(preventive_id_fk) {
    debugger;
    var trcount = $('#tbodyPreventiveMaintenance tr').length;   
    $("#tbodyPreventiveMaintenance tr").each(function () {
        if ($(this).find('td:eq(0) input').is(":checked")) {


            debugger;
            var parm = {
                "preventive_id_fk" : preventive_id_fk,
                "asset_id" : $(this).find('td:eq(1)').text().trim(),
                "asset_cat_name" : $(this).find('td:eq(2)').text().trim(),
                "asset_name": $(this).find('td:eq(3)').text().trim(),
                "asset_tag": $(this).find('td:eq(4)').text().trim(),
                "model_name" : $(this).find('td:eq(5)').text().trim(),
                "serial_number": $(this).find('td:eq(6)').text().trim(),
                "supplier_name" : $(this).find('td:eq(7)').text().trim(),
                "p_m_status_id_fk": 1,
                "location_name": $("#ddlLocation option:selected").text().trim(),
                "assign_to": $("#ddlAssignTo option:selected").val().trim() 
            };
        }
            var josnstr = JSON.stringify(parm);
            $.ajax({
                type: "Post",
                url: 'http://playmediahouse.com/api/api/PreventiveMaintenance/InsPreventiveMaintenanceActivity',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: josnstr,
                success: function (data) {
                    debugger;
                    trcount = trcount - 1;
                    if (trcount == 0) {
                        //$(".modalsuccessinvoice").html('<i class="fa fa-check-circle fa-2x fa-fw"></i>' + ' Inserted Successfully');
                        //$("#SuccessModalGenerateInvoice").modal('show');
                    }
                },
                error: function (result) {
                    alert("Error : data");
                }
            });
        });
   
};
// Get Preventive Maintainance Activity  List 
function GetPreventiveMaintainanceActivityAssignTo() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/PreventiveMaintenance/GetPreventiveMaintainanceActivity',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblPreventiveMaintainanceActivity')) {
                table = $('#tblPreventiveMaintainanceActivity').DataTable();
            } else {
                table = $('#tblPreventiveMaintainanceActivity').DataTable();
            }
            table.destroy();
            $("#tblPreventiveMaintainanceActivity").DataTable({
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
                        data: 'p_m_activity_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (p_m_activity_id_pk) {
                            return '<input id="checkbox0" name="' + p_m_activity_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    {
                        data: 'p_m_activity_id_pk', render: function (p_m_activity_id_pk, type, row) {
                            return ' <a href="/Admin/PreventiveMaintenance/PreventiveMaintenanceCheckListView" title="Critical" class="editview"  name="' + p_m_activity_id_pk + '">    &nbsp; <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp; ' + row.prefix + + row.p_m_activity_id_pk + ' </a>';

                        }
                    },
                    { data: 'asset_cat_name' },
                    { data: 'sub_location', "visible": false },
                    { data: 'building_room_no', "visible": false },
                    { data: 'section_name', "visible": false },
                    { data: 'department_name', "visible": false },
                    { data: 'user_con_no', "visible": false },
                    { data: 'user_name', "visible": false },
                    { data: 'asset_name', "visible": false },
                    { data: 'model_name', "visible": false },
                    { data: 'asset_id' },
                    { data: 'asset_tag', "visible": false },
                    { data: 'SUPPORT_TYPE', "visible": false },

                    { data: 'due_date' },

                    { data: 'name' },
                    { data: 'maintainance_date' },
                    { data: 'status' },
                    { data: 'remark_engineer', "visible": false },
                    { data: 'descripency_status' },
                    {
                        data: 'status', render: function (status, type, row) {
                            if (status == "Completed") {
                                // alert(status);
                                if (row.feedback == null) {
                                    return '<a id="CloseFeedBackAllow" Style="Display:none" href="#" disabled="disabled" class="FeedBack" data-toggle="modal" data-target="#myModalFeedBack" name="' + status + '"><b>' + 'Submit Feedback' + '</b></a> <a href="#" id="CloseFeedBackDisAllow" onclick="FeedBackUpdate()"  class="FeedBack"  name="' + status + '"><b>' + ' Submit Feedback' + '</b></a>';
                                } else if (row.feedback == 1) {
                                    return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;">' + 'Satisfied' + '</span>'
                                    //return '<span class="fa fa-star checked"> </span>';
                                } else if (row.feedback == 2) {
                                    return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d !important;" >' + 'Not Satisfied' + '</span>'
                                }
                                //  return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + 'N/A' + '</span>';
                            }
                            else {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + 'N/A' + '</span>';
                            }

                            //   return ' <a href="#" title="Critical" class="editview"  name="' + ticket_id_pk + '">  <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Critical" style="color:#ea2d2d !important" title="Normal priority" data-original-title="Normal priority"></i>   &nbsp;' + row.prefix + + row.ticket_id_pk + ' </a>';


                        }
                    },
                    // { data: 'feedback' }
                    //{
                    //    data: 'status', render: function (status, type, row) {
                    //        if (status != "Completed") {
                    //            // alert(status);
                    //            if (row.feedback == null) {
                    //                //  alert(row.ticket_id_pk);
                    //                return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '"> <i class="fa fa-edit" data-toggle="modal" data-target="#myModalFeedBack" style="font-size:26px"></i>  </span>';
                    //            } else if (row.feedback == 1) {
                    //                return '<span class="fa fa-star checked"> </span>';
                    //            } else if (row.feedback == 2) {
                    //                return '<span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span>';
                    //            } else if (row.feedback == 3) {
                    //                return '<span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span>';
                    //            } else if (row.feedback == 4) {
                    //                return '<span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span>';
                    //            } else if (row.feedback == 5) {
                    //                return '<span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span>';
                    //            }
                    //            return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + 'N/A' + '</span>';
                    //        }
                    //        else {
                    //            return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + 'N/A' + '</span>';
                    //        }

                    //        //   return ' <a href="#" title="Critical" class="editview"  name="' + ticket_id_pk + '">  <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Critical" style="color:#ea2d2d !important" title="Normal priority" data-original-title="Normal priority"></i>   &nbsp;' + row.prefix + + row.ticket_id_pk + ' </a>';


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
// Get Preventive Maintainance Activity  List 
function GetPreventiveMaintainanceActivity() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/PreventiveMaintenance/GetPreventiveMaintainanceActivity',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblPreventiveMaintainanceActivity')) {
                table = $('#tblPreventiveMaintainanceActivity').DataTable();
            } else {
                table = $('#tblPreventiveMaintainanceActivity').DataTable();
            }
            table.destroy();
            $("#tblPreventiveMaintainanceActivity").DataTable({
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
                        data: 'p_m_activity_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (p_m_activity_id_pk) {
                            return '<input id="checkbox0" name="' + p_m_activity_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    {
                        data: 'p_m_activity_id_pk', render: function (p_m_activity_id_pk, type, row) {
                            return ' <a href="/Admin/PreventiveMaintenance/PreventiveMaintenanceCheckListView" title="Critical" class="editview"  name="' + p_m_activity_id_pk + '">    &nbsp; <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp; ' + row.prefix + + row.p_m_activity_id_pk + ' </a>';

                        }
                    },
                    { data: 'asset_cat_name' },
                    { data: 'sub_location', "visible": false },
                    { data: 'building_room_no', "visible": false },
                    { data: 'section_name', "visible": false },
                    { data: 'department_name', "visible": false },
                    { data: 'user_con_no', "visible": false },
                    { data: 'user_name', "visible": false },
                    { data: 'asset_name', "visible": false },
                    { data: 'model_name', "visible": false },
                    { data: 'asset_id' },
                    { data: 'asset_tag', "visible": false },
                    { data: 'SUPPORT_TYPE', "visible": false },
                    { data: 'due_date' },
                    { data: 'name' },
                    { data: 'maintainance_date' },
                    { data: 'status' },
                    { data: 'remark_engineer', "visible": false },
                    { data: 'descripency_status' },
                    {
                        data: 'status', render: function (status, type, row) {
                            if (status == "Completed") {
                                // alert(status);
                                if (row.feedback == null) {
                                    return '<a id="CloseFeedBackAllow" Style="Display:none" href="#" disabled="disabled" class="FeedBack" data-toggle="modal" data-target="#myModalFeedBack" name="' + status + '"><b>' + 'Submit Feedback' + '</b></a> <a href="#" id="CloseFeedBackDisAllow" onclick="FeedBackUpdate()"  class="FeedBack"  name="' + status + '"><b>' + ' Submit Feedback' + '</b></a>';
                                } else if (row.feedback == 1) {
                                    return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;">' + 'Satisfied' + '</span>'
                                    //return '<span class="fa fa-star checked"> </span>';
                                } else if (row.feedback == 2) {
                                    return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d !important;" >' + 'Not Satisfied' + '</span>'
                                }
                                //  return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + 'N/A' + '</span>';
                            }
                            else {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + 'N/A' + '</span>';
                            }

                            //   return ' <a href="#" title="Critical" class="editview"  name="' + ticket_id_pk + '">  <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Critical" style="color:#ea2d2d !important" title="Normal priority" data-original-title="Normal priority"></i>   &nbsp;' + row.prefix + + row.ticket_id_pk + ' </a>';


                        }
                    },
                    // { data: 'feedback' }
                    //{
                    //    data: 'status', render: function (status, type, row) {
                    //        if (status != "Completed") {
                    //            // alert(status);
                    //            if (row.feedback == null) {
                    //                //  alert(row.ticket_id_pk);
                    //                return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '"> <i class="fa fa-edit" data-toggle="modal" data-target="#myModalFeedBack" style="font-size:26px"></i>  </span>';
                    //            } else if (row.feedback == 1) {
                    //                return '<span class="fa fa-star checked"> </span>';
                    //            } else if (row.feedback == 2) {
                    //                return '<span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span>';
                    //            } else if (row.feedback == 3) {
                    //                return '<span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span>';
                    //            } else if (row.feedback == 4) {
                    //                return '<span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span>';
                    //            } else if (row.feedback == 5) {
                    //                return '<span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span> <span class="fa fa-star checked"> </span>';
                    //            }
                    //            return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + 'N/A' + '</span>';
                    //        }
                    //        else {
                    //            return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + 'N/A' + '</span>';
                    //        }

                    //        //   return ' <a href="#" title="Critical" class="editview"  name="' + ticket_id_pk + '">  <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Critical" style="color:#ea2d2d !important" title="Normal priority" data-original-title="Normal priority"></i>   &nbsp;' + row.prefix + + row.ticket_id_pk + ' </a>';


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
function deletePreventiveMaintainance(p_m_activity_id) {
    var parm = {
        "p_m_activity_id_pk": p_m_activity_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/PreventiveMaintenance/DeletePreventiveMaintainanceByID',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetPreventiveMaintainanceActivityAssignTo();

            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};
// Update PreventiveMaintanance Status 
function UpdatePreventiveMaintananceStatus(p_m_activity_id_pk) {
    var parm = {
        "p_m_activity_id_pk": p_m_activity_id_pk,
        "p_m_status_id_fk": $("#ddlStatus option:selected").val().trim(),
        "is_discrepency": $("#ddlDiscrepencyFound option:selected").val().trim()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/PreventiveMaintenance/UpdatePreventiveMaintananceStatus',
        success: function (data) {
            if (data.status_id == 1) {
                CreateSuccess(data.status);
                $('#closedModelStatus').click();
                GetPreventiveMaintainanceActivity();
            } else {
                CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Update PreventiveMaintanance Assign To  
function UpdatePreventiveMaintananceAssignTo(p_m_activity_id_pk) {
    var parm = {
        "p_m_activity_id_pk": p_m_activity_id_pk,
        "assign_to": $("#ddlAssign option:selected").val().trim() 
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/PreventiveMaintenance/UpdatePreventiveMaintananceAssignTo',
        success: function (data) {
            if (data.status_id == 1) {
                CreateSuccess(data.status);
                $('#closedModelAssignTo').click(); 
                GetPreventiveMaintainanceActivity();
            } else { 
                CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};