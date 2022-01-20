var SchedulerValue = false;
$(document).ready(function () {

    GetLocation();
    GetUser();
    GetTicketStatus();
    GetClientLists();
    // GetTicketLists()
    GetDepartmentLists();
    GetPriority();
    GetCommonCategory();
    GetAllSubCategory();
    GetAllColumn();
    GetAssetCategory();
    GetSupplierDetails();
    GetPendingReason();
    GetManufacturer();
    GetVandor(); 
    GetassetStatus();


    $("#btnFilter").click(function () {
        
        SaveReport();
    });
    $("#btnFilterSer").click(function () {
        
        SaveReportService();
    });
    $("#btnFilterAsset").click(function () {
        
        SaveReportAsset();
    });
    $("#btnDownload").click(function () {
        
        DownloadReport(1);
    });
    $("#btnDownloadSer").click(function () {
        DownloadReportServiceRequest(2);
    });
    $("#btnDownloadAsset").click(function () {
        
        DownloadReportAsset(3);
    });
    $('#IsScheduler').click(function () {
        
        if ($(this).prop('checked') == true) {
            SchedulerValue = true;
            $('#Div1').show();
            $('#Div2').show();
            $('#Div3').show();
            $('#Div4').show();
            $('#Div5').show();

        }
        else {
            $('#Div1').hide();
            $('#Div2').hide();
            $('#Div3').hide();
            $('#Div4').hide();
            $('#Div5').hide();
            SchedulerValue = false;
        }

    });
    $('#IsSchedulerSer').click(function () {
        
        if ($(this).prop('checked') == true) {
            SchedulerValue = true;
            $('#Div1Ser').show();
            $('#Div2Ser').show();
            $('#Div3Ser').show();
            $('#Div4Ser').show();
            $('#Div5Ser').show();

        }
        else {
            $('#Div1Ser').hide();
            $('#Div2Ser').hide();
            $('#Div3Ser').hide();
            $('#Div4Ser').hide();
            $('#Div5Ser').hide();
            SchedulerValue = false;
        }

    });
    $('#Report_Typeasset').change(function () {
        
        if ($('#Report_Typeasset').val() == '2') {
            $('#Div6WeekDayAsset').show();
            $('#Div6MonthDateAsset').hide();
        }
        else if ($('#Report_Typeasset').val() == '3') {
            $('#Div6MonthDateAsset').show();
            $('#Div6WeekDayAsset').hide();
        }
        else {
            $('#ddlMonthdateAsset').hide();
            $('#Div6MonthDateAsset').hide();
        }

    });
    $('#Report_TypeSer').change(function () {
        
        if ($('#Report_TypeSer').val() == '2') {
            $('#Div6WeekDayService').show();
            $('#Div6MonthDateService').hide();
        }
        else if ($('#Report_TypeSer').val() == '3') {
            $('#Div6MonthDateService').show();
            $('#Div6WeekDayService').hide();
        }
        else {
            $('#Div6WeekDayService').hide();
            $('#Div6MonthDateService').hide();
        }

    });
    $('#Report_Type').change(function () {
        
        if ($('#Report_Type').val() == '2') {
            $('#Div6WeekDayIncident').show();
            $('#Div6MonthDateIncident').hide();
        }
        else if ($('#Report_Type').val() == '3') {
            $('#Div6MonthDateIncident').show();
            $('#Div6WeekDayIncident').hide();
        }
        else {
            $('#Div6WeekDayIncident').hide();
            $('#Div6MonthDateIncident').hide();
        }

    });
});

