$(document).ready(function () {
    //if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
    //    window.location.href = "/Login/Index/";
    //};
    GetLocation();
    //GetClientLists();
    $("#btnUpdate").attr("disabled", "disabled");
    
    $(document).on('click', '.btnedit', function () {
       // GetPreventiveMaintainanceActivityViewCheckList($(this).attr('name'));
    });
    $(document).on('click', '.btneditstatus', function () {
       // GetPreventiveMaintainanceActivityChangeStatus($(this).attr('name'));
    });
    $("#btnSubmit").click(function () {
        if (validateLocation() == true) {
           InsLocation();
        } else {
            return false;
        }
    });
    $("#CheckAll").click(function () {
        if ($(this).is(':checked')) {
            $("#btnSetAsDefault").removeAttr("disabled");
            $("#btnEdit").removeAttr("disabled"); 
        } else if (!$(this).is(':checked')) {
            $("#btnSetAsDefault").attr("disabled", "disabled");
            $("#btnEdit").attr("disabled", "disabled");
        }
        else {
            $("#btnSetAsDefault").attr("disabled", "disabled");
            $("#btnEdit").attr("disabled", "disabled");
        }
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $(document).on('click', '.cb-element', function () {
        if ($(this).is(':checked')) {
            $("#btnSetAsDefault").removeAttr("disabled");
            $("#btnEdit").removeAttr("disabled"); 
        } else if (!$(this).is(':checked')) {
            $("#btnSetAsDefault").attr("disabled", "disabled");
            $("#btnEdit").attr("disabled", "disabled");
        }
        else {
            $("#btnSetAsDefault").attr("disabled", "disabled");
            $("#btnEdit").attr("disabled", "disabled");
        }
    });
    $('#BtnDelete').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            DeleteLocation($(this).attr('name'));
        })
    });
    $('#btnSetAsDefault').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            InsSetAsDefaultLocation($(this).attr('name'));
        })
    });
});
function validateLocation() {
    var return_val = true;
    if ($('#txtLocation').val().trim() == "" || $('#txtLocation').val() == null) {
        $('#SpnLocation').show();
        return_val = false;
    } else {
        $('#SpnLocation').hide();
    }
   
    return return_val;
};
function InsLocation() {
    var parm = {
        "business_unit_id_fk": $("#ddlClient option:selected").val().trim(),
        "location_name": $("#txtLocation").val().trim()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/InsLocation',
        success: function (data) {
            if (data.status_id != 0) {
                successnotify(data.status);
                GetLocation();
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
// Get Location List 
function GetLocation() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/GetLocation',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblLocation')) {
                table = $('#tblLocation').DataTable();
            } else {
                table = $('#tblLocation').DataTable();
            }
            table.destroy();
            $("#tblLocation").DataTable({
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
                        data: 'location_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (location_id_pk) {
                            return '<input id="checkbox0" class="cb-element checkbox tktcbk" name="' + location_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'location_id_pk' },
                    { data: 'business_unit' },
                    { data: 'location_name' },
                    {
                        data: "is_default",
                        render: function (is_default) {
                            // Check if blank
                            if (is_default === 1) {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#029800;" name="' + status + '">' + "Yes" + '</span>';
                            } else {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d !important;" name="' + status + '">' + "No" + '</span>';
                            }
                        }
                    },
                ],
                //buttons: ['copy', 'excel', 'pdf', 'colvis']
                dom: 'Bflrtip',
                lengthChange: true,
                //buttons: ['copy', 'excel', 'pdf', 'colvis']
                buttons: [
                    {
                        extend: 'copyHtml5',
                        text: '<i class="fa fa-files-o fa-1x"></i>',
                        titleAttr: 'Copy'
                    },
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fa fa-file-excel-o fa-1x"></i>',
                        titleAttr: 'Excel'
                    },
                    {
                        extend: 'pdfHtml5',
                        text: '<i class="fa fa-file-pdf-o fa-1x"></i>',
                        titleAttr: 'PDF'
                    },
                    {
                        extend: 'colvis',
                        text: '<i class="fa fa-list fa-2x"></i>',
                        titleAttr: 'colvis'
                    },
                    //'colvis'
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
//Get Client Lists
function GetClientLists() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Change/GetBusinessUnit',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlClientFltr').html("").append('<option value="0">Select Clients</option>');
            $('#ddlClient').html("").append('<option value="0">Select Clients</option>');
            $(data).each(function () {
                $('#ddlClientFltr').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
                $('#ddlClient').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};   
function DeleteLocation(location_id) {
        var parm = {
            "location_id_pk": location_id
        };
        var josnstr = JSON.stringify(parm);
        $.ajax({
            type: "Post",
            contentType: "application/json; charset=utf-8",
            url: 'http://playmediahouse.com/api/api/Masters/DeleteLocationByID',
            data: josnstr,
            dataType: "json",
            success: function (data) {
                if (data.status_id == "1") {
                    DeleteSuccess(data.status);
                    GetLocation();

                } else {
                    DeleteSuccess(data.status);
                }
            },
            error: function (result) {
                alert("Error Occured");
            }
        });
};
// Location Set As Default 
function InsSetAsDefaultLocation(location_id) { 
    var parm = {
        "location_id_pk": location_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/InsSetAsDefaultLocation', 
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                successnotify(data.status);
                GetLocation();
            } else {
                successnotify(data.status);
            }
        },
        error: function (edata) {
            $(edata).each(function () {
                InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            });
            alert("error while Sending mail.");
        }
    });
};