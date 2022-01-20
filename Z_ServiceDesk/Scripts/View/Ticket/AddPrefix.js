$(document).ready(function () {
    $("#btnSubmit").click(function () {
        if (validatePrefixValue() == true) {
           // InsAssetCategory()
        } else {
            return false;
        }
    });
    $("#CheckAll").click(function () {
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#BtnDelete').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            DeleteAssetCategory($(this).attr('name'));
        });
    });
});
function validatePrefixValue() { 
    var return_val = true;
    if ($('#txtPrefix').val().trim() == "" || $('#txtPrefix').val() == null) {
        $('#SpnPrefix').show();
        return_val = false;
    } else {
        $('#SpnPrefix').hide();
    }
    return return_val;
};
function InsAssetCategory() {
    debugger
    var parm = {
        "asset_cat_name": $("#txtAssetCategory").val().trim()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/InsAssetCategory',
        success: function (data) {
            if (data.status_id != 0) {
                successnotify(data.status);
                GetAssetCategory();
                $('#closedModel').click();
            } else {
                warningnotify(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