function GetassetStatus() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api//api/FixedAssets/GetAssetStatus',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //Incidance Bind
            $('#ticket_status_id_pkAsset').html("").append('<option value="0">Select Status</option>');
            $(data).each(function () {
                $('#ticket_status_id_pkAsset').append('<option value=' + this.status_id_pk + '>' + this.status + '</option>');
            });
            
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
}
//Get vandor
function GetVandor() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api//api/Supplier/GetSupplierDetails',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //Incidance Bind
            $('#ddlvandor').html("").append('<option value="0">Select Manufacture</option>');
            $(data).each(function () {
                $('#ddlvandor').append('<option value=' + this.supplier_id_pk + '>' + this.supplier_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
}
//Get Manufacture
function GetManufacturer() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //Incidance Bind
            $('#ddlManufacturer').html("").append('<option value="0">Select Manufacture</option>');
            $(data).each(function () {
                $('#ddlManufacturer').append('<option value=' + this.asset_id_pk + '>' + this.manufacturer_name + '</option>');

            });


        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
}
//Get All Location Lists
function GetLocation() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Staff/GetLocation',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //Incidance Bind
            $('#location_id_fk').html("").append('<option value="0">Select Location</option>');
            $(data).each(function () {
                $('#location_id_fk').append('<option value=' + this.location_id_pk + '>' + this.location_name + '</option>');

            });
            //Service Request Bind   
            $('#location_id_fkSer').html("").append('<option value="0">Select Location</option>');
            $(data).each(function () {
                $('#location_id_fkSer').append('<option value=' + this.location_id_pk + '>' + this.location_name + '</option>');

            });
            $('#location_id_fkasset').html("").append('<option value="0">Select Location</option>');
            $(data).each(function () {
                $('#location_id_fkasset').append('<option value=' + this.location_id_pk + '>' + this.location_name + '</option>');

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
            $('#ddlUserSer').html("").append('<option value="0">Select User</option>');
            $(data).each(function () {
                $('#ddlUserFltr').append('<option value=' + this.user_id_pk + '>' + this.user_name + ' - ' + this.email + '</option>');
                $('#ddlUserSer').append('<option value=' + this.user_id_pk + '>' + this.user_name + ' - ' + this.email + '</option>');
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
            $("#ticket_status_id_pkSer").html("").append('<option value="0">Select Status</option>');
            // $("#ticket_status_id_pk").html("").append('<option value="0">Select Status</option>');
            $(data).each(function () {
                $('#ticket_status_id_pkSer').append('<option value=' + this.ticket_status_id_pk + '>' + this.ticket_status + '</option>');
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
            $('#client_id_pkSer').html("").append('<option value="0">Select Clients</option>');
            $('#client_id_pkAsset').html("").append('<option value="0">Select Clients</option>');
            $(data).each(function () {
                $('#client_id_pk').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
                $('#client_id_pkSer').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
                $('#client_id_pkAsset').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
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
            $('#support_dep_id_pk').html("").append('<option value="0">Select Department</option>');
            // $('#ddlDepartmentName').html("").append('<option value="0">Select Department</option>');
            $(data).each(function () {
                $('#support_dep_id_pk').append('<option value=' + this.department_id_pk + '>' + this.department_name + '</option>');
                //  $('#ddlDepartmentName').append('<option value=' + this.department_id_pk + '>' + this.department_name + '</option>');
            });
            $('#support_dep_id_pkSer').html("").append('<option value="0">Select Department</option>');
            // $('#ddlDepartmentName').html("").append('<option value="0">Select Department</option>');
            $(data).each(function () {
                $('#support_dep_id_pkSer').append('<option value=' + this.department_id_pk + '>' + this.department_name + '</option>');
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
            $("#priority_id_pkSer").html("").append('<option value="0">Select Priority</option>');
            $("#priority_id_pk").html("").append('<option value="0">Select Priority</option>');
            $(data).each(function () {
                $('#priority_id_pkSer').append('<option value=' + this.priority_id_pk + '>' + this.priority_name + '</option>');
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
            $('#common_cat_id_pkSer').html("").append('<option value="0">Select Category</option>');
            $('#common_cat_id_pk').html("").append('<option value="0">Select Category</option>');
            $(data).each(function () {
                $('#common_cat_id_pkSer').append('<option value=' + this.common_cat_id_pk + '>' + this.category_name + '</option>');
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
            $("#ddlSubCategorySer").html("").append('<option value="0">Select Technician</option>');
            $(data).each(function () {
                $('#ddlSubCategorySer').append('<option value=' + this.sub_category_id_pk + '>' + this.sub_category_name + '</option>');
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
            
            $("#Column_List").html("").append('<option value="0">Select Column</option>');
            $(data).each(function () {
                $('#Column_List').append('<option value=' + this.Column_Name + '>' + this.Column_Name + '</option>');
            });
            $("#Column_ListSer").html("").append('<option value="0">Select Column</option>');
            $(data).each(function () {
                $('#Column_ListSer').append('<option value=' + this.Column_Name + '>' + this.Column_Name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function DownloadReport(Type) {

    var fdate = ''
    fdate = $('#txtFromDatefltr').val();
    var tdate = ''
    tdate = $('#txtToDatefltr').val();
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
    var ddlLoggedViaFltr = "";
    $("#ddlLoggedViaFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlLoggedViaFltr = ddlLoggedViaFltr + $(this).val() + ",";
        }
    });
    var ddlUserFltr = "";
    $("#ddlUserFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlUserFltr = ddlUserFltr + $(this).val() + ",";
        }
    });
    var ddlResolutionSLAFltr = "";
    $("#ddlResolutionSLAFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlResolutionSLAFltr = ddlResolutionSLAFltr + $(this).val() + ",";
        }
    });
    var ddlResponseSLAFltr = "";
    $("#ddlResponseSLAFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlResponseSLAFltr = ddlResponseSLAFltr + $(this).val() + ",";
        }
    });
    var ddlPendingCategoryFltr = "";
    $("#ddlPendingCategoryFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlPendingCategoryFltr = ddlPendingCategoryFltr + $(this).val() + ",";
        }
    });
    var ddlPendingReasonFltr = "";
    $("#ddlPendingReasonFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlPendingReasonFltr = ddlPendingReasonFltr + $(this).val() + ",";
        }
    });
    var ddlAssetCategoryFltr = "";
    $("#ddlAssetCategoryFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlAssetCategoryFltr = ddlAssetCategoryFltr + $(this).val() + ",";
        }
    });
    var Column_List = "";
    $("#Column_List option:selected").each(function () {
        if ($(this).val() != 0) {
            Column_List = Column_List + $(this).val() + ",";
        }
    });

    var is_defective = $('#ddlDefectivePart').val();
    var Report_Type = $('#Report_Type').val();
    var Report_Time = $('#Report_Time').val();
    var Email_To = $('#Email_To').val();
    var Email_cc = $('#Email_cc').val();
    var Email_Subject = $('#Email_Subject').val();
    var ddlWarrenty = $('#ddlWarrentySer').val();
    var parm = {

        'location_id': location_id_fk.slice(0, -1),
        'ticket_status': ticket_status_id_pk.slice(0, -1),
        'client_id': client_id_pk.slice(0, -1),
        'department_id': support_dep_id_pk.slice(0, -1),
        'priority_id': priority_id_pk.slice(0, -1),
        'common_cat_id': common_cat_id_pk.slice(0, -1),
        'sub_category_id': common_Sub_cat_id_pk.slice(0, -1),
        'ReportName': reportName,
        'ReportId': 1,
        'ColumnName': Column_List.slice(0, -1),
        'IsScheduler': SchedulerValue,
        'Report_Time': Report_Time,
        'Email_To': Email_To,
        'Email_cc': Email_cc,
        'Email_Subject': Email_Subject,
        'Report_Type': Report_Type,
        'from_date': fdate,
        'to_date': tdate,
        'logged_via': ddlLoggedViaFltr.slice(0, -1),
        'ddlUserFltr': ddlUserFltr.slice(0, -1),
        'resolution_sla': ddlResolutionSLAFltr.slice(0, -1),
        'response_sla': ddlResponseSLAFltr.slice(0, -1),
        'SelectedValue': $('#ddl_Incidance').val(),
        'pending_category_id': ddlPendingCategoryFltr.slice(0, -1),
        'ddlPendingReasonFltr': ddlResponseSLAFltr.slice(0, -1),
        'asset_category_id_pk': ddlAssetCategoryFltr.slice(0, -1),
        'ddlWarrenty': ddlWarrenty,
        'ReportType': Type,
        'assetType': 0,
        'Asset_Category': ddlAssetCategoryFltr.slice(0, -1),
        'is_defective': is_defective,
    };
    
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Staff/DownloadReport',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            
            DownaloadReport(data)
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });

}
function DownloadReportServiceRequest(Type) { 

    var fdate = ''
    fdate = $('#txtFromDateSer').val();
    var tdate = ''
    tdate = $('#txtToDateSer').val();
    var Filed = {};
    var reportName = ''
    reportName = $('#txt_ReportNameSer').val();

    var location_id_fk = "";
    $("#location_id_fk option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            location_id_fk = location_id_fk + $(this).val() + ",";
        }
        // alert(location_id_fk);
    });

    var ser_req_status_id_pk = "";
    $("#ser_req_status_id_pk option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            // ticket_status_id_pk = $(this).val();
            ser_req_status_id_pk = ser_req_status_id_pk + $(this).val() + ",";
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
    var ddlLoggedViaFltr = "";
    $("#ddlLoggedViaFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlLoggedViaFltr = ddlLoggedViaFltr + $(this).val() + ",";
        }
    });
    var ddlUserFltr = "";
    $("#ddlUserFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlUserFltr = ddlUserFltr + $(this).val() + ",";
        }
    });
    var ddlResolutionSLAFltr = "";
    $("#ddlResolutionSLAFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlResolutionSLAFltr = ddlResolutionSLAFltr + $(this).val() + ",";
        }
    });
    var ddlResponseSLAFltr = "";
    $("#ddlResponseSLAFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlResponseSLAFltr = ddlResponseSLAFltr + $(this).val() + ",";
        }
    });
    var ddlPendingCategoryFltr = "";
    $("#ddlPendingCategoryFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlPendingCategoryFltr = ddlPendingCategoryFltr + $(this).val() + ",";
        }
    });
    var ddlPendingReasonFltr = "";
    $("#ddlPendingReasonFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlPendingReasonFltr = ddlPendingReasonFltr + $(this).val() + ",";
        }
    });
    var ddlAssetCategoryFltr = "";
    $("#ddlAssetCategoryFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlAssetCategoryFltr = ddlAssetCategoryFltr + $(this).val() + ",";
        }
    });
    var Column_List = "";
    $("#Column_List option:selected").each(function () {
        if ($(this).val() != 0) {
            Column_List = Column_List + $(this).val() + ",";
        }
    });

    var Report_Type = $('#Report_Type').val();
    var Report_Time = $('#Report_Time').val();
    var Email_To = $('#Email_To').val();
    var Email_cc = $('#Email_cc').val();
    var Email_Subject = $('#Email_Subject').val();
    var ddlWarrenty = $('#ddlWarrentySer').val();
    var parm = {

        'location_id': location_id_fk.slice(0, -1),
        'ticket_status': ser_req_status_id_pk.slice(0, -1),
        'client_id': client_id_pk.slice(0, -1),
        'department_id': support_dep_id_pk.slice(0, -1),
        'priority_id': priority_id_pk.slice(0, -1),
        'common_cat_id': common_cat_id_pk.slice(0, -1),
        'sub_category_id': common_Sub_cat_id_pk.slice(0, -1),
        'ReportName': reportName,
        'ReportId': 1,
        'ColumnName': Column_List.slice(0, -1),
        'IsScheduler': SchedulerValue,
        'Report_Time': Report_Time,
        'Email_To': Email_To,
        'Email_cc': Email_cc,
        'Email_Subject': Email_Subject,
        'Report_Type': Report_Type,
        'from_date': fdate,
        'to_date': tdate,
        'logged_via': ddlLoggedViaFltr.slice(0, -1),
        'ddlUserFltr': ddlUserFltr.slice(0, -1),
        'resolution_sla': ddlResolutionSLAFltr.slice(0, -1),
        'response_sla': ddlResponseSLAFltr.slice(0, -1),
        'SelectedValue': $('#ddl_Ser').val(),
        'pending_category_id': ddlPendingCategoryFltr.slice(0, -1),
        'ddlPendingReasonFltr': ddlResponseSLAFltr.slice(0, -1),
        'asset_category_id_pk': ddlAssetCategoryFltr.slice(0, -1),
        'ddlWarrenty': ddlWarrenty,
        'ReportType': Type,
        'assetType': 0,
        'Asset_Category': ddlAssetCategoryFltr.slice(0, -1)

    };

    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Staff/DownloadReport',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {

            DownaloadReportServiceRequest(data)
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });

}
function DownloadReportAsset(Type) {
    
    var fdate = ''
    fdate = ' '; //$('#txtFromDateasset').val();
    var tdate = ''
    tdate = ' '; //$('#txtToDateasset').val();
    var Filed = {};
    var reportName = ''
    reportName = $('#txt_ReportNameAsset').val();
    var Datepurchase = ''
    Datepurchase = $('#txtFromDatepurchase').val();
    var Datewarranty = ''
    Datewarranty = $('#txtFromDatewarranty').val();
    var Dateamcend = ''
    Dateamcend = $('#txtFromDateamcend').val();

    var location_id_fk = "";
    $("#location_id_fkasset option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            location_id_fk = location_id_fk + $(this).val() + ",";
        }
        // alert(location_id_fk);
    });

    var ticket_status_id_pk = "";
    $("#ticket_status_id_pkAsset option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            // ticket_status_id_pk = $(this).val();
            ticket_status_id_pk = ticket_status_id_pk + $(this).val() + ",";
        }
    });
    var client_id_pk = "";
    $("#client_id_pkAsset option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            client_id_pk = client_id_pk + $(this).val() + ",";
        }
    });

    var ddlAssetCategoryFltr = "";
    $("#ddlAssetCategoryAsset option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlAssetCategoryFltr = ddlAssetCategoryFltr + $(this).val() + ",";
        }
    });

    var ddlvandorFltr = "";
    $("#ddlvandor option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlvandorFltr = ddlvandorFltr + $(this).val() + ",";
        }
    });
    var ddlManufacturerFltr = "";
    $("#ddlManufacturer option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlManufacturerFltr = ddlManufacturerFltr + $(this).text() + ",";
        }
    });
    var Column_List = "";
    $("#Column_Listasset option:selected").each(function () {
        if ($(this).val() != 0) {
            Column_List = Column_List + $(this).val() + ",";
        }
    });

    var Report_Type = $('#Report_Typeasset').val();
    var Report_Time = $('#Report_Timeasset').val();
    var Email_To = $('#Email_Toasset').val();
    var Email_cc = $('#Email_ccasset').val();
    var Email_Subject = $('#Email_Subjectasset').val();
    var ddlWarrenty = $('#ddlWarrentySer').val();
    var ddlassetType = $('#ddl_AssetType').val();
    var parm = {

        'location_id': location_id_fk.slice(0, -1),
        'ticket_status': ticket_status_id_pk.slice(0, -1),
        'client_id': client_id_pk.slice(0, -1),
        'ReportName': reportName,
        'ReportId': 1,
        'ColumnName': Column_List.slice(0, -1),
        'IsScheduler': SchedulerValue,
        'Report_Time': Report_Time,
        'Email_To': Email_To,
        'Email_cc': Email_cc,
        'Email_Subject': Email_Subject,
        'Report_Type': Report_Type,
        'from_date': fdate,
        'to_date': tdate,
        'SelectedValue': $('#ddl_asset').val(),
        'asset_category_id_pk': ddlAssetCategoryFltr.slice(0, -1),
        'vandor': ddlvandorFltr.slice(0, -1),
        'manufacture': ddlManufacturerFltr.slice(0, -1),
        'Dateamcend': Dateamcend,
        'Datepurchase': Datepurchase,
        'Datewarranty': Datewarranty,
        'ReportType': Type,
        'assetType': ddlassetType,
        'Asset_Category': ddlAssetCategoryFltr.slice(0, -1),
        'ddlWarrenty': ddlWarrenty

    };
    
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Staff/DownloadReport',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            
            DownaloadReportAsset(data)
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
}
function DownaloadReport(Id) {
    var parm = {
        'Id': Id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: '/Report/GenerateDownlaod',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        success: function (data) {
            
            window.location.href = "/Report/Download/?file=" + data;
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
}
function DownaloadReportAsset(Id) { 
    var parm = {
        'Id': Id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: '/Report/GenerateDownlaodAsset', 
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        success: function (data) {

            window.location.href = "/Report/Download/?file=" + data;
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
}
function DownaloadReportServiceRequest(Id) { 
    var parm = {
        'Id': Id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: '/Report/GenerateDownlaodServiceRequest', 
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        success: function (data) {

            window.location.href = "/Report/Download/?file=" + data;
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
}

function SaveReport() {   // , logged_via, user_id_fk, ticket_status_id_pk, client_id_pk, department_id_fk, priority_id_pk, common_cat_id_pk, sub_category_id_pk
    
    var fdate = ''
    fdate = $('#txtFromDatefltr').val();
    var tdate = ''
    tdate = $('#txtToDatefltr').val();
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
    var ddlLoggedViaFltr = "";
    $("#ddlLoggedViaFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlLoggedViaFltr = ddlLoggedViaFltr + $(this).val() + ",";
        }
    });
    var ddlUserFltr = "";
    $("#ddlUserFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlUserFltr = ddlUserFltr + $(this).val() + ",";
        }
    });
    var ddlResolutionSLAFltr = "";
    $("#ddlResolutionSLAFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlResolutionSLAFltr = ddlResolutionSLAFltr + $(this).val() + ",";
        }
    });
    var ddlResponseSLAFltr = "";
    $("#ddlResponseSLAFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlResponseSLAFltr = ddlResponseSLAFltr + $(this).val() + ",";
        }
    });
    var ddlPendingCategoryFltr = "";
    $("#ddlPendingCategoryFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlPendingCategoryFltr = ddlPendingCategoryFltr + $(this).val() + ",";
        }
    });
    var ddlPendingReasonFltr = "";
    $("#ddlPendingReasonFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlPendingReasonFltr = ddlPendingReasonFltr + $(this).val() + ",";
        }
    });
    var ddlAssetCategoryFltr = "";
    $("#ddlAssetCategoryFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlAssetCategoryFltr = ddlAssetCategoryFltr + $(this).val() + ",";
        }
    });
    var Column_List = "";
    $("#Column_List option:selected").each(function () {
        if ($(this).val() != 0) {
            Column_List = Column_List + $(this).val() + ",";
        }
    });

    var Report_Type = $('#Report_Type').val();
    var Report_Time = $('#Report_Time').val();
    var Email_To = $('#Email_To').val();
    var Email_cc = $('#Email_cc').val();
    var Email_Subject = $('#Email_Subject').val();
    var ddlWarrenty = $('#ddlWarrentystr').val();
    var ddlWeekDayAsset = $('#ddlWeekDayIncident').val();
    var ddlMonthdateAsset = $('#ddlMonthdateIncident').val();
    var parm = {

        'location_id': location_id_fk.slice(0, -1),
        'ticket_status': ticket_status_id_pk.slice(0, -1),
        'client_id': client_id_pk.slice(0, -1),
        'department_id': support_dep_id_pk.slice(0, -1),
        'priority_id': priority_id_pk.slice(0, -1),
        'common_cat_id': common_cat_id_pk.slice(0, -1),
        'sub_category_id': common_Sub_cat_id_pk.slice(0, -1),
        'ReportName': reportName,
        'ReportId': 1,
        'ColumnName': Column_List.slice(0, -1),
        'IsScheduler': SchedulerValue,
        'Report_Time': Report_Time,
        'Email_To': Email_To,
        'Email_cc': Email_cc,
        'Email_Subject': Email_Subject,
        'Report_Type': Report_Type,
        'from_date': fdate,
        'to_date': tdate,
        'logged_via': ddlLoggedViaFltr.slice(0, -1),
        'ddlUserFltr': ddlUserFltr.slice(0, -1),
        'resolution_sla': ddlResolutionSLAFltr.slice(0, -1),
        'response_sla': ddlResponseSLAFltr.slice(0, -1),
        'SelectedValue': $('#ddl_Incidance').val(),
        'pending_category_id': ddlPendingCategoryFltr.slice(0, -1),
        'ddlPendingReasonFltr': ddlResponseSLAFltr.slice(0, -1),
        'asset_category_id_pk': ddlAssetCategoryFltr.slice(0, -1),
        'ddlWarrenty': ddlWarrenty,
        'ReportType': 1,
        'assetType': 0,
        'ddlWeekDay': ddlWeekDayAsset,
        'ddlMonthdate': ddlMonthdateAsset,
        'Asset_Category': ddlAssetCategoryFltr.slice(0, -1)

    };
    
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Staff/SaveTemplate',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            
            window.location.href = "/Report/Index";
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function SaveReportService() {   // , logged_via, user_id_fk, ticket_status_id_pk, client_id_pk, department_id_fk, priority_id_pk, common_cat_id_pk, sub_category_id_pk
    
    var fdate = ''
    fdate = $('#txtFromDateSer').val();
    var tdate = ''
    tdate = $('#txtToDateSer').val();
    var Filed = {};
    var reportName = ''
    reportName = $('#txt_ReportNameSer').val();

    var location_id_fk = "";
    $("#location_id_fkSer option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            location_id_fk = location_id_fk + $(this).val() + ",";
        }
        // alert(location_id_fk);
    });

    var ticket_status_id_pk = "";
    $("#ticket_status_id_pkSer option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            // ticket_status_id_pk = $(this).val();
            ticket_status_id_pk = ticket_status_id_pk + $(this).val() + ",";
        }
    });
    var client_id_pk = "";
    $("#client_id_pkSer option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            client_id_pk = client_id_pk + $(this).val() + ",";
        }
    });
    var support_dep_id_pk = "";
    $("#support_dep_id_pkSer option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            support_dep_id_pk = support_dep_id_pk + $(this).val() + ",";
        }
    });
    var priority_id_pk = "";
    $("#priority_id_pkSer option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            priority_id_pk = priority_id_pk + $(this).val() + ",";
        }
    });

    var common_cat_id_pk = "";
    $("#common_cat_id_pkSer option:selected").each(function () {
        if ($(this).val() != 0) {
            common_cat_id_pk = common_cat_id_pk + $(this).val() + ",";
        }
    });
    var common_Sub_cat_id_pk = "";
    $("#sub_category_id_pkSer option:selected").each(function () {
        if ($(this).val() != 0) {
            common_Sub_cat_id_pk = common_Sub_cat_id_pk + $(this).val() + ",";
        }
    });
    var ddlLoggedViaFltr = "";
    $("#ddlLoggedViaSer option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlLoggedViaFltr = ddlLoggedViaFltr + $(this).val() + ",";
        }
    });
    var ddlUserFltr = "";
    $("#ddlUserSer option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlUserFltr = ddlUserFltr + $(this).val() + ",";
        }
    });
    var ddlResolutionSLAFltr = "";
    $("#ddlResolutionSLASer option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlResolutionSLAFltr = ddlResolutionSLAFltr + $(this).val() + ",";
        }
    });
    var ddlResponseSLAFltr = "";
    $("#ddlResponseSLASer option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlResponseSLAFltr = ddlResponseSLAFltr + $(this).val() + ",";
        }
    });
    var ddlPendingCategoryFltr = "";
    $("#ddlPendingCategorySer option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlPendingCategoryFltr = ddlPendingCategoryFltr + $(this).val() + ",";
        }
    });
    var ddlPendingReasonFltr = "";
    $("#ddlPendingReasonSer option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlPendingReasonFltr = ddlPendingReasonFltr + $(this).val() + ",";
        }
    });
    var ddlAssetCategoryFltr = "";
    $("#ddlAssetCategorySer option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlAssetCategoryFltr = ddlAssetCategoryFltr + $(this).val() + ",";
        }
    });
    var Column_List = "";
    $("#Column_ListSer option:selected").each(function () {
        if ($(this).val() != 0) {
            Column_List = Column_List + $(this).val() + ",";
        }
    });

    var Report_Type = $('#Report_TypeSer').val();
    var Report_Time = $('#Report_TimeSer').val();
    var Email_To = $('#Email_ToSer').val();
    var Email_cc = $('#Email_ccSer').val();
    var Email_Subject = $('#Email_SubjectSer').val();
    var ddlWarrenty = $('#ddlWarrentySer').val();
    var ddlWeekDayAsset = $('#ddlWeekDayService').val();
    var ddlMonthdateAsset = $('#ddlMonthdateService').val();
    var parm = {

        'location_id': location_id_fk.slice(0, -1),
        'ticket_status': ticket_status_id_pk.slice(0, -1),
        'client_id': client_id_pk.slice(0, -1),
        'department_id': support_dep_id_pk.slice(0, -1),
        'priority_id': priority_id_pk.slice(0, -1),
        'common_cat_id': common_cat_id_pk.slice(0, -1),
        'sub_category_id': common_Sub_cat_id_pk.slice(0, -1),
        'ReportName': reportName,
        'ReportId': 1,
        'ColumnName': Column_List.slice(0, -1),
        'IsScheduler': SchedulerValue,
        'Report_Time': Report_Time,
        'Email_To': Email_To,
        'Email_cc': Email_cc,
        'Email_Subject': Email_Subject,
        'Report_Type': Report_Type,
        'from_date': fdate,
        'to_date': tdate,
        'logged_via': ddlLoggedViaFltr.slice(0, -1),
        'ddlUserFltr': ddlUserFltr.slice(0, -1),
        'resolution_sla': ddlResolutionSLAFltr.slice(0, -1),
        'response_sla': ddlResponseSLAFltr.slice(0, -1),
        'SelectedValue': $('#ddl_Ser').val(),
        'pending_category_id': ddlPendingCategoryFltr.slice(0, -1),
        'pending_reason_id_fk': ddlResponseSLAFltr.slice(0, -1),
        'asset_category_id_pk': ddlAssetCategoryFltr.slice(0, -1),
        'ddlWarrenty': ddlWarrenty,
        'ReportType': 2,
        'assetType': 0,
        'ddlWeekDay': ddlWeekDayAsset,
        'ddlMonthdate': ddlMonthdateAsset


    };
    
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Staff/SaveTemplate',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            
            window.location.href = "/Report/Index";
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function SaveReportAsset() {   // , logged_via, user_id_fk, ticket_status_id_pk, client_id_pk, department_id_fk, priority_id_pk, common_cat_id_pk, sub_category_id_pk
    
    var fdate = ''
    fdate =  $('#txtFromDateasset').val();
    var tdate = ''
    tdate = $('#txtToDateasset').val();
    var Filed = {};
    var reportName = ''
    reportName = $('#txt_ReportNameAsset').val();
    var Datepurchase = ''
    Datepurchase = $('#txtFromDatepurchase').val();
    var Datewarranty = ''
    Datewarranty = $('#txtFromDatewarranty').val();
    var Dateamcend = ''
    Dateamcend = $('#txtFromDateamcend').val();

    var location_id_fk = "";
    $("#location_id_fkasset option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            location_id_fk = location_id_fk + $(this).val() + ",";
        }
        // alert(location_id_fk);
    });

    var ticket_status_id_pk = "";
    $("#ticket_status_id_pkAsset option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            // ticket_status_id_pk = $(this).val();
            ticket_status_id_pk = ticket_status_id_pk + $(this).val() + ",";
        }
    });
    var client_id_pk = "";
    $("#client_id_pkAsset option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            client_id_pk = client_id_pk + $(this).val() + ",";
        }
    });

    var ddlAssetCategoryFltr = "";
    $("#ddlAssetCategoryAsset option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlAssetCategoryFltr = ddlAssetCategoryFltr + $(this).val() + ",";
        }
    });

    var ddlvandorFltr = "";
    $("#ddlvandor option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlvandorFltr = ddlvandorFltr + $(this).val() + ",";
        }
    });
    var ddlManufacturerFltr = "";
    $("#ddlManufacturer option:selected").each(function () {
        if ($(this).val() != 0) {
            ddlManufacturerFltr = ddlManufacturerFltr + $(this).text() + ",";
        }
    });
    var Column_List = "";
    $("#Column_Listasset option:selected").each(function () {
        if ($(this).val() != 0) {
            Column_List = Column_List + $(this).val() + ",";
        }
    });

    var Report_Type = $('#Report_Typeasset').val();
    var Report_Time = $('#Report_Timeasset').val();
    var Email_To = $('#Email_Toasset').val();
    var Email_cc = $('#Email_ccasset').val();
    var Email_Subject = $('#Email_Subjectasset').val();
    var ddlWarrenty = $('#ddlWarrentySer').val();
    var ddlassetType = $('#ddl_AssetType').val();
    var ddlWeekDayAsset = $('#ddlWeekDayAsset').val();
    var ddlMonthdateAsset = $('#ddlMonthdateAsset').val();
    var parm = {

        'location_id': location_id_fk.slice(0, -1),
        'ticket_status': ticket_status_id_pk.slice(0, -1),
        'client_id': client_id_pk.slice(0, -1),
        'ReportName': reportName,
        'ReportId': 1,
        'ColumnName': Column_List.slice(0, -1),
        'IsScheduler': SchedulerValue,
        'Report_Time': Report_Time,
        'Email_To': Email_To,
        'Email_cc': Email_cc,
        'Email_Subject': Email_Subject,
        'Report_Type': Report_Type,
        'from_date': fdate,
        'to_date': tdate,
        'SelectedValue': $('#ddl_asset').val(),
        'asset_category_id_pk': ddlAssetCategoryFltr.slice(0, -1),
        'vandor': ddlvandorFltr.slice(0, -1),
        'manufacture': ddlManufacturerFltr.slice(0, -1),
        'Dateamcend': Dateamcend,
        'Datepurchase': Datepurchase,
        'Datewarranty': Datewarranty,
        'ReportType': Report_Type,
        'assetType': ddlassetType,
        'Asset_Category': ddlAssetCategoryFltr.slice(0, -1),
        'ddlWarrenty': ddlWarrenty

    };
    
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Staff/SaveTemplate',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            
            window.location.href = "/Report/Index";
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};

