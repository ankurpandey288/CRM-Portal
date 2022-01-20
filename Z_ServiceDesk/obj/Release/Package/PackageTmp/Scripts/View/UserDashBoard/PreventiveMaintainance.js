$(document).ready(function () {
    GetPreventiveMaintainanceActivityAssignTo();
    $('#btnFeedBack').click(function () {
        var feedbackval = $("input[name='rating']:checked").val();
        if (feedbackval) {
            //  alert(feedbackval);
            var val = [];
            $(':checkbox:checked').each(function (i) {
                val[i] = $(this).val();
                //  UpdateTicketAsignTo($(this).attr('name'));
                UpdatePreventiveMaintananceFeedBack($(this).attr('name'), feedbackval);
            });

        }
    });
    $(document).on('click', '.adminview', function () {
        GetAdminDetails($(this).attr("name"));
    });
    $(document).on('click', '.editview', function () {
        if ($.session.get("p_m_activity_id_pk") != '' || $.session.get("p_m_activity_id_pk") != null || $.session.get("p_m_activity_id_pk") == undefined) {
            $.session.remove("p_m_activity_id_pk");
            $.session.set("p_m_activity_id_pk", $(this).attr("name"));
        }

    });
});


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
                        data: 'p_m_activity_id_pk',
                        sWidth: '60px',
                        sClass: "view",
                        bSortable: false,
                        render: function (p_m_activity_id_pk) {
                            return '<a class="editview" href="/UserDashBoard/PreventiveMaintenanceCheckListView"  name="' + p_m_activity_id_pk + '"> <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp;' + p_m_activity_id_pk + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    //{ data: 'serial_number' },
                    { data: 'asset_cat_name' },
                    { data: 'asset_id' },
                    //{ data: 'due_date' },
                    {
                        "data": "due_date",
                        sWidth: '140px',
                        "type": "date",
                        "render":
                            function (data, type, full) {
                                return (data) ? moment(data).format('DD/MM/YYYY  -  HH:mm:ss') : '';
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
                    //{ data: 'maintainance_date' },
                    {
                        "data": "maintainance_date",
                        sWidth: '140px',
                        "type": "date",
                        "render":
                            function (data, type, full) {
                                return (data) ? moment(data).format('DD/MM/YYYY  -  HH:mm:ss') : '';
                            }
                    },
                    { data: 'status' },
                   // { data: 'feedback' },
                    {
                        data: 'status', render: function (status, type, row) {
                            if (status == "Completed") {
                                // alert(status);
                                if (row.feedback == null) {
                                    //  alert(row.ticket_id_pk);
                                    return '<a href="" data-toggle="modal" data-target="#myModalFeedBack" name="' + status + '">'+ 'Submit Feedback' +  '<a>';
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
                                return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + 'N/A' + '</span>';
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
// Update Tickets Status  
function UpdatePreventiveMaintananceFeedBack(p_m_activity_id, feedback) {
    var parm = {
        "p_m_activity_id_pk": p_m_activity_id,
        "feedback": feedback,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/PreventiveMaintenance/UpdatePreventiveMaintananceFeedBack', 
        success: function (data) {
            //alert(data.ticket_id_pk);
            //alert(data.ticket_status_id_pk);
            if (data.status_id != 0) {
                CreateSuccess(data.status);
                $('#closedModelFeedBack').click();
                GetPreventiveMaintainanceActivityAssignTo();
                // $(".cb-element").prop("checked", false);
            } else {
                $('#closedModelStatus').click();
                //CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Assigned To Details 
function GetAdminDetails(name) {
    var parm = {
        "Name": name
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/PreventiveMaintenance/GetAdminDetails',
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


