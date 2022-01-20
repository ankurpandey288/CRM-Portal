$(document).ready(function () {
    GetReportTemplate();

    $("#btnFilter").click(function () {
        debugger;
        SaveReport();
    });


});
//Get All Location Lists
function GetReportTemplate() {
    debugger;
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Staff/GetReportTemplateList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            debugger;
            $(data).each(function () {
                $('#Div_Main').append('<div class="col-4"><div class="card"><div class="card-body table-responsive"><div class="col-12"><button type="button" onclick="DeleteReport(' + this.ReportTemplate_Id + ')" class="btn btn-danger waves-effect waves-light float-left btndelete"> <i class="mdi mdi-delete"></i></button><a class="col-form-label" style="font-family: "Montserrat", sans-serif !important;font-size: 13px !important;font-weight: bold !important;" href="#" onClick="GetReport(' + this.ReportTemplate_Id + ')">' + this.ReportName + '</a></div></div></div ></div >');

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
                $('#ddlUserFltr').append('<option value=' + this.user_id_pk + '>' + this.user_name + ' - ' + this.email + '</option>');
                $('#ddlUser').append('<option value=' + this.user_id_pk + '>' + this.user_name + ' - ' + this.email + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get Ticket Status List
function GetTicketStatus() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Staff/GetTicketStatusLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ticket_status_id_pk").html("").append('<option value="0">Select Status</option>');
            // $("#ticket_status_id_pk").html("").append('<option value="0">Select Status</option>');
            $(data).each(function () {
                $('#ticket_status_id_pk').append('<option value=' + this.ticket_status_id_pk + '>' + this.ticket_status + '</option>');
                // $('#ticket_status_id_pk').append('<option value=' + this.ticket_status_id_pk + '>' + this.ticket_status + '</option>');
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
        url: 'http://playmediahouse.com/api/api/Staff/GetBusinessUnit',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#client_id_pk').html("").append('<option value="0">Select Clients</option>');
            $('#ddlClientFltr').html("").append('<option value="0">Select Clients</option>');
            $(data).each(function () {
                $('#client_id_pk').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
                $('#ddlClientFltr').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Department Lists
function GetDepartmentLists() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Staff/GetDepartmentLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            debugger;
            $('#support_dep_id_pk').html("").append('<option value="0">Select Department</option>');
            // $('#ddlDepartmentName').html("").append('<option value="0">Select Department</option>');
            $(data).each(function () {
                $('#support_dep_id_pk').append('<option value=' + this.department_id_pk + '>' + this.department_name + '</option>');
                //  $('#ddlDepartmentName').append('<option value=' + this.department_id_pk + '>' + this.department_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function GetPriority() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Staff/GetPriorityList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".ddlPriority").html("").append('<option value="0">Select Priority</option>');
            $("#priority_id_pk").html("").append('<option value="0">Select Priority</option>');
            $(data).each(function () {
                $('.ddlPriority').append('<option value=' + this.priority_id_pk + '>' + this.priority_name + '</option>');
                $('#priority_id_pk').append('<option value=' + this.priority_id_pk + '>' + this.priority_name + '</option>');
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
        url: 'http://playmediahouse.com/api/api/Staff/GetCommonCategory',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#common_cat_id_pk').html("").append('<option value="0">Select Category</option>');
            $('#common_cat_id_pk').html("").append('<option value="0">Select Category</option>');
            $(data).each(function () {
                $('#common_cat_id_pk').append('<option value=' + this.common_cat_id_pk + '>' + this.category_name + '</option>');
                $('#common_cat_id_pk').append('<option value=' + this.common_cat_id_pk + '>' + this.category_name + '</option>');
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
        url: 'http://playmediahouse.com/api/api/Staff/GetAllSubCategory',
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
function GetAllColumn() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Staff/GetColumnNameUnit',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            debugger;
            $("#Column_List").html("").append('<option value="0">Select Column</option>');
            $(data).each(function () {
                $('#Column_List').append('<option value=' + this.Column_Name + '>' + this.Column_Name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function SaveReport() {   // , logged_via, user_id_fk, ticket_status_id_pk, client_id_pk, department_id_fk, priority_id_pk, common_cat_id_pk, sub_category_id_pk
    debugger;
    var Filed = {};
    var reportName = ''
    reportName = $('#txt_ReportName').val();

    var location_id_fk = "";
    $("#location_id_fk option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            location_id_fk = location_id_fk + $(this).val() + ",";
        }
        // alert(location_id_fk);
    });

    var ticket_status_id_pk = "";
    $("#ticket_status_id_pk option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            // ticket_status_id_pk = $(this).val();
            ticket_status_id_pk = ticket_status_id_pk + $(this).val() + ",";
        }
    });
    var client_id_pk = "";
    $("#client_id_pk option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            client_id_pk = client_id_pk + $(this).val() + ",";
        }
    });
    var support_dep_id_pk = "";
    $("#support_dep_id_pk option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            support_dep_id_pk = support_dep_id_pk + $(this).val() + ",";
        }
    });
    var priority_id_pk = "";
    $("#priority_id_pk option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            priority_id_pk = priority_id_pk + $(this).val() + ",";
        }
    });

    var common_cat_id_pk = "";
    $("#common_cat_id_pk option:selected").each(function () {
        if ($(this).val() != 0) {
            common_cat_id_pk = common_cat_id_pk + $(this).val() + ",";
        }
    });
    var common_Sub_cat_id_pk = "";
    $("#sub_category_id_pk option:selected").each(function () {
        if ($(this).val() != 0) {
            common_Sub_cat_id_pk = common_Sub_cat_id_pk + $(this).val() + ",";
        }
    });
    var Column_List = "";
    $("#Column_List option:selected").each(function () {
        if ($(this).val() != 0) {
            Column_List = Column_List + $(this).val() + ",";
        }
    });
    var parm = {

        'location_id': location_id_fk,
        'ticket_status': ticket_status_id_pk,
        'client_id': client_id_pk,
        'department_id': support_dep_id_pk,
        'priority_id': priority_id_pk,
        'common_cat_id': common_cat_id_pk,
        'sub_category_id': common_Sub_cat_id_pk,
        'ReportName': reportName,
        'ReportId': 1,
        'ColumnName': Column_List,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Staff/SaveTemplate',
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
                            return '<input id="check" class="cb-element checkbox tktcbk" name="' + ticket_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },

                    {
                        data: 'ticket_id_pk', render: function (ticket_id_pk, type, row) {
                            // Combine the first and last names into a single table field
                            //return '<a href="/Ticket/TicketDetails" class="editview"  name="' + ticket_id_pk + '">' + row.prefix + + row.ticket_id_pk +'  <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="" style="color:#f39c12 !important" data-original-title="Normal priority"></i></a>';
                            if (row.priority_id_pk === 1) {
                                return ' <a href="/Ticket/TicketDetails" title="Critical" class="editview"  name="' + ticket_id_pk + '">  <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Critical" style="color:#ea2d2d !important" title="Normal priority" data-original-title="Normal priority"></i>   &nbsp; <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp;' + row.prefix + + row.ticket_id_pk + ' </a>';
                                // return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + status + '">' + status + '</span>';
                            }
                            else if (row.priority_id_pk === 2) {
                                return ' <a href="/Ticket/TicketDetails" title="High" class="editview"  name="' + ticket_id_pk + '">  <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="High" style="color:#b38909 !important" title="Normal priority" data-original-title="Normal priority"></i>   &nbsp;  <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp;' + row.prefix + + row.ticket_id_pk + '</a>';
                                // return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (row.priority_id_pk === 3) {
                                return ' <a href="/Ticket/TicketDetails" title="Medium" class="editview"  name="' + ticket_id_pk + '"> <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Medium" style="color:#ffee07 !important" data-original-title="Normal priority"></i>   &nbsp;  <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp;' + row.prefix + + row.ticket_id_pk + '</a>';
                                // return '<span class="badge badge-primary ENABLED" style="background-color:#b3ae1f;" name="' + status + '">' + status + '</span>';
                            }
                            else if (row.priority_id_pk === 4) {
                                return ' <a href="/Ticket/TicketDetails" title="Low" class="editview"  name="' + ticket_id_pk + '"> <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Low" style="color:#067304ad  !important" data-original-title="Normal priority"></i>   &nbsp;  <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp;' + row.prefix + + row.ticket_id_pk + '</a>';
                                //  return '<span class="badge badge-primary ENABLED" style="background-color:#3bc0c3 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (row.priority_id_pk == 0) {
                                return ' <a href="/Ticket/TicketDetails" title="Low" class="editview"  name="' + ticket_id_pk + '"> <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Priority Not Assigned" style="color:#adb1b3  !important" data-original-title="Normal priority"></i>   &nbsp;  <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp;' + row.prefix + + row.ticket_id_pk + '</a>';
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
                    //{ data: 'email' },
                    {
                        data: 'email',
                        sWidth: '140px',
                        sClass: "view",
                        bSortable: false,
                        render: function (email) {
                            return '<a href="#" class="adminviewsubmitter"  name="' + email + '" data-toggle="modal" data-target="#myModalSubmitter" >  <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i>  &nbsp;  ' + email + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
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
                    {
                        data: 'ticket_id_pk',
                        sWidth: '140px',
                        sClass: "view",
                        bSortable: false,
                        render: function (ticket_id_pk) {
                            return '<a href="#" class="adminview"  name="' + ticket_id_pk + '" data-toggle="modal" data-target="#myModal" > &nbsp;   04 Hrs 05 Min. </a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
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
// Get Report
function GetReport(Id) {
    debugger;
    var parm = {
        'Id': Id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: '/Admin/Report/Generate',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        success: function (data) {
            debugger;
            window.location.href = "/Admin/Report/Download/?file=" + data;
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
}
function DeleteReport(Id) {
    debugger;
    var parm = {
        'ReportId': Id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Staff/DeleteReportTemplate',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        success: function (data) {
            debugger;
            window.location.href = "/Admin/Report/Index";
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
}

// Schedulare




