$(document).ready(function () {
    if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
        window.location.href = "/Login/Index/";
    };
    GetKnowledgeBaseCategoryList();
    $("#btnCategory").click(function () {
        if (validateCategory() == true) {
            InsCategory();
        } else {
            return false;
        }
    });
    $("#CheckAll").click(function () {
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $("#CheckAllCategory").click(function () {
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#BtnDeleteCategory').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            DeleteKnowledgeBaseCategory($(this).attr('name'));
        });
    });
});
function validateCategory() {
    var return_val = true;
    if ($('#txtCategory').val().trim() == "" || $('#txtCategory').val() == null) {
        $('#SpnCategory').show();
        return_val = false;
    } else {
        $('#SpnCategory').hide();
    }
    return return_val;
};
function InsCategory() {
    var parm = {
        "category_name": $("#txtCategory").val().trim()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/KnowledgeBase/InsCategory',
        success: function (data) {
            // alert("Inserted Successfully");
            if (data.status_id != 0) {
                successnotify(data.status);
                GetKnowledgeBaseCategoryList();
            } else {
                warningnotify(data.status);
                // InsSLASchedule(data.sla_id_pk)
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get KnowledgeBase Category List 
function GetKnowledgeBaseCategoryList() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/KnowledgeBase/GetKnowledgeBaseCategoryList',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblKnowledgeBaseCategory')) {
                table = $('#tblKnowledgeBaseCategory').DataTable();
            } else {
                table = $('#tblKnowledgeBaseCategory').DataTable();
            }
            table.destroy();
            $("#tblKnowledgeBaseCategory").DataTable({
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
                        data: 'catogory_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (catogory_id_pk) {
                            return '<input id="checkbox0" name="' + catogory_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'category_name' }
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
function DeleteKnowledgeBaseCategory(catogory_id) {
    var parm = {
        "catogory_id_pk": catogory_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/KnowledgeBase/DeleteKnowledgeBaseCategoryByID',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetKnowledgeBaseCategoryList();
            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};
