$(document).ready(function () {
    if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
        window.location.href = "/Login/Index/";
    };
    $(document).on('click', '.deletecostinvoice', function () {
        $("#btnConfirmDeleteYes").attr("name", $(this).attr("name"));
        $("#ConfirmDeleteModal").modal("show");
    });
    $("#btnConfirmDeleteYes").click(function () {
        DeleteFeedBackQuestionk($(this).attr("name"));
    });
    GetUserFeedbackQuestion();
    //GetFeedbackQuestion();
    //Add New Lines
    $("#AddNewLines").click(function () {
        if ($('#tbodyExpenses tr').length < 10) {
            var trlength = ($('#tbodyExpenses tr').length) + 1;
            var newline = ' <tr><td>' + trlength + '</td>';
            newline = newline + '<td><input type="text" class="form-control txtDescription"  placeholder="Question"></td>';
            newline = newline + '<td><button  class="btn btn-danger btn-xs btnDeleteLine" name="' + trlength + '" data-toggle="tooltip" data-placement="top" title="delete Record details"><i class="fa fa-remove"></i></button></td></tr>';
            $("#tbodyExpenses").append(newline);
            $("#spntfootExpenses").hide();

        } else {
            alert("Maxmimum 10 Record You Can Add");
        }
    });
    $("#RemoveLines").click(function () {
        GetFeedbackQuestion();
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
    $("#btnSave").click(function () {
        InsUserFeedbackQuestion(); 
        //var trlength = 1;
        //$('#tbodyExpenses tr').each(function () {
        //    $(this).find('td:eq(0)').text(trlength);
        //    $(this).find('td:last').find('.btnDeleteLine').attr('name', trlength);
        //    $(this).find('td:eq(1)').find('.ddlAccountType').attr('id', 'ddlAccountType' + trlength);
        //    $(this).find('td:eq(3)').find('.txtAmount').attr('id', 'txtAmount' + trlength);
        //    trlength = trlength + 1;
        //});
        //$("#tbodyExpenses tr").each(function () {
        //    alert($(this).find('td:eq(0)').text().trim());
        //    alert($(this).find('td:eq(1) input').val());
        //    });    
    });
});

function InsUserFeedbackQuestion() {
    var trcount = $('#tbodyExpenses tr').length;
    $("#tbodyExpenses tr").each(function () {
        var parm = {
            "form_title": $("#txtTitles").val().trim(),
            "questions":  $(this).find('td:eq(1) input').val(),
            "message":    $("#txtTitles").val().trim(),
        };
        var josnstr = JSON.stringify(parm);
        $.ajax({
            type: "Post",
            url: 'http://playmediahouse.com/api/api/Utility/InsUserFeedbackQuestion',
        //  url: apiurl + 'Controllers/EfilingBooks/InsUserFeedbackQuestion',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: josnstr,
            success: function (data) {
                if (data.status_id != 0) {
                    successnotify(data.status);
                    $("#ClrFeedBackQus").find("input").val("");
                    $("#ClrFeedBackQus").find("select").val(0).change();
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
// Get Ticket Lists 
function GetUserFeedbackQuestion() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Utility/GetUserFeedbackQuestion',
        dataType: "json",
        success: function (data) {
            $("#tbodyFeed").html('');
            $(data).each(function () {
                var trlength = ($('#tbodyFeed tr').length) + 1;
                //var newline = ' <tr><td>' + trlength + '</td>';
                $("#tbodyFeed").append("<tr><td>" + trlength + "</td><td width='50%'>" + this.questions + "</td><td><input id='input-21b' type='text' class='rating rating-stars clear-rating clear-rating-active' data-min=0 data-max=5 data-step=0.2 data-size='lg' required title=''> </td></tr>");
            });
           
        },

        error: function (edata) {
            alert("error while feching record.");
        }
    });
};

//function GetUserFeedbackQuestion() {
//    $.ajax({
//        type: "Get",
//        contentType: "application/json; charset=utf-8",
//        url: 'http://playmediahouse.com/api/api/Utility/GetUserFeedbackQuestion', 
//        dataType: "json",
//        success: function (data) {
//            alert(data.questions);
//            var table;
//            if ($.fn.dataTable.isDataTable('#tblFeedbackQus')) {
//                table = $('#tblFeedbackQus').DataTable();
//            } else {
//                table = $('#tblFeedbackQus').DataTable();
//            }
//            table.destroy();
//            $("#tblFeedbackQus").DataTable({
//                data: data,
//                paging: false,
//                sort: false,
//                searching: false,
//                ordering: false,
//                order: [],
//                lengthMenu: [
//                    [10, 25, 50, -1],
//                    ['10 rows', '25 rows', '50 rows', 'Show all']
//                ],
//                responsive: true,
//                columns: [

//                    //{ data: 'feedback_id_pk' },
//                    { data: 'questions' },
//                    {
//                        data: 'feedback_id_pk',
//                        sWidth: '2px',
//                        sClass: "view",
//                        bSortable: false,
//                        render: function (feedback_id_pk) {
//                            return '<i class="fas fa-star star" name="' + feedback_id_pk + '" style="font-size:1.5em;"></i>  <input id="input-21b"  type="text" class="rating" data-min=0 data-max=5 data-step=0.2 data-size="lg" required title="">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
//                        }
//                    },

//                    //{
//                    //    data: 'ticket_id_pk', render: function (ticket_id_pk, type, row) {
//                    //        // Combine the first and last names into a single table field
//                    //        //return '<a href="/Ticket/TicketDetails" class="editview"  name="' + ticket_id_pk + '">' + row.prefix + + row.ticket_id_pk +'  <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="" style="color:#f39c12 !important" data-original-title="Normal priority"></i></a>';
//                    //        if (row.priority_id_pk === 1) {
//                    //            return ' <a href="/Ticket/TicketDetails" title="Critical" class="editview"  name="' + ticket_id_pk + '">  <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Critical" style="color:#ea2d2d !important" title="Normal priority" data-original-title="Normal priority"></i>   &nbsp;' + row.prefix + + row.ticket_id_pk + ' </a>';
//                    //            // return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + status + '">' + status + '</span>';
//                    //        }
//                    //        else if (row.priority_id_pk === 2) {
//                    //            return ' <a href="/Ticket/TicketDetails" title="High" class="editview"  name="' + ticket_id_pk + '">  <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="High" style="color:#b38909 !important" title="Normal priority" data-original-title="Normal priority"></i>   &nbsp;' + row.prefix + + row.ticket_id_pk + '</a>';
//                    //            // return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + status + '</span>';
//                    //        }
//                    //        else if (row.priority_id_pk === 3) {
//                    //            return ' <a href="/Ticket/TicketDetails" title="Medium" class="editview"  name="' + ticket_id_pk + '"> <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Medium" style="color:#ffee07 !important" data-original-title="Normal priority"></i>   &nbsp;' + row.prefix + + row.ticket_id_pk + '</a>';
//                    //            // return '<span class="badge badge-primary ENABLED" style="background-color:#b3ae1f;" name="' + status + '">' + status + '</span>';
//                    //        }
//                    //        else if (row.priority_id_pk === 4) {
//                    //            return ' <a href="/Ticket/TicketDetails" title="Low" class="editview"  name="' + ticket_id_pk + '"> <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Low" style="color:#067304ad  !important" data-original-title="Normal priority"></i>   &nbsp;' + row.prefix + + row.ticket_id_pk + '</a>';
//                    //            //  return '<span class="badge badge-primary ENABLED" style="background-color:#3bc0c3 !important;" name="' + status + '">' + status + '</span>';
//                    //        }

//                    //    }
//                    //},
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
                   
//                   // { data: 'email' },
                   
//                    //{ data: 'name' },
//                    // { data: 'created_date' },
                    
//                ],
//                //dom: 'Bflrtip',
//                //buttons: [
//                //    {
//                //        extend: 'copyHtml5',
//                //        text: '<i class="fa fa-files-o fa-2x"></i>',
//                //        titleAttr: 'Copy'
//                //    },
//                //    {
//                //        extend: 'excelHtml5',
//                //        text: '<i class="fa fa-file-excel-o fa-2x" style="color:green"></i>',
//                //        titleAttr: 'Excel'
//                //    },
//                //    {
//                //        extend: 'pdfHtml5',
//                //        text: '<i class="fa fa-file-pdf-o fa-2x" style="color:red"></i>',
//                //        titleAttr: 'PDF'
//                //    }
//                //]
//            });
//        },

//        error: function (edata) {
//            alert("error while feching record.");
//        }
//    });
//};
// Get Feedback Question For Edit
function GetFeedbackQuestion() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Utility/GetUserFeedbackQuestion',
        dataType: "json",
        success: function (data) {
            $("#tbodyExpenses").html('');
            $(data).each(function () {
                var trlength = ($('#tbodyExpenses tr').length) + 1;
                //var newline = ' <tr><td>' + trlength + '</td>';
                $("#tbodyExpenses").append("<tr><td>" + trlength + "</td><td width='50%'>" + this.questions + "</td><td><button name='" + this.feedback_id_pk + "' class='btn btn-danger btn-xs removecostinvoice deletecostinvoice' data-toggle='tooltip' data-placement='top' title='delete cost details'><i class='fa fa-remove'></i></button><button name='" + this.feedback_id_pk + "' class='btn btn-primary btn-xs editcostinvoice btnaction' style='margin-left:10px;' data-toggle='tooltip' data-placement='top' title='edit cost details'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button><button name='" + this.feedback_id_pk + "' class='btn btn-success btn-xs btnupdcostinvoice updcostinvoice' style='display:none;' data-toggle='tooltip' data-placement='top' title='update cost details'><i class='fa fa-refresh'></i></button><button class='btn btn-warning btn-xs updcostinvoice btncancostinvoice' style='margin-left:10px;display:none;' data-toggle='tooltip' data-placement='top' title='cancel cost details'><i class='fa fa-chevron-left'></i> </button></td></tr></tr>");
            });

          //  $("#tbodyExpenses").html("");
          //  $(data.feedback_id_pk).each(function () {
           //     $("#tbodyExpenses").append("<tr><td width='50%'>" + this.questions + "</td><button name='" + this.client_invoice_cost_pk + "' class='btn btn-danger btn-xs removecostinvoice deletecostinvoice btnaction' data-toggle='tooltip' data-placement='top' title='delete cost details'><i class='fa fa-remove'></i></button><button name='" + this.feedback_id_pk + "' class='btn btn-primary btn-xs editcostinvoice btnaction' style='margin-left:10px;' data-toggle='tooltip' data-placement='top' title='edit cost details'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button><button name='" + this.feedback_id_pk + "' class='btn btn-success btn-xs btnupdcostinvoice updcostinvoice' style='display:none;' data-toggle='tooltip' data-placement='top' title='update cost details'><i class='fa fa-refresh'></i></button><button class='btn btn-warning btn-xs updcostinvoice btncancostinvoice' style='margin-left:10px;display:none;' data-toggle='tooltip' data-placement='top' title='cancel cost details'><i class='fa fa-chevron-left'></i> </button></td></tr>");

              
          //  });
           // alert(questions);
            //$("#tbodyExpenses tr").each(function () {
            //    alert(data.questions);
            //  //$("#txtTitles").val(data.form_title),
            //  //    $(this).find('td:eq(1) input').val(data.questions),
            //  //    $("#txtThankUMsg").val(data.message)
            //}); 
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//delete
function DeleteFeedBackQuestionk(feedback_id) {
    var parm = {
        "feedback_id_pk": feedback_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Utility/DeleteFeedBackQuestionkByID', 
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
