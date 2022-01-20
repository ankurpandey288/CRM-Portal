$(document).ready(function () {
    if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
        window.location.href = "/Login/Index/";
    };
    GetAssetList();
    GetTaskTypeLists();
    GetBusinessUnit();
    GetSupportDepartment();
    GetPriorityList();
    GetTaskTempleteLists(); 
    GetViewWorkloadList();
    GetCommonCategory();
    $("#ddlCategory").change(function () {
        if ($(this).val() != 0) {
            GetCommonSubCategory($(this).val());
        } else {
            $("#ddlSubCategory").html("").append('<option value="0">Select Sub Category</option>');
        }
    });
    $('.cb-element').click(function () {
        if (!$(this).is(':checked')) {
            return confirm("Are you sure?");
            alert("Value Checked");
        }
    });
    $(document).on('click', '.cb-element', function () {
        if ($(this).is(':checked')) {
            $("#btnNew").attr("disabled", "disabled");
            $("#btnAssignTo").removeAttr("disabled");
            $("#btnEdit").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
            $("#btnAssignTo").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnNew").removeAttr("disabled");
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnAssignTo").attr("disabled", "disabled");
        }
        else {
            $("#btnNew").removeAttr("disabled");
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnAssignTo").attr("disabled", "disabled");
        }
    });
    $("#CheckAll").click(function () {
        if ($(this).is(':checked')) {
            $("#btnNew").attr("disabled", "disabled");
            $("#btnAssignTo").removeAttr("disabled");
            $("#btnEdit").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
            $("#btnAssignTo").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnNew").removeAttr("disabled");
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnAssignTo").attr("disabled", "disabled");

        }
        else {
            $("#btnNew").removeAttr("disabled");
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnAssignTo").attr("disabled", "disabled");
        }
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#BtnDelete').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            // $("#btnEdit").hide();
            deleteTicket($(this).attr('name'));
            $(".cb-element").prop("checked", false);
            //  alert($(this).val());
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
    $("#ddlSupportDepartment").change(function () {
        if ($(this).val() != 0) {
            GetSupportGroup($(this).val());
        } else {
            $("#ddlSupportGroup").html("").append('<option value="0">Select Support Group</option>');
        }
    });
    $("#ddlSupportGroup").change(function () {
        if ($(this).val() != 0) {
            GetEmployeeListSGD($(this).val());
        } else {
            $("#ddlAssign").html("").append('<option value="0">Select Employee</option>');
        }
    });
    $("#btnSubmit").click(function () {
        if (validateTaskTemplete() == true) {
            InsTaskTemplete();
        } else {
            return false;
        }
    });
    $(document).on('click', '.editview', function () {
        // alert($(this).attr("name"));
        if ($.session.get("supplier_id_pk") != '' || $.session.get("supplier_id_pk") != null || $.session.get("supplier_id_pk") == undefined) {
            $.session.remove("supplier_id_pk");
            $.session.set("supplier_id_pk", $(this).attr("name"));
            //  window.open('/Ticket/TicketDetails');
        }
    });
    $(document).on('click', '.editview', function () {
        GetTaskTempleteDetails($(this).attr("name")); 
    });
    $("#btnChangeStatus").click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            alert($(this).attr('name'));
            UpdateTaskStatus($(this).attr('name'));
        });
    });
    $("#btnNew").click(function () {
        $("#btnSubmit").show();
        $("#btnUpdate").hide();
        $("#ClrTask").find("input").val("");
        $("#ClrTask").find("textarea").val("");
        $("#ClrTask").find("select").val(0).change();
    });
    $("#btnEdit").click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            alert($(this).attr('name'));
            GetTaskTempleteDetailsEdit($(this).attr('name')); 
        });
        $("#btnSubmit").hide();
        $("#btnUpdate").show();
    });
    $("#btnUpdate").click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            if (validateTaskTemplete() == true) {
                UpdateTaskTemplete($(this).attr("name"));
            } else {
                return false;
            }
        });
    });
});
function validateTaskTemplete() {
    var return_val = true;
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
    if ($('#txtTitle').val().trim() == "" || $('#txtTitle').val() == null) {
        $('#SpnTitle').show();
        return_val = false;
    } else {
        $('#SpnTitle').hide();
    }
    if ($('#ddlTaskType option:selected').val() == 0) {
        $('#SpnTaskType').show();
        return_val = false;
    } else {
        $('#SpnTaskType').hide();
    }
    if ($('#ddlBusinessUnit option:selected').val() == 0) {
        $('#SpnBusinessUnit').show();
        return_val = false;
    } else {
        $('#SpnBusinessUnit').hide();
    }
    if ($('#ddlSupportDepartment option:selected').val() == 0) {
        $('#SpnSupportDepartment').show();
        return_val = false;
    } else {
        $('#SpnSupportDepartment').hide();
    }
    if ($('#ddlSupportGroup option:selected').val() == 0) {
        $('#SpnSupportGroup').show();
        return_val = false;
    } else {
        $('#SpnSupportGroup').hide();
    }
    if ($('#ddlAssets option:selected').val() == 0) {
        $('#SpnAssets').show();
        return_val = false;
    } else {
        $('#SpnAssets').hide();
    }
    if ($('#ddlAssign option:selected').val() == 0) {
        $('#SpnAssign').show();
        return_val = false;
    } else {
        $('#SpnAssign').hide();
    }
    if ($('#ddlPriority option:selected').val() == 0) {
        $('#SpnPriority').show();
        return_val = false;
    } else {
        $('#SpnPriority').hide();
    }
    if ($('#txtDueDate').val().trim() == "" || $('#txtDueDate').val() == null) {
        $('#SpnDueDate').show();
        return_val = false;
    } else {
        $('#SpnDueDate').hide();
    }
    if ($('#txtMessage').val().trim() == "" || $('#txtMessage').val() == null) {
        $('#SpnMessage').show();
        return_val = false;
    } else {
        $('#SpnMessage').hide();
    }
    return return_val;
};
//Get Task Type Lists
function GetTaskTypeLists() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Task/GetTaskTypeLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#ddlTaskType').html("").append('<option value="0">Select Task Type</option>');
            $(data).each(function () {
                $('#ddlTaskType').append('<option value=' + this.task_type_id_pk + '>' + this.task_type_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
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
            $(data).each(function () {
                $('#ddlBusinessUnit').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
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
            $("#ddlAssign").html("").append('<option value="0">Select Employee</option>');
            $(data).each(function () {
                $("#ddlAssign").append('<option value=' + this.Id + '>' + this.name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//Get Assets Lists 
function GetAssetList() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#ddlAssets').html("").append('<option value="0">Select Assets Name</option>');
            $(data).each(function () {
                $('#ddlAssets').append('<option value=' + this.asset_id_pk + '>' + this.asset_name + '</option>');
            });
        },
        error: function (edata) {
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
            $("#ddlPriorityList").html("").append('<option value="0">Select Priority</option>');
            $(data).each(function () {
                $('#ddlPriority').append('<option value=' + this.priority_id_pk + '>' + this.priority_name + '</option>');
                $('#ddlPriorityList').append('<option value=' + this.priority_id_pk + '>' + this.priority_name + '</option>');
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
// Insert Task
function InsTaskTemplete() { 
    var parm = {
        "common_cat_id_fk": $("#ddlCategory option:selected").val().trim(),
        "sub_category_id_fk": $("#ddlSubCategory option:selected").val().trim(),
        "title": $("#txtTitle").val().trim(),
        "task_type_id_fk": $("#ddlTaskType option:selected").val().trim(),
        "business_unit_id_fk": $("#ddlBusinessUnit option:selected").val().trim(),
        "support_dep_id_fk": $("#ddlSupportDepartment option:selected").val().trim(),
        "support_group_id_fk": $("#ddlSupportGroup option:selected").val().trim(),
        "asset_id_fk": $("#ddlAssets option:selected").val().trim(),
        "assign_to": $("#ddlAssign option:selected").val().trim(),
        "priority_id_fk": $("#ddlPriority option:selected").val().trim(),
        "due_date": $("#txtDueDate").val().trim(),
        "message": $("#txtMessage").val().trim(),

    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Task/InsTaskTemplete', 
        success: function (data) {
            if (data.status_id != 0) {
                successnotify(data.status);
                GetTaskTempleteLists();
                $("#ClrTask").find("input").val("");
                $("#ClrTask").find("textarea").val("");
                $("#ClrTask").find("select").val(0).change();
                $('#closedModel').click();
            } else {
                warningnotify(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get Task Lists 
function GetTaskTempleteLists() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Task/GetTaskTempleteLists',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblTaskTemplete')) {
                table = $('#tblTaskTemplete').DataTable();
            } else {
                table = $('#tblTaskTemplete').DataTable();
            }
            table.destroy();
            $("#tblTaskTemplete").DataTable({
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
                        data: 'task_templete_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (task_templete_id_pk) {
                            return '<input id="checkbox0" class="cb-element checkbox" name="' + task_templete_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    //{
                    //    data: 'task_id_pk',
                    //    sWidth: '60px',
                    //    sClass: "view",
                    //    bSortable: false,
                    //    render: function (task_id_pk) {
                    //        return '<a class="editview" href="/Inventry/FixedAssetsDetails"  name="' + task_id_pk + '"> ' + task_id_pk + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                    //    }
                    //},
                    {
                        data: 'task_templete_id_pk', sWidth: '100px', render: function (task_templete_id_pk, type, row) {
                            return '<a href="#" data-toggle="modal" data-target="#myModalDetails" class="editview"  name="' + task_templete_id_pk + '"> <i class="fa fa-eye icon-ser"> </i> ' + task_templete_id_pk + '</a>';

                        }
                    },
                    { data: 'category_name' },
                    { data: 'sub_category_name' },
                    { data: 'title' },   
                    // { data: 'Voilated' },
                 
                    //{
                    //    data: 'task_id_pk',
                    //    sWidth: '60px',
                    //    sClass: "view",
                    //    bSortable: false,
                    //    render: function (task_id_pk) {
                    //        return '<a class="view" href="" data-toggle="modal" data-target="#myModalDetails"  name="' + task_id_pk + '"> <i class="fa fa-eye icon-ser"> </i> </a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                    //    }
                    //},
                ],
                //  dom: 'Bfrtip',
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
                    //{
                    //    extend: 'csvHtml5',
                    //    text: '<i class="fa fa-file-text-o"></i>',
                    //    titleAttr: 'CSV'
                    //},
                    {
                        extend: 'pdfHtml5',
                        text: '<i class="fa fa-file-pdf-o fa-2x" style="color:red"></i>',
                        titleAttr: 'PDF'
                    }
                ]

                //"buttons": [
                //    { extend: 'copy' },
                //    { extend: 'csv'  },
                //    { extend: 'excel'},
                //    { extend: 'pdf' }
                //]

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
function GetTaskTempleteDetails(task_templete_id) { 
    var parm = {
        'task_templete_id_pk': task_templete_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Task/GetTaskTempleteDetails',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#txtID").text(data.task_templete_id_pk);
            $("#txtCategory").text(data.category_name);
            $("#txtSubCategory").text(data.sub_category_name); 
            $("#txtTitleLst").text(data.title);
            $("#txtTaskType").text(data.task_type_name);
            $("#txtBusinessUnit").text(data.business_unit);
            $("#txtSupportDepartment").text(data.support_dep_name);
            $("#txtSupportGroup").text(data.support_dep_group_name);
            $("#txtAsset").text(data.asset_name);
            $("#txtAssignTo").text(data.name);
            $("#txtPriority").text(data.priority_name);
            $("#txtDueDateLst").text(data.due_date);
            $("#txtMessageLst").text(data.message);
            $("#txtCreatedDateLst").text(data.created_date);
        },
        error: function (edata) {
            alert("error while feching record.");
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
//Get Task For Edit
function GetTaskTempleteDetailsEdit(task_templete_id) {
    var parm = {
        'task_templete_id_pk': task_templete_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Task/GetTaskTempleteDetailsEdit',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#ddlCategory").val(data.common_cat_id_fk).change();
            $("#ddlSubCategory").val(data.sub_category_id_fk).change();
            $("#txtTitle").val(data.title);
            $("#ddlTaskType").val(data.task_type_id_fk).change();
            $("#ddlBusinessUnit").val(data.business_unit_id_fk).change();
            $("#ddlSupportDepartment").val(data.support_dep_id_fk).change();
            $("#ddlSupportGroup").val(data.support_group_id_fk).change();
            $("#ddlAssets").val(data.asset_id_fk).change();
            $("#ddlAssign").val(data.assign_to).change().change();
            $("#ddlPriority").val(data.priority_id_fk).change();
            $("#txtDueDate").val(data.due_date);
            $("#txtMessage").val(data.message);
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Insert Task
function UpdateTaskTemplete(task_templete_id) {
    var parm = {
        "task_templete_id_pk": task_templete_id,
        "common_cat_id_fk": $("#ddlCategory option:selected").val().trim(),
        "sub_category_id_fk": $("#ddlSubCategory option:selected").val().trim(),
        "title": $("#txtTitle").val().trim(),
        "task_type_id_fk": $("#ddlTaskType option:selected").val().trim(),
        "business_unit_id_fk": $("#ddlBusinessUnit option:selected").val().trim(),
        "support_dep_id_fk": $("#ddlSupportDepartment option:selected").val().trim(),
        "support_group_id_fk": $("#ddlSupportGroup option:selected").val().trim(),
        "asset_id_fk": $("#ddlAssets option:selected").val().trim(),
        "assign_to": $("#ddlAssign option:selected").val().trim(),
        "priority_id_fk": $("#ddlPriority option:selected").val().trim(),
        "due_date": $("#txtDueDate").val().trim(),
        "message": $("#txtMessage").val().trim(),

    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Task/UpdateTaskTemplete',
        success: function (data) {
            if (data.status_id != 0) {
                successnotify(data.status);
                GetTaskTempleteLists();
                $("#ClrTask").find("input").val("");
                $("#ClrTask").find("textarea").val("");
                $("#ClrTask").find("select").val(0).change();
            } else {
                warningnotify(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};