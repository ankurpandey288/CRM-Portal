$(document).ready(function () {

    //Auto Search Search Director
    $("#txtSearchAsset").keyup(function () {
        var search = $(this).val();
        if (search != "") {
            var parm = {
                'parameter': search
            };
            var josnstr = JSON.stringify(parm);
            $.ajax({
                type: "Post",
                data: josnstr,
                url: 'http://playmediahouse.com/api/api/FixedAssets/GetAllAssetListFilter', 
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    var len = response.length;
                    $("#tbodySearchAsset").empty();
                   
                    for (var i = 0; i < len; i++) {
                       // <input id="checkbox0" class="cb-element checkbox tktcbk" name="' + data[v].asset_id_pk + '" type="checkbox">
                        $("#tbodySearchAsset").append("<tr><td><input id='checkbox0' class='cb-element checkbox tktcbk' name='" + response[i]["asset_id_pk"] + "' type='checkbox' ></td><td><a class='editview' name='" + response[i]["asset_id_pk"] + "' href='/Admin/Inventry/FixedAssetsDetails'  " + response[i]["asset_id_pk"] + "' title='Click here to view more details'><i class='fa fa-eye' aria-hidden='true'></i>" + response[i]['asset_id_pk'] +"</a></td><td>" + response[i]['asset_tag'] + "</td><td>" + response[i]['asset_cat_name'] + "</td><td>" + response[i]['email'] + "</td><td>" + response[i]['model_name'] + "</td><td>" + response[i]['serial_number'] + "</td><td>" + response[i]['location_name'] + "</td><td>" + response[i]['status'] + "</td></tr>");
                    }
                }
            });
        } else {
            $("#tbodySearchAsset").empty();
            GetAssetList();
        }
    });
//});


    $(".js-example-basic-single").select2();
    //GetSupplierDetails();
    Getclients();
    GetBusinessUnit();
    GetCommonCategory();
    GetSupplierDetails();
    GetLocation();
    GetStatus();
    GetEmployees();
    GetAssetList();
    GetEmployeesListsForGatePass();
    GetGetPassAddress();
    GetAllSubCategory();
    GetManufacturer();
    GetSubLocation();
    GetCondition();
    GetComponent(); 
    GetFloor();
    GetDepartmentLists();
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
    $("#ddlDepartmentName").change(function () {
        if ($(this).val() != 0) {
            GetSectionDepartmentWise($(this).val());
        } else {
            $("#ddlSection").html("").append('<option value="0">Select Section</option>');
        }
    });
    $('#ddlStatusChange').change(function () {
        if ($(this).val() == 5) {
            $("#DivCommentBox").show();
        } else if ($(this).val() == 6) {
            $("#DivCommentBox").show();
        } else {
            $("#DivCommentBox").hide();
        }
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
    $("#ddlGatePassType").change(function () {
        if ($(this).val() == 1) {
            alert($(this).val());
            $("#txtExpectedDateofReturn").removeAttr("disabled");
        } else {
            alert($(this).val());
            $("#txtExpectedDateofReturn").attr("disabled", "disabled");
        }
    });
    $('#btnStatusUpdate').click(function () {
        var val = [];
        $('.tktcbk:checked').each(function (i) {
            //alert($(this).attr('name'));
            val[i] = $(this).val();
            UpdateAssetStatus($(this).attr('name')); 
        });

    });
    $('#btnPrintGatePass').click(function () {
        var val = [];
        $('.tktcbk:checked').each(function (i) {
           // alert($(this).attr('name'));
            val[i] = $(this).val();
            alert($(this).attr('name'));
            GetAssetListForGatePass();
            GetAssetDetailsGatePass($(this).attr('name'));
        });
        $('.select2').select2(
            { dropdownParent: $('#myModalGatePass') }
        );
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
    $("#btnSubmit").click(function () {
        if (validateAssets() == true) {
            InsAsset();
        } else {
            return false;
        }
    });
    $("#btnSubmitSendToRepair").click(function () {
        if (validateSendToRepair() == true) {
            var val = [];
            $(':checkbox:checked').each(function (i) {
                alert($(this).val());
                val[i] = $(this).val();
                alert($(this).attr('name'));
                InsSendToRepair($(this).attr('name'));
                UpdateAssetStatusForSendToRepair($(this).attr('name'));
            });
            
        } else {
            return false;
        }
    });
    $(document).on('click', '.btnedit', function () {
        GetPreventiveMaintainanceActivityViewCheckList($(this).attr('name'));
    });
    $(document).on('click', '.btneditstatus', function () {
        GetPreventiveMaintainanceActivityChangeStatus($(this).attr('name'));
    });
    $("#ddlLocation").change(function () {
        if ($(this).val() != 0) {
            GetStoredLocation($(this).val());
        } else {
            $("#ddlVendorContactPerson").html("").append('<option value="0">Select Stored Location</option>');
        }
    });
    $("#ddlVendor").change(function () {
        GetLocation();
        if ($(this).val() != 0) {
            GetSupplierDetailsLists($(this).val()); 
        } else {
            $("#ddlVendorContactPerson").html("").append('<option value="0">Select Vendor</option>'); 
        }
    });
    $(document).on('click', '.editview', function () {
        // alert($(this).attr("name"));
        if ($.session.get("asset_id_pk") != '' || $.session.get("asset_id_pk") != null || $.session.get("asset_id_pk") == undefined) {
            $.session.remove("asset_id_pk");
            $.session.set("asset_id_pk", $(this).attr("name"));
          //  window.open('/Inventry/FixedAssetsDetails');
        }

    });
    $(document).on('click', '.cb-element', function () {
        if ($(this).is(':checked')) {
            $("#btnEdit").show();
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
            $("#btnEdit").show();
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
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#BtnDelete').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            DeleteAsset($(this).attr('name'));
        });
    });
    $("#btnEdit").click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            GetAssetDetailsEdit($(this).attr('name'));
           // alert($(this).attr('name'));
        });
        $("#myModalLabelNew").hide(); $("#myModalLabelEdit").show();
        $("#btnSubmit").hide();
        $("#btnUpdate").show();
      //  alert($(this).attr('name'));

    });
    $("#btnUpdate").click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            if (validateAssets() == true) {
                AssetUpdate($(this).attr("name")); 
            } else {
                return false;
            }
        });
    });
    $("#btnAssetAssign").click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            if (validateAssetsAssignToUser() == true) { 
                AssetAssignToUser($(this).attr("name"));
            } else {
                return false;
            }
        });
    });
    $("#btnNew").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModal') }
        );
    });
    $("#btnPrevActi").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModalPreventiveActivity') }
        );
    });
    $("#btnSubmitPrev").click(function () {
        $("#tbodySearchAsset tr").each(function () {
            if ($(this).find('td:eq(0) input').is(":checked")) {
                InsPreventiveMaintenanceActivity(0,$(this).find('td:eq(1)').text().trim(), $(this).find('td:eq(3)').text().trim(), $(this).find('td:eq(2)').text().trim(), $(this).find('td:eq(5)').text().trim(), $(this).find('td:eq(6)').text().trim(), $(this).find('td:eq(7)').text().trim())
            }
        });
    });
    $("#btnEdit").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModal') }
        );
    });
    $("#btnChangeStatus").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModalChangeStatus') });
         var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            GetAssetStatusListsConditionWise($(this).attr('name'));
        });
    });
    $("#btnSendToRepair").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myLargeModalLabel') }
        );
    });
    $(document).on('click', '.status', function () {
        alert($(this).attr('name')); 
        GetAssetStatusComments($(this).attr('name')); 
    });
    $("#btnFilter").click(function () {
        GetAssetList();
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
    /// Auto Search
    //$("#txtAssetMapping").autocomplete({
    //    source: function (request, response) {
    //        $.ajax({
    //            url: 'http://playmediahouse.com/api/api/AutoDiscovered/AutoSearchAssetMappig',
    //            type: "POST",
    //            dataType: "json",
    //            data: { HostName: request.term },
    //            success: function (data) {
    //                response($.map(data, function (item) {
    //                    return { id: item.autoid, label: item.autoText, value: item.autoname };
    //                }));
    //            }
    //        })
    //    },
    //    select: function (event, ui) {
    //        // getClientById(ui.item.id)
    //        //alert("You selected: " + ui.item.value);
    //    },
    //    messages: {
    //        noResults: "", results: ""
    //    }
    //});
});
function validateAssets() {
    var return_val = true;
    //if ($('#ddlBusinessUnit option:selected').val() == 0) {
    //    $('#SpnBusinessUnit').show();
    //    return_val = false;
    //} else {
    //    $('#SpnBusinessUnit').hide();
    //}
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
    if ($('#txtBuildingAndRoomNo').val().trim() == "" || $('#txtBuildingAndRoomNo').val() == null) {
        $('#SpnBuildingAndRoomNo').show();
        return_val = false;
    } else {
        $('#SpnBuildingAndRoomNo').hide();
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
    if ($('#ddlDepartmentName option:selected').val() == 0) {
        $('#SpnDepartmentName').show();
        return_val = false;
    } else {
        $('#SpnDepartmentName').hide();
    }
    if ($('#ddlSection option:selected').val() == 0) {
        $('#SpnSection').show();
        return_val = false;
    } else {
        $('#SpnSection').hide();
    }
    if ($('#ddlSubLocations option:selected').val() == 0) {
        $('#SpnSubLocations').show();
        return_val = false;
    } else {
        $('#SpnSubLocations').hide();
    }
    if ($('#ddlFloor option:selected').val() == 0) {
        $('#SpnFloor').show();
        return_val = false;
    } else {
        $('#SpnFloor').hide();
    }
    if ($('#txtBuildingAndRoomNo').val().trim() == "" || $('#txtBuildingAndRoomNo').val() == null) {
        $('#SpnBuildingAndRoomNo').show();
        return_val = false;
    } else {
        $('#SpnBuildingAndRoomNo').hide();
    }
    if ($('#txtSerialnumber').val().trim() == "" || $('#txtSerialnumber').val() == null) {
        $('#SpnSerialnumber').show();
        return_val = false;
    } else {
        $('#SpnSerialnumber').hide();
    }
     if ($('#txtInvoiceNo').val().trim() == "" || $('#txtInvoiceNo').val() == null) {
        $('#SpnInvoiceNo').show();
        return_val = false;
    } else {
        $('#SpnInvoiceNo').hide();
    }
    if ($('#ddlSupportType option:selected').val() == 0) {
        $('#SpnSupportType').show();
        return_val = false;
    } else {
        $('#SpnSupportType').hide();
    }
    //if ($('#txtInvoiceDate').val().trim() == "" || $('#txtInvoiceDate').val() == null) {
    //    $('#SpnInvoiceDate').show();
    //    return_val = false;
    //} else {
    //    $('#SpnInvoiceDate').hide();
    //}
    if ($('#ddlCondition option:selected').val() == 0) {
        $('#SpnCondition').show();
        return_val = false;
    } else {
        $('#SpnCondition').hide();
    }
    //if ($('#txtRemovalDate').val().trim() == "" || $('#txtRemovalDate').val() == null) {
    //    $('#SpnRemovalDate').show();
    //    return_val = false;
    //} else {
    //    $('#SpnRemovalDate').hide();
    //}
    //if ($('#txtAssetPrice').val().trim() == "" || $('#txtAssetPrice').val() == null) {
    //    $('#SpnAssetPrice').show();
    //    return_val = false;
    //} else {
    //    $('#SpnAssetPrice').hide();
    //}
    //if ($('#txtCondition').val().trim() == "" || $('#txtCondition').val() == null) {
    //    $('#SpnCondition').show();
    //    return_val = false;
    //} else {
    //    $('#SpnCondition').hide();
    //}
   
   
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
            $('#ddlClientFltr').html("").append('<option value="0">Select Business Unit</option>');
            $(data).each(function () {
                $('#ddlBusinessUnit').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
                $('#ddlBusinessUnitGatePass').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
                $('#ddlClientFltr').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
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
            $('#ddlAssetCategoryFltr').html("").append('<option value="0">Select </option>');
            $('#ddlCategory').html("").append('<option value="0">Select Asset Category</option>');
            $(data).each(function () {
                $('#ddlCategory').append('<option value=' + this.asset_category_id_pk + '>' + this.asset_cat_name + '</option>');
                $('#ddlAssetCategoryFltr').append('<option value=' + this.asset_category_id_pk + '>' + this.asset_cat_name + '</option>');
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
            $('#ddlLocationFltr').html("").append('<option value="0">Select Location</option>');
            $(data).each(function () {
                //if (this.is_default == 1) {
                //    alert(this.location_id_pk);
                //   $('#ddlLocation').html("").append('<option value=' + this.location_id_pk + '>' + this.location_name + '</option>');
                //} 
                $('#ddlLocation').append('<option value=' + this.location_id_pk + '>' + this.location_name + '</option>');
                $('#ddlLocationFltr').append('<option value=' + this.location_id_pk + '>' + this.location_name + '</option>');
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
            $('#ddlSubLocation').html("").append('<option value="0">Select Store Location</option>');
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
            //$("#ddlStatusChange").html("").append('<option value="0">Select Status</option>');
            $("#ddlAssetStatusGatePass").html("").append('<option value="0">Select Status</option>');
            $('#ddlStatusFltr').html("").append('<option value="0">Select Status</option>');
            $(data).each(function () {
               
                $('#ddlAssetStatusGatePass').append('<option value=' + this.status_id_pk + '>' + this.status + '</option>');
                $('#ddlStatusFltr').append('<option value=' + this.status_id_pk + '>' + this.status + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Manufacturer Lists
function GetManufacturer() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetList', 
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlManuFacturerName').html("").append('<option value="0">Select Location</option>');
            $(data).each(function () {
                $('#ddlManuFacturerName').append('<option value=' + this.asset_id_pk + '>' + this.manufacturer_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//get All User List from User Table
//Get All User Lists
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
//function GetEmployees() {
//    $.ajax({
//        type: "Get",
//        url: 'http://playmediahouse.com/api/api/Consumable/GetEmployees',
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (data) {
//            $(".EMP").html("").append('<option value="0">Select </option>');
//            $(data).each(function () { 
//                $('.EMP').append('<option value=' + this.id + '>' + this.name + '</option>');
//            });
//            //$('#ddlRegisteredOfficeinState').val(10).change();
//        },
//        error: function (edata) {
//            //$(edata).each(function () {
//            //    InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
//            //});
//            alert("error while feching record.");
//        }
//    });
//};
// insert Asset 
function InsAsset() {
    var parm = {
        "client_id_fk": $("#ddlBusinessUnit option:selected").val(),
        "client_name": $("#ddlBusinessUnit option:selected").text(),
        "asset_category_id_fk": $("#ddlCategory option:selected").val(),
        "asset_cat_name": $("#ddlCategory option:selected").text(), 
        "asset_tag": $("#txtAssetTag").val().trim(),
        "manufacturer_name": $("#txtManufacturer").val().trim(),
        "model_name": $("#txtModel").val().trim(),
        "asset_name": $("#txtAssetName").val().trim(),
        "supplier_id_pk": $("#ddlSupplier option:selected").val(),
        "supplier_name": $("#ddlSupplier option:selected").text(),
        "location_id_pk": $("#ddlLocation option:selected").val(),
        "location_name": $("#ddlLocation option:selected").text(),
        "stored_location_id_pk": $("#ddlSubLocation option:selected").val(),
        "stored_location_name": $("#ddlSubLocation option:selected").text(),
        "sub_location_id_fk": $("#ddlSubLocations option:selected").val(),
        "department_id_fk": $("#ddlDepartmentName option:selected").val(),
        "section_id_fk": $("#ddlSection option:selected").val(),
        "floor_id_fk": $("#ddlFloor option:selected").val(),
        "building_room_no": $("#txtBuildingAndRoomNo").val().trim(),
        "status_id_pk": 1,
        "status": $("#ddlStatus option:selected").text(),
        "serial_number": $("#txtSerialnumber").val().trim(),
        "asset_user_id": 0,
        "asset_user_name": null,
        "removal_date": $("#txtRemovalDate").val().trim(),
        "purchase_price": $("#txtAssetPrice").val().trim(),
        "condition_id_fk": $("#ddlCondition option:selected").val(),
        "invoice_no": $("#txtInvoiceNo").val().trim(), 
        "invoice_date": $("#txtInvoiceDate").val().trim(),
        "warranty_start_date": $("#txtWarrantyStartDate").val().trim(),
        "warranty_end_date": $("#txtWarrantyEndDate").val().trim(),
        "amc_start_date": $("#txtAMCStartDate").val().trim(),
        "amc_end_date": $("#txtAMCEndDate").val().trim(),
        "support_type": $("#ddlSupportType option:selected").val(),
        "user_name": $("#txtUserName").val(),
        "user_con_no": $("#txtUserContactNumber").val()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/InsAsset',
        success: function (data) {
            //  alert("Inserted Successfully");           
            if (data.status_id == 1) {
                successnotify(data.status);
                GetAssetList();
                $("#ClrFixedAssets").find("input").val("");
                $("#ClrFixedAssets").find("select").val(0).change();
                $('#ModalFixedAssets').click();
            } else {
                warningnotify(data.status);
                GetAssetList();
                $("#ClrFixedAssets").find("input").val("");
                $("#ClrFixedAssets").find("select").val(0).change();
                //$('#ModalFixedAssets').click();
            }
            //$("#divPickupInformation").find("input").val("");
            //getPickupInformation();
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get Asset List Lists
function GetAssetList() { 
    var pdate = ''
    pdate = $('#txtPurchaseDate').val();
    var wedate = '' 
    wedate = $('#txtWarrantyEndDate').val();
    var amcdate = ''
    amcdate = $('#txtAMCEndDate').val();
    var client = null 
    $("#ddlClientFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            client = $(this).val();
        }
    });
    var assetcat = null
    $("#ddlAssetCategoryFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            assetcat = $(this).val();
        }
    });
    var manufac = null
    $("#ddlManuFacturerName option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            manufac = $(this).val();
        }
    });
    var slocation = null
    $("#ddlLocationFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            slocation = $(this).val();
        }
    });
    var vendor = null
    $("#ddlVendorName option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            vendor = $(this).val();
        }
    });
    var status = null
    $("#ddlStatusFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            status = $(this).val();
        }
    });
    var support = null 
    $("#ddlSupportTypeFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            support = $(this).val();
        }
    });
    

    var parm = {
        'Business_unit_id': client,
        'asset_cat_id': assetcat,
        'namufacturer_id': manufac,
        'location_id': slocation,
        'vendor_id': vendor,
        'status': status,
        'purchase_date': pdate,
        'warranty_end_date': wedate,
        'amc_end_date': amcdate,
        'support_type_id': support,
        'PageNo': $('#PageNumber').val(),
        'PazeSize': "10"
    };

    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetListFilter', 
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            //var table = $('#tblFixedAsset').DataTable();

            //// Event listener to the two range filtering inputs to redraw on input
            //$('#min, #max').keyup(function () {
            //    table.draw();
            //});

            //$.fn.dataTable.ext.search.push(
            //    function (settings, data, dataIndex) {
            //        var min = parseInt($('#min').val(), 10);
            //        var max = parseInt($('#max').val(), 10);
            //        var asset_id_pk = parseFloat(data[1]) || 0; // use data for the age column

            //        if ((isNaN(min) && isNaN(max)) ||
            //            (isNaN(min) && asset_id_pk <= max) ||
            //            (min <= asset_id_pk && isNaN(max)) ||
            //            (min <= asset_id_pk && age <= max)) {
            //            return true;
            //        }
            //        return false;
            //    }
            //);

            $('#TotalRecord').val(data[0].TotalRecord);
            var totalPages = parseInt(data[0].TotalRecord / 10);
            $('#pagination').twbsPagination({
                totalPages: totalPages,
                visiblePages: 10,
                
                onPageClick: function (event, page) {
                    $('#PageNumber').val(page);
                    GetAssetList();
                }
            });
            if (data.length > 0) {
                var row = "";

                for (var v = 0; v < data.length; v++) {
                    row += "<tr>";
                    row += '<td> <input id="checkbox0" class="cb-element checkbox tktcbk" name="' + data[v].asset_id_pk + '" type="checkbox"> </td>';
                    row += '<td><a class="editview" href="/Admin/Inventry/FixedAssetsDetails"  name="' + data[v].asset_id_pk + '"> <i class="fa fa - eye" data-toggle="tooltip" title="" style="color: #35adaf!important" data-original-title="Normal priority"></i> &nbsp;' + data[v].asset_id_pk + '</a> </td>';
                    row += "<td>" + data[v].asset_tag + "</td>";
                    row += "<td>" + data[v].asset_cat_name + "</td>";
                    row += "<td>" + data[v].email + "</td>";
                    row += "<td>" + data[v].model_name + "</td>";
                    row += "<td>" + data[v].serial_number + "</td>";
                    row += "<td>" + data[v].location_name + "</td>";
                    if (data[v].status === 'InStore') {
                        row += '<td><span class="badge badge-primary ENABLED" name="' + data[v].asset_id_pk + '" style="background-color:#ea2d2d;">' + data[v].status + '</span></td>';
                          }
                    else if (data[v].status === "Allocated") {
                        row += '<td><span class="badge badge-primary ENABLED" name="' + data[v].asset_id_pk + '"  style="background-color:#029800 !important;">' + data[v].status + '</span></td>';
                           }
                    else if (data[v].status === "InRepair") {
                        row += '<td><span class="badge badge-primary ENABLED" name="' + data[v].asset_id_pk + '" style="background-color:#b3ae1f;">' + data[v].status + '</span></td>';
                    }
                    else if (data[v].status === "In-Active") {
                        row += '<td><span class="badge badge-primary ENABLED" name="' + data[v].asset_id_pk + '" style="background-color:#3bc0c3 !important;">' + data[v].status + '</span></td>';
                    }
                    else if (data[v].status === "Discard") {
                        row += '<td><a  href="" class="badge badge-primary status" data-toggle="modal" style="background-color:#ea2d2d;" data-target="#myModalFeedBack" name="' + data[v].asset_id_pk + '">' + data[v].status + '<a></td>';
                       }
                    else if (data[v].status === "Theft") {
                        row += '<td><a  href="" class="badge badge-primary status"  data-toggle="modal" data-target="#myModalFeedBack" style="background-color:#ea2d2d;" name="' + data[v].asset_id_pk + '">' + data[v].status + '<a></td>';
                    }
                    else if (data[v].status === "N/A") {
                        row += '<td><a  href="" class="badge badge-primary status"  data-toggle="modal" data-target="#myModalFeedBack" style="background-color:#ea2d2d;" name="' + data[v].asset_id_pk + '">' + data[v].status + '<a></td>';
                        }  
                    row += "</tr>"; 
                }
                $('#tblFixedAsset tbody').html(row);
            }
        },

        error: function (edata) {
            alert("error while feching record.");
        }
    });
    //});
};
function DeleteAsset(asset_id) {
    var parm = {
        "asset_id_pk": asset_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/DeleteAssetByID',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetAssetList();

            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
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
            $("#txtAssetTag").val(data.asset_tag);
            $("#txtManufacturer").val(data.manufacturer_name);
            $("#txtModel").val(data.model_name);
            $("#txtAssetName").val(data.asset_name);
            $("#ddlSupplier").val(data.supplier_id_pk).change();
            $("#ddlLocation").val(data.location_id_pk).change();
            $("#ddlSubLocation").val(data.stored_location_id_pk).change();
            $("#ddlDepartmentName").val(data.department_id_fk).change();
            $("#ddlSection").val(data.section_id_fk).change();
            $("#ddlSubLocations").val(data.sub_location_id_fk).change();
            $("#ddlFloor").val(data.floor_id_fk).change();
            $("#txtBuildingAndRoomNo").val(data.building_room_no);
            $("#ddlStatus").val(data.status_id_pk).change();
            $("#txtSerialnumber").val(data.serial_number);
            $("#ddlAssetUser").val(data.asset_user_id).change();
            $("#txtRemovalDate").val(data.removal_date);
            $("#txtAssetPrice").val(data.purchase_price);
            $("#ddlCondition").val(data.condition_id_fk).change(); 
            $("#txtInvoiceNo").val(data.invoice_no).change();
            $("#txtInvoiceDate").val(data.invoice_date);
            $("#txtWarrantyStartDate").val(data.warranty_start_date).change();
            $("#txtWarrantyEndDate").val(data.warranty_end_date);
            $("#txtAMCStartDate").val(data.amc_start_date);
            $("#txtAMCEndDate").val(data.amc_end_date); 
            $("#ddlSupportType").val(data.support_type).change();
            $("#txtUserName").val(data.user_name);
            $("#txtUserContactNumber").val(data.user_con_no); 
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
            $('#ddlVendorName').html("").append('<option value="0">Select Vendor</option>');
            $(data).each(function () {
                $('#ddlVendor').append('<option value=' + this.supplier_id_pk + '>' + this.supplier_name + '</option>');
                $('#ddlSupplier').append('<option value=' + this.supplier_id_pk + '>' + this.supplier_name + '</option>'); 
                $('#ddlVendorName').append('<option value=' + this.supplier_id_pk + '>' + this.supplier_name + '</option>'); 
            });
        },
        error: function (edata) {
            alert("error while feching record.");
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
// insert Send To Repair  
function InsSendToRepair(asset_id_fk) {
    var parm = {
        "asset_id_fk": asset_id_fk,
        "component_id_fk": $("#ddlComponent option:selected").val(), 
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
        url: 'http://playmediahouse.com/api/api/FixedAssets/InsSendToRepair',
        success: function (data) {          
            if (data.status_id == 0) {
                successnotify(data.status);
            } else {
                warningnotify(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Update FixedAssets 
function AssetUpdate(asset_id) {
    var parm = {
        "asset_id_pk": asset_id,
        "client_id_fk": $("#ddlBusinessUnit option:selected").val(),
        "client_name": $("#ddlBusinessUnit option:selected").text(),
        "asset_category_id_fk": $("#ddlCategory option:selected").val(),
        "asset_cat_name": $("#ddlCategory option:selected").text(),
        "asset_tag": $("#txtAssetTag").val().trim(),
        "manufacturer_name": $("#txtManufacturer").val().trim(),
        "model_name": $("#txtModel").val().trim(),
        "asset_name": $("#txtAssetName").val().trim(),
        "supplier_id_pk": $("#ddlSupplier option:selected").val(),
        "supplier_name": $("#ddlSupplier option:selected").text(),
        "location_id_pk": $("#ddlLocation option:selected").val(),
        "location_name": $("#ddlLocation option:selected").text(),
        "stored_location_id_pk": $("#ddlSubLocation option:selected").val(),
        "stored_location_name": $("#ddlSubLocation option:selected").text(),
        "sub_location_id_fk": $("#ddlSubLocations option:selected").val(),
        "department_id_fk": $("#ddlDepartmentName option:selected").val(),
        "section_id_fk": $("#ddlSection option:selected").val(),
        "floor_id_fk": $("#ddlFloor option:selected").val(),
        "building_room_no": $("#txtBuildingAndRoomNo").val().trim(),
        "status_id_pk": $("#ddlStatus option:selected").val(),
        "status": $("#ddlStatus option:selected").text(),
        "serial_number": $("#txtSerialnumber").val().trim(),
        "asset_user_id": $("#ddlAssetUser option:selected").val(),
        "asset_user_name": $("#ddlAssetUser option:selected").text(),
        "removal_date": $("#txtRemovalDate").val().trim(),
        "purchase_price": $("#txtAssetPrice").val().trim(),
        "condition_id_fk": $("#ddlCondition option:selected").val(),
        "invoice_no": $("#txtInvoiceNo").val().trim(),
        "invoice_date": $("#txtInvoiceDate").val().trim(),
        "warranty_start_date": $("#txtWarrantyStartDate").val().trim(),
        "warranty_end_date": $("#txtWarrantyEndDate").val().trim(),
        "amc_start_date": $("#txtAMCStartDate").val().trim(),
        "amc_end_date": $("#txtAMCEndDate").val().trim(),
        "support_type": $("#ddlSupportType option:selected").val(),
        "user_name": $("#txtUserName").val(),
        "user_con_no": $("#txtUserContactNumber").val()

    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/AssetUpdate',
        success: function (data) {
            if (data.status_id == 1) { 
                successnotify(data.status);
                GetAssetList();
                $("#ClrFixedAssets").find("input").val("");
                $("#ClrFixedAssets").find("select").val(0).change();
                $('#ModalFixedAssets').click();
            } else {
                warningnotify(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Update  Status  
function UpdateAssetStatus(asset_id) {
    var parm = {
        "asset_id_pk": asset_id,
        "status_id_pk": $("#ddlStatusChange option:selected").val().trim(),
        "status_comments": $("#txtCommentBox").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/UpdateAssetStatus',
        success: function (data) {
           
            if (data.status_id != 0) {
                CreateSuccess(data.status);
                $('#closedModelStatus').click();
                 GetAssetList();
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
// Get Asset Details For Edit
function GetAssetDetailsGatePass(asset_id) { 
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
            $("#ddlBusinessUnitGatePass").val(data.client_id_fk).change();
            $("#ddlAssetsGatePass").val(data.asset_tag);
           
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
              //  GetGatePassLists();
            } else {
                warningnotify(data.status);

            }
        },
        error: function (result) {
            alert("Error : data");
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
            $("#ddlOtherApprover").html("").append('<option value="0">Select Technician</option>');
            $(data).each(function () {
                $('#ddlOtherApprover').append('<option value=' + this.id + '>' + this.name + '</option>');
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
// Check exist Asset Tag No
function CheckExistAssetTag(parameter) { 
    var parm = { "asset_tag": parameter };
    var josnstr = JSON.stringify(parm);
    return $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/CheckExistAssetTagNo',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: josnstr,
        success: function (data) {
            $(data).each(function () {
                if (this.asset_tag == parameter) {
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
      //  $('#SpnAssetTag').text('* Required').show();
        $('#SpnAssetTag').show();
        return false;
    } else {
        $('#SpnAssetTag').text('').hide();
        CheckExistAssetTag(obj.value);
    }

};
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
            //$("#tbodyEmployeeDetails").html('');
            //$(data).each(function () {
            //    $("#tbodyEmployeeDetails").append("<tr><td>" + this.id + "</td><td>" + this.email + "</td><td>" + this.name + "</td><td>" + this.mobile + "</td><td>" + this.title + "</td></tr>");
            //});
        },
        error: function (edata) {
            $(edata).each(function () {
                InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            });
            alert("error while geting record.");
        }
    });
};
//Get All Sub Category List 
function GetAllSubCategory() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Masters/GetAllSubCategory',
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
// Asset Assign To User  
function AssetAssignToUser(asset_id) {
    var parm = { 
        "asset_id_pk": asset_id,
        "asset_user_id": $("#ddlAssetUser option:selected").val(),
        "asset_user_name": $("#ddlAssetUser option:selected").text(),
        "status_id_pk": 2,
        "status": 'Allocated',
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/AssetAssignToUser',
        success: function (data) {
            if (data.status_id == 1) {
                successnotify("Asset Assigned Sucessfully");
                GetAssetList();
            } else {
                warningnotify(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//Get Asset Status Condition Wise 
function GetAssetStatusListsConditionWise(asset_id) { 
    var parm = {
        "asset_id_pk": asset_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetStatusListsConditionWise',
        success: function (data) {
            $('#ddlStatusChange').html("").append('<option value="0">Select Status</option>'); 
            $(data).each(function () {
                $('#ddlStatusChange').append('<option value=' + this.status_id_pk + '>' + this.status + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Update  Status For Send To Repair  
function UpdateAssetStatusForSendToRepair(asset_id) { 
    var parm = {
        "asset_id_pk": asset_id,
        "status_id_pk": 3
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/UpdateAssetStatus',
        success: function (data) {

            if (data.status_id != 0) {
                CreateSuccess(data.status);
                $('#closedModelStatus').click();
                GetAssetList();
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
////Get Condition Lists 
function GetCondition() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Masters/GetCondition',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlCondition').html("").append('<option value="0">Select Condition</option>');
            $(data).each(function () {
                $('#ddlCondition').append('<option value=' + this.condition_id_pk + '>' + this.condition_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
////Get Component Lists 
function GetComponent() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Masters/GetComponent', 
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlComponent').html("").append('<option value="0">Select Component</option>'); 
            $(data).each(function () {
                $('#ddlComponent').append('<option value=' + this.component_id_pk + '>' + this.component_name + '</option>');
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
// Insert Preventive Maintainance
function InsPreventiveMaintainance() {
    var parm = {
        "asset_category_id_fk": 0,
        "due_date": $("#txtduedate").val().trim(),
        "support_dep_id_fk": $("#ddlSupportDepartment option:selected").val().trim(),
        "support_group_id_fk": $("#ddlSupportGroup option:selected").val().trim(),
        "location_id_fk": 0,
        "assign_to_id": $("#ddlAssignTo option:selected").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/PreventiveMaintenance/InsPreventiveMaintenance',
        success: function (data) {
            if (data.status_id == 1) {
              //  InsPreventiveMaintenanceActivity(data.preventive_id_pk);
                successnotify(data.status);
              //  GetPreventiveMaintainanceActivityAssignTo();
            } else {
                warningnotify(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Insert Transactional Data 
function InsPreventiveMaintenanceActivity(preventive_id_fk, asset_id, asset_cat_name, asset_tag, model_name, serial_number, location_name) {
    var parm = {
        "preventive_id_fk": preventive_id_fk,
        "asset_id": asset_id,
        "asset_cat_name": asset_cat_name,
        "asset_name": null,
        "asset_tag": asset_tag,
        "model_name": model_name,
        "serial_number": serial_number,
        "supplier_name": null,
        "p_m_status_id_fk": 1,
        "location_name": location_name,
        "assign_to": $("#ddlAssignTo option:selected").val().trim(), 
        "due_date": $("#txtduedate").val().trim(),
        "support_dep_id_fk": $("#ddlSupportDepartment option:selected").val().trim(),
        "support_group_id_fk": $("#ddlSupportGroup option:selected").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/PreventiveMaintenance/InsPreventiveMaintenanceActivity',
        success: function (data) {
            if (data.status_id == 1) {
                successnotify(data.status);
                $("#CloseModalPreventiveActivity").click();
                $("#clrPreventiveActivity").find("input").val("");
                $("#clrPreventiveActivity").find("select").val(0).change();
            } else {
                warningnotify(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};








