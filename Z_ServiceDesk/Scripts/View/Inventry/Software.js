$(document).ready(function () {   
    GetLocation();
    GetPublisher();
    GetSoftwareCategory();
    GetEmployees();
    GetSoftwareLists();
    GetSoftwareComplianceLists();
    $(document).on('click', '.editview', function () {
        GetSoftwareDetails($(this).attr("name"));
    });
    $("#btnSave").click(function () {
        //alert("Hello");
        //InsSoftware();
        if (validateareamaster() == true) {
            InsSoftware();
        } else {
            return false;
        }
    });
    $("#btnEdit").click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            GetSoftwareDetailsForEdit($(this).attr('name'));
        });
        $('.select2').select2(
            { dropdownParent: $('#myModal') }
        );
        $("#myModalLabelNew").hide(); $("#myModalLabelEdit").show();
        $("#btnSave").hide();
        $("#btnUpdate").show();
    });
    $("#btnUpdate").click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            if (validateareamaster() == true) {
                UpdSoftware($(this).attr("name"));
            } else {
                return false;
            }
        });
    });
    $("#btnSoftMapped").click(function () { 
        if (validateSoftwareMapped() == true) {
            InsSoftwareMapped();
        } else {
            return false;
        }
    });
    $("#btnSubmit").click(function () {
        // alert("hello")
        if (validateareamasterALF() == true) {
            InsAssignSoftware();
        } else {
            return false;
        }
    });
    $(".Location").change(function () {
        if ($(this).val() != 0) {
            GetStoredLocation($(this).val());
        } else {
            $(".StoredLocation").html("").append('<option value="0">Select Stored Location</option>');
        }
    });
    $(".SoftwareCategory").change(function () {
        if ($(this).val() != 0) {
            //sGetStoredLocation($(this).val());
            GetSoftwareCategoryName($(this).val());
        } else {
            $(".SoftwareName").html("").append('<option value="0">Select Stored Location</option>');
        }
    }); 
    $(document).on('click', '.cb-element', function () {
        if ($(this).is(':checked')) {
            $("#btnAssignTo").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
        }
        else {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
        }

    });
    $("#CheckAll").click(function () {
        if ($(this).is(':checked')) {
            $("#btnAssignTo").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
        }
        else {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
        }
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#BtnDelete').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            DeleteSoftwareByID($(this).attr('name'));
          //  $(".cb-element").prop("checked", false);
            // alert($(this).val());
        });
    });
    $("#btnNew").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModal') }
        );
    });
    $("#btnAssignLicense").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModalAllocate') }
        );
    });
    $("#btnSoftMapping").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModalMapping') }
        );
    });
    $("#ddlAssignTo").change(function () {
        if ($(this).val() != 0) {
            GetAssetList($(this).val());
        } else {
            $("#ddlAsset").html("").append('<option value="0">Select Category</option>');
        }
    });
});
function validateareamaster() {
    var return_val = true;
    //if ($('#ddlLocation option:selected').val() == 0) {
    //    $('#SpnLocation').show();
    //    return_val = false;
    //} else {
    //    $('#SpnLocation').hide();
    //}
    //if ($('#ddlSubLocation option:selected').val() == 0) {
    //    $('#SpnSubLocation').show();
    //    return_val = false;
    //} else {
    //    $('#SpnSubLocation').hide();
    //}
    //if ($('#ddlAsset option:selected').val() == 0) {
    //    $('#SpnAsset').show();
    //    return_val = false;
    //} else {
    //    $('#SpnAsset').hide();
    //}
    if ($('#ddlSoftwareCategory option:selected').val() == 0) {
        $('#SpnSoftwareCategory').show();
        return_val = false;
    } else {
        $('#SpnSoftwareCategory').hide();
    }
    if ($('#ddlPublisher option:selected').val() == 0) {
        $('#SpnPublisher').show();
        return_val = false;
    } else {
        $('#SpnPublisher').hide();
    }   
    if ($('#ddlSoftwareName option:selected').val() == 0) {
        $('#SpnSoftwareName').show();
        return_val = false;
    } else {
        $('#SpnSoftwareName').hide();
    }
    if ($('#txtLicenseType').val().trim() == "" || $('#txtLicenseType').val() == null) {
        $('#SpnLicenseType').show();
        return_val = false;
    } else {
        $('#SpnLicenseType').hide();
    }
    if ($('#txtLicenesNo').val().trim() == "" || $('#txtLicenesNo').val() == null) {
        $('#SpnLicenesNo').show();
        return_val = false;
    } else {
        $('#SpnLicenesNo').hide();
    }
    //if ($('#txtFromDate').val().trim() == "" || $('#txtFromDate').val() == null) {
    //    $('#SpnFromDate').show();
    //    return_val = false;
    //} else {
    //    $('#SpnFromDate').hide();
    //}
    //if ($('#txtToDate').val().trim() == "" || $('#txtToDate').val() == null) {
    //    $('#SpnToDate').show();
    //    return_val = false;
    //} else {
    //    $('#SpnToDate').hide();
    //}
    //if ($('#txtQty').val().trim() == "" || $('#txtQty').val() == null) {
    //    $('#SpnQty').show();
    //    return_val = false;
    //} else {
    //    $('#SpnQty').hide();
    //}
    //if ($('#txtUnitPrice').val().trim() == "" || $('#txtUnitPrice').val() == null) {
    //    $('#SpnUnitPrice').show();
    //    return_val = false;
    //} else {
    //    $('#SpnUnitPrice').hide();
    //}

    return return_val;
};
function validateareamasterALF() {
    var return_val = true;
    if ($('#ddlLocation1 option:selected').val() == 0) {
        $('#SpnLocation1').show();
        return_val = false;
    } else {
        $('#SpnLocation1').hide();
    }
    if ($('#ddlSubLocation1 option:selected').val() == 0) {
        $('#SpnSubLocation1').show();
        return_val = false;
    } else {
        $('#SpnSubLocation1').hide();
    }
    if ($('#ddlSoftwareCategory1 option:selected').val() == 0) {
        $('#SpnSoftwareCategory1').show();
        return_val = false;
    } else {
        $('#SpnSoftwareCategory1').hide();
    }
    if ($('#ddlSoftwareName1 option:selected').val() == 0) {
        $('#SpnSoftwareName1').show();
        return_val = false;
    } else {
        $('#SpnSoftwareName1').hide();
    }
    if ($('#ddlAssignTo option:selected').val() == 0) {
        $('#SpnAssignTo').show();
        return_val = false;
    } else {
        $('#SpnAssignTo').hide();
    }    
    if ($('#txtAssignedDate').val().trim() == "" || $('#txtAssignedDate').val() == null) {
        $('#SpnAssignedDate').show();
        return_val = false;
    } else {
        $('#SpnAssignedDate').hide();
    }
    return return_val;
};
function validateSoftwareMapped() { 
    var return_val = true;
    if ($('#ddlSoftwareNameCompliance option:selected').val() == 0) {
        $('#SpnSoftwareNameCompliance').show();
        return_val = false;
    } else {
        $('#SpnSoftwareNameCompliance').hide();
    }
    if ($('#ddlSoftwareCategoryMapped option:selected').val() == 0) {
        $('#SpnSoftwareCategoryMapped').show();
        return_val = false;
    } else {
        $('#SpnSoftwareCategoryMapped').hide();
    }
    if ($('#ddlSoftwareNameMapped option:selected').val() == 0) {
        $('#SpnSoftwareNameMapped').show();
        return_val = false;
    } else {
        $('#SpnSoftwareNameMapped').hide();
    }
    return return_val;
};
//Get All Location Lists
function GetLocation() {
   
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Software/GetLocation',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
           
            $('.Location').html("").append('<option value="0">Select Location</option>');
            $(data).each(function () {
                $('.Location').append('<option value=' + this.location_id_pk + '>' + this.location_name + '</option>');
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
            $('.StoredLocation').html("").append('<option value="0">Select Stored Location</option>');
            $(data).each(function () {
                $('.StoredLocation').append('<option value=' + this.stored_location_id_pk + '>' + this.stored_location_name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//get All Publisher List from People
function GetPublisher() {
   
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Software/GetPublisher',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
           
            $("#ddlPublisher").html("").append('<option value="0">Select Item</option>');
            $(data).each(function () {
                $("#ddlPublisher").append('<option value=' + this.publisher_id_pk + '>' + this.publisher_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function GetSoftwareCategory() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Software/GetSoftwareCategory',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
           
            $('.SoftwareCategory').html("").append('<option value="0">Select Item</option>');
            $(data).each(function () {
                $('.SoftwareCategory').append('<option value=' + this.soft_catogory_id_pk + '>' + this.soft_category_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Software CategoryLists
function GetSoftwareCategoryName(Softcatogory_id) {
    var parm = {
        "soft_catogory_id_fk": Softcatogory_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Software/GetSoftwareCategoryName',
        success: function (data) {
            $('.SoftwareName').html("").append('<option value="0">Select</option>');
            $(data).each(function () {
                $('.SoftwareName').append('<option value=' + this.soft_name_id_pk + '>' + this.software_name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//get All Employee List from People
function GetEmployees() {
    $.ajax({
        type: "Get",
      //  url: 'http://playmediahouse.com/api/api/Consumable/GetEmployees',
        url: 'http://playmediahouse.com/api/api/Staff/GetUserLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlAssignTo").html("").append('<option value="0">Select User</option>');
            $(data).each(function () {
              //  $('.EMP').append('<option value=' + this.user_id_pk + '>' + this.user_name + '</option>');
                $('#ddlAssignTo').append('<option value=' + this.user_id_pk + '>' + this.user_name + '</option>'); 
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function InsSoftware() {
    var parm = {
        "location_id_fk": $("#ddlLocation option:selected").val(),
        "stored_location_id_fk": $("#ddlSubLocation option:selected").val(),
        "soft_catogory_id_fk": $("#ddlSoftwareCategory option:selected").val(),
        "publisher_id_fk": $("#ddlPublisher option:selected").val(),
        "soft_name_id_fk": $("#ddlSoftwareName option:selected").val(), 
        "license_type": $("#txtLicenseType").val().trim(),
        "license_no": $("#txtLicenesNo").val().trim(),
        "from_date": $("#txtFromDate").val().trim(),
        "to_date": $("#txtToDate").val().trim(),
        "qty": $("#txtQty").val().trim(),
        "unit_price": $("#txtUnitPrice").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Software/InsSoftware',
        success: function (data) {
           // alert("Inserted Successfully");
            if (data.status_id == 0) {
                successnotify(data.status);
            } else {
                warningnotify(data.status);
                InsSoftwareStockLedger($("#ddlLocation option:selected").val(), $("#ddlSubLocation option:selected").val(), $("#ddlSoftwareCategory option:selected").val(), $("#ddlPublisher option:selected").val(), $("#ddlSoftwareName option:selected").val(), $("#txtQty").val().trim(), null, 1);
                GetSoftwareLists();
                $("#ClrAddSoftware").find("input").val("");
                $("#ClrAddSoftware").find("select").val(0).change();
                $("#modalAddSoftware").click();
                //GetPickupBookingDetails();
            }
            //$("#divPickupInformation").find("input").val("");           
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
function InsAssignSoftware() {
    var parm = {
        "location_id_fk": $("#ddlLocation1 option:selected").val(),
        "stored_location_id_fk": $("#ddlSubLocation1 option:selected").val(),
        "soft_catogory_id_fk": $("#ddlSoftwareCategory1 option:selected").val(),
        "soft_name_id_fk": $("#ddlSoftwareName1 option:selected").val(),
        "employee_id_fk": $("#ddlAssignTo option:selected").val(),
        "asset_tag": $("#ddlAsset option:selected").val(), 
        "assign_date": $("#txtAssignedDate").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Software/InsAssignSoftware',
        success: function (data) {
          //  alert("Inserted Successfully");
            if (data.status_id == 0) {
                successnotify(data.status);
            } else {
                warningnotify(data.status);
                InsSoftwareStockLedger($("#ddlLocation1 option:selected").val(), $("#ddlSubLocation1 option:selected").val(), $("#ddlSoftwareCategory1 option:selected").val(), 0, $("#ddlSoftwareName1 option:selected").val(), 0 , 1 , 1);
                GetSoftwareLists();
                $("#ClrAssignSoftware").find("input").val("");
                $("#ClrAssignSoftware").find("select").val(0).change();
                $("#modalAssignSoftware").click();
                //InsInsStockLedger($("#dllAllocateStoreLocation option:selected").val(), $("#dllAllocateConCategory option:selected").val(), $("#dllConItemDetails option:selected").val(), null, $("#txtQty").val().trim(), 1)
                //GetPickupBookingDetails();
            }
            //$("#divPickupInformation").find("input").val("");
            //getPickupInformation();
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
function InsSoftwareStockLedger(location_id_fk, store_loc_id_fk, soft_catogory_id_fk, publisher_id_fk, soft_name_id_fk, item_in, item_out, ref_id) {
   
    var parm = {
        "location_id_fk": location_id_fk,
        "store_loc_id_fk": store_loc_id_fk,
        "soft_catogory_id_fk": soft_catogory_id_fk,
        "publisher_id_fk": publisher_id_fk,
        "soft_name_id_fk": soft_name_id_fk,
        "item_in": item_in,
        "item_out": item_out,
        "ref_id": ref_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Software/InsSoftwareStockLedger',
        success: function (data) {
          //  alert("Inserted Successfully");
            if (data.status_id == 0) {
                successnotify(data.status);
            } else {
                warningnotify(data.status);
                GetSoftwareLists();
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get Software Lists
function GetSoftwareLists() { 
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Software/GetAllSoftwareList',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblSoftware')) {
                table = $('#tblSoftware').DataTable();
            } else {
                table = $('#tblSoftware').DataTable();
            }
            table.destroy();
            $("#tblSoftware").DataTable({
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
                      {
                        data: 'software_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (software_id_pk) {
                            return '<input id="check" class="cb-element checkbox" name="' + software_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    {
                        data: 'software_id_pk', sWidth: '100px', render: function (software_id_pk, type, row) {
                            return '<a href="#" data-toggle="modal" data-target="#myModalDetails" class="editview"  name="' + software_id_pk + '"> <i class="fa fa-eye icon-ser"> </i> ' + software_id_pk + '</a>';

                        }
                    },
                    //{ data: 'software_id_pk' },
                    { data: 'location_name' },
                    { data: 'stored_location_name' },
                    { data: 'soft_category_name' },
                    { data: 'publisher_name' },
                    { data: 'software_name' }
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
function DeleteSoftwareByID(soft_name_id) { 
    var parm = {
        "soft_name_id_fk": soft_name_id 
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Software/DeleteSoftwareByID', 
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetSoftwareLists();
            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};
//Get All Software Lists
function GetSoftwareComplianceLists() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Software/GetSoftwareMapLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#ddlSoftwareNameCompliance').html("").append('<option value="0">Select Location</option>');
            $(data).each(function () {
                $('#ddlSoftwareNameCompliance').append('<option value=' + this.serial_number + '>' + this.SoftwareName + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Insert Software Mapped 
function InsSoftwareMapped() { 
    var parm = {
        "soft_name": $("#ddlSoftwareNameCompliance option:selected").text(),
        "soft_catogory_id_fk": $("#ddlSoftwareCategoryMapped option:selected").val(),
        "soft_name_id_fk": $("#ddlSoftwareNameMapped option:selected").val()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Software/InsSoftwareMapped', 
        success: function (data) {
            //  alert("Inserted Successfully");
            if (data.status_id == 0) {
                successnotify(data.status);
            } else {
                successnotify(data.status);
                GetSoftwareLists();
                $("#ClrMappedSoftware").find("input").val("");
                $("#ClrMappedSoftware").find("select").val(0).change();
                $("#closedModel").click();
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//get All Asign To List from People
function GetAssetList(user_id) {
    var parm = {
        "user_id_fk": user_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetListForAssetNonAssPeriphe',
        success: function (data) {
            $("#ddlAsset").html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $('#ddlAsset').append('<option value=' + this.asset_id_pk + '>' + this.asset_tag + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//get All Asign To List from People
function GetAssetList(user_id) {
    var parm = {
        "user_id_fk": user_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetListForAssetNonAssPeriphe',
        success: function (data) {
            $("#ddlAsset").html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $('#ddlAsset').append('<option value=' + this.asset_id_pk + '>' + this.asset_tag + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//Software Details
function GetSoftwareDetails(software_id) {
    var parm = {
        'software_id_pk': software_id// $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Software/GetSoftwareDetails',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#txtID").text(data.task_id_pk);
            $("#txtLocationName").text(data.title);
            $("#txtStoreName").text(data.task_type_name);
            $("#txtSoftwareCategory").text(data.business_unit);
            $("#txtPublisher").text(data.support_dep_name);
            $("#txtSoftwareName").text(data.support_dep_group_name);
            $("#txtLicenseType").text(data.asset_name);
            $("#txtLicenseNo").text(data.name);
            $("#txtFromDate").text(data.priority_name);
            $("#txtToDate").text(data.due_date);
            $("#txtQty").text(data.message);
            $("#txtPrice").text(data.status);
           
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get Software For Edit
function GetSoftwareDetailsForEdit(software_id) {  
    var parm = {
        'software_id_pk': software_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Software/GetSoftwareDetailsForEdit', 
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            alert("Helo");
            alert(data.location_id_fk);
            $("#ddlLocation").val(data.location_id_fk).change();
            $("#ddlSubLocation").val(data.stored_location_id_fk).change();
            $("#ddlSoftwareCategory").val(data.soft_catogory_id_fk).change();
            $("#ddlPublisher").val(data.publisher_id_fk).change();
            $("#ddlSoftwareName").val(data.soft_name_id_fk).change();
            $("#txtLicenseType").val(data.license_type);
            $("#txtLicenesNo").val(data.license_no).change();
            $("#txtFromDate").val(data.from_date).change();
            $("#txtToDate").val(data.to_date).change();
            $("#txtQty").val(data.qty).change().change();
            $("#txtUnitPrice").val(data.unit_price).change();
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Update Software
function UpdSoftware(software_id) {
    var parm = {
        "software_id_pk": software_id,
        "location_id_fk": $("#ddlLocation option:selected").val(),
        "stored_location_id_fk": $("#ddlSubLocation option:selected").val(),
        "soft_catogory_id_fk": $("#ddlSoftwareCategory option:selected").val(),
        "publisher_id_fk": $("#ddlPublisher option:selected").val(),
        "soft_name_id_fk": $("#ddlSoftwareName option:selected").val(),
        "license_type": $("#txtLicenseType").val().trim(),
        "license_no": $("#txtLicenesNo").val().trim(),
        "from_date": $("#txtFromDate").val().trim(),
        "to_date": $("#txtToDate").val().trim(),
        "qty": $("#txtQty").val().trim(),
        "unit_price": $("#txtUnitPrice").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Software/UpdSoftware',
        success: function (data) {
            if (data.status_id != 0) {
                successnotify(data.status);
                GetTaskLists();
                $("#ClrAddSoftware").find("input").val("");
                $("#ClrAddSoftware").find("textarea").val("");
                $("#ClrAddSoftware").find("select").val(0).change();
            } else {
                warningnotify(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};