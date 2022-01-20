$(document).ready(function () {
    GetSupplierDetails();
    GetContractManagementList();
    var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');
    allWells.hide();
    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });
    allNextBtn.click(function () {
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
            if (!curInputs[i].validity.valid) {
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });
    $('div.setup-panel div a.btn-primary').trigger('click');
    $("#btnSubmit").click(function () {
        if (validateContract() == true) {
            InsContractManagement();
        } else {
            return false;
        }
    });
});
// Validate Contract  
function validateContract() { 
    var return_val = true;
    if ($('#txtContractId').val().trim() == "" || $('#txtContractId').val() == null) {
        $('#SpnContractId').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnContractId').hide();
    }
    if ($('#txtContractTitle').val().trim() == "" || $('#txtContractTitle').val() == null) {
        $('#SpnContractTitle').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnContractTitle').hide();
    }
    if ($('#ddlSupplierName option:selected').val() == 0) {
        $('#SpnSupplierName').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnSupplierName').hide();
    }
    if ($('#ddlReviewPeriod option:selected').val() == 0) {
        $('#SpnReviewPeriod').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnReviewPeriod').hide();
    }
    if ($('#txtScopeOfwork').val().trim() == "" || $('#txtScopeOfwork').val() == null) {
        $('#SpnScopeOfwork').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnScopeOfwork').hide();
    }
    if ($('#txtServiceDiscription').val().trim() == "" || $('#txtServiceDiscription').val() == null) {
        $('#SpnServiceDiscription').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnServiceDiscription').hide();
    }
    if ($('#txtStartDate').val().trim() == "" || $('#txtStartDate').val() == null) {
        $('#SpnStartDate').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnStartDate').hide();
    }
    if ($('#txtEndDate').val().trim() == "" || $('#txtEndDate').val() == null) {
        $('#SpnEndDate').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnEndDate').hide();
    }
    if ($('#ddlContractRiskRating option:selected').val() == 0) {
        $('#SpnContractRiskRating').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnContractRiskRating').hide();
    }
    if ($('#txtTotalCost').val().trim() == "" || $('#txtTotalCost').val() == null) {
        $('#SpnTotalCost').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnTotalCost').hide();
    }
    if ($('#txtTermsCondition').val().trim() == "" || $('#txtTermsCondition').val() == null) {
        $('#SpnTermsCondition').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnTermsCondition').hide();
    }
    if ($('#txtPaymentTerms').val().trim() == "" || $('#txtPaymentTerms').val() == null) {
        $('#SpnPaymentTerms').show();
        RequiredField("Please Check Required Field");
        return_val = false;
    } else {
        $('#SpnPaymentTerms').hide();
    }
    return return_val;
};
//Get All Supplier (Vendor) Lists
function GetSupplierDetails() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Supplier/GetSupplierDetails',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlSupplierName').html("").append('<option value="0">Select Vendor</option>');
            $(data).each(function () {
                $('#ddlSupplierName').append('<option value=' + this.supplier_id_pk + '>' + this.supplier_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Insert Supplier Details 
function InsContractManagement() {  
    var parm = {
        "contract_id": $("#txtContractId").val().trim(),
        "title": $("#txtContractTitle").val().trim(),
        "supplier_id_pk": $("#ddlSupplierName option:selected").val().trim(),
        "service_review_period": $("#ddlReviewPeriod option:selected").val().trim(),
        "scope_of_work": $("#txtScopeOfwork").val().trim(),
        "service_discription": $("#txtServiceDiscription").val().trim(),
        "start_date": $("#txtStartDate").val().trim(),
        "end_date": $("#txtEndDate").val().trim(),
        "attach_po_name": $("#AttachPo").val().trim(),
        "attach_contract": $("#AttachContract").val().trim(),
        "contract_risk_rating": $("#ddlContractRiskRating option:selected").val().trim(),
        "total_cost": $("#txtTotalCost").val().trim(),
        "terms_condition": $("#txtTermsCondition").val().trim(),
        "payment_terms": $("#txtPaymentTerms").val().trim(),
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
        url: 'http://playmediahouse.com/api/api/Commonapi/InsContractManagement',
        success: function (data) {
            //alert("Inserted Successfully");
            if (data.status_id != 0) {
                //  alert(data.status);
                successnotify(data.status);
                $('#closedModel').click();
                $("#ClrSupplier").find("input").val("");
                $("#ClrSupplier").find("select").val(0).change(); 
                //GetSupplierDetails();
            } else {
                // alert(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get Contract ManagementList
function GetContractManagementList() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Commonapi/GetContractManagementList',
        dataType: "json",
        success: function (data) {
            //alert(data.status);
            var table;
            if ($.fn.dataTable.isDataTable('#tblContractManagementList')) {
                table = $('#tblContractManagementList').DataTable();
            } else {
                table = $('#tblContractManagementList').DataTable();
            }
            table.destroy();
            $("#tblContractManagementList").DataTable({
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
                        data: 'contract_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (contract_id_pk) {
                            return '<input id="check" class="cb-element checkbox" name="' + contract_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    {
                        data: 'contract_id_pk',
                        sWidth: '60px',
                        sClass: "view",
                        bSortable: false,
                        render: function (contract_id_pk) {
                            return '<a class="editview" href="#"  name="' + contract_id_pk + '"> ' + contract_id_pk + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'title' },
                    { data: 'start_date' },
                    { data: 'end_date' },
                    { data: 'contract_risk_rating' },
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