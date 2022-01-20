$(document).ready(function () {
    GetLocation();
    GetCategoryList();
    GetStatus();
    GetBusinessUnit();
    GetEmployees();
    GetSupplierDetails();
    GetNonItAssetList();
    GetGetPassAddress();
    GetEmployeesListsForGatePass();
    $("#btnSubmit").click(function () {
        if (validateNonItAsset() == true) { 
            InsNonItAsset()
        } else {
            return false;
        }
    });
    $("#ddlLocation").change(function () {
        if ($(this).val() != 0) {
            GetStoredLocation($(this).val());
        } else {
            $(".StoredLocation").html("").append('<option value="0">Select Stored Location</option>');
        }
    });
    $(document).on('click', '.editview', function () {
        // alert($(this).attr("name"));
        if ($.session.get("non_it_ass_id_pk") != '' || $.session.get("non_it_ass_id_pk") != null || $.session.get("non_it_ass_id_pk") == undefined) {
            $.session.remove("non_it_ass_id_pk");
            $.session.set("non_it_ass_id_pk", $(this).attr("name"));
        }
    });
    $(document).on('click', '.cb-element', function () {
        if ($(this).is(':checked')) {
            $("#btnEdit").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
            $("#btnAllocateDeAllocate").removeAttr("disabled");
            $("#btnSendToRepair").removeAttr("disabled");
            $("#btnPrintGatePass").removeAttr("disabled");
            $("#btnPrintQRCode").removeAttr("disabled");

        } else if (!$(this).is(':checked')) {
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnAllocateDeAllocate").attr("disabled", "disabled");
            $("#btnSendToRepair").attr("disabled", "disabled");
            $("#btnPrintGatePass").attr("disabled", "disabled");
            $("#btnPrintQRCode").attr("disabled", "disabled");
        }
        else {
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnAllocateDeAllocate").attr("disabled", "disabled");
            $("#btnSendToRepair").attr("disabled", "disabled");
            $("#btnPrintGatePass").attr("disabled", "disabled");
            $("#btnPrintQRCode").attr("disabled", "disabled");
        }

    });
    $("#CheckAll").click(function () {
        if ($(this).is(':checked')) {
            $("#btnEdit").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
            $("#btnAllocateDeAllocate").removeAttr("disabled");
            $("#btnSendToRepair").removeAttr("disabled");
            $("#btnPrintGatePass").removeAttr("disabled");
            $("#btnPrintQRCode").removeAttr("disabled");

        } else if (!$(this).is(':checked')) {
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnAllocateDeAllocate").attr("disabled", "disabled");
            $("#btnSendToRepair").attr("disabled", "disabled");
            $("#btnPrintGatePass").attr("disabled", "disabled");
            $("#btnPrintQRCode").attr("disabled", "disabled");
        }
        else {
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnAllocateDeAllocate").attr("disabled", "disabled");
            $("#btnSendToRepair").attr("disabled", "disabled");
            $("#btnPrintGatePass").attr("disabled", "disabled");
            $("#btnPrintQRCode").attr("disabled", "disabled");
        }
    });
    $('#BtnDelete').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            DeletePeripherals($(this).attr('name'));
        });
    });
    $("#btnEdit").click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            GetNonItAssetDetailsList($(this).attr('name'));
            alert($(this).attr('name'));
        });
        $('.select2').select2(
            { dropdownParent: $('#myModal') }
        );
        $("#myModalLabelNew").hide(); $("#myModalLabelEdit").show();
        $("#btnSubmit").hide();
        $("#btnUpdate").show();
        //  alert($(this).attr('name'));
        // GetAssetDetailsEdit($(this).attr('name'));
    });
    $('#btnStatusUpdate').click(function () {
        var val = [];
        $('.nonitassets:checked').each(function (i) {
            //alert($(this).attr('name'));
            val[i] = $(this).val();
            UpdateNonITAssetStatus($(this).attr('name'));
        });

    });
    $('#btnPrintGatePass').click(function () {
        var val = [];
        $('.nonitassets:checked').each(function (i) { 
            val[i] = $(this).val();
            alert($(this).attr('name'));
            GetAssetListForGatePass();
            GetNonItAssetDetailsLists($(this).attr('name')); 
        });

    });
    $('#ddlAssetStatusChange').change(function () {
        if ($(this).val() == 2) {
            GetStatus();
            $("#ddlAssetStatusGatePass").removeAttr("disabled");
        } else {
            $('#ddlAssetStatusGatePass').html("").append('<option value="0">Select Status</option>');
            $("#ddlAssetStatusGatePass").attr("disabled", "disabled");
        }
    });
    $('#ddlApprovalRequired').change(function () {
        if ($(this).val() == 2) {
            $(".LstOrNotLst").show();
        } else {
            $(".LstOrNotLst").hide();
        }
    });
    $("#btnSubmitGatePass").click(function () {
        if (validateGatePass() == true) {
            var appid = [];
            $.each($("#ddlOtherApprover option:selected"), function () {
                appid.push($(this).text());
            });
            InsGatePass(appid.join(", "));
        } else {
            return false;
        }
    });
    $("#ddlGatePassType").change(function () {
        if ($(this).val() == 1) {
            alert($(this).val());
            $("#txtExpectedDateofReturn").removeAttr("disabled");
        } else {
            alert($(this).val());
            $("#txtExpectedDateofReturn").attr("disabled", "disabled");
        }
    });
    $("#ddlVendor").change(function () {
        if ($(this).val() != 0) {
            GetSupplierDetailsLists($(this).val());
        } else {
            $("#ddlVendorContactPerson").html("").append('<option value="0">Select Vendor</option>');
        }
    });
    $("#btnSubmitSendToRepair").click(function () {
        alert("Test");
        if (validateSendToRepair() == true) {
            alert("First");
            var val = [];
            $(':checkbox:checked').each(function (i) {
                alert($(this).val());
                val[i] = $(this).val();
                alert($(this).attr('name'));
                InsSendToRepair($(this).attr('name'));
            });

        } else {
            return false;
        }
    });
    $("#btnNew").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModal') }
        );
    });
    $("#btnChangeStatus").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModalChangeStatus') }
        );
    });
    $("#btnSendToRepair").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myLargeModalLabel') }
        );
    });
    $("#btnPrintGatePass").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModalGatePass') }
        );
    });
});
function validateSendToRepair() {
    var return_val = true;
    if ($('#ddlVendor option:selected').val() == 0) {
        $('#SpnVendor').show();
        return_val = false;
    } else {
        $('#SpnVendor').hide();
    }
    if ($('#ddlVendorContactPerson option:selected').val() == 0) {
        $('#SpnVendorContactPerson').show();
        return_val = false;
    } else {
        $('#SpnVendorContactPerson').hide();
    }
    if ($('#ddlVendorContactNo option:selected').val() == 0) {
        $('#SpnVendorContactNo').show();
        return_val = false;
    } else {
        $('#SpnVendorContactNo').hide();
    }
    if ($('#ddlEmailID option:selected').val() == 0) {
        $('#SpnEmailID').show();
        return_val = false;
    } else {
        $('#SpnEmailID').hide();
    }
    if ($('#ddlVendorAddress option:selected').val() == 0) {
        $('#SpnVendorAddress').show();
        return_val = false;
    } else {
        $('#SpnVendorAddress').hide();
    }
    if ($('#txtExpectedReturnDate').val().trim() == "" || $('#txtExpectedReturnDate').val() == null) {
        $('#SpnExpectedReturnDate').show();
        return_val = false;
    } else {
        $('#SpnExpectedReturnDate').hide();
    }
    if ($('#ddlApprover option:selected').val() == 0) {
        $('#SpnApprover').show();
        return_val = false;
    } else {
        $('#SpnApprover').hide();
    }
    if ($('#ddlAssetAggreement option:selected').val() == 0) {
        $('#SpnAssetAggreement').show();
        return_val = false;
    } else {
        $('#SpnAssetAggreement').hide();
    }
    if ($('#txtExpectedExpense').val().trim() == "" || $('#txtExpectedExpense').val() == null) {
        $('#SpnExpectedExpense').show();
        return_val = false;
    } else {
        $('#SpnExpectedExpense').hide();
    }
    if ($('#txtAdditionalRemarks').val().trim() == "" || $('#txtAdditionalRemarks').val() == null) {
        $('#SpnAdditionalRemarks').show();
        return_val = false;
    } else {
        $('#SpnAdditionalRemarks').hide();
    }
    if ($('#txtFaultDescription').val().trim() == "" || $('#txtFaultDescription').val() == null) {
        $('#SpnFaultDescription').show();
        return_val = false;
    } else {
        $('#SpnFaultDescription').hide();
    }
    return return_val;
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

function InsNonItAsset() {
    var parm = {
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
        url: 'http://playmediahouse.com/api/api/FixedAssets/InsNonItAsset', 
        success: function (data) {
            if (data.status_id == 0) {
                successnotify(data.status);
                GetNonItAssetList();
            } else {
                warningnotify(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get Peripherals Lists
function GetNonItAssetList() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetNonItAssetList',  
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblNonItAsset')) {
                table = $('#tblNonItAsset').DataTable();
            } else {
                table = $('#tblNonItAsset').DataTable();
            }
            table.destroy();
            $("#tblNonItAsset").DataTable({
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
                        data: 'non_it_ass_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (non_it_ass_id_pk) { 
                            return '<input id="checkbox0" class="cb-element checkbox nonitassets" name="' + non_it_ass_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    {
                        data: 'non_it_ass_id_pk',
                        sWidth: '40px',
                        sClass: "view",
                        bSortable: false,
                        render: function (non_it_ass_id_pk) {
                            return '<a href="/Admin/Inventry/NonITAssetsDetails" class="editview"  name="' + non_it_ass_id_pk + '">  ' + non_it_ass_id_pk + '</a>';
                        }
                    },
                    {
                        data: 'assets_tag',
                        sWidth: '200px'
                    },
                    { data: 'non_it_ass_cat_name' },
                    { data: 'asset_name' },
                    { data: 'model' },
                    { data: 'serial_number' },
                    { data: 'location_name' },
                    { data: 'status' },
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
function DeletePeripherals(peripherals_id) {
    var parm = {
        "peripherals_id_pk": peripherals_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Peripherals/DeletePeripheralsByID',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetPeripheralsList();

            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
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
            //$("#txtCondition").val(data.condition);
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
// Update  Status  
function UpdateNonITAssetStatus(asset_id) {
    var parm = {
        "non_it_ass_id_pk": asset_id,
        "status_id_fk": $("#ddlStatusChange option:selected").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/UpdateNonITAssetStatus',
        success: function (data) {
            //alert(data.ticket_id_pk);
            //alert(data.ticket_status_id_pk);
            //if (data.ticket_status_id_pk == 5) {
            //    alert(data.ticket_status_id_pk);
            //    //SendEmailChangeTicketStatusResolved(data.ticket_id_pk);
            //} else {
            //    //SendEmailChangeTicketStatus(data.ticket_id_pk);
            //}
            if (data.status_id != 0) {
                CreateSuccess(data.status);
                $('#closedModelStatus').click();
                    GetNonItAssetList();
                $(".cb-element").prop("checked", false);
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
//Get Task Type Lists
function GetGetPassAddress() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetGetPassAddress',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#ddlFromAddress').html("").append('<option value="0">Select Form Address</option>');
            $(data).each(function () {
                $('#ddlFromAddress').append('<option value=' + this.get_pass_add_id_pk + '>' + this.address + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Get Peripherals Details For Edit
function GetNonItAssetDetailsLists(non_it_ass_id) { 
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
            alert(data.client_id_fk);
            alert(data.asset_tag);
            $("#ddlBusinessUnitGatePass").val(data.client_id_fk).change();
            $("#ddlAssetsGatePass").val(data.assets_tag);

        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
////Get Assets Lists 
function GetAssetListForGatePass() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetListForGatePass',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlAssetsGatePass').html("").append('<option value="0">Select Assets Name</option>');
            $(data).each(function () {
                $('#ddlAssetsGatePass').append('<option value=' + this.asset_id_pk + '>' + this.asset_tag + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//get All Employee List from People
function GetEmployeesListsForGatePass() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Staff/GetAllApproverLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".ddlTechnician").html("").append('<option value="0">Select Technician</option>');
            $(data).each(function () {
                $('.ddlTechnician').append('<option value=' + this.id + '>' + this.name + '</option>');
                $('.ddlUserList').append('<option value=' + this.id + '>' + this.name + '</option>');
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
// Insert GatePass 
function InsGatePass(appid) {
    var parm = {
        "moment_type": $("#ddlMovementType option:selected").text(),
        "gate_pass_type": $("#ddlGatePassType option:selected").text(),
        "expected_date": $("#txtExpectedDateofReturn").val().trim(),
        "business_unit_id_fk": $("#ddlBusinessUnitGatePass option:selected").val().trim(),
        "get_pass_add_id_fk": $("#ddlFromAddress option:selected").val().trim(),
        "asset_id_fk": $("#ddlAssetsGatePass").val().trim(), // $("#ddlAssets option:selected").text(),
        "change_asset_status": $("#ddlAssetStatusChange option:selected").val().trim(),
        "asset_status_id_fk": $("#ddlAssetStatusGatePass option:selected").val().trim(),
        "reason_for_gate_pass": $("#txtReasonForGatePass").val().trim(),
        "gate_pass_validity": $("#txtGatePassValidity").val().trim(),
        "is_approval_req": $("#ddlApprovalRequired option:selected").val().trim(),
        "approver_id": appid,// $("#ddlOtherApprover option:selected").text()
        "to_address": $("#txtToAddress").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/InsGatePass',
        success: function (data) {
            if (data.status_id != 0) {
                GetUserForSendEmail(data.gate_pass_id_pk)
                successnotify(data.status);
                // GetGatePassLists();
            } else {
                warningnotify(data.status);

            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get User Details
function GetUserForSendEmail(gate_pass_id) {
    var parm = {
        'gate_pass_id_pk': gate_pass_id // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetApproverToendEmailForGatePass',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {

            $(data).each(function () {
                SendEmailChangeGatePassStatus(this.DataItem, this.gate_pass_id_pk, this.moment_type, this.gate_pass_type, this.DataItem)   // this.DataItem 

            });
            //  SendEmailTicketCreate(data.email, 'INC00' + '' + ticket_id, data.user_name, 'Ticket Status :  New ')


        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// insert Send To Repair  
function InsSendToRepair(non_it_asset_id) {
    var parm = {
        "non_it_asset_id_pk": non_it_asset_id,
        "supplier_id_fk": $("#ddlVendor option:selected").val(),
        "con_per_name": $("#ddlVendorContactPerson option:selected").text(),
        "contact_no": $("#ddlVendorContactNo option:selected").text(),
        "email": $("#ddlEmailID option:selected").text(),
        "address": $("#ddlVendorAddress option:selected").text(),
        "exp_ret_date": $("#txtExpectedReturnDate").val().trim(),
        "approver_id_fk": $("#ddlApprover option:selected").val(),
        "file": $("#FileAttachment").val().trim(),
        "ass_agg_type": $("#ddlAssetAggreement option:selected").text(),
        "expected_agreement": $("#txtExpectedExpense").val().trim(),
        "attach_budgetary_quote": $("#FileAttachbudgetaryquote").val().trim(),
        "additional_remark": $("#txtAdditionalRemarks").val().trim(),
        "fault_description": $("#txtFaultDescription").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/InsSendToRepairNonITAssets',
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
// Get Supplier Details 
function GetSupplierDetailsLists(supplier_id) {
    var parm = {
        "supplier_id_pk": supplier_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetSupplierDetailsLists',
        success: function (data) {
            $('#ddlVendorContactPerson').html("").append('<option value="0">Select Stored Location</option>');
            $('#ddlVendorContactNo').html("").append('<option value="0">Select Vendor Contact No</option>');
            $('#ddlEmailID').html("").append('<option value="0">Select Email Id</option>');
            $('#ddlVendorAddress').html("").append('<option value="0">Select Vendor Address</option>');
            $(data).each(function () {
                $('#ddlVendorContactPerson').append('<option value=' + this.supplier_id_pk + '>' + this.contact_person + '</option>');
                $('#ddlVendorContactNo').append('<option value=' + this.supplier_id_pk + '>' + this.phone_number + '</option>');
                $('#ddlEmailID').append('<option value=' + this.supplier_id_pk + '>' + this.email + '</option>');
                $('#ddlVendorAddress').append('<option value=' + this.supplier_id_pk + '>' + this.address + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Check exist Asset Tag No
function CheckExistAssetTag(parameter) {
    var parm = { "assets_tag": parameter };
    var josnstr = JSON.stringify(parm);
    return $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/CheckExistNonITAssetTagNo',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: josnstr,
        success: function (data) {
            $(data).each(function () {
                if (this.assets_tag == parameter) {
                    $('#SpnAssetTag').text('Asset Tag Number already Exist.').show();
                    return false;
                } else {
                    $('#SpnAssetTag').text('').hide();
                    return true;
                }
            });
        },
        error: function () {
            alert("error while feching record.");
        }
    });
};
//calling Asset Tag method from common.js
function fnTagValidation(obj) {
    if ($('#txtAssetTag').val().trim() == '' || $('#txtAssetTag').val().trim() == null) {
        $('#SpnAssetTag').text('* Required').show();
        return false;
    } else {
        $('#SpnAssetTag').text('').hide();
        CheckExistAssetTag(obj.value);
    }

};