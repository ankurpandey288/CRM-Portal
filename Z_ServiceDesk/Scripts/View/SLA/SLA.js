$(document).ready(function () {
    if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
        window.location.href = "/Login/Index/";
    };
    $('#toggle_event_editing button').click(function () {
        if ($(this).hasClass('locked_active') || $(this).hasClass('unlocked_inactive')) {
            /* code to do when unlocking */
            $('#switch_status').html('Switched on.');
        } else {
            /* code to do when locking */
            $('#switch_status').html('Switched off.');
        }

        /* reverse locking status */
        $('#toggle_event_editing button').eq(0).toggleClass('locked_inactive locked_active btn-default btn-info');
        $('#toggle_event_editing button').eq(1).toggleClass('unlocked_inactive unlocked_active btn-info btn-default');
    });
    $('#btnStatusUpdate').click(function () {
        var val = [];
        $('.cbkPriority:checked').each(function (i) {
            val[i] = $(this).val();
            UpdatePriorityMatrixStatus($(this).attr('name'));
        });

    });
    $('#btnSLAStatusUpdate').click(function () {
        var val = [];
        $('.cbksla:checked').each(function (i) {
            val[i] = $(this).val();
            UpdateSLAStatus($(this).attr('name'));
        });

    });
    GetHolCalLocation();
    GetSLA();
    GetHolidayCalenderLists();
    GetSupportDepartment();
    GetSlaMapping();
    GetPriorityList();
    GetUrgencyList();
    GetImpactList();
    GetPriorityMatrixMappingList();
    GetSLAList();
    GetHolidayCalenderLocationLists();
    GetPriorityMatrixTimeLine();
    $("#btnSLACreate").click(function () {       
        if (validateSLA() == true) {
            InsSLA();
            //$("#tbodySLASchedule tr").each(function () {
            //    alert($(this).find('td:eq(0) input').is(":checked"));
            //    alert($(this).find('td:eq(1)').text().trim());
            //    alert($(this).find('td:eq(2) input').val().trim());
            //    alert($(this).find('td:eq(3) input').val().trim());
            //});    
        } else {
            return false;
        }
    });
    $("#btnHolCalLocation").click(function () {
        if (validateHolCalLocation() == true) {
            InsHolCalLocation();
        } else {
            return false;
        }
    });
    $("#btnHolCalLocation").click(function () {
        if (validateHolCalLocation() == true) {
            InsHolCalLocation();
        } else {
            return false;
        }
    });
    $("#btnRespAndReso").click(function () {
        if (validateResponseAndResolution() == true) {
             InsPriorityMatrix();
        } else {
            return false;
        }
    });
    $("#btnHolCalLocation").click(function () {
        if (validateHolCalLocation() == true) {
            InsHolCalLocation();
        } else {
            return false;
        }
    });
    $("#btnHolidayCalender").click(function () {
        if (validateHolCalender() == true) {
            InsHolCalender();
        } else {
            return false;
        }
    });
    $("#btnSlaMapping").click(function () {
        if (validateSLAMapping() == true) {
            InsSLAMapping();
        } else {
            return false;
        }
    });
    $("#btnPriorityMapping").click(function () {
        if (validatePriorityMatrtixMapping() == true) {
            InsPriorityMatrixMapping();
        } else {
            return false;
        }
    });
    $("#CheckAll").click(function () {
        if ($(this).is(':checked')) {
            $("#btnSLAChangeStatus").removeAttr("disabled");
            $("#btnDefault").removeAttr("disabled");
            $("#btnEdit").removeAttr("disabled");
            $("#BtnDeleteSla").removeAttr("disabled");
            
        } else if (!$(this).is(':checked')) {
            $("#btnSLAChangeStatus").attr("disabled", "disabled");
            $("#btnDefault").attr("disabled", "disabled");
            $("#btnEdit").attr("disabled", "disabled");
            $("#BtnDeleteSla").attr("disabled", "disabled");
        }
        else {
            $("#btnSLAChangeStatus").attr("disabled", "disabled");
            $("#btnDefault").attr("disabled", "disabled");
            $("#btnEdit").attr("disabled", "disabled");
            $("#BtnDeleteSla").attr("disabled", "disabled");
        }
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $("#CheckHolidayCalender").click(function () {
        if ($(this).is(':checked')) {
            $("#BtnDeleteHolidayCalender").removeAttr("disabled");

        } else if (!$(this).is(':checked')) {
            $("#BtnDeleteHolidayCalender").attr("disabled", "disabled");
        }
        else {
            $("#BtnDeleteHolidayCalender").attr("disabled", "disabled");
        }
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $("#CheckAllSLAMap").click(function () {
        if ($(this).is(':checked')) {
            $("#BtnDeleteSLAMap").removeAttr("disabled");

        } else if (!$(this).is(':checked')) {
            $("#BtnDeleteSLAMap").attr("disabled", "disabled");
        }
        else {
            $("#BtnDeleteSLAMap").attr("disabled", "disabled");
        }
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $("#CheckHolidayCalenderLocation").click(function () {
        if ($(this).is(':checked')) {
            $("#BtnDeleteHolidayCalenderLocation").removeAttr("disabled");

        } else if (!$(this).is(':checked')) {
            $("#BtnDeleteHolidayCalenderLocation").attr("disabled", "disabled");
        }
        else {
            $("#BtnDeleteHolidayCalenderLocation").attr("disabled", "disabled");
        }
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $(document).on('click', '.cbkSLAMapping', function () {
        if ($(this).is(':checked')) {
            $("#BtnDeleteSLAMap").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#BtnDeleteSLAMap").attr("disabled", "disabled");
        }
        else {
            $("#BtnDeleteSLAMap").attr("disabled", "disabled");
        }
    });
    $(document).on('click', '.cbksla', function () {
        if ($(this).is(':checked')) {
            $("#btnSLAChangeStatus").removeAttr("disabled");
            $("#btnDefault").removeAttr("disabled");
            $("#btnEdit").removeAttr("disabled");
            $("#BtnDeleteSla").removeAttr("disabled");

        } else if (!$(this).is(':checked')) {
            $("#btnSLAChangeStatus").attr("disabled", "disabled");
            $("#btnDefault").attr("disabled", "disabled");
            $("#btnEdit").attr("disabled", "disabled");
            $("#BtnDeleteSla").attr("disabled", "disabled");
        }
        else {
            $("#btnSLAChangeStatus").attr("disabled", "disabled");
            $("#btnDefault").attr("disabled", "disabled");
            $("#btnEdit").attr("disabled", "disabled");
            $("#BtnDeleteSla").attr("disabled", "disabled");
        }
    });
    $(document).on('click', '.cbkHolidayCalenderLocation', function () {
        if ($(this).is(':checked')) {
            $("#BtnDeleteHolidayCalenderLocation").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#BtnDeleteHolidayCalenderLocation").attr("disabled", "disabled");
        }
        else {
            $("#BtnDeleteHolidayCalenderLocation").attr("disabled", "disabled");
        }
    });
    $(document).on('click', '.cbkPriority', function () {
        if ($(this).is(':checked')) {
            $("#BtnDelete").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#btnSetAsDefault").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnSetAsDefault").attr("disabled", "disabled");
        }
        else {
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnSetAsDefault").attr("disabled", "disabled");
        }
    });
    $(document).on('click', '.cbkHolidayCalender', function () {
        if ($(this).is(':checked')) {
            $("#BtnDeleteHolidayCalender").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#BtnDeleteHolidayCalender").attr("disabled", "disabled");
        }
        else {
            $("#BtnDeleteHolidayCalender").attr("disabled", "disabled");
        }
    });
    $('#BtnDelete').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            DeletePriorityMatrixMapping($(this).attr('name'));
        });
    });
    $("#CheckAllSLAMap").click(function () {
        $('.cbkSLAMapping').not(this).prop('checked', this.checked);
    });
    $('#BtnDeleteSLAMap').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            DeleteSLAMapping($(this).attr('name'));
        });
    });
    $("#CheckHolidayCalender").click(function () {
        $('.cbkHolidayCalender').not(this).prop('checked', this.checked);
    });
    $("#CheckAllPriorityMatrix").click(function () {
        if ($(this).is(':checked')) {
            $("#BtnDelete").removeAttr("disabled");

        } else if (!$(this).is(':checked')) {
            $("#BtnDelete").attr("disabled", "disabled");
        }
        else {
            $("#BtnDelete").attr("disabled", "disabled");
        }
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $("#CheckAllPriorityMatrix").click(function () {
        $('.cbkPriority').not(this).prop('checked', this.checked);
    });
    $('#BtnDeleteHolidayCalender').click(function () {
        var val = [];
        $('.cbkHolidayCalender:checked').each(function (i) {
            val[i] = $(this).val();
            DeleteHolidayCalender($(this).attr('name'));
        });
    });
    $('#BtnDeleteHolidayCalenderLocation').click(function () {
        var val = [];
        $('.cbkHolidayCalenderLocation:checked').each(function (i) {
            val[i] = $(this).val();
            DeleteHolidayCalenderLocationByID($(this).attr('name'));
        });
    });
    $('#chkServiceWindow').click(function () {
        if ($(this).is(':checked')) {
            $('#tbodySLASchedule').hide();
        } else {
            $('#tbodySLASchedule').show();
        }
    });
    $('#btnSetAsDefault').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            InsSetAsDefaultPriorityMatrixMapping($(this).attr('name')); 
        })
    });
    //$("#ddlPriorityList").change(function () {
    //    if ($(this).val() != 0) {
    //        GetPriorityMatrixDetails($(this).val());
    //    } else {
    //       // $("#ddlTechnician").html("").append('<option value="0">Select Technician</option>');
    //    }
    //});
    $("#CheckAllSLATimeline").click(function () {
        if ($(this).is(':checked')) {
            $("#BtnDeleteSlaTimeline").removeAttr("disabled");
            $("#btnEditSlaTimeline").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#BtnDeleteSlaTimeline").attr("disabled", "disabled");
            $("#btnEditSlaTimeline").attr("disabled", "disabled");
        }
        else {
            $("#BtnDeleteSlaTimeline").attr("disabled", "disabled");
            $("#btnEditSlaTimeline").attr("disabled", "disabled");
        }
    });
    $(document).on('click', '.cbkPriorityMatrix', function () {
        if ($(this).is(':checked')) {
            $("#BtnDeleteSlaTimeline").removeAttr("disabled");
            $("#btnEditSlaTimeline").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#BtnDeleteSlaTimeline").attr("disabled", "disabled");
            $("#btnEditSlaTimeline").attr("disabled", "disabled");
        }
        else {
            $("#BtnDeleteSlaTimeline").attr("disabled", "disabled");
            $("#btnEditSlaTimeline").attr("disabled", "disabled");
        }
    });
    $('#btnEditSlaTimeline').click(function () {
        var val = [];
        $('.cbkPriorityMatrix:checked').each(function (i) {
            val[i] = $(this).val();
            GetPriorityMatrixDetails($(this).attr('name'));
        });
        $("#btnRespAndReso").hide();
        $("#btnRespAndResoUpdate").show();
    });
    $("#btnRespAndResoUpdate").click(function () {
        if (validateResponseAndResolution() == true) {
            UpdatePriorityMatrix();
        } else {
            return false;
        }
    });
    $('#btnEdit').click(function () {
        var val = [];
        $('.cbksla:checked').each(function (i) {
            val[i] = $(this).val();
            GetSLADetails($(this).attr('name'));
            GetSLASchedule($(this).attr('name'));
        });
        $("#btnSLACreate").hide(); $("#btnUpdateSLA").show();
        $("#myModalLabelSLA").hide(); $("#myModalLabelEdit").show();
    });
    $('#btnUpdateSLA').click(function () {
        $("#tblSlaschedule tbody tr").each(function () {
           // UpdateSLASchedule();
            UpdateSLASchedule($(this).find('td:eq(0)').text(), $(this).find('td:eq(2) input').val(), $(this).find('td:eq(3) input').val());
             // alert($(this).find('td:eq(0)').text());
           // alert($("#tblSlaschedule tbody tr").find('td:eq(0)').text());
        });
       
      //  UpdateSLASchedule();
    });
});
function validateSLA() {
    var return_val = true;
    if ($('#txtSLAName').val().trim() == "" || $('#txtSLAName').val() == null) {
        $('#SpnSLAName').show();
        return_val = false;
    } else {
        $('#SpnSLAName').hide();
    }
    if ($('#ddlHolidayCalender option:selected').val() == 0) {
        $('#SpnHolidayCalender').show();
        return_val = false;
    } else {
        $('#SpnHolidayCalender').hide();
    }
    //if ($('#ddlTimeZone option:selected').val() == 0) {
    //    $('#SpnTimeZone').show();
    //    return_val = false;
    //} else {
    //    $('#SpnTimeZone').hide();
    //}   
    return return_val;
};
function validateHolCalLocation() {
    var return_val = true;
    if ($('#txtHolidayCalenderLocation').val().trim() == "" || $('#txtHolidayCalenderLocation').val() == null) {
        $('#SpnHolidayCalenderLocation').show();
        return_val = false;
    } else {
        $('#SpnHolidayCalenderLocation').hide();
    }
    return return_val;
};
function validateResponseAndResolution() { 
    var return_val = true;
    if ($('#ddlPriorityList option:selected').val() == 0) {
        $('#SpnPriority').show();
        return_val = false;
    } else {
        $('#SpnPriority').hide();
    }
    if ($('#txtDisplayName').val().trim() == "" || $('#txtDisplayName').val() == null) {
        $('#SpnDisplayName').show();
        return_val = false;
    } else {
        $('#SpnDisplayName').hide();
    }
    if ($('#txtDescription').val().trim() == "" || $('#txtDescription').val() == null) {
        $('#SpnDescription').show();
        return_val = false;
    } else {
        $('#SpnDescription').hide();
    }
    if ($('#txtSlaResponse').val().trim() == "" || $('#txtSlaResponse').val() == null) {
        $('#SpnSlaResponse').show();
        return_val = false;
    } else {
        $('#SpnSlaResponse').hide();
    }
    if ($('#txtSlaResolution').val().trim() == "" || $('#txtSlaResolution').val() == null) {
        $('#SpnSlaResolution').show();
        return_val = false;
    } else {
        $('#SpnSlaResolution').hide();
    }
    return return_val;
};
function validateHolCalender() {
    var return_val = true; 
    if ($('#ddlHolidayCalenderLoc option:selected').val() == 0) {
        $('#SpnHolidayCalenderLoc').show();
        return_val = false;
    } else {
        $('#SpnHolidayCalenderLoc').hide();
    }
    if ($('#txtHolidayDate').val().trim() == "" || $('#txtHolidayDate').val() == null) {
        $('#SpnHolidayDate').show();
        return_val = false;
    } else {
        $('#SpnHolidayDate').hide();
    }
    if ($('#txtHolidayRemarks').val().trim() == "" || $('#txtHolidayRemarks').val() == null) {
        $('#SpnHolidayRemarks').show();
        return_val = false;
    } else {
        $('#SpnHolidayRemarks').hide();
    }
    return return_val;
};
function validateSLAMapping() { 
    var return_val = true;
    if ($('#ddlSupportDepartment option:selected').val() == 0) {
        $('#SpnSupportDepartment').show();
        return_val = false;
    } else {
        $('#SpnSupportDepartment').hide();
    }
    if ($('#ddlSLA option:selected').val() == 0) {
        $('#SpnSLA').show();
        return_val = false;
    } else {
        $('#SpnSLA').hide();
    }
    return return_val;
};
function validatePriorityMatrtixMapping() {
    var return_val = true;
    if ($('#ddlUrgency option:selected').val() == 0) {
        $('#SpnUrgency').show();
        return_val = false;
    } else {
        $('#SpnUrgency').hide();
    }
    if ($('#ddlImpact option:selected').val() == 0) {
        $('#SpnImpact').show();
        return_val = false;
    } else {
        $('#SpnImpact').hide();
    }
    if ($('#ddlPriority option:selected').val() == 0) {
        $('#SpnPriority').show();
        return_val = false;
    } else {
        $('#SpnPriority').hide();
    }   
    return return_val;
};
function InsSLA() {
    var parm = {
        "sla_name": $("#txtSLAName").val().trim(),
        "hol_cal_location_id_fk": $("#ddlHolidayCalender option:selected").val().trim(),
        "time_zone_id_fk": 1,
        "is_default": $("#chkDefault").is(":checked") == true ? 1 : 0,
        "is_active": $("#chkIsActive").is(":checked") == true ? 1 : 0,
        "is_service_window": $("#chkServiceWindow").is(":checked") == true ? 1 : 0 
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/SLA/InsSLA',
        success: function (data) {
            alert("Inserted Successfully");
            if (data.status_id != 0) {
                successnotify(data.status);
               // alert(data.sla_id_pk);
                InsSLASchedule(data.sla_id_pk) 
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
function InsSLASchedule(sla_id_fk) {
    var trcount = $('#tbodySLASchedule tr').length;
    for (var id = 1; id <= 7; id++) {
        alert($("#trday" + id).find('td:eq(1)').text().trim());
        var parm = {
            "sla_id_fk": sla_id_fk,
            "is_select": $("#trday" + id).find('td:eq(0) input').is(":checked") == true ? 1 : 0,
            "day": $("#trday" + id).find('td:eq(1)').text().trim(),   // .text().trim(),
            "from_time": $("#trday" + id).find('td:eq(2) input').val().trim() == "" ? null : $("#trday" + id).find('td:eq(2) input').val().trim(),
            "to_time": $("#trday" + id).find('td:eq(3) input').val().trim() == "" ? null : $("#trday" + id).find('td:eq(3) input').val().trim()

        };
        var josnstr = JSON.stringify(parm);
        $.ajax({
            type: "Post",
            url: 'http://playmediahouse.com/api/api/SLA/InsSLASchedule',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: josnstr,
            success: function (data) {

            },
            error: function (result) {
                alert("Error : data");
            }
        });
    }
    //$("#tbodySLASchedule tr trday"+id).each(function () {
    //        var parm = {
    //            "sla_id_fk": sla_id_fk,
    //            "is_select": $(this).find('td:eq(0) input').is(":checked") == true ? 1 : 0,
    //            "day": $(this).find('td:eq(1)').text().trim(),   // .text().trim(),
    //            "from_time": $(this).find('td:eq(2) input').val().trim() == "" ? null : $(this).find('td:eq(2) input').val().trim(),
    //            "to_time": $(this).find('td:eq(3) input').val().trim() == "" ? null : $(this).find('td:eq(3) input').val().trim()

    //        };
    //        var josnstr = JSON.stringify(parm);
    //        $.ajax({
    //            type: "Post",
    //            url: 'http://playmediahouse.com/api/api/SLA/InsSLASchedule',
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            data: josnstr,
    //            success: function (data) {
                    
    //            },
    //            error: function (result) {
    //                alert("Error : data");
    //            }
    //        });
    //    });
    //}   
};
function InsHolCalLocation() {
    var parm = {
        "hol_cal_location_name": $("#txtHolidayCalenderLocation").val().trim()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/SLA/InsHolCalLocation',
        success: function (data) {
            if (data.status_id != 0) {
                successnotify(data.status); 
                $("#CloseCalenderLocation").click();
                GetHolidayCalenderLocationLists();
            } else {
                warningnotify(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//Get All Holiday Calender Location
function GetHolCalLocation() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/SLA/GetHolCalLocation',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".HolidayCalenderLoc").html("").append('<option value="0">Select Holiday Calender Location</option>');
            $(data).each(function () {
                $('.HolidayCalenderLoc').append('<option value=' + this.hol_cal_loc_id_pk + '>' + this.hol_cal_location_name + '</option>');
            });            
        },
        error: function (edata) {           
            alert("error while feching record.");
        }
    });
};
//Get All SLA 
function GetSLA() { 
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/SLA/GetSLA',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlSLA").html("").append('<option value="0">Select SLA</option>');
            $(data).each(function () {
                $('#ddlSLA').append('<option value=' + this.sla_id_pk + '>' + this.sla_name + '</option>');
            });
            //$('#ddlRegisteredOfficeinState').val(10).change();
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Insert Holiday Calender
function InsHolCalender() {
    var parm = {
        "hol_cal_loc_id_fk": $("#ddlHolidayCalenderLoc option:selected").val().trim(),
        "holiday_date": $("#txtHolidayDate").val().trim(),
        "remarks": $("#txtHolidayRemarks").val().trim() 
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/SLA/InsHolCalender',
        success: function (data) {
            // alert("Inserted Successfully");
            if (data.status_id != 0) {
                successnotify(data.status);
                $("#CloseCalenderList").click();
                GetHolidayCalenderLists();
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
 //Holiday Calender Location and date Lists
function GetHolidayCalenderLists() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/SLA/GetHolidayCalenderLists',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblHolidayCalender')) {
                table = $('#tblHolidayCalender').DataTable();
            } else {
                table = $('#tblHolidayCalender').DataTable();
            }
            table.destroy();
            $("#tblHolidayCalender").DataTable({
                data: data,
                paging: false,
                sort: false,
                searching: false,
                ordering: true,
                ordering: true,
                order: [],
                lengthMenu: [
                [10, 25, 50, -1],
                ['10 rows', '25 rows', '50 rows', 'Show all']
                ],
                responsive: true,
                columns: [
                    {
                        data: 'holiday_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (holiday_id_pk) {
                            return '<input id="" class="cbkHolidayCalender"  name="' + holiday_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'hol_cal_location_name' },
                    { data: 'remarks' },
                    //{ data: 'holiday_date' },
                   {
                       "data": "holiday_date",
                       "type": "date",
                       "render":
                  function (data, type, full) {
                  return (data) ? moment(data).format('DD/MM/YYYY') : '';
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
// Holiday Calender Location Lists
function GetHolidayCalenderLocationLists() { 
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/SLA/GetHolidayCalenderLocationLists',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblHolidayCalenderLocation')) {
                table = $('#tblHolidayCalenderLocation').DataTable();
            } else {
                table = $('#tblHolidayCalenderLocation').DataTable();
            }
            table.destroy();
            $("#tblHolidayCalenderLocation").DataTable({
                data: data,
                paging: false,
                sort: false,
                searching: false,
                ordering: true,
                ordering: true,
                order: [],
                lengthMenu: [
                    [10, 25, 50, -1],
                    ['10 rows', '25 rows', '50 rows', 'Show all']
                ],
                responsive: true,
                columns: [
                    {
                        data: 'hol_cal_loc_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (hol_cal_loc_id_pk) {  
                            return '<input id="" class="cbkHolidayCalenderLocation"  name="' + hol_cal_loc_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'hol_cal_loc_id_pk' },
                    { data: 'hol_cal_location_name' },
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
// Insert Holiday Calender
function InsSLAMapping() { 
    var parm = {
        "support_dep_id_fk": $("#ddlSupportDepartment option:selected").val().trim(),
        "sla_id_fk": $("#ddlSLA option:selected").val().trim()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/SLA/InsSLAMapping',
        success: function (data) {
            // alert("Inserted Successfully");
            if (data.status_id != 0) {
                successnotify(data.status);
                GetSlaMapping();
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
// SLA Mapping Lists
function GetSlaMapping() { 
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/SLA/GetSlaMapping',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblSlaMapping')) {
                table = $('#tblSlaMapping').DataTable();
            } else {
                table = $('#tblSlaMapping').DataTable();
            }
            table.destroy();
            $("#tblSlaMapping").DataTable({
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
                        data: 'sla_mapping_id_pk',
                        sWidth: '20px',
                        sClass: "view",
                        bSortable: false,
                        render: function (sla_mapping_id_pk) {
                            return '<input id="" class="cbkSLAMapping"  name="' + sla_mapping_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                      { data: 'support_dep_name' },
                      { data: 'sla_name' } 
                    //{ data: 'holiday_date' }
                  // {
                  //     "data": "holiday_date",
                  //     "type": "date",
                  //     "render":
                  //function (data, type, full) {
                  //    return (data) ? moment(data).format('DD/MM/YYYY') : '';
                  //}
                  // },
                ],
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
function InsPriorityMatrix() { 
    var parm = {
        "priority_id_fk": $("#ddlPriorityList option:selected").val().trim(),
        "display_name": $("#txtDisplayName").val().trim(),
        "description": $("#txtDescription").val().trim(),
        "response_sla": $("#txtSlaResponse").val().trim(),
        "resolution_sla": $("#txtSlaResolution").val().trim(),
        "penality_amount": $("#txtPenalityAmount").val().trim(),
        "color": $("#txtColorPicker").val().trim(),
        "is_default": $("#chkPMDefault").is(":checked") == true ? 1 : 0,
        "is_active": $("#chkPMisActive").is(":checked") == true ? 1 : 0,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/SLA/InsPriorityMatrix',
        success: function (data) {
            if (data.status_id != 0) {
                $('#SlaTimeLineModal').click(); 
                successnotify(data.status);    
                GetPriorityMatrixTimeLine();
                $("#clrCreateSLATimeline").find("input").val("");
                $("#clrCreateSLATimeline").find("select").val(0).change();
            } else {
                warningnotify(data.status);
                $('#SlaTimeLineModal').click(); 
                // InsSLASchedule(data.sla_id_pk)
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//Update Priority Matrix
// Update Tickets Status  
function UpdatePriorityMatrix() {  
    var parm = {
        "priority_id_fk": $("#ddlPriorityList option:selected").val().trim(),
        "display_name": $("#txtDisplayName").val().trim(),
        "description": $("#txtDescription").val().trim(),
        "response_sla": $("#txtSlaResponse").val().trim(),
        "resolution_sla": $("#txtSlaResolution").val().trim(),
        "penality_amount": $("#txtPenalityAmount").val().trim(),
        "color": $("#txtColorPicker").val().trim(),
        "is_default": $("#chkPMDefault").is(":checked") == true ? 1 : 0,
        "is_active": $("#chkPMisActive").is(":checked") == true ? 1 : 0,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/SLA/UpdatePriorityMatrix',
        success: function (data) {
            if (data.status_id != 0) {
                $('#SlaTimeLineModal').click();
                successnotify(data.status);
                GetPriorityMatrixTimeLine();
                $("#clrCreateSLATimeline").find("input").val("");
                $("#clrCreateSLATimeline").find("select").val(0).change();
            } else {
                warningnotify(data.status);
                $('#SlaTimeLineModal').click();
                // InsSLASchedule(data.sla_id_pk)
            }
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
                $('#ddlImpact').append('<option value=' + this.impact_id_pk + '>' + this.impact_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Urgency List 
function GetUrgencyList() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/SLA/GetUrgencyList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlUrgency").html("").append('<option value="0">Select Urgency</option>');
            $(data).each(function () {
                $('#ddlUrgency').append('<option value=' + this.urgency_id_pk + '>' + this.urgency_name + '</option>');
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
// Insert Holiday Calender
function InsPriorityMatrixMapping() {
    var parm = {
        "urgency_id_fk": $("#ddlUrgency option:selected").val().trim(),
        "priority_id_fk":  $("#ddlPriority option:selected").val().trim(),
        "impact_id_fk": $("#ddlImpact option:selected").val().trim(),      
        "is_active": $("#chkIsActivePrio").is(":checked") == true ? 1 : 0,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/SLA/InsPriorityMatrixMapping',
        success: function (data) {
            // alert("Inserted Successfully");
            if (data.status_id != 0) {
                successnotify(data.status);
                GetPriorityMatrixMappingList();
            } else {
                warningnotify(data.status);
                GetPriorityMatrixMappingList();
                // InsSLASchedule(data.sla_id_pk)
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Priority Matrix Mapping Lists
function GetPriorityMatrixMappingList() { 
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/SLA/GetPriorityMatrixMappingList',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblPriorityMatrixMapping')) {
                table = $('#tblPriorityMatrixMapping').DataTable();
            } else {
                table = $('#tblPriorityMatrixMapping').DataTable();
            }
            table.destroy();
            $("#tblPriorityMatrixMapping").DataTable({
                data: data,
                paging: false,
                sort: false,
                searching: false,
                ordering: false,
                order: [],
                //lengthMenu: [
                //    [10, 25, 50, -1],
                //    ['10 rows', '25 rows', '50 rows', 'Show all']
                //],
                responsive: true,
                columns: [
                    {
                        data: 'mapping_priority_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (mapping_priority_id_pk) {
                            return '<input id="" class="cbkPriority"  name="' + mapping_priority_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'urgency_name' },
                    { data: 'impact_name' },
                    { data: 'priority_name' },
                   // { data: 'Active_Status' },
                    {
                        data: "Active_Status",
                        render: function (Active_Status) {
                            // Check if blank
                            if (Active_Status === "Enabled") {
                              //  return '<p style="color:Green;">' + Active_Status  +'</p>'; 
                                return '<span class="badge badge-primary ENABLED" style="background-color:#2ca04a;" name="' + Active_Status + '">' + Active_Status + '</span>';
                            }
                            // If not blank display data normally
                            return '<span class="badge badge-primary DISABLED" style="background-color:#bd2130;" name="' + Active_Status + '">' + Active_Status + '</span>';
                          //  return ' <input type="checkbox" class="custom-switch" checked name="switch1" data-textOn="ON" data-textOff="OFF" data - trackColorOn="#512DA8" data - trackColorOff="#616161" data - textColorOff="#fff" data - trackBorderColor="#555" >'; 
                        }
                    },
                ],
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
function DeletePriorityMatrixMapping(mapping_priority_id) {
    var parm = {
        "mapping_priority_id_pk": mapping_priority_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/SLA/DeletePriorityMatrixMappingByID',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetPriorityMatrixMappingList();

            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};
function DeleteSLAMapping(sla_mapping_id) { 
    var parm = {
        "sla_mapping_id_pk": sla_mapping_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/SLA/DeleteSLAMappingByID',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetSlaMapping();

            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};
function DeleteHolidayCalender(holiday_id_pk) {
    var parm = {
        "holiday_id_pk": holiday_id_pk
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/SLA/DeleteHolidayCalenderByID',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetHolidayCalenderLists();

            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};
function DeleteHolidayCalenderLocationByID(hol_cal_loc_id) {  
    var parm = {
        "hol_cal_loc_id_pk": hol_cal_loc_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/SLA/DeleteHolidayCalenderLocationByID',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetHolidayCalenderLocationLists();
            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};
function UpdatePriorityMatrixStatus(mapping_priority_id) {
    var parm = {
        "mapping_priority_id_pk": mapping_priority_id,
        "is_active": $("#ddlStatus option:selected").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/SLA/UpdatePriorityMatrixStatus',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                successnotify(data.status);
                GetPriorityMatrixMappingList(); 
            } else {
                successnotify(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};
// Get SLA Lists
function GetSLAList() { 
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/SLA/GetSLAList',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblSLA')) {
                table = $('#tblSLA').DataTable();
            } else {
                table = $('#tblSLA').DataTable();
            }
            table.destroy();
            $("#tblSLA").DataTable({
                data: data,
                paging: false,
                sort: false,
                searching: false,
                ordering: false,
                order: [],
                //lengthMenu: [
                //    [10, 25, 50, -1],
                //    ['10 rows', '25 rows', '50 rows', 'Show all']
                //],
                responsive: true,
                columns: [
                    {
                        data: 'sla_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (sla_id_pk) {
                            return '<input id="" class="cbksla"  name="' + sla_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'sla_name' },
                    { data: 'hol_cal_location_name' },
                    { data: 'status' }
                ],
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
// Sla Update
function UpdateSLAStatus(sla_id) { 
    var parm = {
        "sla_id_pk": sla_id,
        "is_active": $("#ddlSLAStatus option:selected").val().trim()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/SLA/UpdateSlaStatus',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == 1) {
                successnotify(data.status);
                GetSLAList();
               // GetPriorityMatrixMappingList();
            } else {
                GetSLAList();
                successnotify(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};
// Urgency Impact Priority Set As Default 
function InsSetAsDefaultPriorityMatrixMapping(mapping_priority_id) { 
    var parm = {
        "mapping_priority_id_pk": mapping_priority_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/SLA/InsSetAsDefaultPriorityMatrixMapping',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                successnotify(data.status);
            } else {
                successnotify(data.status);
            }
        },
        error: function (edata) {
            $(edata).each(function () {
                InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            });
            alert("error while Sending mail.");
        }
    });
};
// Get Tickets Details
function GetPriorityMatrixDetails(priority_id) {
    var parm = {
        'priority_id_fk': priority_id// $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/SLA/GetPriorityMatrixDetails',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#ddlPriorityList").val(data.priority_id_fk).change();
            $("#txtDisplayName").val(data.display_name);
            $("#txtDescription").html(data.description).text();
            $("#txtSlaResponse").val(data.response_sla);
            $("#txtSlaResolution").val(data.resolution_sla);
            $("#txtColorPicker").val(data.color);
            
            if (data.is_default == 1) {
                $("#chkPMDefault").prop('checked', true);
            } else {
                $("#chkPMDefault").prop('checked', false);
            }
            if (data.is_active == 1) {
                $("#chkPMisActive").prop('checked', true);
            } else {
                $("#chkPMisActive").prop('checked', false);
            }
          
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Get SLA Time Line 
function GetPriorityMatrixTimeLine() { 
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/SLA/GetPriorityMatrixTimeLine',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblSlaTimeline')) {
                table = $('#tblSlaTimeline').DataTable();
            } else {
                table = $('#tblSlaTimeline').DataTable();
            }
            table.destroy();
            $("#tblSlaTimeline").DataTable({
                data: data,
                paging: false,
                sort: false,
                searching: false,
                ordering: false,
                order: [],
                //lengthMenu: [
                //    [10, 25, 50, -1],
                //    ['10 rows', '25 rows', '50 rows', 'Show all']
                //],
                responsive: true,
                columns: [
                    {
                        data: 'priority_id_fk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (priority_id_fk) {
                            return '<input id="" class="cbkPriorityMatrix"  name="' + priority_id_fk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'priority_name' }, 
                    { data: 'display_name' },
                    { data: 'response_sla' },
                    { data: 'resolution_sla' }
                ],
            });
        },

        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function GetSLADetails(sla_id) {
    var parm = {
        'sla_id_pk': sla_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/SLA/GetSLADetails',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            
            $("#txtSLAName").val(data.sla_name);
            $("#ddlHolidayCalender").val(data.hol_cal_location_id_fk).change(); 
            if (data.is_default == 1) {
                $("#chkDefault").prop('checked', true);
            } else {
                $("#chkDefault").prop('checked', false);
            }
            if (data.is_active == 1) {
                $("#chkIsActive").prop('checked', true);
            } else {
                $("#chkIsActive").prop('checked', false);
            }
            if (data.is_active == 1) {
                $("#chkIsActive").prop('checked', true);
            } else {
                $("#chkIsActive").prop('checked', false);
            }
            if (data.is_service_window == 1) {
                $("#chkServiceWindow").prop('checked', true);
            } else {
                $("#chkServiceWindow").prop('checked', false);
            }
            
            //$("#ddlHolidayCalender").val(data.support_dep_id_pk).change();
            //$("#ddlSupportGroup").val(data.support_group_id_fk).change();
            //$("#ddlClient").val(data.client_id_pk).change();
            //$("#ddlAssignTo").val(data.asign_to).change();
            //$("#ddlAsset").val(data.asset_id_pk).change();
            //$("#ddlCategory").val(data.common_cat_id_pk).change();
            //$("#ddlUser").val(data.admin_id).change();
            //$("#ddlSubCategory").val(data.sub_category_id_pk).change();

           
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function GetSLASchedule(sla_id) {
    var parm = {
        'sla_id_fk': sla_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/SLA/GetSLASchedule',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#tbodySLASchedule").html('');
            $(data).each(function () {
                var trlength = ($('#tbodySLASchedule tr').length) + 1;
                //var newline = ' <tr><td>' + trlength + '</td>';
                $("#tbodySLASchedule").append("<tr><td>" + this.shedule_id_pk + "</td><td>" + this.day + "</td><td><input  name='" + this.shedule_id_pk + "' type='text' value = '" + this.from_time + "' /></td><td><input  type='text' value = '" + this.to_time + "' /></td></tr>");
               // $("#tbodySLASchedule").append("<tr><td>" + this.shedule_id_pk + "</td><td class='editableColumns'>" + this.day + "</td><td class='editableColumns'>"+ this.from_time +"</td><td><input class='totime' type='text' value = '" + this.to_time + "' /></td><td><input class='editValues' type='button' value='Edit'></td></tr>");
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Update SLA Schedule  
function UpdateSLASchedule(sla_sch_id, txt_to, txt_from) { 
    //$("#tblSlaschedule tbody tr").each(function () {
    //    alert($(this).find('td:eq(3) input').val()); 
    //   // alert($("#tblSlaschedule tbody tr").find('td:eq(3) input').val());
    //});
        var parm = {
            "shedule_id_pk": sla_sch_id,
            "from_time": txt_to, //$(this).find('td:eq(2) input').val(),
            "to_time": txt_from//$(this).find('td:eq(3) input').val(),

        };
        var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/SLA/UpdateSLASchedule',
        success: function (data) {
            if (data.status_id != 0) {
                $('#ModalSLA').click();
                successnotify(data.status);
                $("#clrCreateSLATimeline").find("input").val("");
                $("#clrCreateSLATimeline").find("select").val(0).change();
            } else {
                warningnotify(data.status);
                $('#ModalSLA').click();
                // InsSLASchedule(data.sla_id_pk)
            }
        },
        error: function (result) {
            alert("Error : data");
        }
        });
  //  });
};