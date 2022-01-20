$(document).ready(function () {
    GetPeripheralsCategory();
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
    $("#ddlCategory").change(function () {
        if ($(this).val() != 0) {
            GetPeripheralsPreventiveMaintenanceCheckList($(this).val());
        } else {
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
    if ($('#ddlCategory option:selected').val() == 0) {
        $('#SpnCategory').show();
        return_val = false;
    } else {
        $('#SpnCategory').hide();
    }

    return return_val;
};
//Get Asset Category Lists
function GetPeripheralsCategory() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Masters/GetPeripheralsCategory',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlCategory').html("").append('<option value="0">Select Peripherals Category</option>');
            $(data).each(function () {
                $('#ddlCategory').append('<option value=' + this.p_category_id_pk + '>' + this.category_name + '</option>');
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
            "periph_category_id_fk": $("#ddlCategory option:selected").val(),
            "check_list_content": $(this).find('td:eq(1)').find("input").val()  
        };
        var josnstr = JSON.stringify(parm);
        $.ajax({
            type: "Post",
            url: 'http://playmediahouse.com/api/api/PreventiveMaintenance/InsPeripheralsPreventiveMaintenanceCheckList',
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
// Get Ticket Lists 
function GetPeripheralsPreventiveMaintenanceCheckList(periph_category_id) {  
    var parm = {
        'periph_category_id_fk': periph_category_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/PreventiveMaintenance/GetPeripheralsPreventiveMaintenanceCheckList',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            //alert(data.status);
            var table;
            if ($.fn.dataTable.isDataTable('#tblPeripheralsPreventiveCheckList')) {
                table = $('#tblPeripheralsPreventiveCheckList').DataTable();
            } else {
                table = $('#tblPeripheralsPreventiveCheckList').DataTable();
            }
            table.destroy();
            $("#tblPeripheralsPreventiveCheckList").DataTable({ 
                data: data,
                paging: false,
                sort: false,
                searching: false,
                ordering: false,
                order: [],
                lengthMenu: [
                    [10, 25, 50, -1],
                    ['10 rows', '25 rows', '50 rows', 'Show all']
                ],
                responsive: true,
                columns: [
                    {
                        data: 'per_check_list_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (per_check_list_id_pk) {
                            return '<input id="check" class="cb-element checkbox feedback" name="' + per_check_list_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    //{
                    //    data: 'per_check_list_id_pk', render: function (per_check_list_id_pk, type, row) {
                    //        return ' <a href="#" title="Critical" class="editview"  name="' + per_check_list_id_pk + '">  <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Critical" style="color:#ea2d2d !important" title="Normal priority" data-original-title="Normal priority"></i>   &nbsp; <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp;' + row.prefix + + row.per_check_list_id_pk + ' </a>';
                    //}
                    //},
                    { data: 'per_check_list_id_pk' } ,
                    { data: 'check_list_content' } 
                ],
                //dom: 'Bflrtip',
                //buttons: [
                //    {
                //        extend: 'copyHtml5',
                //        text: '<i class="fa fa-files-o fa-2x"></i>',
                //        titleAttr: 'Copy'
                //    },
                //    {
                //        extend: 'excelHtml5',
                //        text: '<i class="fa fa-file-excel-o fa-2x" style="color:green"></i>',
                //        titleAttr: 'Excel'
                //    },
                //    {
                //        extend: 'pdfHtml5',
                //        text: '<i class="fa fa-file-pdf-o fa-2x" style="color:red"></i>',
                //        titleAttr: 'PDF'
                //    }
                //]
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};