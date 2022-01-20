$(document).ready(function () {
    //GetTicketLists();
    alert($.session.get("promblems_id_pk"));
    GetTicketsDetailsByProblemId($.session.get("promblems_id_pk"));
    GetTicketsDetailsListByProblemId($.session.get("promblems_id_pk"));
    //GetEmployees();
    //GetStoredLocation();
    //GetCategoryList();
    $("#btnSubmit").click(function () {
        if (validateareamaster() == true) {

        } else {
            return false;
        }
    });
    $("#btnAttachIncidents").click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            InsAttachTicketsWithProblem($(this).attr('name'));
            //alert($(this).attr('name'));
             //alert($(this).val());
        });
    });

});
function validateareamaster() {
    var return_val = true;
    if ($('#txtImpact').val().trim() == "" || $('#txtImpact').val() == null) {
        $('#SpnImpact').show();
        return_val = false;
    } else {
        $('#SpnImpact').hide();
    }
    if ($('#txtRootCoursAnalysis').val().trim() == "" || $('#txtRootCoursAnalysis').val() == null) {
        $('#SpnRootCoursAnalysis').show();
        return_val = false;
    } else {
        $('#SpnRootCoursAnalysis').hide();
    }

    if ($('#txtSolution').val().trim() == "" || $('#txtSolution').val() == null) {
        $('#SpnSolution').show();
        return_val = false;
    } else {
        $('#SpnSolution').hide();
    }
    if ($('#txtClosureStatement').val().trim() == "" || $('#txtClosureStatement').val() == null) {
        $('#SpnClosureStatement').show();
        return_val = false;
    } else {
        $('#SpnClosureStatement').hide();
    }
    return return_val;
};
// Get Ticket Lists 
//function GetTicketLists() {
//    $.ajax({
//        type: "Get",
//        contentType: "application/json; charset=utf-8",
//        url: 'http://playmediahouse.com/api/api/Ticket/GetTicketLists',
//        dataType: "json",
//        success: function (data) {
//            var table;
//            if ($.fn.dataTable.isDataTable('#tblTicket')) {
//                table = $('#tblTicket').DataTable();
//            } else {
//                table = $('#tblTicket').DataTable();
//            }
//            table.destroy();
//            $("#tblTicket").DataTable({
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

//                    {
//                        data: 'ticket_id_pk',
//                        sWidth: '2px',
//                        sClass: "view",
//                        bSortable: false,
//                        render: function (ticket_id_pk) {
//                            return '<input id="check" class="cb-element checkbox" name="' + ticket_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
//                        }
//                    },

//                    {
//                        data: 'ticket_id_pk', render: function (ticket_id_pk, type, row) {
//                            // Combine the first and last names into a single table field
//                            //return '<a href="/Ticket/TicketDetails" class="editview"  name="' + ticket_id_pk + '">' + row.prefix + + row.ticket_id_pk +'  <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="" style="color:#f39c12 !important" data-original-title="Normal priority"></i></a>';
//                            if (row.priority_id_pk === 1) {
//                                return ' <a href="/Ticket/TicketDetails" title="Critical" class="editview"  name="' + ticket_id_pk + '">  <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Critical" style="color:#ea2d2d !important" title="Normal priority" data-original-title="Normal priority"></i>   &nbsp;' + row.prefix + + row.ticket_id_pk + ' </a>';
//                                // return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + status + '">' + status + '</span>';
//                            }
//                            else if (row.priority_id_pk === 2) {
//                                return ' <a href="/Ticket/TicketDetails" title="High" class="editview"  name="' + ticket_id_pk + '">  <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="High" style="color:#b38909 !important" title="Normal priority" data-original-title="Normal priority"></i>   &nbsp;' + row.prefix + + row.ticket_id_pk + '</a>';
//                                // return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + status + '</span>';
//                            }
//                            else if (row.priority_id_pk === 3) {
//                                return ' <a href="/Ticket/TicketDetails" title="Medium" class="editview"  name="' + ticket_id_pk + '"> <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Medium" style="color:#ffee07 !important" data-original-title="Normal priority"></i>   &nbsp;' + row.prefix + + row.ticket_id_pk + '</a>';
//                                // return '<span class="badge badge-primary ENABLED" style="background-color:#b3ae1f;" name="' + status + '">' + status + '</span>';
//                            }
//                            else if (row.priority_id_pk === 4) {
//                                return ' <a href="/Ticket/TicketDetails" title="Low" class="editview"  name="' + ticket_id_pk + '"> <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Low" style="color:#067304ad  !important" data-original-title="Normal priority"></i>   &nbsp;' + row.prefix + + row.ticket_id_pk + '</a>';
//                                //  return '<span class="badge badge-primary ENABLED" style="background-color:#3bc0c3 !important;" name="' + status + '">' + status + '</span>';
//                            }

//                        }
//                    },
                   
//                    //{ data: 'ticket_id_pk' },
//                    { data: 'subject' },
//                    { data: 'email' },
//                    {
//                        data: 'name',
//                        sWidth: '140px',
//                        sClass: "view",
//                        bSortable: false,
//                        render: function (name) {
//                            return '<a href="#" class="adminview"  name="' + name + '" data-toggle="modal" data-target="#myModal" >  <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i>  &nbsp;  ' + name + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
//                        }
//                    },
//                    //{ data: 'name' },
//                    // { data: 'created_date' },
//                    {
//                        "data": "created_date",
//                        "type": "date",
//                        "render":
//                            function (data, type, full) {
//                                return (data) ? moment(data).format('DD/MM/YYYY  -  HH:mm:ss') : '';
//                            }
//                    },
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
//                                return '<span class="badge badge-primary" style="background-color:#f24f7c !important;" name="' + status + '">' + status + '</span>';
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

// Get Ticket List For Attach Problem 
function GetTicketsDetailsByProblemId(problem_id) {  
    var parm = {
        'problem_id_fk': problem_id// $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Ticket/GetTicketsDetailsByProblemId', 
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblTicket')) {
                table = $('#tblTicket').DataTable();
            } else {
                table = $('#tblTicket').DataTable();
            }
            table.destroy();
            $("#tblTicket").DataTable({
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
// insert Attach Problem With Asset 
function InsAttachTicketsWithProblem(ticket_id) {
    var parm = {
        "ticket_id_fk": ticket_id,
        "problem_id_fk": $.session.get("promblems_id_pk"),
        "updated_by": $.session.get("id") 
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Problems/InsAttachTicketsWithProblem', 
        success: function (data) {
            if (data.status_id == 0) {
                successnotify(data.status);
                GetTicketsDetailsListByProblemId($.session.get("promblems_id_pk"));
            } else {
                warningnotify(data.status);
                GetTicketsDetailsListByProblemId($.session.get("promblems_id_pk"));
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get Ticket List With Attach Problem 
function GetTicketsDetailsListByProblemId(problem_id) {
    var parm = {
        'problem_id_fk': problem_id// $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Ticket/GetTicketsDetailsListByProblemId',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblTicketAttachWithProblem')) {
                table = $('#tblTicketAttachWithProblem').DataTable();
            } else {
                table = $('#tblTicketAttachWithProblem').DataTable();
            }
            table.destroy();
            $("#tblTicketAttachWithProblem").DataTable({
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