$('#ddl_Incidance').change(function () {
    var SelectedValue = $('#ddl_Incidance').val();
    if (SelectedValue == 5) {
        $('#showRow').show();
    }
    else {
        $('#showRow').hide();
    }
});
$('#ddl_Ser').change(function () {
    var SelectedValue = $('#ddl_Ser').val();
    if (SelectedValue == 5) {
        $('#showRowSer').show();
    }
    else {
        $('#showRowSer').hide();
    }
});
$('#ddl_asset').change(function () {
    var SelectedValue = $('#ddl_asset').val();
    if (SelectedValue == 5) {
        $('#showRowAsset').show();
    }
    else {
        $('#showRowAsset').hide();
    }
});

//Get Common Category Lists
function GetAssetCategory() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetCategory',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlAssetCategoryFltr').html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $('#ddlAssetCategoryFltr').append('<option value=' + this.asset_category_id_pk + '>' + this.asset_cat_name + '</option>');
            });
            //Service Asset Bind
            $('#ddlAssetCategorySer').html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $('#ddlAssetCategorySer').append('<option value=' + this.asset_category_id_pk + '>' + this.asset_cat_name + '</option>');
            });
            //Asset Bind
            $('#ddlAssetCategoryAsset').html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $('#ddlAssetCategoryAsset').append('<option value=' + this.asset_category_id_pk + '>' + this.asset_cat_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Supplier (Vendor) Lists
function GetSupplierDetails() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Supplier/GetSupplierDetails',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlVendor').html("").append('<option value="0">Select Vendor</option>');
            $(data).each(function () {
                $('#ddlVendor').append('<option value=' + this.supplier_id_pk + '>' + this.supplier_name + '</option>');
            });
            $('#ddlVendorSer').html("").append('<option value="0">Select Vendor</option>');
            $(data).each(function () {
                $('#ddlVendorSer').append('<option value=' + this.supplier_id_pk + '>' + this.supplier_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Supplier (Vendor) Lists
function GetPendingReason() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Masters/GetPendingReason',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlPendingReasonSer').html("").append('<option value="0">Select Pending Reason</option>');
            $('#ddlPendingReasonFltr').html("").append('<option value="0">Select Pending Reason</option>');
            $(data).each(function () {
                $('#ddlPendingReasonSer').append('<option value=' + this.pending_reason_id_pk + '>' + this.pending_reason_name + '</option>');
                $('#ddlPendingReasonFltr').append('<option value=' + this.pending_reason_id_pk + '>' + this.pending_reason_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};

// Get Service Request Lists 
function GetServiceRequest() {
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
        // alert(location);
    });
    var loggedvia = null
    $("#ddlLoggedViaFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            loggedvia = $(this).val();
        }
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
            //  alert(department);
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
    var resolutionsla = null
    $("#ddlResolutionSLAFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            resolutionsla = $(this).val();
        }
    });
    var pendingcategory = null
    $("#ddlPendingCategoryFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            pendingcategory = $(this).val();
        }
    });
    var pendingreason = null
    $("#ddlPendingReasonFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            pendingreason = $(this).val();
        }
    });
    var assetcategory = null
    $("#ddlAssetCategoryFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            pendingreason = $(this).val();
        }
    });
    var parm = {
        'from_date': fdate,
        'to_date': tdate,
        'location_id': location,
        'logged_via': loggedvia,
        'user_id': user,
        'status': status,
        'client_id': client,
        'department_id': department,
        'priority_id': priority,
        'common_cat_id': category,
        'sub_category_id': subcategory,
        'resolution_sla': resolutionsla,
        'pending_reason_id_fk': pendingcategory,
        'pending_category_id': pendingreason,
        'asset_category_id_fk': assetcategory
    };

    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/GetServiceRequest',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {


            //alert(data.status);
            var table;
            if ($.fn.dataTable.isDataTable('#tblServiceRequest')) {
                table = $('#tblServiceRequest').DataTable();
            } else {
                table = $('#tblServiceRequest').DataTable();
            }
            table.destroy();
            $("#tblServiceRequest").DataTable({
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
                        data: 'service_req_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (service_req_id_pk) {
                            return '<input id="check" class="cb-element servcbk" name="' + service_req_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },

                    {
                        data: 'service_req_id_pk', render: function (service_req_id_pk, type, row) {
                            //  return row.ticket_id_pk + ' ' + row.prefix;
                            // return '<a href="/ServiceRequests/ServiceRequestsDetails" class="editview"  name="' + service_req_id_pk + '">' + row.prefix + + row.service_req_id_pk + '</a>';

                            if (row.priority_id_pk === 1) {
                                return ' <a href="/Admin/ServiceRequests/ServiceRequestsDetails" title="Critical" class="editview"  name="' + service_req_id_pk + '"> <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Critical" style="color:#ea2d2d !important" title="Normal priority" data-original-title="Normal priority"></i> &nbsp; <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp;' + row.prefix + +row.service_req_id_pk + ' </a>';
                                // return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + status + '">' + status + '</span>';
                            }
                            else if (row.priority_id_pk === 2) {
                                return ' <a href="/Admin/ServiceRequests/ServiceRequestsDetails" title="High" class="editview"  name="' + service_req_id_pk + '"><i class="fa fa-flag fa-fw" data-toggle="tooltip" title="High" style="color:#f1a008 !important" title="Normal priority" data-original-title="Normal priority"></i> &nbsp; <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp;' + row.prefix + +row.service_req_id_pk + '</a>';
                                // return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (row.priority_id_pk === 3) {
                                return ' <a href="/Admin/ServiceRequests/ServiceRequestsDetails" title="Medium" class="editview"  name="' + service_req_id_pk + '"> <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Medium" style="color:#ffc107 !important" data-original-title="Normal priority"></i>  &nbsp; <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp;' + row.prefix + +row.service_req_id_pk + '</a>';
                                // return '<span class="badge badge-primary ENABLED" style="background-color:#b3ae1f;" name="' + status + '">' + status + '</span>';
                            }
                            else if (row.priority_id_pk === 4) {
                                return ' <a href="/Admin/ServiceRequests/ServiceRequestsDetails" title="Low" class="editview"  name="' + service_req_id_pk + '"> <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Low" style="color:#067304ad  !important" data-original-title="Normal priority"></i>  &nbsp;  <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp;' + row.prefix + +row.service_req_id_pk + '</a>';
                                //  return '<span class="badge badge-primary ENABLED" style="background-color:#3bc0c3 !important;" name="' + status + '">' + status + '</span>';
                            }
                        }
                    },
                    { data: 'subject', sWidth: '200px' },
                    { data: 'building_room_no', "visible": false },
                    { data: 'department_name', "visible": false },
                    { data: 'LOCATION', "visible": false },
                    { data: 'ASSIGNED_ENGINEER', "visible": false },
                    { data: 'USER_CONTACT_NUMBER', "visible": false },
                    { data: 'USER_EMAIL', "visible": false },
                    { data: 'RESLOVED_DATE', "visible": false },
                    { data: 'PRIORITY', "visible": false },
                    { data: 'SUPPORT_DEPARTMENT', "visible": false },
                    { data: 'SUPPORT_DEPARTMENT_GROUP', "visible": false },
                    { data: 'CATEGORY', "visible": false },
                    { data: 'SUB_CATEGORY', "visible": false },
                    {
                        data: 'email',
                        sWidth: '140px',
                        sClass: "view",
                        bSortable: false,
                        render: function (email) {
                            return '<a href="#" class="adminviewsubmitter"  name="' + email + '" data-toggle="modal" data-target="#myModalSubmitter" ><i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf  !important" data-original-title="Normal priority"></i>  &nbsp;' + email + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    {
                        data: 'name',
                        sWidth: '140px',
                        sClass: "view",
                        bSortable: false,
                        render: function (name) {
                            return '<a href="#" class="adminview"  name="' + name + '" data-toggle="modal" data-target="#myModal" ><i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf  !important" data-original-title="Normal priority"></i>  &nbsp;' + name + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    {
                        "data": "created_date",
                        "type": "date",
                        "render":
                            function (data, type, full) {
                                return (data) ? moment(data).format('DD/MM/YYYY  -  HH:mm:ss') : '';
                            }
                    },
                    {
                        data: 'service_req_id_pk', render: function (service_req_id_pk, type, row) {
                            var duecheck = false;
                            var str1 = row.non_negative;
                            var str2 = "-";
                            if (str1 != null && str1.indexOf(str2) != -1) {
                                duecheck = true;
                            }
                            if (duecheck == true) {
                                if (row.SlaStatus == "Pause") {
                                    return '<i class="fa fa-pause" aria-hidden="true"></i>  &nbsp;&nbsp;&nbsp;<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + row.non_negative + '">' + row.non_negative + '  OverDue' + '</span> ';
                                } else if (row.SlaStatus == "Running") {
                                    return '<i class="fa fa-play" aria-hidden="true"> </i>  &nbsp;&nbsp;&nbsp;<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d !important;" name="' + row.non_negative + '">' + row.non_negative + '  Remaining' + '</span> ';
                                }
                                // return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + row.non_negative + '">' + row.non_negative + '  OverDue' + '</span> <i class="fa fa-pause" aria-hidden="true"></i>';
                            } else if (parseFloat(row.non_negative) < 0) {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + row.non_negative + '">' + row.non_negative + '  OverDue' + '</span> </i>';
                            }
                            else if (row.non_negative == null) {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#029800;" name="' + row.non_negative + '">' + row.non_negative + '</span>';
                            } else {
                                if (row.SlaStatus == "Running") {
                                    return '<i class="fa fa-play" aria-hidden="true"></i> &nbsp;&nbsp;&nbsp;<span class="badge badge-primary ENABLED" style="background-color:#029800;" name="' + row.non_negative + '">' + row.non_negative + 'Remaining' + '</span> ';
                                } else if (row.SlaStatus == "Pause") {
                                    return '<i class="fa fa-pause" aria-hidden="true"> </i> &nbsp;&nbsp;&nbsp; <span class="badge badge-primary ENABLED" style="background-color:#ea2d2d !important;" name="' + row.non_negative + '">' + row.non_negative + '  Remaining' + '</span> ';
                                }
                            }
                        }
                    },
                    //{
                    //    data: 'service_req_id_pk', render: function (service_req_id_pk, type, row) {
                    //        if (parseFloat(row.non_negative) < 0) {
                    //            if (row.SlaStatus == "Running") {
                    //                return '<i class="fa fa-pause" aria-hidden="true"></i> &nbsp;&nbsp;&nbsp;<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + row.non_negative + '">' + row.non_negative + '  OverDue' + '</span> ';
                    //            } else if (row.SlaStatus == "Pause") {
                    //                return '<i class="fa fa-play" aria-hidden="true"> </i> &nbsp;&nbsp;&nbsp;<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d !important;" name="' + row.non_negative + '">' + row.non_negative + '  Remaining' + '</span> ';
                    //            }
                    //            // return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + row.non_negative + '">' + row.non_negative + '  OverDue' + '</span> <i class="fa fa-pause" aria-hidden="true"></i>';
                    //        } else if (parseFloat(row.non_negative) < 0) {
                    //            return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + row.non_negative + '">' + row.non_negative + '  OverDue' + '</span> </i>';
                    //        }
                    //        else if (row.non_negative == null) {
                    //            return '<span class="badge badge-primary ENABLED" style="background-color:#029800;" name="' + row.non_negative + '">' + row.non_negative + '</span>';
                    //        } else {
                    //            if (row.SlaStatus == "Running") {
                    //                return '<i class="fa fa-pause" aria-hidden="true"></i> &nbsp;&nbsp;&nbsp;<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + row.non_negative + '">' + row.non_negative + '  OverDue' + '</span> ';
                    //            } else if (row.SlaStatus == "Pause") {
                    //                return '<i class="fa fa-play" aria-hidden="true"> </i> &nbsp;&nbsp;&nbsp;<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + row.non_negative + '">' + row.non_negative + '  Remaining' + '</span> ';
                    //            }
                    //        }
                    //    }
                    //},
                    {
                        data: "status",
                        render: function (status) {
                            // Check if blank
                            if (status == "On Hold") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status == "Approval Pending") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Provisioning") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#b3ae1f;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Assigned") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#3bc0c3 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "In Progress") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#de7b00;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "On Hold") {
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Cancelled") {
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Rejected") {
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Resolved") {
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Closed") {
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "New") {
                                return '<span class="badge badge-primary" style="background-color:#ea2d2d  !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Waiting for Update") {
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Approved") {
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (status === "Reopened") {
                                return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;" name="' + status + '">' + status + '</span>';
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


