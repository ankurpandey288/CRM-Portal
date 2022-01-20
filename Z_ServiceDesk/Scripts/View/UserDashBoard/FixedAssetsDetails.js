$(document).ready(function () {
    $("#side-menu").children("li").children("ul").children("li").children("a").find(".fa-hand-o-right").hide();
    $('a[href="/PLC/CompanyDocuments"]').css({ "color": "#127e70", "background-color": "rgba(210,210,210,0.9)" }).find(".fa-hand-o-right").show();
    $("#ipercentage").show();
    $("#ZoomModel").hide();
    $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });

    $("#btnAddPromoter").click(function () {
        $("#divAddpromoter").show();
    });
    $(".btnCancel").click(function () {
        $("#divAddpromoter").find(".kv-file-remove").click();
        MoveDocuments();
        $("#divAddpromoter").find("span").css('display', 'none');
        $("#divAddpromoter").hide();
        $("#btnAddPromoter").show();
        $("#divAddpromoter").find("input[type='text']").val('');
        $("#divAddpromoter").find("textarea").val('');
        $("#divAddpromoter").find("span").css('display', 'none');
        $(".ckblist").removeAttr('checked');
    });
    //alert($.session.get("asset_id_pk"));
    GetHostName();
    Getclients();
    GetCommonCategory();
    GetBusinessUnit();
    GetSupplierDetails();
    GetLocation();
    GetStatus();
    GetEmployees();
    //google.charts.load('current', { 'packages': ['gauge'] });
    //google.charts.setOnLoadCallback(drawChart);
    // drawChart();
    GetAssetDetails($.session.get("asset_id_pk"));
    GetAssetsHardwareList($.session.get("asset_id_pk"));
    GetAssetSoftwareList($.session.get("asset_id_pk"));
    GetAssetPatchList($.session.get("asset_id_pk"));
    GetAssetDeviceDrivers($.session.get("asset_id_pk"));
    GetAssetSystemService($.session.get("asset_id_pk"));
    GetAssetSystemSound($.session.get("asset_id_pk"));
    GetAssetSystemPrinter($.session.get("asset_id_pk"));
    GetSentToRepairHistory($.session.get("asset_id_pk"));
    //  GetTaskDetailsByAssetId($.session.get("asset_id_pk"));
    // GetTaskDetailsByAssetId(1);
    //GetTicketListsByAssetId($.session.get("asset_id_pk"));
    // GetAssetsHardwareList(1);
    google.charts.load('current', { 'packages': ['gauge'] });
    google.charts.setOnLoadCallback(drawChart);
    GetCpuRamUsesNew(1);
    var memory;
    var cpu;
    var network;

    $("#txtStatus").click(function () {
        GetAssetStatusComments($.session.get("asset_id_pk"));

    });
    $("#btnSubmit").click(function () {
        //alert("hello");
        //alert($("#ddlAssetMapping option:selected").val());
        InsMapAssetHardwareInfo();
        //if (validateAssets() == true) {
        //    alert("hello");
        //    InsMapAssetHardwareInfo();
        //} else {
        //    return false;
        //}
    });
    $("#ddlLocation").change(function () {
        if ($(this).val() != 0) {
            GetStoredLocation($(this).val());
        } else {
            $("#ddlSubLocation").html("").append('<option value="0">Select Stored Location</option>');
        }
    });
    $("#btnEdit").click(function () {
        GetAssetDetailsEdit($.session.get("asset_id_pk"));

    });

});
//Get All clients Lists
function Getclients() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Peripherals/Getclients',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#ddlClient').html("").append('<option value="0">Select</option>');
            $(data).each(function () {
                $('#ddlClient').append('<option value=' + this.id + '>' + this.name + '</option>');
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

            $('#ddlBusinessUnit').html("").append('<option value="0">Select Business Unit</option>');
            $(data).each(function () {
                $('#ddlBusinessUnit').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
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
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetCategory',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#ddlCategory').html("").append('<option value="0">Select Asset Category</option>');
            $(data).each(function () {
                $('#ddlCategory').append('<option value=' + this.asset_category_id_pk + '>' + this.asset_cat_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All SupplierDetails Lists
function GetSupplierDetails() {

    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Peripherals/GetSupplierDetails',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#ddlSupplier').html("").append('<option value="0">Select</option>');
            $(data).each(function () {
                $('#ddlSupplier').append('<option value=' + this.supplier_id_pk + '>' + this.supplier_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
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
//Get All Stored Location Lists
function GetStoredLocation(location_id) {
    var parm = {
        "location_id_fk": location_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Software/GetStoredLocationList',
        success: function (data) {
            $('#ddlSubLocation').html("").append('<option value="0">Select Stored Location</option>');
            $(data).each(function () {
                $('#ddlSubLocation').append('<option value=' + this.stored_location_id_pk + '>' + this.stored_location_name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//Get All Status Lists
function GetStatus() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Change/GetStatus',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlStatus').html("").append('<option value="0">Select Status</option>');
            $(data).each(function () {
                $('#ddlStatus').append('<option value=' + this.status_id_pk + '>' + this.status + '</option>');
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
            $(".EMP").html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $('.EMP').append('<option value=' + this.id + '>' + this.name + '</option>');
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
//Get All Host Name Lists
function GetHostName() {

    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetHostName',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#ddlAssetMapping').html("").append('<option value="0">Select Host Name</option>');
            $(data).each(function () {
                $('#ddlAssetMapping').append('<option value=' + this.Id + '>' + this.HostName + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};

function validateAssets() {
    var return_val = true;
    if ($('#ddlAssetMapping option:selected').val() == 0) {
        $('#SpnAssetMapping').show();
        return_val = false;
    } else {
        $('#SpnAssetMapping').hide();
    }
};
// Map Asset System Hardware Info
function InsMapAssetHardwareInfo() {
    var parm = {
        "asset_id_pk": $.session.get("asset_id_pk"),
        "cpu_sys_hd_id_pk": $("#ddlAssetMapping option:selected").val(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/InsMapAssetHardwareInfo',
        success: function (data) {
            //  alert("Inserted Successfully");           
            if (data.status_id == 0) {
                successnotify(data.status);
            } else {
                warningnotify(data.status);
            }
            //$("#divPickupInformation").find("input").val("");
            //getPickupInformation();
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};

// Get Asset Mapped Hardware List Lists
//function GetAssetHardwareList() {
//    $.ajax({
//        type: "Get",
//        contentType: "application/json; charset=utf-8",
//        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetList',
//        dataType: "json",
//        success: function (data) {
//            var table;
//            if ($.fn.dataTable.isDataTable('#tblFixedAssetHardwareDetails')) {
//                table = $('#tblFixedAssetHardwareDetails').DataTable();
//            } else {
//                table = $('#tblFixedAssetHardwareDetails').DataTable();
//            }
//            table.destroy();
//            $("#tblFixedAssetHardwareDetails").DataTable({
//                data: data,
//                paging: true,
//                sort: true,
//                searching: true,
//                order: [],
//                lengthMenu: [
//                    [10, 25, 50, -1],
//                    ['10 rows', '25 rows', '50 rows', 'Show all']
//                ],
//                responsive: true,
//                columns: [



//                    { data: 'asset_tag' },
//                    { data: 'asset_cat_name' },
//                    { data: 'asset_name' },
//                    { data: 'model_name' },
//                    { data: 'serial_number' },
//                    { data: 'location_name' },
//                    { data: 'status' },
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

// Get Preventive Maintainance View Check List
//function GetAssetHardwareLists() { 
//    var parm = {
//        "asset_id_pk": 1 // asset_id,
//    };
//    var josnstr = JSON.stringify(parm);
//    $.ajax({
//        type: "Post",
//        data: josnstr,
//        dataType: "json",
//        contentType: "application/json; charset=utf-8",
//        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetHardwareList',
//        success: function (data) {

//            alert($(data.asset_id_pk).val());

//            $("#txtAssetId").text(data.asset_id_pk);
//            //$("#txtAssetTag").val(data.asset_tag);
//            //$("#ddlAssetCategory").val(data.asset_cat_name);
//            //$("#txtLocation").val(data.location_name);
//            //$("#txtPlannedDate").val(data.created_date);
//            //$("#txtDueDate").val(data.due_date);
//            //$("#txtFeedback").val(data.feedback);
//            //$("#txtStatus").val(data.status);

//            //debugger
//            // $("#btnSave").attr("disabled", "disabled");
//        },
//        error: function (result) {
//            debugger
//            console.log(result);

//            alert("Error : data");
//        }
//    });
//};

//function GetAssetHardwareList(Asset_id) {
//    var parm = {
//        "asset_id_pk": 1,
//    };
//    var josnstr = JSON.stringify(parm);
//    $.ajax({
//        type: "Post",
//        data: josnstr,
//        dataType: "json",
//        contentType: "application/json; charset=utf-8",
//        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetHardwareList',
//        success: function (data) {
//            debugger
//            alert($(data.TagNumber).val());
//            $("#txtAssetId").val(data.TagNumber);
//            //if (data.asset_id_pk != null) {
//            //    alert($(data.asset_id_pk).val());
//            //    //errornotify("Bank Name already Exists");
//            //    //$("#dllACHolderType").val(data.account_holder_type).change();
//            //    //$("#dllACHolder").val(data.holder_id).change();
//            //    //$("#txtBankName").val(data.bank_name)
//            //    //$("#txtIFSCCode").val(data.ifsc_code);
//            //    //$("#txtAccountNo").val(data.bank_account_no);
//            //    //$("#txtAccountType").val(data.account_type);

//            //    if (data.is_active == 1) {
//            //        $("#chkIsActive").prop('checked', true);
//            //    } else {
//            //        $("#chkIsActive").prop('checked', false);
//            //    }
//            //    $("#btnSave").attr("disabled", "disabled");
//            //    $("#btnUpdate").show().attr("name", data.bank_id_pk);
//            //} 
//            //    else {
//            //    $("#btnSave").removeAttr("disabled");
//            //    $("#btnUpdate").hide();
//            //}
//            //alert("Success");
//        },
//        error: function (result) {
//            alert("Error : data");
//        }
//    });
//};

//function GetAssetHardwareList(Asset_id) {
//    var parm = {
//        'asset_id_pk': Asset_id // $.session.get("asset_id_pk");
//    };
//    var josnstr = JSON.stringify(parm);
//    $.ajax({
//        type: "Post",
//        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetHardwareList',
//        contentType: "application/json; charset=utf-8",
//        data: josnstr,
//        dataType: "json",
//        success: function (data) {

//            var table;
//            if ($.fn.dataTable.isDataTable('#tblFixedAssetHardwareDetails')) {
//                table = $('#tblFixedAssetHardwareDetails').DataTable();

//            } else {
//                table = $('#tblFixedAssetHardwareDetails').DataTable();
//            }
//            table.destroy();
//            $("#tblFixedAssetHardwareDetails").DataTable({
//                data: data,
//                paging: true,
//                sort: true,
//                searching: true,
//                order: [],
//                lengthMenu: [
//                    [10, 25, 50, -1],
//                    ['10 rows', '25 rows', '50 rows', 'Show all']
//                ],
//                responsive: true,
//                columns: [
//                    { data: 'asset_id_pk' },
//                    { data: 'TagNumber' },
//                    { data: 'Make' },
//                    { data: 'Model' },
//                    { data: 'SerialNo' },
//                    { data: 'IP' },
//                    { data: 'MACAddress' },
//                    { data: 'HostName' },
//                    { data: 'DomainName' },
//                    { data: 'CPU' },
//                    { data: 'NoOfCores' },
//                    { data: 'NoOfProcessors' },
//                    { data: 'NoOfHdd' },
//                    { data: 'HddSize' },
//                    { data: 'HddSerialNo' },
//                    { data: 'HddUsage' },
//                    { data: 'NoRam' },
//                    { data: 'SizeOfRam' },
//                    { data: 'OS' },
//                    { data: 'OSServicePack' },
//                    { data: 'OSSerialNo' },
//                    { data: 'OSManufacture' },
//                    { data: 'ComputerName' },
//                    { data: 'DriveName' },
//                    { data: 'HddTotalSize' },
//                    { data: 'GraphisCardName' },
//                    { data: 'GraphisCardDeviceID' },
//                    { data: 'GraphisCardInstalledDisplayDrivers' },
//                    { data: 'GraphisCardInstalledDisplayDrivers1' },
//                    { data: 'GraphisCardDriverVersion' },
//                    { data: 'GraphisCardRam' },
//                    { data: 'OSVersion' },
//                    { data: 'lu_date' }
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
function GetAssetSoftwareList(Asset) {
    var parm = {
        'asset_id_pk': Asset // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetSoftwareList',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblFixedAssetSoftwareDetails')) {
                table = $('#tblFixedAssetSoftwareDetails').DataTable();
            } else {
                table = $('#tblFixedAssetSoftwareDetails').DataTable();
            }
            table.destroy();
            $("#tblFixedAssetSoftwareDetails").DataTable({
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
                    { data: 'Software_Id' },
                    { data: 'SoftwareName' },
                    { data: 'InstallationDate' },
                    { data: 'Version' },
                    //    { data: 'MacAddress' }
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
function GetAssetPatchList(Asset) {
    var parm = {
        'asset_id_pk': Asset // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetPatchList',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblFixedAssetPatchDetails')) {
                table = $('#tblFixedAssetPatchDetails').DataTable();
            } else {
                table = $('#tblFixedAssetPatchDetails').DataTable();
            }
            table.destroy();
            $("#tblFixedAssetPatchDetails").DataTable({
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
                    // { data: 'Mac' },
                    { data: 'Title' },
                    { data: 'Description' },
                    { data: 'SupportUrl' },
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
function GetAssetDeviceDrivers(Asset_Device_Driver) {
    var parm = {
        'asset_id_pk': Asset_Device_Driver // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetDeviceDrivers',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblDeviceDrivers')) {
                table = $('#tblDeviceDrivers').DataTable();
            } else {
                table = $('#tblDeviceDrivers').DataTable();
            }
            table.destroy();
            $("#tblDeviceDrivers").DataTable({
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
                    { data: 'device_driver_id' },
                    { data: 'DeviceDriverName' },
                    { data: 'Manufacturer' },
                    { data: 'DriverVersion' },
                    //    { data: 'MacAddress' },
                    { data: 'FriendlyName' }
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
function GetAssetSystemService(Asset_System_Service) {
    var parm = {
        'asset_id_pk': Asset_System_Service // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetSystemService',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblProcesses')) {
                table = $('#tblProcesses').DataTable();
            } else {
                table = $('#tblProcesses').DataTable();
            }
            table.destroy();
            $("#tblProcesses").DataTable({
                data: data,
                paging: true,
                sort: false,
                searching: true,
                ordering: true,


                //paging: true,
                //sort: true,
                //searching: true,
                //ordering: true,

                order: [],
                lengthMenu: [
                    [10, 25, 50, -1],
                    ['10 rows', '25 rows', '50 rows', 'Show all']
                ],
                responsive: true,
                columns: [
                    { data: 'system_service_id' },
                    { data: 'ServiceName' },
                    //   { data: 'Displayname' },
                    //  { data: 'Startname' },
                    {
                        data: 'Startname',
                        sWidth: '10px',
                        sClass: "view",
                        bSortable: false,
                        render: function (Startname) {
                            return '<a class="editview"  name="' + Startname + '"><i class="fa fa-flag fa-fw" data-toggle="tooltip" title="" style="color:#1a4ba9 !important" data-original-title="Normal priority"></i>  ' + Startname + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'StartMode' },
                    { data: 'ServiceType' },
                    { data: 'Status' },
                    { data: 'State' },
                    //      { data: 'MacAddress' }
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
function GetAssetSystemSound(Asset_System_Sound) {
    var parm = {
        'asset_id_pk': Asset_System_Sound // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetSystemSound',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblSyatemSound')) {
                table = $('#tblSyatemSound').DataTable();
            } else {
                table = $('#tblSyatemSound').DataTable();
            }
            table.destroy();
            $("#tblSyatemSound").DataTable({
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
                    { data: 'system_sound_id' },
                    //  { data: 'Mac' },
                    { data: 'Name' },
                    { data: 'DeviceId' },
                    //{
                    //    data: 'DeviceId',
                    //    sWidth: '50px',
                    //    sClass: "view",
                    //    bSortable: false,
                    //    render: function (DeviceId) {
                    //        return '<a class="editview"  name="' + DeviceId + '"><i class="fa fa-flag fa-fw" data-toggle="tooltip" title="" style="color:#1a4ba9 !important" data-original-title="Normal priority"></i>  ' + DeviceId + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                    //    }
                    //},
                    { data: 'Status' }
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
function GetAssetSystemPrinter(Asset_System_Printer) {
    var parm = {
        'asset_id_pk': Asset_System_Printer // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetSystemPrinter',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblSyatemPrinter')) {
                table = $('#tblSyatemPrinter').DataTable();
            } else {
                table = $('#tblSyatemPrinter').DataTable();
            }
            table.destroy();
            $("#tblSyatemPrinter").DataTable({
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
                    { data: 'sys_printer_id' },
                    //  { data: 'Mac' },
                    { data: 'Name' },
                    { data: 'Network' },
                    { data: 'IsDefalutPrinter' },
                    { data: 'DeviceId' }
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
function GetAssetsHardwareList(Asset_id_pk) {
    var parm = {
        'asset_id_pk': Asset_id_pk // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetsHardwareList',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            alert(data.asset_id_pk);
            $("#txtSiNo").text(data.asset_id_pk);
            $("#txtTagNumber").text(data.TagNumber);
            $("#txtMake").text(data.Make);
            $("#txtModel").text(data.Model);
            $("#txtSerialNo").text(data.SerialNo);
            $("#txtIP").text(data.IP);
            $("#txtMACAddress").text(data.MACAddress);
            $("#txtHostName").text(data.HostName);
            $("#txtDomainName").text(data.DomainName);
            $("#txtCPU").text(data.CPU);
            $("#txtNoOfCores").text(data.NoOfCores);
            $("#txtNNoOfProcessors").text(data.NoOfProcessors);
            $("#txtNoOfHdd").text(data.NoOfHdd);
            $("#txtHddSize").text(data.HddSize);
            $("#txtHddSerialNo").text(data.HddSerialNo);
            $("#txtHddUsage").text(data.HddUsage);
            $("#txtNoRam").text(data.NoRam);
            $("#txtSizeOfRam").text(data.SizeOfRam);
            $("#txtOS").text(data.OS);
            $("#txtOSServicePack").text(data.OSServicePack);
            $("#txtOSSerialNo").text(data.OSSerialNo);
            $("#txtOSManufacture").text(data.OSManufacture);
            $("#txtComputerName").text(data.ComputerName);
            $("#txtDriveName").text(data.DriveName);
            $("#txtHddTotalSize").text(data.HddTotalSize);
            $("#txtGraphisCardName").text(data.GraphisCardName);
            $("#txtGraphisCardDeviceID").text(data.GraphisCardDeviceID);
            $("#txtGraphisCardInstalledDisplayDrivers").text(data.GraphisCardInstalledDisplayDrivers);
            $("#txtGraphisCardInstalledDisplayDrivers1").text(data.GraphisCardInstalledDisplayDrivers1);
            $("#txtGraphisCardDriverVersion").text(data.GraphisCardDriverVersion);
            $("#txtGraphisCardRam").text(data.GraphisCardRam);
            $("#txtOSVersion").text(data.OSVersion);
            $("#txtLastUpdateDate").text(data.lu_date);

            //$.each(data, function () {
            //    alert(this.ram_uses);
            //    alert(this.cpu_uses);

            //});

        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function GetCpuRamUsesNew(Asset_id_pk) {
    var parm = {
        "Asset_id_pk": Asset_id_pk,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetCpuRamUses',
        success: function (data) {
            //memory, cpu, network
            memory = parseInt(data.ram_uses);
            cpu = parseInt(data.cpu_uses);
            network = parseInt(data.cpu_uses);

            drawChart();
            //  drawChart(parseInt(data.ram_uses), parseInt(data.cpu_uses), parseInt(data.cpu_uses));
            //google.charts.load('current', { 'packages': ['gauge'] });
            //google.charts.setOnLoadCallback(drawChart(parseInt(data.ram_uses), parseInt(data.cpu_uses), parseInt(data.cpu_uses)));

            //$(data).each(function () {
            //    alert(this.ram_uses);
            //    alert(this.cpu_uses);
            //    drawChart(ram_uses, cpu_uses, cpu_uses);
            // });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
function drawChart() {
    debugger

    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],

        //['Memory', memory],
        //['CPU', cpu],
        //['Network', network]

        ['Memory', parseInt(memory)],
        ['CPU', parseInt(cpu)],
        ['Network', parseInt(network)]
    ]);

    var options = {
        width: 680, height: 250,
        redFrom: 90, redTo: 100,
        yellowFrom: 75, yellowTo: 90,
        minorTicks: 5
    };

    var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
    chart.draw(data, options);



    setInterval(function () {
        data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
        chart.draw(data, options);
    }, 13000);
    setInterval(function () {
        data.setValue(1, 1, 40 + Math.round(60 * Math.random()));
        chart.draw(data, options);
    }, 5000);
    setInterval(function () {
        data.setValue(2, 1, 60 + Math.round(20 * Math.random()));
        chart.draw(data, options);
    }, 26000);
}
function GetAssetDetails(asset_id) {
    var parm = {
        'asset_id_pk': asset_id// $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetDetailsList',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#txtClient").text(data.client_name);
            $("#txtAssetCategoryName").text(data.asset_cat_name);
            $("#ASTTAG").text(data.asset_tag);
            $("#txtAssetTag").text(data.asset_tag);
            $("#txtManufacturerName").text(data.manufacturer_name);
            $("#txtModelName").text(data.model_name);
            $("#txtAsset").text(data.asset_name);
            $("#txtSupplierName").text(data.supplier_name);
            $("#txtLocationName").text(data.location_name);
            $("#txtStoredLocationName").text(data.stored_location_name);
            //$("#txtStatus").text(data.status);
            if (data.status === "InStore") {
                $("#txtStatus").text(data.status);
            } else if (data.status === "Allocated") {
                $("#txtStatus").text(data.status);
            } else if (data.status === "InRepair") {
                $("#txtStatus").text(data.status);
            } else if (data.status === "InActive") {
                $("#txtStatus").text(data.status);
            } else if (data.status === "Discard") {
                $("#txtStatus").text(data.status);
            } else if (data.status === "Theft") {
                $("#txtStatus").text(data.status);
            }
            $("#txtSerialNumber").text(data.serial_number);
            $("#txtAssetUserName").text(data.asset_user_name);
            $("#txtRemovalDate").text(data.removal_date);
            $("#txtPurchasePrice").text(data.purchase_price);
            $("#txtCondition").text(data.condition);
            $("#txtInvoiceNo").val(data.invoice_no).change();
            $("#txtInvoiceDate").val(data.invoice_date);
            $("#txtWarrantyStartDate").val(data.warranty_start_date).change();
            $("#txtWarrantyEndDate").val(data.warranty_end_date);
            $("#txtAMCStartDate").val(data.amc_start_date);
            $("#txtAMCEndDate").val(data.amc_end_date);
            GetTaskDetailsByAssetId(data.asset_tag);
            GetTicketListsByAssetId(data.asset_tag);

        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Get Asset Details For Edit
function GetAssetDetailsEdit(asset_id) {
    var parm = {
        'asset_id_pk': asset_id// $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetDetails',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#ddlBusinessUnit").val(data.client_id_fk).change();
            $("#ddlCategory").val(data.asset_category_id_fk).change();
            $("#txtAssetTag2").val(data.asset_tag);
            $("#txtManufacturer").val(data.manufacturer_name);
            $("#txtModel2").val(data.model_name);
            $("#txtAssetName").val(data.asset_name);
            $("#ddlSupplier").val(data.supplier_id_pk).change();
            $("#ddlLocation").val(data.location_id_pk).change();
            $("#ddlSubLocation").val(data.stored_location_id_pk).change();
            $("#ddlStatus").val(data.status_id_pk).change();
            $("#txtSerialnumber").val(data.serial_number);
            $("#ddlAssetUser").val(data.asset_user_id).change();
            $("#txtRemovalDate").val(data.removal_date);
            $("#txtAssetPrice").val(data.purchase_price);
            $("#txtCondition2").val(data.condition);

        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function GetSentToRepairHistory(asset_id) {
    var parm = {
        'asset_id_fk': asset_id // $.session.get("asset_id_pk"); 
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetSentToRepairHistory',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblRepairHistory')) {
                table = $('#tblRepairHistory').DataTable();
            } else {
                table = $('#tblRepairHistory').DataTable();
            }
            table.destroy();
            $("#tblRepairHistory").DataTable({
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
                    { data: 'send_to_rep_id_pk' },
                    { data: 'created_date' },
                    { data: 'supplier_name' },
                    { data: 'fault_description' },
                    { data: 'ass_agg_type' }

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
//Get Task List By Asset Id
function GetTaskDetailsByAssetId(asset_tag) {
    var parm = {
        'asset_tag': asset_tag
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetTaskDetailsByAssetId',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblTasks')) {
                table = $('#tblTasks').DataTable();
            } else {
                table = $('#tblTasks').DataTable();
            }
            table.destroy();
            $("#tblTasks").DataTable({
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
                        data: 'task_id_pk', sWidth: '100px', render: function (task_id_pk, type, row) {
                            return '<a href="#" data-toggle="modal" data-target="#myModalDetails" class="editview"  name="' + task_id_pk + '"> <i class="fa fa-eye icon-ser"> </i> ' + row.prefix + + row.task_id_pk + '</a>';

                        }
                    },
                    { data: 'title' },
                    { data: 'task_type_name' },
                    { data: 'name' },
                    { data: 'business_unit' },
                    { data: 'created_date' },
                    { data: 'due_date' },
                    { data: 'status' },
                    // { data: 'Voilated' },
                    {
                        data: 'Voilated',
                        // sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (Voilated) {
                            if (Voilated === "NO") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;margin-left: 19px;" name="' + Voilated + '">' + Voilated + '</span>';
                                // return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + status + '">' + status + '</span>';
                            }
                            else if (Voilated === "Yes") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#28a745;margin-left: 19px;" name="' + Voilated + '">' + Voilated + '</span>';
                                // return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + status + '</span>';
                            }
                            // return '<input id="check" class="cb-element checkbox" name="' + ticket_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    }
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
//Get Iicket List By Asset Id 
function GetTicketListsByAssetId(asset_tag) {
    var parm = {
        'asset_tag': asset_tag
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetTicketListsByAssetId',
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
// File Upload 
function GetAssetStatusComments(asset_id) {
    var parm = {
        "asset_id_pk": asset_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetDetailsList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: josnstr,
        success: function (data) {
            $("#txtStatusComments").text(data.status_comments);
        },
        error: function (edata) {
            $(edata).each(function () {
                InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            });
            alert("error while geting record.");
        }
    });
};