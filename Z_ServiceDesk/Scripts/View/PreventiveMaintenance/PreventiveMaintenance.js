$(document).ready(function () {
    GetAssetCategory();
    $("#btnSubmit").click(function () {
        if (validatePreventiveMaintainance() == true) { 

        } else {
            return false;
        }
    });

});
function validatePreventiveMaintainance() { 
    var return_val = true;
    if ($('#txtSubject').val().trim() == "" || $('#txtSubject').val() == null) {
        $('#SpnSubject').show();
        return_val = false;
    } else {
        $('#SpnSubject').hide();
    }
    if ($('#ddlSubmittedBy option:selected').val() == 0) {
        $('#SpnSubmittedBy').show();
        return_val = false;
    } else {
        $('#SpnSubmittedBy').hide();
    }
    if ($('#ddlStatus option:selected').val() == 0) {
        $('#SpnStatus').show();
        return_val = false;
    } else {
        $('#SpnStatus').hide();
    }
    if ($('#ddlCategory option:selected').val() == 0) {
        $('#SpnCategory').show();
        return_val = false;
    } else {
        $('#SpnCategory').hide();
    }
    if ($('#ddlSubCategory option:selected').val() == 0) {
        $('#SpnSubCategory').show();
        return_val = false;
    } else {
        $('#SpnSubCategory').hide();
    }

    if ($('#ddlBusinessUnit option:selected').val() == 0) {
        $('#SpnBusinessUnit').show();
        return_val = false;
    } else {
        $('#SpnBusinessUnit').hide();
    }

    if ($('#ddlLocation option:selected').val() == 0) {
        $('#SpnLocation').show();
        return_val = false;
    } else {
        $('#SpnLocation').hide();
    }
    if ($('#ddlImpact option:selected').val() == 0) {
        $('#SpnImpact').show();
        return_val = false;
    } else {
        $('#SpnImpact').hide();
    }

    if ($('#ddlpriority option:selected').val() == 0) {
        $('#Spnpriority').show();
        return_val = false;
    } else {
        $('#Spnpriority').hide();
    }
    if ($('#ddlSupportDepartment option:selected').val() == 0) {
        $('#SpnSupportDepartment').show();
        return_val = false;
    } else {
        $('#SpnSupportDepartment').hide();
    }
    if ($('#ddlAssign option:selected').val() == 0) {
        $('#SpnAssign').show();
        return_val = false;
    } else {
        $('#SpnAssign').hide();
    }
    if ($('#ddlAsset option:selected').val() == 0) {
        $('#SpnAsset').show();
        return_val = false;
    } else {
        $('#SpnAsset').hide();
    }
    if ($('#ddlProject option:selected').val() == 0) {
        $('#SpnProject').show();
        return_val = false;
    } else {
        $('#SpnProject').hide();
    }
    if ($('#txtduedate').val().trim() == "" || $('#txtSubject').val() == null) {
        $('#Spnduedate').show();
        return_val = false;
    } else {
        $('#Spnduedate').hide();
    }
    if ($('#txtCCRecipients').val().trim() == "" || $('#txtSubject').val() == null) {
        $('#SpnCCRecipients').show();
        return_val = false;
    } else {
        $('#SpnCCRecipients').hide();
    }
    if ($('#txtDescription').val().trim() == "" || $('#txtSubject').val() == null) {
        $('#SpnDescription').show();
        return_val = false;
    } else {
        $('#SpnDescription').hide();
    }
    if ($('#txtNotification').val().trim() == "" || $('#txtSubject').val() == null) {
        $('#SpnNotification').show();
        return_val = false;
    } else {
        $('#SpnNotification').hide();
    }
    if ($('#txtChooseFile').val().trim() == "" || $('#txtSubject').val() == null) {
        $('#SpnChooseFile').show();
        return_val = false;
    } else {
        $('#SpnChooseFile').hide();
    }
    return return_val;
};
//Get Common Category Lists
function GetAssetCategory() { 
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetCategory',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
           
            $('#ddlAssetCategory').html("").append('<option value="0">Select Asset Category</option>');
            $(data).each(function () {
                $('#ddlAssetCategory').append('<option value=' + this.asset_category_id_pk + '>' + this.asset_cat_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};