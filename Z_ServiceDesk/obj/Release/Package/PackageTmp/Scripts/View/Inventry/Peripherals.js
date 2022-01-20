$(document).ready(function () {
    GetLocation();
    GetPeripheralsCategory();
    GetStatus();
    Getclients();
    GetBusinessUnit();
    GetEmployees();
    GetSupplierDetails();
    GetPeripheralsList();
    GetGetPassAddress();
    GetEmployeesListsForGatePass();
    GetFloor();
    GetDepartmentLists();
    $("#ddlDepartmentName").change(function () {
        if ($(this).val() != 0) {
            GetSectionDepartmentWise($(this).val());
        } else {
            $("#ddlSection").html("").append('<option value="0">Select Section</option>');
        }
    });
    GetSubLocation();
    $("#btnSubmit").click(function () {
        if (validatePeripherals() == true) {
            Insperipherals()
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
        if ($.session.get("peripherals_id_pk") != '' || $.session.get("peripherals_id_pk") != null || $.session.get("peripherals_id_pk") == undefined) {
            $.session.remove("peripherals_id_pk");
            $.session.set("peripherals_id_pk", $(this).attr("name"));
          //  window.open('/Inventry/PeripheralsDetails');
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
            $("#btnPrevActi").removeAttr("disabled");

        } else if (!$(this).is(':checked')) {
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnAllocateDeAllocate").attr("disabled", "disabled");
            $("#btnSendToRepair").attr("disabled", "disabled");
            $("#btnPrintGatePass").attr("disabled", "disabled");
            $("#btnPrintQRCode").attr("disabled", "disabled");
            $("#btnPrevActi").attr("disabled", "disabled");
        }
        else {
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnAllocateDeAllocate").attr("disabled", "disabled");
            $("#btnSendToRepair").attr("disabled", "disabled");
            $("#btnPrintGatePass").attr("disabled", "disabled");
            $("#btnPrintQRCode").attr("disabled", "disabled");
            $("#btnPrevActi").attr("disabled", "disabled");
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
            $("#btnPrevActi").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnAllocateDeAllocate").attr("disabled", "disabled");
            $("#btnSendToRepair").attr("disabled", "disabled");
            $("#btnPrintGatePass").attr("disabled", "disabled");
            $("#btnPrintQRCode").attr("disabled", "disabled");
            $("#btnPrevActi").attr("disabled", "disabled");
        } else {
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnAllocateDeAllocate").attr("disabled", "disabled");
            $("#btnSendToRepair").attr("disabled", "disabled");
            $("#btnPrintGatePass").attr("disabled", "disabled");
            $("#btnPrintQRCode").attr("disabled", "disabled");
            $("#btnPrevActi").attr("disabled", "disabled");
        }
    });
    $("#btnPrevActi").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModalPreventiveActivity') }
        );
    });
    GetSupportDepartment();
    $("#ddlSupportGroup").change(function () {
        if ($(this).val() != 0) {
            GetEmployeeListSGD($(this).val());
        } else {
            $("#ddlUser").html("").append('<option value="0">Select Employee</option>');
        }
    });
    $("#ddlSupportDepartment").change(function () {
        if ($(this).val() != 0) {
            GetSupportGroup($(this).val());
        } else {
            $("#ddlSupportGroup").html("").append('<option value="0">Select Support Group</option>');
        }
    });
    $("#btnSubmitPrev").click(function () {
        InsPreventiveMaintenanceActivity();
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
            GetPeripheralsDetailsById($(this).attr('name'));
            alert($(this).attr('name'));
        });
        $('.select2').select2(
            { dropdownParent: $('#myModal') }
        );
        $("#myModalLabelNew").hide(); $("#myModalLabelEdit").show();
        $("#btnSubmit").hide();
        $("#btnUpdate").show();
    });
    $('#btnStatusUpdate').click(function () {
        var val = [];
        $('.peripherals:checked').each(function (i) {
            //alert($(this).attr('name'));
            val[i] = $(this).val();
            UpdatePeripheralsStatus($(this).attr('name'));
        });

    });
    $("#btnUpdate").click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            if (validatePeripherals() == true) {
                UpdPeripherals($(this).attr("name"));
            } else {
                return false;
            }
        });
    });
    $('#btnPrintGatePass').click(function () {
        var val = [];
        $('.peripherals:checked').each(function (i) {
            val[i] = $(this).val();
            alert($(this).attr('name'));
            GetAssetListForGatePass();
            GetPeripheralsDetailsGatePass($(this).attr('name'));
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
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            GetPeripheralsStatusListsConditionWise($(this).attr('name')); 
        });
    });
    $("#btnAssetAssign").click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            if (validateAssetsAssignToUser() == true) {
                PeripheralsAssignToUser($(this).attr("name")); 
            } else {
                return false;
            }
        });
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
    $("#ddlSupportType").change(function () {
        if ($(this).val() == 1) {
            $("#DivWarranty").show();
            $("#DivAMC").hide();
        } else if ($(this).val() == 2) {
            $("#DivWarranty").hide();
            $("#DivAMC").show();
        } else if ($(this).val() == 3) {
            $("#DivWarranty").hide();
            $("#DivAMC").hide();
        } else {
            $("#DivWarranty").hide();
            $("#DivAMC").hide();
        }
    });
});
function validateAssetsAssignToUser() {
    var return_val = true;
    if ($('#ddlAssetUser option:selected').val() == 0) {
        $('#SpnAssetUser').show();
        return_val = false;
    } else {
        $('#SpnAssetUser').hide();
    }
    return return_val;
};
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
function validatePeripherals() { 
    var return_val = true;
    if ($('#ddlBusinessUnit option:selected').val() == 0) {
        $('#SpnBusinessUnit').show();
        return_val = false;
    } else {
        $('#SpnBusinessUnit').hide();
    }
    if ($('#ddlSubLocations option:selected').val() == 0) {
        $('#SpnSubLocations').show();
        return_val = false;
    } else {
        $('#SpnSubLocations').hide();
    }
    if ($('#ddlSection option:selected').val() == 0) {
        $('#SpnSection').show();
        return_val = false;
    } else {
        $('#SpnSection').hide();
    }
    if ($('#ddlFloor option:selected').val() == 0) {
        $('#SpnFloor').show();
        return_val = false;
    } else {
        $('#SpnFloor').hide();
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
    //if ($('#ddlStatus option:selected').val() == 0) {
    //    $('#SpnStatus').show();
    //    return_val = false;
    //} else {
    //    $('#SpnStatus').hide();
    //}
    if ($('#txtSerialnumber').val().trim() == "" || $('#txtSerialnumber').val() == null) {
        $('#SpnSerialnumber').show();
        return_val = false;
    } else {
        $('#SpnSerialnumber').hide();
    }
    //if ($('#ddlAssetUser option:selected').val() == 0) {
    //    $('#SpnAssetUser').show();
    //    return_val = false;
    //} else {
    //    $('#SpnAssetUser').hide();
    //}
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
    //if ($('#txtWarrantyStartDate').val().trim() == "" || $('#txtWarrantyStartDate').val() == null) {
    //    $('#SpnWarrantyStartDate').show();
    //    return_val = false;
    //} else {
    //    $('#SpnWarrantyStartDate').hide();
    //}
    //if ($('#txtWarrantyEndDate').val().trim() == "" || $('#txtWarrantyEndDate').val() == null) {
    //    $('#SpnWarrantyEndDate').show();
    //    return_val = false;
    //} else {
    //    $('#SpnWarrantyEndDate').hide();
    //}
    //if ($('#txtAMCStartDate').val().trim() == "" || $('#txtAMCStartDate').val() == null) {
    //    $('#SpnAMCStartDate').show();
    //    return_val = false;
    //} else {
    //    $('#SpnAMCStartDate').hide();
    //}
    //if ($('#txtAMCEndDate').val().trim() == "" || $('#txtAMCEndDate').val() == null) {
    //    $('#SpnAMCEndDate').show();
    //    return_val = false;
    //} else {
    //    $('#SpnAMCEndDate').hide();
    //}

    return return_val;
};
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
//Get Common Category Lists
function GetPeripheralsCategory() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Masters/GetPeripheralsCategory',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#ddlCategory').html("").append('<option value="0">Select Asset Category</option>');
            $(data).each(function () {
                $('#ddlCategory').append('<option value=' + this.p_category_id_pk + '>' + this.category_name + '</option>');
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
//Get All Sub Location Lists
function GetSubLocation() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Masters/GetSubLocation',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlSubLocations').html("").append('<option value="0">Select Sub Location</option>');
            $(data).each(function () {
                $('#ddlSubLocations').append('<option value=' + this.sub_location_id_pk + '>' + this.sub_location + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Section Lists
function GetSectionDepartmentWise(department_id) {
    var parm = {
        "department_id_fk": department_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/GetSectionDepartmentWise',
        success: function (data) {
            $("#ddlSection").html("").append('<option value="0">Select Section</option>');
            $(data).each(function () {
                $("#ddlSection").append('<option value=' + this.section_id_pk + '>' + this.section_name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};  
function GetSection() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Masters/GetSection',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlSection').html("").append('<option value="0">Select Section</option>');
            $(data).each(function () {
                $('#ddlSection').append('<option value=' + this.section_id_pk + '>' + this.section_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Floor Lists 
function GetFloor() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Masters/GetFloor',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlFloor').html("").append('<option value="0">Select Floor</option>');
            $(data).each(function () {
                $('#ddlFloor').append('<option value=' + this.floor_id_pk + '>' + this.floor_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
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
            $("#ddlAssetStatusGatePass").html("").append('<option value="0">Select Status</option>');
            $(data).each(function () {
                $('#ddlStatus').append('<option value=' + this.status_id_pk + '>' + this.status + '</option>');
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
        url: 'http://playmediahouse.com/api/api/Staff/GetUserLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            //$('#ddlUser').html("").append('<option value="0">Select User</option>');
            $(".EMP").html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $('.EMP').append('<option value=' + this.user_id_pk + '>' + this.user_name + '</option>');
                // $('#ddlUser').append('<option value=' + this.user_id_pk + '>' + this.user_name + '</option>');
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
function Insperipherals() {
      var parm = {
         "client_id_fk": $("#ddlBusinessUnit option:selected").val(),
         "p_category_id_fk": $("#ddlCategory option:selected").val(),
         "assets_tag": $("#txtAssetTag").val().trim(),
          "manufacturer": $("#txtManufacturer").val().trim(),
         "model": $("#txtModel").val().trim(),
         "asset_name": $("#txtAssetName").val().trim(),
         "supplier_id_fk": $("#ddlSupplier option:selected").val(),
         "location_id_fk": $("#ddlLocation option:selected").val(),
         "stored_location_id_fk": $("#ddlSubLocation option:selected").val(),
         "sub_location_id_fk": $("#ddlSubLocations option:selected").val(),
         "department_id_fk": $("#ddlDepartmentName option:selected").val(),
         "section_id_fk": $("#ddlSection option:selected").val(),
         "floor_id_fk": $("#ddlFloor option:selected").val(),
         "building_room_no": $("#txtBuildingAndRoomNo").val().trim(),
         "status_id_fk": 1,
         "serial_number": $("#txtSerialnumber").val().trim(),
         "asset_user_id_pk": 0,
         "removal_date": $("#txtRemovalDate").val(),
         "purchase_price": $("#txtAssetPrice").val(),
         "invoice_no": $("#txtInvoiceNo").val(),
         "invoice_date": $("#txtInvoiceDate").val(),
         "warranty_start_date": $("#txtWarrantyStartDate").val(),
         "warranty_end_date": $("#txtWarrantyEndDate").val(),
         "amc_start_date": $("#txtAMCStartDate").val(),
         "amc_end_date": $("#txtAMCEndDate").val(),
         "support_type": $("#ddlSupportType option:selected").val(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Peripherals/Insperipherals',
        success: function (data) {
          //  alert("Inserted Successfully");
            if (data.status_id == 0) {
                GetPeripheralsList();
                successnotify(data.status);
                $("#ClrPeripherals").find("input").val("");
                $("#ClrPeripherals").find("select").val(0).change();
                $('#ModalPeripherals').click();
            } else {
                GetPeripheralsList();
                warningnotify(data.status);
                $("#ClrPeripherals").find("input").val("");
                $("#ClrPeripherals").find("select").val(0).change();
                $('#closedModel').click();
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get Peripherals Lists
function GetPeripheralsList() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Peripherals/GetPeripheralsList', 
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblPeripherals')) {
                table = $('#tblPeripherals').DataTable();
            } else {
                table = $('#tblPeripherals').DataTable();
            }
            table.destroy();
            $("#tblPeripherals").DataTable({
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
                        data: 'peripherals_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (peripherals_id_pk) {
                            return '<input id="checkbox0" class="cb-element checkbox peripherals" name="' + peripherals_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    {
                        data: 'peripherals_id_pk',
                        sWidth: '140px',
                        sClass: "view",
                        bSortable: false,
                        render: function (peripherals_id_pk) {
                            return '<a href="/Admin/Inventry/PeripheralsDetails" class="editview"  name="' + peripherals_id_pk + '">  <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp;' + peripherals_id_pk + '</a>';
                        }
                    },
                    { data: 'assets_tag' },
                     //{
                     //    data: 'assets_tag',
                     //    sWidth: '140px',
                     //    sClass: "view",
                     //    bSortable: false,
                     //    render: function (peripherals_id_pk) {
                     //        return '<a href="/Inventry/PeripheralsDetails" class="editview"  name="' + peripherals_id_pk + '"><i class="fa fa-flag fa-fw" data-toggle="tooltip" title="" style="color:#1a4ba9 !important" data-original-title="Normal priority"></i>  ' + peripherals_id_pk + '</a>';  
                     //    }
                     //},
                    { data: 'category_name' },
                    { data: 'email' },
                    { data: 'model' },
                    { data: 'serial_number' },
                    { data: 'location_name' },
                   // { data: 'descripency_status' }, 
                    {
                        data: "peripherals_id_pk",
                        render: function (peripherals_id_pk, type, row) {
                            // Check if blank
                            if (row.status === "In-Store") {
                                return '<span class="badge badge-primary ENABLED" name="' + peripherals_id_pk + '" style="background-color:#ea2d2d;">' + row.status + '</span>';
                            }
                            else if (row.status === "Allocated") {
                                return '<span class="badge badge-primary ENABLED" name="' + peripherals_id_pk + '"  style="background-color:#029800 !important;">' + row.status + '</span>';
                            }
                            else if (row.status === "In-Repair") {
                                return '<span class="badge badge-primary ENABLED" name="' + peripherals_id_pk + '" style="background-color:#b3ae1f;">' + row.status + '</span>';
                            }
                            else if (row.status === "In-Active") {
                                return '<span class="badge badge-primary ENABLED" name="' + peripherals_id_pk + '" style="background-color:#3bc0c3 !important;">' + row.status + '</span>';
                            }
                            else if (row.status === "Discard") {
                                return '<a  href="" class="badge badge-primary status" data-toggle="modal" style="background-color:#ea2d2d;" data-target="#myModalFeedBack" name="' + peripherals_id_pk + '">' + row.status + '<a>';
                            }
                            else if (row.status === "Theft") {
                                return '<a  href="" class="badge badge-primary status"  data-toggle="modal" data-target="#myModalFeedBack" style="background-color:#ea2d2d;" name="' + peripherals_id_pk + '">' + row.status + '<a>';
                            }
                            else if (row.status === "N/A") {
                                return '<a  href="" class="badge badge-primary status"  data-toggle="modal" data-target="#myModalFeedBack" style="background-color:#ea2d2d;" name="' + peripherals_id_pk + '">' + row.status + '<a>';
                            }
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
// Delete Peripherals By Id
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
// Get Peripherals Details For Edit 
function GetPeripheralsDetailsById(peripherals_id) { 
    var parm = {
        "peripherals_id_pk" : peripherals_id // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Peripherals/GetPeripheralsDetailsById',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#ddlBusinessUnit").val(data.client_id_fk).change();
            $("#ddlCategory").val(data.p_category_id_fk).change();
            $("#txtAssetTag").val(data.assets_tag);
            $("#txtManufacturer").val(data.manufacturer);
            $("#txtModel").val(data.model);
            $("#txtAssetName").val(data.asset_name);
            $("#ddlSupplier").val(data.supplier_id_fk).change();
            $("#ddlLocation").val(data.location_id_fk).change();
            $("#ddlSubLocation").val(data.stored_location_id_fk).change();
            $("#ddlSubLocations").val(data.sub_location_id_fk).change();
            $("#ddlDepartmentName").val(data.department_id_fk).change();
            $("#ddlSection").val(data.section_id_fk).change();
            $("#ddlFloor").val(data.floor_id_fk).change();
            $("#txtBuildingAndRoomNo").val(data.building_room_no);
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
function UpdatePeripheralsStatus(asset_id) {
    var parm = {
        "peripherals_id_pk": asset_id,
        "status_id_fk": $("#ddlStatusChange option:selected").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Peripherals/UpdatePeripheralsStatus', 
        success: function (data) {
            if (data.status_id != 0) {
                CreateSuccess(data.status);
                GetPeripheralsList();
                $('#closedModelStatus').click();
                //   GetTicketLists();
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
// Update Peripherals  
function UpdPeripherals(peripherals_id) {
    var parm = {
        "peripherals_id_pk": peripherals_id,
        "client_id_fk": $("#ddlBusinessUnit option:selected").val(),
        "p_category_id_fk": $("#ddlCategory option:selected").val(),
        "assets_tag": $("#txtAssetTag").val().trim(),
        "manufacturer": $("#txtManufacturer").val().trim(),
        "model": $("#txtModel").val().trim(),
        "asset_name": $("#txtAssetName").val().trim(),
        "supplier_id_fk": $("#ddlSupplier option:selected").val(),
        "location_id_fk": $("#ddlLocation option:selected").val(),
        "stored_location_id_fk": $("#ddlSubLocation option:selected").val(),
        "sub_location_id_fk": $("#ddlSubLocations option:selected").val(),
        "department_id_fk": $("#ddlDepartmentName option:selected").val(),
        "section_id_fk": $("#ddlSection option:selected").val(),
        "floor_id_fk": $("#ddlFloor option:selected").val(),
        "building_room_no": $("#txtBuildingAndRoomNo").val().trim(),
        "status_id_fk": $("#ddlStatus option:selected").val(),
        "serial_number": $("#txtSerialnumber").val().trim(),
        "asset_user_id_pk": $("#ddlAssetUser option:selected").val(),
        "removal_date": $("#txtRemovalDate").val().trim(),
        "purchase_price": $("#txtAssetPrice").val().trim(),
        "invoice_no": $("#txtInvoiceNo").val().trim(),
        "invoice_date": $("#txtInvoiceDate").val().trim(),
        "warranty_start_date": $("#txtWarrantyStartDate").val().trim(),
        "warranty_end_date": $("#txtWarrantyEndDate").val().trim(),
        "amc_start_date": $("#txtAMCStartDate").val().trim(),
        "amc_end_date": $("#txtAMCEndDate").val().trim(),


    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Peripherals/UpdPeripherals', 
        success: function (data) {
            if (data.status_id != 0) {
                successnotify(data.status);
                $("#ClrTask").find("input").val("");
                $("#ClrTask").find("textarea").val("");
                $("#ClrTask").find("select").val(0).change();
            } else {
                warningnotify(data.status);
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
function GetPeripheralsDetailsGatePass(peripherals_id) { 
    var parm = {
        'peripherals_id_pk': peripherals_id // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Peripherals/GetPeripheralsDetailsById',
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
function InsSendToRepair(peripherals_id) {
    var parm = {
        "peripherals_id_fk": peripherals_id,
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
        url: 'http://playmediahouse.com/api/api/Peripherals/InsSendToRepair', 
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
        url: 'http://playmediahouse.com/api/api/Peripherals/CheckExistPeripheralsTagNo', 
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
//Get Asset Status Condition Wise 
function GetPeripheralsStatusListsConditionWise(peripherals_id) { 
    var parm = {
        "peripherals_id_pk": peripherals_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Peripherals/GetPeripheralsStatusListsConditionWise',
        success: function (data) {
            $("#ddlStatusChange").html("").append('<option value="0">Select Status</option>');
            $(data).each(function () {
            $('#ddlStatusChange').append('<option value=' + this.status_id_pk + '>' + this.status + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Peripheral Assign To User  
function PeripheralsAssignToUser(peripherals_id) {  
    var parm = {
        "peripherals_id_pk": peripherals_id,
        "asset_user_id_pk": $("#ddlAssetUser option:selected").val(), 
        "status_id_fk": 2, 
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Peripherals/PeripheralsAssignToUser',
        success: function (data) {
            if (data.status_id == 1) {
                successnotify("Asset Assigned Sucessfully");
                GetPeripheralsList();
            } else {
                warningnotify(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//Get All Department Lists
function GetDepartmentLists() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Ticket/GetDepartmentLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlDepartmentNameFltr').html("").append('<option value="0">Select Department</option>');
            $('#ddlDepartmentName').html("").append('<option value="0">Select Department</option>');
            $(data).each(function () {
                $('#ddlDepartmentNameFltr').append('<option value=' + this.department_id_pk + '>' + this.department_name + '</option>');
                $('#ddlDepartmentName').append('<option value=' + this.department_id_pk + '>' + this.department_name + '</option>');
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
//Get Support Group  
function GetSupportGroup(support_dep_id) {
    var parm = {
        "support_dep_id_pk": support_dep_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Ticket/GetSupportDepartmentGroupList',
        success: function (data) {
            $("#ddlSupportGroup").html("").append('<option value="0">Select Sub Category</option>');
            $(data).each(function () {
                $("#ddlSupportGroup").append('<option value=' + this.support_group_id_pk + '>' + this.support_dep_group_name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//Get All Employee List from People by Support Department
function GetEmployeeListSGD(DataItem_id) {
    var parm = {
        "DataItem": DataItem_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Commonapi/GetEmployeeListSGD',
        success: function (data) {
            $("#ddlAssignTo").html("").append('<option value="0">Select Employee</option>');
            $(data).each(function () {
                $("#ddlAssignTo").append('<option value=' + this.Id + '>' + this.name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Insert Transactional Data 
function InsPreventiveMaintenanceActivity() {
    var trcount = $('#tbodyPeripherals tr').length;
    $("#tbodyPeripherals tr").each(function () {
        if ($(this).find('td:eq(0) input').is(":checked")) {
            var parm = {
                "peripherals_id_fk": $(this).find('td:eq(1)').text().trim(),
                "category_name": $(this).find('td:eq(3)').text().trim(),
                "assets_tag": $(this).find('td:eq(2)').text().trim(),
                "model_name": $(this).find('td:eq(5)').text().trim(),
                "serial_number": $(this).find('td:eq(6)').text().trim(),
                "location_name": $(this).find('td:eq(7)').text().trim(),
                "p_m_status_id_fk": 1,
                "assign_to": $("#ddlAssignTo option:selected").val(),
                "maintainance_date": $("#txtduedate option:selected").val(),
                "support_dep_id_fk": $("#ddlSupportDepartment option:selected").val(),
                "support_group_id_fk": $("#ddlSupportGroup option:selected").val()
            };
        }
        var josnstr = JSON.stringify(parm);
        $.ajax({
            type: "Post",
            url: 'http://playmediahouse.com/api/api/PreventiveMaintenance/InsPeripheralsPreventiveMaintenanceActivity',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: josnstr,
            success: function (data) {

                //trcount = trcount - 1;
                //if (trcount == 0) {
                //    //$(".modalsuccessinvoice").html('<i class="fa fa-check-circle fa-2x fa-fw"></i>' + ' Inserted Successfully');
                //    //$("#SuccessModalGenerateInvoice").modal('show');
                //}
            },
            error: function (result) {
                alert("Error : data");
            }
        });
    });

};