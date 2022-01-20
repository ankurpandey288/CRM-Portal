$(document).ready(function () {
    if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
        window.location.href = "/Login/Index/";
    };
    GetEmployeesLists();
    GetKnowledgeBaseSolutionCategoryList();
    GetKnowledgeBaseApproverList(1);
    $("#ddlCategory").change(function () {
        if ($(this).val() != 0) {
            GetKnowledgeBaseSubCategoryList($(this).val());
        } else {
            $("#ddlSubCategory").html("").append('<option value="0">Select Sub Category</option>');
        }
    });
    $("#ddlSubCategory").change(function () {
        //var cat = $("#ddlCategory option:selected").val();
        //var sub = $("#ddlSubCategory option:selected").val();
        //alert(cat , sub );
        if ($(this).val() != 0) {
            GetKnowledgeBaseApproverListForEdit($(this).val());
           // alert($(this).val());
        } else {
            $("#ddlSubCategory").html("").append('<option value="0">Select Sub Category</option>');
        }
    });
    $("#BtnSearch").click(function () {
        GetKnowledgeBaseSolutionListForApproval($("#ddlCategory").val(), $("#ddlSubCategory").val());
    });
    $(document).on('click', '.btnDeleteLine', function () {
        $("#ConfirmDeleteNewLinesModal").modal("show").find('#btnConfirmNewLinesDeleteYes').attr('name', $(this).attr('name'));
    });
    //Add New Lines
    //$("#AddNewLines").click(function () {
    //    if ($('#tbodyExpenses tr').length < 10) {
    //        var trlength = ($('#tbodyExpenses tr').length) + 1;
    //        var newline = ' <tr><td>' + trlength + '</td>';
    //        newline = newline + '<td><select class="select form-control select2 DDLApprovalList" required><option value="0">Select</option ></select ></td>';
    //        newline = newline + '<td><button  class="btn btn-danger btn-xs btnDeleteLine" name="' + trlength + '" data-toggle="tooltip" data-placement="top" title="delete Record details"><i class="fa fa-remove"></i></button></td></tr>';
    //        $("#tbodyExpenses").append(newline);
    //        $("#spntfootExpenses").hide();

    //    } else {
    //        alert("Maxmimum 10 Record You Can Add");
    //    }
    //});
    $("#btnTest").click(function () {
        if ($('#tbodyExpenses tr').length < 10) {
            var trlength = ($('#tbodyExpenses tr').length) + 5;
            var newline = ' <tr><td>' + trlength + '</td>';
            newline = newline + '<td><select class="dropdown form-control DDLApprovalList" id="DDLApprovalList' + trlength + '"><option value="0">Select</option></select></td>';
            //newline = newline + '<td><select class="select form-control select2 ddlKBStatus" id="ddlKBStatus" required><option value="0">Select</option><option value="1">Approved</option><option value="2">Not Approved</option><option value="3">Rejected</option></select> </td>';
            newline = newline + '<td><button  class="btn btn-danger btn-xs btnDeleteLine" name="' + trlength + '" data-toggle="tooltip" data-placement="top" title="delete Record details"><i class="fa fa-remove"></i></button></td></tr>';
            $("#tbodyExpenses").append(newline);
            GetApproverByID("ddlAccountType" + trlength);
            $("#spntfootExpenses").hide();
        } else {
            alert("Maxmimum 10 Record You Can Add");
        }
    });
    //Add New Lines
    $("#AddNewLines").click(function () {
        if ($('#tbodyExpenses tr').length < 10) {
            var trlength = ($('#tbodyExpenses tr').length) + 1;
            var newline = ' <tr><td>' + trlength + '</td>';
            newline = newline + '<td><select class="dropdown form-control DDLApprovalList" id="DDLApprovalList' + trlength + '"><option value="0">Select</option></select></td>';
            //newline = newline + '<td><select class="select form-control select2 ddlKBStatus" id="ddlKBStatus" required><option value="0">Select</option><option value="1">Approved</option><option value="2">Not Approved</option><option value="3">Rejected</option></select> </td>';
            newline = newline + '<td><button  class="btn btn-danger btn-xs btnDeleteLine" name="' + trlength + '" data-toggle="tooltip" data-placement="top" title="delete Record details"><i class="fa fa-remove"></i></button></td></tr>';
            $("#tbodyExpenses").append(newline);
            GetApproverByID("ddlAccountType" + trlength);
            $("#spntfootExpenses").hide();
        } else {
            alert("Maxmimum 10 Record You Can Add");
        }
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
    $("#btnSave").click(function () {
        InsKBApprCatandSubCategory();
    });
});
// Get Knowledge Base Category 
function GetKnowledgeBaseSolutionCategoryList() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/KnowledgeBase/GetKnowledgeBaseSolutionCategoryList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlCategory").html("").append('<option value="0">Select Category</option>');
            $(data).each(function () {
                $('#ddlCategory').append('<option value=' + this.catogory_id_pk + '>' + this.category_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Sub Category Lists 
function GetKnowledgeBaseSubCategoryList(category_id) {
    var parm = {
        "category_id_fk": category_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/KnowledgeBase/GetKnowledgeBaseSubCategoryList',
        success: function (data) {
            $("#ddlSubCategory").html("").append('<option value="0">Select Sub Category</option>');
            $(data).each(function () {
                $("#ddlSubCategory").append('<option value=' + this.sub_catogory_id_pk + '>' + this.sub_category_name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
function GetKnowledgeBaseSolutionListForApproval(category_id, sub_category_id) {
    var parm = {
        'category_id_fk': category_id ,
        'sub_category_id_fk': sub_category_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/KnowledgeBase/GetKnowledgeBaseSolutionListForApproval',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            //alert(data.status);
            var table;
            if ($.fn.dataTable.isDataTable('#tblKBApproval')) {
                table = $('#tblKBApproval').DataTable();
            } else {
                table = $('#tblKBApproval').DataTable();
            }
            table.destroy();
            $("#tblKBApproval").DataTable({
                data: data,
                paging: false,
                sort: false,
                searching: false,
                ordering: false,
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
                            return '<input id="check" class="cb-element checkbox tktcbk" name="' + solution_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'solution_id_pk' },
                    { data: 'category_name' },
                    { data: 'sub_category_name' },
                    { data: 'name' }
                ],
                //dom: 'Bflrtip',
                //buttons: [
                //    {
                //        extend: 'copyHtml5',
                //        text: '<i class="fa fa-files-o fa-2x"></i>',
                //        titleAttr: 'Copy'
                //    },
                //    {
                //        extend: 'excelHtml5',
                //        text: '<i class="fa fa-file-excel-o fa-2x" style="color:green"></i>',
                //        titleAttr: 'Excel'
                //    },
                //    {
                //        extend: 'pdfHtml5',
                //        text: '<i class="fa fa-file-pdf-o fa-2x" style="color:red"></i>',
                //        titleAttr: 'PDF'
                //    }
                //]
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
            $(".DDLApprovalList").html("").append('<option value="0">Select Approver</option>');
            $(data).each(function () {
                $('.DDLApprovalList').append('<option value=' + this.id + '>' + this.name + '</option>');
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
function GetApproverByID(DDLApprovalList) { 
    $.ajax({
        type: "GET",
        url: 'http://playmediahouse.com/api/api/Ticket/GetEmployeesLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".DDLApprovalList").html("").append('<option value="0">Select Approver</option>');
            $(data).each(function () {
                $('.DDLApprovalList').append('<option value=' + this.id + '>' + this.name + '</option>');
            });


            $("#" + DDLApprovalList).html("").append('<option value="0">Select Approver </option>')
            $(data).each(function () {
                $("#" + DDLApprovalList).append('<option value="' + this.id + '">' + this.name + '</option>');
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
// Insert Approver Status 
function InsKBApprCatandSubCategory() {
    var parm = {
        "category_id_fk": $("#ddlCategory option:selected").val().trim(),
        "sub_catogory_id_fk": $("#ddlSubCategory option:selected").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/KnowledgeBase/InsKBApprCatandSubCategory',
        success: function (data) {
            // alert("Inserted Successfully");
            if (data.status_id != 0) {
                InsKnowledgeBaseApproverStatus(data.kb_approver_cat_sub_id_pk);
              //  InsKnowledgeBaseApproverStatus(data.kb_approver_cat_sub_id_pk);
                successnotify(data.status);
            } else {
                warningnotify(data.status);
                // 
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Insert Approver Status 
function InsKnowledgeBaseApproverStatus(kb_approver_cat_sub_id_fk) {
    var trcount = $('#tbodyExpenses tr').length;
    $("#tbodyExpenses tr").each(function () {
        var parm = {
            "kb_approver_cat_sub_id_fk": kb_approver_cat_sub_id_fk, //$("#ddlSubCategory option:selected").val().trim(),
            "approver_id_fk": $(this).find('td:eq(1)').find("Select option:selected").val(),
        };
        var josnstr = JSON.stringify(parm);
        $.ajax({
            type: "Post",
            url: 'http://playmediahouse.com/api/api/KnowledgeBase/InsKnowledgeBaseApproverStatus',
            //  url: apiurl + 'Controllers/EfilingBooks/InsUserFeedbackQuestion',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: josnstr,
            success: function (data) {
                if (data.status_id != 0) {
                    successnotify(data.status);
                    //$("#ClrFeedBackQus").find("input").val("");
                    //$("#ClrFeedBackQus").find("select").val(0).change();
                    $('#closedModel').click();
                } else {
                    warningnotify(data.status);
                }
                //trcount = trcount - 1;
                //if (trcount == 0) {

                //}
            },
            error: function (edata) {
                $(edata).each(function () {
                    InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
                });
                alert("error while inserting record.");
            }
        });
    });
};
// get knowledgebase approver list for edit
function GetKnowledgeBaseApproverList(sub_category_id) {
    var parm = {
        'sub_catogory_id_fk': sub_category_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/KnowledgeBase/GetKnowledgeBaseApproverListForEdit',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#tbodyExpenses").html('');
            $(data).each(function () {
               // alert(this.approver_id_fk);
                var trlength = ($('#tbodyExpenses tr').length) + 1;
                //var newline = ' <tr><td>' + trlength + '</td>';
                $("#tbodyExpenses").append("<tr><td>" + trlength + "</td><td>" + this.name + "</td><td><button name='" + this.kb_approver_status_id_pk + "' class='btn btn-danger btn-xs removecostinvoice deletecostinvoice' data-toggle='tooltip' data-placement='top' title='delete cost details'><i class='fa fa-remove'></i></button></td></tr></tr>");
              //  $("#tbodyExpenses").append("<tr><td>" + trlength + "</td><td><select class='select form - control select2 DDLApprovalList' required><option value=" + this.approver_id_fk + ">" + this.name + "</option> </select></td><td><button name='" + this.kb_approver_status_id_pk + "' class='btn btn-danger btn-xs removecostinvoice deletecostinvoice' data-toggle='tooltip' data-placement='top' title='delete cost details'><i class='fa fa-remove'></i></button></td></tr></tr>");
               // $("#tbodyExpenses").append("<tr><td>" + trlength + "</td><td><select class='select form - control select2 DDLApprovalList' required> <option value="+ this.approver_id_fk +">Select</option> </select></td><td><button name='" + this.kb_approver_status_id_pk + "' class='btn btn-danger btn-xs removecostinvoice deletecostinvoice' data-toggle='tooltip' data-placement='top' title='delete cost details'><i class='fa fa-remove'></i></button><button name='" + this.kb_approver_status_id_pk + "' class='btn btn-primary btn-xs editcostinvoice btnaction' style='margin-left:10px;' data-toggle='tooltip' data-placement='top' title='edit cost details'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button><button name='" + this.kb_approver_status_id_pk + "' class='btn btn-success btn-xs btnupdcostinvoice updcostinvoice' style='display:none;' data-toggle='tooltip' data-placement='top' title='update cost details'><i class='fa fa-refresh'></i></button><button class='btn btn-warning btn-xs updcostinvoice btncancostinvoice' style='margin-left:10px;display:none;' data-toggle='tooltip' data-placement='top' title='cancel cost details'><i class='fa fa-chevron-left'></i> </button></td></tr></tr>");
            });
           
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};