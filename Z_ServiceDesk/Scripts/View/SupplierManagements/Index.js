$(document).ready(function () {
    GetSupplierCategoryLists();
    GetSupplierStatusLists();
    GetSupplierDetails();
    $('.cb-element').click(function () {
        if (!$(this).is(':checked')) {
            return confirm("Are you sure?");
            alert("Value Checked");
        }
    });
    $(document).on('click', '.cb-element', function () {
        if ($(this).is(':checked')) {
            $("#btnNew").attr("disabled", "disabled");
            $("#btnAssignTo").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
            $("#btnEdit").removeAttr("disabled");
            $("#btnStatusUpdate").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnNew").removeAttr("disabled");
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnStatusUpdate").attr("disabled", "disabled");
        }
        else {
            $("#btnNew").removeAttr("disabled");
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnStatusUpdate").attr("disabled", "disabled");
        }
       

    });

    $("#CheckAll").click(function () {
        if ($(this).is(':checked')) {
            $("#btnNew").attr("disabled", "disabled");
            $("#btnAssignTo").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
            $("#btnEdit").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnNew").removeAttr("disabled");
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnEdit").attr("disabled", "disabled");
        }
        else {
            $("#btnNew").removeAttr("disabled");
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnEdit").attr("disabled", "disabled");
        }
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#BtnDelete').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            //$("#btnEdit").hide();
            DeleteSupplier($(this).attr('name'));
            //$(".cb-element").prop("checked", false);
            //  alert($(this).val());
        });
    });
    $("#CheckAllStatus").click(function () {
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $("#CheckAllAsignTo").click(function () {
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $("#ddlCategory").change(function () {
        if ($(this).val() != 0) {
            GetCommonSubCategory($(this).val());
        } else {
            $("#ddlSubCategory").html("").append('<option value="0">Select Sub Category</option>');
        }
    });
    $("#ddlSupportGroup").change(function () {
        if ($(this).val() != 0) {
            GetEmployeeListSGD($(this).val());
        } else {
            $("#ddlUser").html("").append('<option value="0">Select Employee</option>');
        }
    });
    $("#ddlDepartmentName").change(function () {
        if ($(this).val() != 0) {
            GetSupportGroup($(this).val());
        } else {
            $("#ddlSupportGroup").html("").append('<option value="0">Select Support Group</option>');
        }
    });
    $("#btnSubmit").click(function () {
        if (validateSupplier() == true) {
            InsSupplierDetails();
        } else {
            return false;
        }
    });
    $("#btnUpdate").click(function () {
        var val = [];
        $('.cb-element:checked').each(function (i) {
            val[i] = $(this).val();
            UpdateSupplierDetails($(this).attr('name'));
        });
    });
    $("#btnEdit").click(function () {
        $("#btnUpdate").show();
        $("#btnSubmit").hide();
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            GetSupplierDetailsEdit($(this).attr('name'));
        });
    });
    $('#btnStatusUpdate').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            UpdateSupplierStatus($(this).attr('name'));
        });
    });
    $(document).on('click', '.editview', function () {
         //alert($(this).attr("name"));
        if ($.session.get("supplier_id_pk") != '' || $.session.get("supplier_id_pk") != null || $.session.get("supplier_id_pk") == undefined) {
            $.session.remove("supplier_id_pk");
            $.session.set("supplier_id_pk", $(this).attr("name")); 
            //  window.open('/Ticket/TicketDetails');
        }
    });
});
// Validate Supplier 
function validateSupplier() { 
    var return_val = true;
    //if ($('#txtSupplierCode').val().trim() == "" || $('#txtSupplierCode').val() == null) { 
    //    $('#SpnSupplierCode').show();
    //    return_val = false;
    //} else {
    //    $('#SpnSupplierCode').hide(); 
    //}
    if ($('#txtSupplierName').val().trim() == "" || $('#txtSupplierName').val() == null) {
        $('#SpnSupplierName').show();
        return_val = false;
    } else {
        $('#SpnSupplierName').hide();
    }
    if ($('#txtPhoneNumber').val().trim() == "" || $('#txtPhoneNumber').val() == null) {
        $('#SpnPhoneNumber').show();
        return_val = false;
    } else {
        $('#SpnPhoneNumber').hide(); 
    }
    if ($('#txtAddress').val().trim() == "" || $('#txtAddress').val() == null) {
        $('#SpnAddress').show();
        return_val = false;
    } else {
        $('#SpnAddress').hide(); 
    }
    if ($('#txtContactPerson').val().trim() == "" || $('#txtContactPerson').val() == null) {
        $('#SpnContactPerson').show();
        return_val = false;
    } else {
        $('#SpnContactPerson').hide(); 
    }
    if ($('#txtCity').val().trim() == "" || $('#txtCity').val() == null) {
        $('#SpnCity').show();
        return_val = false;
    } else {
        $('#SpnCity').hide();
    }
    if ($('#ddlSupllierStatus option:selected').val() == 0) {
        $('#SpnSupllierStatus').show();
        return_val = false;
    } else {
        $('#SpnSupllierStatus').hide();
    }
    if ($('#txtEmail').val().trim() == "" || $('#txtEmail').val() == null) {
        $('#SpnEmail').show();
        return_val = false;
    } else {
        $('#SpnEmail').hide(); 
    }
    //if ($('#ddlSupplierCategory option:selected').val() == 0) {
    //    $('#SpnSupplierCategory').show();
    //    return_val = false;
    //} else {
    //    $('#SpnSupplierCategory').hide(); 
    //}
    if ($('#txtNotes').val().trim() == "" || $('#txtNotes').val() == null) {
        $('#SpnNotes').show();
        return_val = false;
    } else {
        $('#SpnNotes').hide();
    }
    return return_val;
};
//Get Supplier Category Lists
function GetSupplierCategoryLists() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Supplier/GetSupplierCategoryLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#ddlSupplierCategory').html("").append('<option value="0">Select Vendor Category</option>');
            $(data).each(function () {
                $('#ddlSupplierCategory').append('<option value=' + this.sup_category_id_pk + '>' + this.category_name + '</option>'); 
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get Supplier Status Lists
function GetSupplierStatusLists() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Supplier/GetSupplierStatusLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#ddlSupllierStatus').html("").append('<option value="0">Select Vendor Status</option>');
            $('#ddlSupllierStatusUpd').html("").append('<option value="0">Select Vendor Status</option>');
            $(data).each(function () {
                $('#ddlSupllierStatusUpd').append('<option value=' + this.sup_status_id_pk + '>' + this.sup_status_name + '</option>');
                $('#ddlSupllierStatus').append('<option value=' + this.sup_status_id_pk + '>' + this.sup_status_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Insert Supplier Details 
function InsSupplierDetails() {
    var parm = {
        "supplier_code": $("#txtSupplierCode").val().trim(),
        "supplier_name": $("#txtSupplierName").val().trim(),
        "address": $("#txtAddress").val().trim(),
        "city": $("#txtCity").val().trim(),
        "contact_person": $("#txtContactPerson").val().trim(),
        "sup_status_id_fk": $("#ddlSupllierStatus option:selected").val().trim(),
        "email": $("#txtEmail").val().trim(),
        "sup_category_id_fk": $("#ddlSupplierCategory option:selected").val().trim(),
        "phone_number": $("#txtPhoneNumber").val().trim(),
        "note": $("#txtNotes").val().trim(),
        "is_h_s_supp": $("#cbkHSsupply").is(":checked") == true ? 1 : 0,
        "is_ots": $("#cbkOneTimeServices").is(":checked") == true ? 1 : 0,
        "is_ess": $("#cbkEusSupportServices").is(":checked") == true ? 1 : 0,
        "is_dss": $("#cbkDcSupportService").is(":checked") == true ? 1 : 0,
        "is_h_amc": $("#cbkHardwareAmc").is(":checked") == true ? 1 : 0,
        "is_i_s_serv": $("#cbkInfoSecService").is(":checked") == true ? 1 : 0,
        "is_app_supp": $("#cbkApplicationSupport").is(":checked") == true ? 1 : 0,
        "is_s_supp": $("#cbkServerSupport").is(":checked") == true ? 1 : 0,
        "is_n_supp": $("#cbkNetworkSupport").is(":checked") == true ? 1 : 0,
        "is_db_supp": $("#cbkDBSupport").is(":checked") == true ? 1 : 0,
        "is_a_v_supp": $("#cbkAudioVideoSupport").is(":checked") == true ? 1 : 0,
        "is_cctv_supp": $("#cbkCCTVSupport").is(":checked") == true ? 1 : 0,
        "is_oth_serv": $("#cbkOtherServices").is(":checked") == true ? 1 : 0,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Supplier/InsSupplierDetails', 
        success: function (data) {
            //alert("Inserted Successfully");
            if (data.status_id != 0) {
                //  alert(data.status);
                successnotify(data.status);
                $('#closedModel').click();
                $("#ClrTicket").find("input").val("");
                $("#ClrTicket").find("select").val(0).change();
                GetSupplierDetails();
            } else {
                // alert(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get Supplier Details  
function GetSupplierDetails() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Supplier/GetSupplierDetails',
        dataType: "json",
        success: function (data) {
            //alert(data.status);
            var table;
            if ($.fn.dataTable.isDataTable('#tblSupplierDetails')) {
                table = $('#tblSupplierDetails').DataTable();
            } else {
                table = $('#tblSupplierDetails').DataTable();
            }
            table.destroy();
            $("#tblSupplierDetails").DataTable({
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
                        data: 'supplier_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (supplier_id_pk) {
                            return '<input id="check" class="cb-element checkbox" name="' + supplier_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    {
                        data: 'supplier_id_pk',
                        sWidth: '60px',
                        sClass: "view",
                        bSortable: false,
                        render: function (supplier_id_pk) {
                            return '<a class="editview" href="/Admin/SupplierManagements/SupplierDetails"  name="' + supplier_id_pk + '"> <i class="fa fa-eye icon-ser"> </i> ' + supplier_id_pk + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                      //{ data: 'supplier_id_pk' },
                      { data: 'supplier_code' },
                      { data: 'supplier_name' },
                      { data: 'category_name' },
                      { data: 'sup_status_name' },
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
// Get Supplier Details For Edit
function GetSupplierDetailsEdit(supplier_id) {
    var parm = {
        'supplier_id_pk': supplier_id// $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Supplier/GetSupplierDetailsEdit',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#txtSupplierCode").val(data.supplier_code).change();
            $("#txtSupplierName").val(data.supplier_name).change();
            $("#txtAddress").val(data.address);
            $("#txtCity").val(data.city);
            $("#txtContactPerson").val(data.contact_person);
            $("#ddlSupllierStatus").val(data.sup_status_id_fk);
            $("#txtEmail").val(data.email).change();
            $("#ddlSupplierCategory").val(data.sup_category_id_fk).change();
            $("#txtPhoneNumber").val(data.phone_number).change();
            $("#txtNotes").val(data.note).change();
            if (data.is_h_s_supp == 1) {
                $("#cbkHSsupply").prop('checked', true);
            } else {
                $("#cbkHSsupply").prop('checked', false);
            }
            if (data.is_ots == 1) {
                $("#cbkOneTimeServices").prop('checked', true); 
            } else {
                $("#cbkOneTimeServices").prop('checked', false);
            }
            if (data.is_ess == 1) {
                $("#cbkEusSupportServices").prop('checked', true);
            } else {
                $("#cbkEusSupportServices").prop('checked', false);
            }
            if (data.is_dss == 1) {
                $("#cbkDcSupportService").prop('checked', true);
            } else {
                $("#cbkDcSupportService").prop('checked', false);
            }
            if (data.is_h_amc == 1) {
                $("#cbkHardwareAmc").prop('checked', true);
            } else {
                $("#cbkHardwareAmc").prop('checked', false);
            }
            if (data.is_i_s_serv == 1) {
                $("#cbkInfoSecService").prop('checked', true);
            } else {
                $("#cbkInfoSecService").prop('checked', false);
            }
            if (data.is_app_supp == 1) {
                $("#cbkApplicationSupport").prop('checked', true);
            } else {
                $("#cbkApplicationSupport").prop('checked', false);
            }
            if (data.is_s_supp == 1) {
                $("#cbkServerSupport").prop('checked', true);
            } else {
                $("#cbkServerSupport").prop('checked', false);
            }
            if (data.is_n_supp == 1) {
                $("#cbkNetworkSupport").prop('checked', true);
            } else {
                $("#cbkNetworkSupport").prop('checked', false);
            }
            if (data.is_db_supp == 1) {
                $("#cbkDBSupport").prop('checked', true);
            } else {
                $("#cbkDBSupport").prop('checked', false);
            }
            if (data.is_a_v_supp == 1) {
                $("#cbkAudioVideoSupport").prop('checked', true);
            } else {
                $("#cbkAudioVideoSupport").prop('checked', false);
            }
            if (data.is_cctv_supp == 1) {
                $("#cbkCCTVSupport").prop('checked', true);
            } else {
                $("#cbkCCTVSupport").prop('checked', false);
            }
            if (data.is_oth_serv == 1) {
                $("#cbkOtherServices").prop('checked', true);
            } else {
                $("#cbkOtherServices").prop('checked', false);
            }
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Update Supplier Details  
function UpdateSupplierDetails(supplier_id) {
    var parm = {
        "supplier_id_pk": supplier_id,
        "supplier_code": $("#txtSupplierCode").val().trim(),
        "supplier_name": $("#txtSupplierName").val().trim(),
        "address": $("#txtAddress").val().trim(),
        "city": $("#txtCity").val().trim(),
        "contact_person": $("#txtContactPerson").val().trim(),
        "sup_status_id_fk": $("#ddlSupllierStatus option:selected").val().trim(),
        "email": $("#txtEmail").val().trim(),
        "sup_category_id_fk": $("#ddlSupplierCategory option:selected").val().trim(),
        "phone_number": $("#txtPhoneNumber").val().trim(),
        "note": $("#txtNotes").val().trim(),
        "is_h_s_supp": $("#cbkHSsupply").is(":checked") == true ? 1 : 0,
        "is_ots": $("#cbkOneTimeServices").is(":checked") == true ? 1 : 0,
        "is_ess": $("#cbkEusSupportServices").is(":checked") == true ? 1 : 0,
        "is_dss": $("#cbkDcSupportService").is(":checked") == true ? 1 : 0,
        "is_h_amc": $("#cbkHardwareAmc").is(":checked") == true ? 1 : 0,
        "is_i_s_serv": $("#cbkInfoSecService").is(":checked") == true ? 1 : 0,
        "is_app_supp": $("#cbkApplicationSupport").is(":checked") == true ? 1 : 0,
        "is_s_supp": $("#cbkServerSupport").is(":checked") == true ? 1 : 0,
        "is_n_supp": $("#cbkNetworkSupport").is(":checked") == true ? 1 : 0,
        "is_db_supp": $("#cbkDBSupport").is(":checked") == true ? 1 : 0,
        "is_a_v_supp": $("#cbkAudioVideoSupport").is(":checked") == true ? 1 : 0,
        "is_cctv_supp": $("#cbkCCTVSupport").is(":checked") == true ? 1 : 0,
        "is_oth_serv": $("#cbkOtherServices").is(":checked") == true ? 1 : 0,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Supplier/UpdateSupplierDetails',
        success: function (data) {
            if (data.status_id != 0) {
                CreateSuccess(data.status);
                $('#closedModelUpdate').click();
                GetSupplierDetails();
                $(".cb-element").prop("checked", false);
                $("#ClrSupplier").find("input").val("");
                $("#ClrSupplier").find("select").val(0).change();
                $(":checkbox:checked").prop("checked", false);
            } else {
                $('#closedModelUpdate').click();
                $("#ClrSupplier").find("input").val("");
                $("#ClrSupplier").find("select").val(0).change();
                //CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Update Supplier Status  
function UpdateSupplierStatus(supplier_id) {  
    var parm = {
        "supplier_id_pk": supplier_id,
        "sup_status_id_fk": $("#ddlSupllierStatusUpd option:selected").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Supplier/UpdateSupplierStatus',
        success: function (data) {
            if (data.status_id != 0) {
                CreateSuccess(data.status);
                $('#closedModelStatus').click();
                GetSupplierDetails(); 
                $(".cb-element").prop("checked", false);
                $("#ClrSupplier").find("select").val(0).change();
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
function DeleteSupplier(supplier_id) {
    var parm = {
        "supplier_id_pk": supplier_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Supplier/DeleteSupplierByID',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetSupplierDetails();

            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};
