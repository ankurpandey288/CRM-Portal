$(document).ready(function () {
   // alert($.session.get("supplier_id_pk"));
    GetSupplierDetailsList($.session.get("supplier_id_pk"));
    GetSupplierContactDetails();
  
    $("#btnSupplierContactDetails").click(function () {
        InsSupplierContactDetails($.session.get("supplier_id_pk"));
        //if (validateSupplierContactDetails() == true) {
           
        //} else {
        //    return false;
        //}
    });
    $("#btnSubmit").click(function () {
        UpdateSupplierManagements($.session.get("supplier_id_pk"));
        //if (validateAssets() == true) {
        //    alert("hello");
        //    InsMapAssetHardwareInfo();
        //} else {
        //    return false;
        //}
    });
    $(document).on('click', '.cb-element', function () {
        if ($(this).is(':checked')) {
            $("#BtnDelete").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#BtnDelete").attr("disabled", "disabled");
        }
        else {
            $("#BtnDelete").attr("disabled", "disabled");
        }
    });
    $("#CheckAll").click(function () {
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
});
// Validate Supplier Contact Details
function validateSupplierContactDetails() { 
    var return_val = true;
    if ($('#txtName').val().trim() == "" || $('#txtName').val() == null) {
        $('#SpnName').show();
        return_val = false;
    } else {
        $('#SpnName').hide();
    }
    if ($('#txtMobileNo').val().trim() == "" || $('#txtMobileNo').val() == null) {
        $('#SpnMobileNo').show();
        return_val = false;
    } else {
        $('#SpnMobileNo').hide();
    }
    if ($('#txtAddress').val().trim() == "" || $('#txtAddress').val() == null) {
        $('#SpnAddress').show();
        return_val = false;
    } else {
        $('#SpnAddress').hide();
    }
    if ($('#txtDesignation').val().trim() == "" || $('#txtDesignation').val() == null) {
        $('#SpnDesignation').show();
        return_val = false;
    } else {
        $('#SpnDesignation').hide();
    }
    return return_val;
};
function GetSupplierDetailsList(supplier_id) { 
    var parm = {
        'supplier_id_pk': supplier_id // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Supplier/GetSupplierDetailsList',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#txtSupplierCode").text(data.supplier_code);
            $("#txtSupplierName").text(data.supplier_name);
            $("#spanSupplierName").text(data.supplier_name);
            $("#txtSupplierCategory").text(data.category_name);
            $("#txtSupplierStatus").text(data.sup_status_name);
            $("#txtConatactPerson").text(data.contact_person);
            $("#txtAddress").text(data.address);
            $("#txtCity").text(data.city);
            $("#txtEmail").text(data.email);
            $("#txtPhoneNumber").text(data.phone_number);
          //  Service Category 
            if (data.is_h_s_supp === 1) {
                $("#txtHwSwSupply").text("Yes").css('background-color', '#2ca04a');
            
            } else {
                $("#txtHwSwSupply").text("No").css('background-color', '#ea2d2d');
            }
            if (data.is_dss === 1) { 
                $("#txtDcSupportService").text("Yes").css('background-color', '#2ca04a');

            } else {
                $("#txtDcSupportService").text("No").css('background-color', '#ea2d2d');
            }
            if (data.is_app_supp === 1) {
                $("#txtApplicationSupport").text("Yes").css('background-color', '#2ca04a');

            } else {
                $("#txtApplicationSupport").text("No").css('background-color', '#ea2d2d');
            }
            if (data.is_db_supp === 1) { 
                $("#txtDBSupport").text("Yes").css('background-color', '#2ca04a');

            } else {
                $("#txtDBSupport").text("No").css('background-color', '#ea2d2d');
            }
            if (data.is_ots === 1) { 
                $("#txtOneTimeServices").text("Yes").css('background-color', '#2ca04a');

            } else {
                $("#txtOneTimeServices").text("No").css('background-color', '#ea2d2d');
            }
            if (data.is_h_amc === 1) {
                $("#txtHardwareAmc").text("Yes").css('background-color', '#2ca04a');

            } else {
                $("#txtHardwareAmc").text("No").css('background-color', '#ea2d2d');
            }
            if (data.is_s_supp === 1) { 
                $("#txtServerSupport").text("Yes").css('background-color', '#2ca04a');

            } else {
                $("#txtServerSupport").text("No").css('background-color', '#ea2d2d');
            }
            if (data.is_a_v_supp === 1) { 
                $("#txtAudioVideoSupport").text("Yes").css('background-color', '#2ca04a');

            } else {
                $("#txtAudioVideoSupport").text("No").css('background-color', '#ea2d2d');
            }
            if (data.is_ess === 1) {
                $("#txtEusSupportServices").text("Yes").css('background-color', '#2ca04a');

            } else {
                $("#txtEusSupportServices").text("No").css('background-color', '#ea2d2d');
            }
            if (data.is_i_s_serv === 1) {
                $("#txtInfoSecService").text("Yes").css('background-color', '#2ca04a');

            } else {
                $("#txtInfoSecService").text("No").css('background-color', '#ea2d2d');
            }
            if (data.is_n_supp === 1) {
                $("#txtNetworkSupport").text("Yes").css('background-color', '#2ca04a');

            } else {
                $("#txtNetworkSupport").text("No").css('background-color', '#ea2d2d');
            }
            if (data.is_cctv_supp === 1) { 
                $("#txtCCTVSupport").text("Yes").css('background-color', '#2ca04a');

            } else {
                $("#txtCCTVSupport").text("No").css('background-color', '#ea2d2d');
            }
            if (data.is_oth_serv === 1) { 
                $("#txtOtherServices").text("Yes").css('background-color', '#2ca04a');

            } else {
                $("#txtOtherServices").text("No").css('background-color', '#ea2d2d');
            }
            $("#txtNotes").text(data.note); 

            $("#txtRiskAssesMentResult").text(data.risk_ass_mng_result);
            $("#txtRefrence").text(data.refrence);
            $("#txtTrackRecord").text(data.track_record);
           // $("#txtTrackRecord").val(data.creadit_rating).change();

            $('input[name=CreditRating]:checked').val(data.creadit_rating).select();


        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function UpdateSupplierManagements(supplier_id_pk) { 
    var parm = {
        "supplier_id_pk": supplier_id_pk, 
        "risk_ass_mng_result": $("#txtRiskAssesMentResult").val().trim(),
        "track_record": $("#txtTrackRecord").val().trim(),
        "refrence": $("#txtRefrence").val().trim(),
        "creadit_rating": $('input[name=CreditRating]:checked').val() //$("#ddlAssignTo option:selected").val().trim(),
       
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Supplier/UpdateSupplierManagements', 
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                CreateSuccess(data.status);
                $('#closedModel').click();
            } else {
                CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Not Update data");
        }
    });
};
// Insert Supplier Contact Details 
function InsSupplierContactDetails(supplier_id) { 
    var parm = {
        "supplier_id_fk": supplier_id,
        "name": $("#txtName").val().trim(),
        "email": $("#txtEmailId").val().trim(),
        "mobile_no": $("#txtMobileNo").val().trim(), 
        "address": $("#txtAddress").val().trim(), 
        "designation": $("#txtDesignation").val().trim()  
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Supplier/InsSupplierContactDetails',  
        success: function (data) {
            //alert("Inserted Successfully");
            if (data.status_id != 0) {
                //  alert(data.status);
                successnotify(data.status);
                $('#closedModel').click();
                $("#ClrSupplierContactDetails").find("input").val(""); 
                $("#ClrSupplierContactDetails").find("select").val(0).change();
            } else {
                // alert(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get Supplier Contact Details  
function GetSupplierContactDetails() { 
    var parm = {
        'supplier_id_fk': $.session.get("supplier_id_pk"),// $.session.get("asset_id_pk"); 
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Supplier/GetSupplierContactDetails',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            //alert(data.status);
            var table;
            if ($.fn.dataTable.isDataTable('#tblContactDetails')) {
                table = $('#tblContactDetails').DataTable();
            } else {
                table = $('#tblContactDetails').DataTable();
            }
            table.destroy();
            $("#tblContactDetails").DataTable({
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
                        data: 'supp_con_det_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (supp_con_det_id_pk) {
                            return '<input id="check" class="cb-element checkbox" name="' + supp_con_det_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    //{
                    //    data: 'supp_con_det_id_pk',
                    //    sWidth: '60px',
                    //    sClass: "view",
                    //    bSortable: false,
                    //    render: function (supp_con_det_id_pk) {
                    //        return '<a class="editview" href="/SupplierManagements/SupplierDetails"  name="' + supp_con_det_id_pk + '"> ' + supp_con_det_id_pk + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                    //    }
                    //},
                    //{ data: 'supplier_id_pk' },
                    { data: 'contact_person' },
                    { data: 'email' },
                    { data: 'phone_number' },
                    { data: 'address' },
                    { data: 'designation' }
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
