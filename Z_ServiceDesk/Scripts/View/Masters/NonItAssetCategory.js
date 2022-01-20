$(document).ready(function () {
    if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
        window.location.href = "/Login/Index/";
    };
    GetNonItAssetCategoryName();
    $("#btnUpdate").attr("disabled", "disabled");

    $(document).on('click', '.btnedit', function () {
        // GetPreventiveMaintainanceActivityViewCheckList($(this).attr('name'));
    });
    $(document).on('click', '.btneditstatus', function () {
        // GetPreventiveMaintainanceActivityChangeStatus($(this).attr('name'));
    });
    $("#btnSubmit").click(function () {
        if (validateNonITAssetCategory() == true) {
            InsNonItAssetCategoryName(); 
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
            DeleteCommonCategory($(this).attr('name'));
        })
    });
});
function validateNonITAssetCategory() { 
    var return_val = true;
    if ($('#txtNonITAssetCategory').val().trim() == "" || $('#txtNonITAssetCategory').val() == null) {
        $('#SpnNonITAssetCategory').show();
        return_val = false;
    } else {
        $('#SpnNonITAssetCategory').hide(); 
    }

    return return_val;
};
function InsNonItAssetCategoryName() {
    var parm = {
        "non_it_ass_cat_name": $("#txtNonITAssetCategory").val().trim() 
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/InsNonItAssetCategoryName',
        success: function (data) {
            if (data.status_id != 0) {
                successnotify(data.status);
                GetNonItAssetCategoryName();
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
// Get Non It Assets List 
function GetNonItAssetCategoryName() { 
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/GetNonItAssetCategoryName', 
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblNonITAssetCategory')) {
                table = $('#tblNonITAssetCategory').DataTable();
            } else {
                table = $('#tblNonITAssetCategory').DataTable();
            }
            table.destroy();
            $("#tblNonITAssetCategory").DataTable({
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
                        data: 'non_it_ass_cat_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (non_it_ass_cat_id_pk) {
                            return '<input id="checkbox0" name="' + non_it_ass_cat_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'non_it_ass_cat_id_pk' }, 
                    { data: 'non_it_ass_cat_name' } 
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
function DeleteCommonCategory(common_cat_id) {
    var parm = {
        "common_cat_id_pk": common_cat_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/DeleteCommonCategoryByID',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetCategoryName();

            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};