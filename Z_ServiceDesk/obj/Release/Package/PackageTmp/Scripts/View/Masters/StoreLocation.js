$(document).ready(function () {
    if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
        window.location.href = "/Login/Index/";
    };
    $("#btnUpdate").attr("disabled", "disabled");
    GetStoreLocation();
    GetLocation();
    GetStoreLocationAction();
    $(document).on('click', '.btnedit', function () {
       // GetPreventiveMaintainanceActivityViewCheckList($(this).attr('name'));
    });
    $(document).on('click', '.btneditstatus', function () {
       // GetPreventiveMaintainanceActivityChangeStatus($(this).attr('name'));
    });
    $("#btnSubmit").click(function () {
        if (validateStoreLocation() == true) {
           InsStoreLocation();
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
            DeleteStoreLocation($(this).attr('name')); 
        })
    });
});
//Get All Holiday Calender Location
function GetLocation() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Masters/GetLocation',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlLocation").html("").append('<option value="0">Select Location</option>');
            $(data).each(function () {
                $('#ddlLocation').append('<option value=' + this.location_id_pk + '>' + this.location_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function validateStoreLocation() {
    var return_val = true;
    if ($('#ddlLocation option:selected').val() == 0) {
        $('#SpnLocation').show();
        return_val = false;
    } else {
        $('#SpnLocation').hide();
    }
    if ($('#txtStoreLocation').val().trim() == "" || $('#txtStoreLocation').val() == null) {
        $('#SpnStoreLocation').show();
        return_val = false;
    } else {
        $('#SpnStoreLocation').hide();
    }
    return return_val;
};
function InsStoreLocation() { 
    var parm = {
        "location_id_fk": $("#ddlLocation option:selected").val().trim(),
        "stored_location_name": $("#txtStoreLocation").val().trim()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/InsStoreLocation',
        success: function (data) {
            if (data.status_id != 0) {
                successnotify(data.status);
                GetStoreLocation();
                $('#closedModel').click();
            } else {
                warningnotify(data.status);
                GetStoreLocation();
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
                //    'copyHtml5',
                //    'excelHtml5',
                //    'csvHtml5',
                //    'pdfHtml5'
                //]
            });
        },

        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Get Store Location List For Action
function GetStoreLocationAction() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/GetStoreLocation',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblStoreLocationAction')) {
                table = $('#tblStoreLocationAction').DataTable();
            } else {
                table = $('#tblStoreLocationAction').DataTable();
            }
            table.destroy();
            $("#tblStoreLocationAction").DataTable({
                data: data,
                paging: true,
                sort: true,
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
                        data: 'stored_location_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (stored_location_id_pk) {
                            return '<button class="btn btn-xs btn-success grid-buttons btnedit" name="' + stored_location_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'stored_location_id_pk' },
                    { data: 'location_name' },
                    { data: 'stored_location_name' }
                ],
                dom: 'Bfrtip',
                buttons: [
                    //'copyHtml5',
                    //'excelHtml5',
                    //'csvHtml5',
                    //'pdfHtml5'
                ]
            });
        },

        error: function (edata) {
            alert("error while feching record.");
        }
    });
};

function DeleteStoreLocation(stored_location_id) {
    var parm = {
        "stored_location_id_pk": stored_location_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/DeleteStoreLocationByID',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetStoreLocation();
            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};