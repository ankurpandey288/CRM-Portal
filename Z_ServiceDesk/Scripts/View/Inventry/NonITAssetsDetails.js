$(document).ready(function () {
    GetLocation();
    GetCategoryList();
    GetStatus();
    GetBusinessUnit();
    GetEmployees();
    GetSupplierDetails();
    alert($.session.get("non_it_ass_id_pk")); 
    $("#ddlLocation").change(function () {
        if ($(this).val() != 0) {
            GetStoredLocation($(this).val());
        } else {
            $(".StoredLocation").html("").append('<option value="0">Select Stored Location</option>');
        }
    });
    GetNonItAssetsDetails($.session.get("non_it_ass_id_pk"));
    GetSentToRepairHistory($.session.get("non_it_ass_id_pk"));
    $("#btnEdit").click(function () {
        GetNonItAssetDetailsList($.session.get("non_it_ass_id_pk")); 
    });
    $("#btnSubmit").click(function () {
        if (validateNonItAsset() == true) {
            UpdateNonItAsset($.session.get("non_it_ass_id_pk"));
        } else {
            return false;
        }
    });
    
});
function GetNonItAssetsDetails(non_it_ass) {
    var parm = {
        'non_it_ass_id_pk': non_it_ass// $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetNonItAssetsDetails',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            alert(data.invoice_no);
            $("#txtClient").text(data.client_name);
            $("#txtAssetCategoryName").text(data.non_it_ass_cat_name);
            $("#ASTTAG").text(data.assets_tag);
            $("#txtAssetTags").text(data.assets_tag);
            $("#txtManufacturerName").text(data.manufacturer);
            $("#txtModelName").text(data.model);
            $("#txtAsset").text(data.asset_name);
            $("#txtSupplierName").text(data.supplier_name);
            $("#txtLocationName").text(data.location_name);
            $("#txtStoredLocationName").text(data.stored_location_name);
            $("#txtStatus").text(data.status);
            $("#txtSerialNumber").text(data.serial_number);
            $("#txtAssetUserName").text(data.asset_user_name);
            $("#txtRemovalDate").text(data.removal_date);
            $("#txtPurchasePrice").text(data.purchase_price);
            $("#txtCondition").text(data.condition);
            $("#txtInvoiceNumber").text(data.invoice_no); 
            $("#txtInvoiceDates").text(data.invoice_date);
            $("#txtWarrantyStartDates").text(data.warranty_start_date);
            $("#txtWarrantyEndDates").text(data.warranty_end_date);
            $("#txtAMCStartDates").text(data.amc_start_date);
            $("#txtAMCEndDates").text(data.amc_end_date);
            GetTicketListsByAssetId(data.assets_tag);
            GetTaskDetailsByAssetId(data.assets_tag); 
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};


function validateGatePass() {
    var return_val = true;
    if ($('#ddlMovementType option:selected').val() == 0) {
        $('#SpnMovementType').show();
        return_val = false;
    } else {
        $('#SpnMovementType').hide();
    }
    if ($('#ddlGatePassType option:selected').val() == 0) {
        $('#SpnGatePassType').show();
        return_val = false;
    } else {
        $('#SpnGatePassType').hide();
    }
    if ($('#ddlGatePassType option:selected').val() == 1) {
        if ($('#txtExpectedDateofReturn').val().trim() == "" || $('#txtExpectedDateofReturn').val() == null) {
            $('#SpnExpectedDateofReturn').show();
            return_val = false;
        } else {
            $('#SpnExpectedDateofReturn').hide();
        }
    } else {
        $('#SpnExpectedDateofReturn').hide();
    }
    if ($('#ddlAssetStatusChange option:selected').val() == 2) {
        if ($('#ddlAssetStatusGatePass option:selected').val() == 0) {
            $('#SpnAssetStatusGatePass').show();
            return_val = false;
        } else {
            $('#SpnAssetStatusGatePass').hide();
        }
    } else {
        $('#SpnAssetStatus').hide();
    }
    if ($('#ddlApprovalRequired option:selected').val() == 2) {
        if ($('#ddlOtherApprover option:selected').val() == 0) {
            $('#SpnOtherApprover').show();
            return_val = false;
        } else {
            $('#SpnOtherApprover').hide();
        }
    } else {
        $('#SpnOtherApprover').hide();
    }
    if ($('#ddlBusinessUnitGatePass option:selected').val() == 0) {
        $('#SpnBusinessUnitGatePass').show();
        return_val = false;
    } else {
        $('#SpnBusinessUnitGatePass').hide();
    }
    if ($('#ddlFromAddress option:selected').val() == 0) {
        $('#SpnFromAddress').show();
        return_val = false;
    } else {
        $('#SpnFromAddress').hide();
    }
    if ($('#ddlAssetsGatePass option:selected').val() == 0) {
        $('#SpnAssetsGatePass').show();
        return_val = false;
    } else {
        $('#SpnAssetsGatePass').hide();
    }

    if ($('#ddlAssign option:selected').val() == 0) {
        $('#SpnAssign').show();
        return_val = false;
    } else {
        $('#SpnAssign').hide();
    }
    if ($('#txtReasonForGatePass').val().trim() == "" || $('#txtReasonForGatePass').val() == null) {
        $('#SpnReasonForGatePass').show();
        return_val = false;
    } else {
        $('#SpnReasonForGatePass').hide();
    }
    if ($('#txtToAddress').val().trim() == "" || $('#txtToAddress').val() == null) {
        $('#SpnToAddress').show();
        return_val = false;
    } else {
        $('#SpnToAddress').hide();
    }
    if ($('#txtGatePassValidity').val().trim() == "" || $('#txtGatePassValidity').val() == null) {
        $('#SpnGatePassValidity').show();
        return_val = false;
    } else {
        $('#SpnGatePassValidity').hide();
    }
    return return_val;
};
function GetEmployees() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Consumable/GetEmployees',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".EMP").html("").append('<option value="0">Select User</option>');
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
function validateNonItAsset() {
    var return_val = true;
    if ($('#ddlBusinessUnit option:selected').val() == 0) {
        $('#SpnBusinessUnit').show();
        return_val = false;
    } else {
        $('#SpnBusinessUnit').hide();
    }
    if ($('#ddlCategory option:selected').val() == 0) {
        $('#SpnCategory').show();
        return_val = false;
    } else {
        $('#SpnCategory').hide();
    }
    if ($('#txtAssetTag').val().trim() == "" || $('#txtAssetTag').val() == null) {
        $('#SpnAssetTag').show();
        return_val = false;
    } else {
        $('#SpnAssetTag').hide();
    }
    if ($('#txtManufacturer').val().trim() == "" || $('#txtManufacturer').val() == null) {
        $('#SpnManufacturer').show();
        return_val = false;
    } else {
        $('#SpnManufacturer').hide();
    }
    if ($('#txtModel').val().trim() == "" || $('#txtModel').val() == null) {
        $('#SpnModel').show();
        return_val = false;
    } else {
        $('#SpnModel').hide();
    }
    if ($('#txtAssetName').val().trim() == "" || $('#txtAssetName').val() == null) {
        $('#SpnAssetName').show();
        return_val = false;
    } else {
        $('#SpnAssetName').hide();
    }
    if ($('#ddlSupplier option:selected').val() == 0) {
        $('#SpnSupplier').show();
        return_val = false;
    } else {
        $('#SpnSupplier').hide();
    }
    if ($('#ddlLocation option:selected').val() == 0) {
        $('#SpnLocation').show();
        return_val = false;
    } else {
        $('#SpnLocation').hide();
    }
    if ($('#ddlSubLocation option:selected').val() == 0) {
        $('#SpnSubLocation').show();
        return_val = false;
    } else {
        $('#SpnSubLocation').hide();
    }
    if ($('#ddlStatus option:selected').val() == 0) {
        $('#SpnStatus').show();
        return_val = false;
    } else {
        $('#SpnStatus').hide();
    }
    if ($('#txtSerialnumber').val().trim() == "" || $('#txtSerialnumber').val() == null) {
        $('#SpnSerialnumber').show();
        return_val = false;
    } else {
        $('#SpnSerialnumber').hide();
    }
    if ($('#ddlAssetUser option:selected').val() == 0) {
        $('#SpnAssetUser').show();
        return_val = false;
    } else {
        $('#SpnAssetUser').hide();
    }
    if ($('#txtRemovalDate').val().trim() == "" || $('#txtRemovalDate').val() == null) {
        $('#SpnRemovalDate').show();
        return_val = false;
    } else {
        $('#SpnRemovalDate').hide();
    }
    if ($('#txtAssetPrice').val().trim() == "" || $('#txtAssetPrice').val() == null) {
        $('#SpnAssetPrice').show();
        return_val = false;
    } else {
        $('#SpnAssetPrice').hide();
    }
    if ($('#txtCondition').val().trim() == "" || $('#txtCondition').val() == null) {
        $('#SpnCondition').show();
        return_val = false;
    } else {
        $('#SpnCondition').hide();
    }
    if ($('#txtInvoiceNo').val().trim() == "" || $('#txtInvoiceNo').val() == null) {
        $('#SpnInvoiceNo').show();
        return_val = false;
    } else {
        $('#SpnInvoiceNo').hide();
    }
    if ($('#txtInvoiceDate').val().trim() == "" || $('#txtInvoiceDate').val() == null) {
        $('#SpnInvoiceDate').show();
        return_val = false;
    } else {
        $('#SpnInvoiceDate').hide();
    }
    if ($('#txtWarrantyStartDate').val().trim() == "" || $('#txtWarrantyStartDate').val() == null) {
        $('#SpnWarrantyStartDate').show();
        return_val = false;
    } else {
        $('#SpnWarrantyStartDate').hide();
    }
    if ($('#txtWarrantyEndDate').val().trim() == "" || $('#txtWarrantyEndDate').val() == null) {
        $('#SpnWarrantyEndDate').show();
        return_val = false;
    } else {
        $('#SpnWarrantyEndDate').hide();
    }
    if ($('#txtAMCStartDate').val().trim() == "" || $('#txtAMCStartDate').val() == null) {
        $('#SpnAMCStartDate').show();
        return_val = false;
    } else {
        $('#SpnAMCStartDate').hide();
    }
    if ($('#txtAMCEndDate').val().trim() == "" || $('#txtAMCEndDate').val() == null) {
        $('#SpnAMCEndDate').show();
        return_val = false;
    } else {
        $('#SpnAMCEndDate').hide();
    }

    return return_val;
};
//Get Fixed  Category Lists
function GetCategoryList() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Masters/GetNonItAssetCategoryName',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".Category").html("").append('<option value="0">Select Category</option>');
            $(data).each(function () {
                $('.Category').append('<option value=' + this.non_it_ass_cat_id_pk + '>' + this.non_it_ass_cat_name + '</option>');
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
//Get All Business Unit Lists
function GetBusinessUnit() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Change/GetBusinessUnit',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlBusinessUnit').html("").append('<option value="0">Select Business Unit</option>');
            $('#ddlBusinessUnitGatePass').html("").append('<option value="0">Select Business Unit</option>');
            $(data).each(function () {
                $('#ddlBusinessUnit').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
                $('#ddlBusinessUnitGatePass').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
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
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetStatus',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlStatus').html("").append('<option value="0">Select Status</option>');
            $("#ddlStatusChange").html("").append('<option value="0">Select Status</option>');
            $("#ddlAssetStatusGatePass").html("").append('<option value="0">Select Status</option>');
            $(data).each(function () {
                $('#ddlStatus').append('<option value=' + this.status_id_pk + '>' + this.status + '</option>');
                $('#ddlStatusChange').append('<option value=' + this.status_id_pk + '>' + this.status + '</option>');
                $('#ddlAssetStatusGatePass').append('<option value=' + this.status_id_pk + '>' + this.status + '</option>');
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
//Get All Supplier (Vendor) Lists
function GetSupplierDetails() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Supplier/GetSupplierDetails',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlSupplier').html("").append('<option value="0">Select Vendor</option>');
            $('#ddlVendor').html("").append('<option value="0">Select Vendor</option>');
            $(data).each(function () {
                $('#ddlVendor').append('<option value=' + this.supplier_id_pk + '>' + this.supplier_name + '</option>');
                $('#ddlSupplier').append('<option value=' + this.supplier_id_pk + '>' + this.supplier_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};

function UpdateNonItAsset(non_it_ass_id) { 
    var parm = {
        "non_it_ass_id_pk": non_it_ass_id,
        "client_id_fk": $("#ddlBusinessUnit option:selected").val(),
        "client_name": $("#ddlBusinessUnit option:selected").text(),
        "non_it_ass_cat_id_pk": $("#ddlCategory option:selected").val(),
        "non_it_ass_cat_name": $("#ddlCategory option:selected").text(),
        "assets_tag": $("#txtAssetTag").val().trim(),
        "manufacturer": $("#txtManufacturer").val().trim(),
        "model": $("#txtModel").val().trim(),
        "asset_name": $("#txtAssetName").val().trim(),
        "supplier_id_fk": $("#ddlSupplier option:selected").val(),
        "supplier_name": $("#ddlSupplier option:selected").text(),
        "location_id_fk": $("#ddlLocation option:selected").val(),
        "location_name": $("#ddlLocation option:selected").text(),
        "stored_location_id_fk": $("#ddlSubLocation option:selected").val(),
        "stored_location_name": $("#ddlSubLocation option:selected").text(),
        "status_id_fk": $("#ddlStatus option:selected").val(),
        "status": $("#ddlStatus option:selected").text(),
        "serial_number": $("#txtSerialnumber").val().trim(),
        "asset_user_id_pk": $("#ddlAssetUser option:selected").val(),
        "asset_user_name": $("#ddlAssetUser option:selected").text(),
        "removal_date": $("#txtRemovalDate").val(),
        "purchase_price": $("#txtAssetPrice").val(),
        "condition": $("#txtCondition").val(),
        "invoice_no": $("#txtInvoiceNo").val(),
        "invoice_date": $("#txtInvoiceDate").val(),
        "warranty_start_date": $("#txtWarrantyStartDate").val(),
        "warranty_end_date": $("#txtWarrantyEndDate").val(),
        "amc_start_date": $("#txtAMCStartDate").val(),
        "amc_end_date": $("#txtAMCEndDate").val(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/UpdNonItAsset',
        success: function (data) {
            if (data.status_id == 0) {
                successnotify(data.status);
                GetNonItAssetsDetails($.session.get("non_it_ass_id_pk"));
            } else {
                warningnotify(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get Non It Asset Details For Edit
function GetNonItAssetDetailsList(non_it_ass_id) {
    var parm = {
        'non_it_ass_id_pk': non_it_ass_id // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetNonItAssetDetailsList',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#ddlBusinessUnit").val(data.client_id_fk).change();
            $("#ddlCategory").val(data.non_it_ass_cat_id_pk).change();
            $("#txtAssetTag").val(data.assets_tag);
            $("#txtManufacturer").val(data.manufacturer);
            $("#txtModel").val(data.model);
            $("#txtAssetName").val(data.asset_name);
            $("#ddlSupplier").val(data.supplier_id_fk).change();
            $("#ddlLocation").val(data.location_id_fk).change();
            $("#ddlSubLocation").val(data.stored_location_id_fk).change();
            $("#ddlStatus").val(data.status_id_fk).change();
            $("#txtSerialnumber").val(data.serial_number);
            $("#ddlAssetUser").val(data.asset_user_id_pk).change();
            $("#txtRemovalDate").val(data.removal_date);
            $("#txtAssetPrice").val(data.purchase_price);
            $("#txtCondition").val(data.condition);
            $("#txtInvoiceNo").val(data.invoice_no).change();
            $("#txtInvoictxtInvoiceDateeDate").val(data.invoice_date);
            $("#txtWarrantyStartDate").val(data.warranty_start_date).change();
            $("#txtWarrantyEndDate").val(data.warranty_end_date);
            $("#txtAMCStartDate").val(data.amc_start_date);
            $("#txtAMCEndDate").val(data.amc_end_date);
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function GetSentToRepairHistory(non_it_asset_id) {
    var parm = {
        'non_it_asset_id_pk': non_it_asset_id // $.session.get("asset_id_pk"); 
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetSentToRepairHistoryNonITAssets', 
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
//Get Iicket List By Asset Id 
function GetTicketListsByAssetId(asset_tag) {
    var parm = {
        'asset_tag': asset_tag
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetTicketListsByNonITAssetId',
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
//Get Task List By Asset Id
function GetTaskDetailsByAssetId(asset_tag) {
    var parm = {
        'asset_tag': asset_tag
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetTaskDetailsByNonITAssetId',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblTask')) {
                table = $('#tblTask').DataTable();
            } else {
                table = $('#tblTask').DataTable();
            }
            table.destroy();
            $("#tblTask").DataTable({
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
                    //{
                    //    data: 'task_id_pk',
                    //    sWidth: '2px',
                    //    sClass: "view",
                    //    bSortable: false,
                    //    render: function (task_id_pk) {
                    //        return '<input id="checkbox0" class="cb-element checkbox" name="' + task_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                    //    }
                    //},
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
                    },
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



