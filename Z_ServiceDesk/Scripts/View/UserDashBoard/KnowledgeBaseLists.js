$(document).ready(function () {
    GetKnowledgeBaseSubSolutionList();
    //GetKnowledgeBaseApproveSolutionList();
    GetKnowledgeBaseCategoryList();
    GetKnowledgeBaseSubCategoryList();
    GetKnowledgeBaseCategory();
    GetApprover();
    GetKnowledgeBaseSolutionApproveList();
    GetSupportGroup();
    // GetKnowledgeBaseSubSolutionList();
    //GetApproverListSolution();
    $("#btnCategory").click(function () {
        if (validateCategory() == true) {
            InsCategory();
        } else {
            return false;
        }
    });
    $("#btnCreateSubCategory").click(function () {
        if (validateSubCategory() == true) {
            InsSubCategory();
        } else {
            return false;
        }
    });
    $("#btnSaveSolution").click(function () {
        // alert($('.jqte-test').val());

        if (validateSolution() == true) {
            var countries = [];
            $.each($(".country option:selected"), function () {
                countries.push($(this).val());
            });
            InsSolutions(countries.join(", "));

            //InsSolutions();
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
    $("#ddlSubCategoryForSolution").change(function () {
        if ($(this).val() != 0) {
            GetApproverListSolution($(this).val());
        } else {
            $("#ddlApproverSolution").html("").append('<option value="0">Select Approver</option>');
        }
    });
    //Add New Lines
    $("#AddNewLines").click(function () {
        if ($('#tbodyExpenses tr').length < 10) {
            var trlength = ($('#tbodyExpenses tr').length) + 1;
            var newline = ' <tr><td>' + trlength + '</td>';
            newline = newline + '<td><input type="text" class="form-control txtDescription"  placeholder="Description"></td>';
            newline = newline + '<td><button  class="btn btn-danger btn-xs btnDeleteLine" name="' + trlength + '" data-toggle="tooltip" data-placement="top" title="delete Record details"><i class="fa fa-remove"></i></button></td></tr>';
            $("#tbodyExpenses").append(newline);
            $("#spntfootExpenses").hide();

        } else {
            alert("Maxmimum 10 Record You Can Add");
        }
    });
    $(document).on('click', '.btnDeleteLine', function () {
        $("#ConfirmDeleteNewLinesModal").modal("show").find('#btnConfirmNewLinesDeleteYes').attr('name', $(this).attr('name'));
    });
    $("#btnConfirmNewLinesDeleteYes").click(function () {
        $(".btnDeleteLine[name=" + $("#btnConfirmNewLinesDeleteYes").attr('name') + "]").parent('td').parent('tr').remove();
        $(this).siblings('button').click();
        var trlength = 1;
        $('#tbodyExpenses tr').each(function () {
            $(this).find('td:eq(0)').text(trlength);
            $(this).find('td:last').find('.btnDeleteLine').attr('name', trlength);
            $(this).find('td:eq(1)').find('.ddlAccountType').attr('id', 'ddlAccountType' + trlength);
            $(this).find('td:eq(3)').find('.txtAmount').attr('id', 'txtAmount' + trlength);
            trlength = trlength + 1;
        });
    });
    $("#CheckAll").click(function () {
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#BtnDelete').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            DeleteKnowledgeBase($(this).attr('name'));
        });
    });
    $("#CheckAllCategory").click(function () {
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#BtnDeleteCategory').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            DeleteKnowledgeBaseCategory($(this).attr('name'));
        });
    });
    $("#CheckAllSubCategory").click(function () {
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#BtnDeleteSubCategory').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            DeleteKnowledgeBaseSubCategory($(this).attr('name'));
        });
    });
    $(document).on('click', '.editview', function () {
        // alert($(this).attr("name"));
        if ($.session.get("solution_id_pk") != '' || $.session.get("solution_id_pk") != null || $.session.get("solution_id_pk") == undefined) {
            $.session.remove("solution_id_pk");
            $.session.set("solution_id_pk", $(this).attr("name"));
            //  window.open('/Ticket/TicketDetails');
        }

    });
});
function validateCategory() {
    var return_val = true;
    if ($('#txtCategory').val().trim() == "" || $('#txtCategory').val() == null) {
        $('#SpnCategory').show();
        return_val = false;
    } else {
        $('#SpnCategory').hide();
    }
    return return_val;
};
function validateSubCategory() {
    var return_val = true;
    if ($('#ddlCategoryForSub option:selected').val() == 0) {
        $('#SpnCategoryForSub').show();
        return_val = false;
    } else {
        $('#SpnCategoryForSub').hide();
    }
    if ($('#txtSubCategory').val().trim() == "" || $('#txtSubCategory').val() == null) {
        $('#SpnSubCategory').show();
        return_val = false;
    } else {
        $('#SpnSubCategory').hide();
    }
    if ($('#ddlCategory1st option:selected').val() == 0) {
        $('#SpnCategory1st').show();
        return_val = false;
    } else {
        $('#SpnCategory1st').hide();
    }
    if ($('#ddlCategory2nd option:selected').val() == 0) {
        $('#SpnCategory2nd').show();
        return_val = false;
    } else {
        $('#SpnCategory2nd').hide();
    }
    if ($('#ddlCategory3rd option:selected').val() == 0) {
        $('#SpnCategory3rd').show();
        return_val = false;
    } else {
        $('#SpnCategory3rd').hide();
    }
    return return_val;
};
function validateSolution() {
    var return_val = true;
    if ($('#dllCategoryForSolutions option:selected').val() == 0) {
        $('#SpnCategoryForSolutions').show();
        return_val = false;
    } else {
        $('#SpnCategoryForSolutions').hide();
    }
    if ($('#ddlSubCategoryForSolution option:selected').val() == 0) {
        $('#SpnSubCategoryForSolution').show();
        return_val = false;
    } else {
        $('#SpnSubCategoryForSolution').hide();
    }
    if ($('#txtSolutionTitle').val().trim() == "" || $('#txtSolutionTitle').val() == null) {
        $('#SpnSolutionTitle').show();
        return_val = false;
    } else {
        $('#SpnSolutionTitle').hide();
    }
    //if ($('#txtContents').val().trim() == "" || $('#txtContents').val() == null) {
    //    $('#SpnContents').show();
    //    return_val = false;
    //} else {
    //    $('#SpnContents').hide();
    //}
    if ($('#txtKeyWords').val().trim() == "" || $('#txtKeyWords').val() == null) {
        $('#SpnKeyWords').show();
        return_val = false;
    } else {
        $('#SpnKeyWords').hide();
    }
    if ($('#ddlApproverSolution option:selected').val() == 0) {
        $('#SpnApproverSolution').show();
        return_val = false;
    } else {
        $('#SpnApproverSolution').hide();
    }
    return return_val;
};
function InsCategory() {
    var parm = {
        "category_name": $("#txtCategory").val().trim()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/KnowledgeBase/InsCategory',
        success: function (data) {
            // alert("Inserted Successfully");
            if (data.status_id != 0) {
                successnotify(data.status);
                GetKnowledgeBaseCategoryList();
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
// Get KnowledgeBase Category List 
function GetKnowledgeBaseCategoryList() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/KnowledgeBase/GetKnowledgeBaseCategoryList',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblKnowledgeBaseCategory')) {
                table = $('#tblKnowledgeBaseCategory').DataTable();
            } else {
                table = $('#tblKnowledgeBaseCategory').DataTable();
            }
            table.destroy();
            $("#tblKnowledgeBaseCategory").DataTable({
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
                        data: 'catogory_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (catogory_id_pk) {
                            return '<input id="checkbox0" name="' + catogory_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'category_name' }
                ],
                //dom: 'Bfrtip',
                //buttons: [
                //    'copyHtml5',
                //    'excelHtml5',
                //    'csvHtml5',
                //    'pdfHtml5'
                //]
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
//Get All Holiday Calender Location
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
//get All Employee List from People
function GetApprover() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Consumable/GetEmployees',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".Approver").html("").append('<option value="0">Select Approver</option>');
            $(data).each(function () {
                $('.Approver').append('<option value=' + this.id + '>' + this.name + '</option>');
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
function InsSubCategory() {
    var parm = {
        "category_id_fk": $("#ddlCategoryForSub option:selected").val().trim(),
        "sub_category_name": $("#txtSubCategory").val().trim(),
        "fst_approver": $("#ddlCategory1st option:selected").val().trim(),
        "snd_approver": $("#ddlCategory2nd option:selected").val().trim(),
        "trd_approver": $("#ddlCategory3rd option:selected").val().trim()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/KnowledgeBase/InsSubCategory',
        success: function (data) {
            // alert("Inserted Successfully");
            if (data.status_id != 0) {
                successnotify(data.status);
                GetKnowledgeBaseSubCategoryList();
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
//get Approver List from People
function GetApproverListSolution(sub_catogory_id_pk) {
    var parm = {
        "sub_catogory_id_pk": sub_catogory_id_pk,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/KnowledgeBase/GetKnowledgeBaseApproverList',
        success: function (data) {
            $("#ddlApproverSolution").html("").append('<option value="0">Select Approver</option>');
            $(data).each(function () {
                $("#ddlApproverSolution").append('<option value=' + this.fst_approver + '>' + this.Name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get KnowledgeBase Category List 
function GetKnowledgeBaseSubCategoryList() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/KnowledgeBase/GetKnowledgeBaseSubCategoryList',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblSubCategory')) {
                table = $('#tblSubCategory').DataTable();
            } else {
                table = $('#tblSubCategory').DataTable();
            }
            table.destroy();
            $("#tblSubCategory").DataTable({
                data: data,
                paging: true,
                sort: true,
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
                        data: 'sub_catogory_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (sub_catogory_id_pk) {
                            return '<input id="checkbox0" name="' + sub_catogory_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'category_name' },
                    { data: 'sub_category_name' }
                ],
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                    'csvHtml5',
                    'pdfHtml5'
                ]
            });
        },

        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Support Group Department 
function GetSupportGroup() {
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
// Insert Solution 
function InsSolutions(countries) {
    var parm = {
        "category_id_fk": $("#dllCategoryForSolutions option:selected").val().trim(),
        "sub_catogory_id_fk": $("#ddlSubCategoryForSolution option:selected").val().trim(),
        "solution_title": $("#txtSolutionTitle").val().trim(),
        "contents": $("#txtContents").val().trim(),
        "keywords": $("#txtKeyWords").val().trim(),
        //"approver_id_fk": $("#ddlApproverSolution option:selected").val().trim(),
        "support_dep_group": countries,
        "is_user": $("#cbkUesr").is(":checked") == true ? 1 : 0,
        "is_tecnician": $("#cbkTechnician").is(":checked") == true ? 1 : 0
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/KnowledgeBase/InsSolution',
        success: function (data) {
            // alert("Inserted Successfully");
            if (data.status_id != 0) {
                successnotify(data.status);
                GetKnowledgeBaseSubCategoryList();
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
// Get KnowledgeBase Pending Solution List 
function GetKnowledgeBaseSubSolutionList() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/KnowledgeBase/GetKnowledgeBaseSolutionList',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblPendingSolution')) {
                table = $('#tblPendingSolution').DataTable();
            } else {
                table = $('#tblPendingSolution').DataTable();
            }
            table.destroy();
            $("#tblPendingSolution").DataTable({
                data: data,
                paging: true,
                sort: true,
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
                    //    data: 'sub_catogory_id_pk',
                    //    sWidth: '2px',
                    //    sClass: "view",
                    //    bSortable: false,
                    //    render: function (sub_catogory_id_pk) {
                    //        return '<input id="checkbox0" name="' + sub_catogory_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                    //    }
                    //},
                    { data: 'solution_id_pk' },
                    { data: 'solution_title' },
                    { data: 'Approval_Status' },
                    { data: 'name' }
                ],
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                    'csvHtml5',
                    'pdfHtml5'
                ]
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Get KnowledgeBase Approved Solution List 
function GetKnowledgeBaseSolutionApproveList() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/KnowledgeBase/GetKnowledgeBaseSolutionApproveList',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblApproveSolution')) {
                table = $('#tblApproveSolution').DataTable();
            } else {
                table = $('#tblApproveSolution').DataTable();
            }
            table.destroy();
            $("#tblApproveSolution").DataTable({
                data: data,
                paging: true,
                sort: true,
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
                        data: 'solution_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (solution_id_pk) {
                            return '<input id="checkbox0" name="' + solution_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'solution_id_pk' },
                    { data: 'solution_title' },
                    { data: 'contents' },
                    { data: 'name' },
                    {
                        data: 'solution_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (solution_id_pk) {
                            return '<a href="/UserDashBoard/Article" class="editview"  name="' + solution_id_pk + '" title="Click here to view more details" target="_blank"><i class="fa fa-eye" aria-hidden="true"></i></a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    }
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
function DeleteKnowledgeBase(solution_id) {
    var parm = {
        "solution_id_pk": solution_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/KnowledgeBase/DeleteKnowledgeBaseByID',
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
function DeleteKnowledgeBaseCategory(catogory_id) {
    var parm = {
        "catogory_id_pk": catogory_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/KnowledgeBase/DeleteKnowledgeBaseCategoryByID',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetKnowledgeBaseCategoryList();
            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};
function DeleteKnowledgeBaseSubCategory(sub_catogory_id) {
    var parm = {
        "sub_catogory_id_pk": sub_catogory_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/KnowledgeBase/DeleteKnowledgeBaseSubCategoryByID',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetKnowledgeBaseSubCategoryList();
            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};
//function GetKnowledgeBaseApproveSolutionList() { 
//    $.ajax({
//        type: "Get",
//        contentType: "application/json; charset=utf-8",
//        url: 'http://playmediahouse.com/api/api/KnowledgeBase/GetKnowledgeBaseSolutionApproveList',
//        dataType: "json",
//        success: function (data) {
//            var table;
//            if ($.fn.dataTable.isDataTable('#tblApproveSolution')) {
//                table = $('#tblApproveSolution').DataTable();
//            } else {
//                table = $('#tblApproveSolution').DataTable();
//            }
//            table.destroy();
//            $("#tblApproveSolution").DataTable({
//                data: data,
//                paging: true,
//                sort: true,
//                searching: true,
//                order: [],
//                lengthMenu: [
//                [10, 25, 50, -1],
//                ['10 rows', '25 rows', '50 rows', 'Show all']
//                ],
//                responsive: true,
//                columns: [
//                    //{
//                    //    data: 'solution_id_pk',
//                    //    sWidth: '2px',
//                    //    sClass: "view",
//                    //    bSortable: false,
//                    //    render: function (solution_id_pk) {
//                    //        return '<input id="checkbox1" name="' + solution_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
//                    //    }
//                    //},
//                    //{ data: 'solution_id_pk' },
//                    { data: 'solution_title' },
//                    { data: 'contents' },
//                    { data: 'name' }
//                ],
//                dom: 'Bfrtip',
//                buttons: [
//                    'copyHtml5',
//                    'excelHtml5',
//                    'csvHtml5',
//                    'pdfHtml5'
//                ]
//            });
//        },

//        error: function (edata) {
//            alert("error while feching record.");
//        }
//    });
//};