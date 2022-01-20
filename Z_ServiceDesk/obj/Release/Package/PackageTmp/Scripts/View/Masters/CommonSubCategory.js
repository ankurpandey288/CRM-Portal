$(document).ready(function () {
    if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
        window.location.href = "/Login/Index/";
    };
    $("#btnUpdate").attr("disabled", "disabled");
    GetAllSubCategory();
    GetCategoryName();
   // GetStoreLocationAction();
    $(document).on('click', '.btnedit', function () {
        // GetPreventiveMaintainanceActivityViewCheckList($(this).attr('name'));
    });
    $(document).on('click', '.btneditstatus', function () {
        // GetPreventiveMaintainanceActivityChangeStatus($(this).attr('name'));
    });
    $("#btnSubmit").click(function () {
        if (validateCommonSubCategory() == true) {
            InsSubCategoryName();
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
            DeleteCommonSubCategory($(this).attr('name'));
        })
});
});
//Get All Holiday Calender Location
function GetCategoryName() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Masters/GetCategoryName',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlCommonCategory").html("").append('<option value="0">Select Location</option>');
            $(data).each(function () {
                $('#ddlCommonCategory').append('<option value=' + this.common_cat_id_pk + '>' + this.category_name + '</option>'); 
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function validateCommonSubCategory() {
    var return_val = true;
    if ($('#ddlCommonCategory option:selected').val() == 0) {
        $('#SpnCommonCategory').show();
        return_val = false;
    } else {
        $('#SpnCommonCategory').hide();
    }
    if ($('#txtCommonSubCategory').val().trim() == "" || $('#txtCommonSubCategory').val() == null) {
        $('#SpnCommonSubCategory').show();
        return_val = false;
    } else {
        $('#SpnCommonSubCategory').hide();
    }
    return return_val;
};
function InsSubCategoryName() {
    var parm = {
        "common_cat_id_fk": $("#ddlCommonCategory option:selected").val(),
        "sub_category_name": $("#txtCommonSubCategory").val()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/InsSubCategoryName',
        success: function (data) {
            if (data.status_id != 0) {
                successnotify(data.status);
                GetAllSubCategory();
                $('#closedModel').click();
            } else {
                warningnotify(data.status);
                GetAllSubCategory();
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get Store Location List 
function GetStoreLocation() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/GetStoreLocation',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblStoreLocation')) {
                table = $('#tblStoreLocation').DataTable();
            } else {
                table = $('#tblStoreLocation').DataTable();
            }
            table.destroy();
            $("#tblStoreLocation").DataTable({
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
                        data: 'stored_location_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (stored_location_id_pk) {
                            return '<input id="checkbox0" name="' + stored_location_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'stored_location_id_pk' },
                    { data: 'location_name' },
                    { data: 'stored_location_name' }
                ],
                dom: 'Bfrtip',
                buttons: [
                    'copyHtml5',
                    'excelHtml5',
                    'csvHtml5',
                    'pdfHtml5'
                ]
            });
        },

        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Get Store Location List For Action
function GetAllSubCategory() { 
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/GetAllSubCategory',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblCommonSubCategory')) {
                table = $('#tblCommonSubCategory').DataTable();
            } else {
                table = $('#tblCommonSubCategory').DataTable();
            }
            table.destroy();
            $("#tblCommonSubCategory").DataTable({
                data: data,
                paging: true,
                sort: false,
                searching: true,
                order: [],
                lengthMenu: [
                    [10, 25, 50, -1],
                    ['10 rows', '25 rows', '50 rows', 'Show all']
                ],
                responsive: true,
                columns: [
                    //{
                    //    data: 'stored_location_id_pk',
                    //    sWidth: '2px',
                    //    sClass: "view",
                    //    bSortable: false,
                    //    render: function (stored_location_id_pk) {
                    //        return '<a class="editview"  name="' + stored_location_id_pk + '"><i class="fa fa-flag fa-fw" data-toggle="tooltip" title="" style="color:#1a4ba9 !important" data-original-title="Normal priority"></i>  ' + stored_location_id_pk + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                    //    }
                    //},
                    {
                        data: 'sub_category_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (sub_category_id_pk) {
                            return '<input id="checkbox0" name="' + sub_category_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'sub_category_id_pk' },
                    { data: 'category_name' },
                    { data: 'sub_category_name' }
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
                //dom: 'Bfrtip',
                //buttons: [
                //    //'copyHtml5',
                //    //'excelHtml5',
                //    //'csvHtml5',
                //    //'pdfHtml5'
                //]
            });
        },

        error: function (edata) {
            alert("error while feching record.");
        }
    });
};

function DeleteCommonSubCategory(sub_category_id) { 
    var parm = {
        "sub_category_id_pk": sub_category_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/DeleteCommonSubCategoryByID',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetAllSubCategory();

            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};