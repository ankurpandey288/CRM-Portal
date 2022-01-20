$(document).ready(function () {
    GetAssetCategory();
    $("#btnSubmit").click(function () {
        if (validatePreventiveCheckList() == true) {
            InsPreventiveMaintenanceCheckList();
        } else {
            return false;
        }
    });
    $("#ddlAssetCategory").change(function () {
        if ($(this).val() != 0) {
           // GetPreventiveMaintenanceLists($(this).val());
            //alert($('option:selected', $(this)).text());
            //$('option:selected', $(this)).text();
            //$("#Category").append($('option:selected', $(this)).text());
        }
        else {
           
        }
    });

    //Add New Lines
    $("#AddNewLines").click(function () {
        if ($('#tbodyPreventiveMaintainanceCheckList tr').length < 10) {
            var trlength = ($('#tbodyPreventiveMaintainanceCheckList tr').length) + 1;
            var newline = ' <tr><td>' + trlength + '</td>';
            newline = newline + '<td><input type="text" class="form-control txtDescription"  placeholder="Check List"></td>';
            newline = newline + '<td><button  class="btn btn-danger btn-xs btnDeleteLine" name="' + trlength + '" data-toggle="tooltip" data-placement="top" title="delete Record details"><i class="fa fa-remove"></i></button></td></tr>';
            $("#tbodyPreventiveMaintainanceCheckList").append(newline);
            $("#spntfootExpenses").hide();

        } else {
            alert("Maxmimum 10 Record You Can Add");
        }
    });
    $(document).on('click', '.btnDeleteLine', function () {
        $("#ConfirmDeleteNewLinesModal").modal("show").find('#btnConfirmNewLinesDeleteYes').attr('name', $(this).attr('name'));
    });
    $("#btnConfirmNewLinesDeleteYes").click(function () {
        $(".btnDeleteLine[name=" + $("#btnConfirmNewLinesDeleteYes").attr('name') + "]").parent('td').parent('tr').remove();
        $(this).siblings('button').click();
        var trlength = 1;
        $('#tbodyPreventiveMaintainanceCheckList tr').each(function () {
            $(this).find('td:eq(0)').text(trlength);
            $(this).find('td:last').find('.btnDeleteLine').attr('name', trlength);
            $(this).find('td:eq(1)').find('.ddlAccountType').attr('id', 'ddlAccountType' + trlength);
            $(this).find('td:eq(3)').find('.txtAmount').attr('id', 'txtAmount' + trlength);
            trlength = trlength + 1;
        });
    });
});
function validatePreventiveCheckList() {
    var return_val = true;
    if ($('#ddlAssetCategory option:selected').val() == 0) {
        $('#SpnAssetCategory').show();
        return_val = false;
    } else {
        $('#SpnAssetCategory').hide();
    }
    
    return return_val;
};
//Get Asset Category Lists
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
function InsPreventiveMaintenanceCheckList() {
    var trcount = $('#tbodyPreventiveMaintainanceCheckList tr').length;
    $("#tbodyPreventiveMaintainanceCheckList tr").each(function () {
        var parm = {
            "asset_category_id_fk": $("#ddlAssetCategory option:selected").val().trim(),
            "check_list_content": $(this).find('td:eq(1)').find("input").val() // 
        };
        var josnstr = JSON.stringify(parm);
        $.ajax({
            type: "Post",
            url: 'http://playmediahouse.com/api/api/PreventiveMaintenance/InsPreventiveMaintenanceCheckList',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: josnstr,
            success: function (data) {
            // if (data.status_id != 0) {
            //    alert(data.status);
            //} else {
            //    alert(data.status);
            //}
                trcount = trcount - 1;
                if (trcount == 0) {
                    successnotify(data.status);
                }
            },
            error: function (result) {
                alert("Error : data");
            }
        });
    });
};
