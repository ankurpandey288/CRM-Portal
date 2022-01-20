$(document).ready(function () {
    if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
        window.location.href = "/Login/Index/";
    };
    GetBusinessUnit();
    GetUser();
    $("#btnUpdate").attr("disabled", "disabled");

    $(document).on('click', '.btnedit', function () {
        // GetPreventiveMaintainanceActivityViewCheckList($(this).attr('name'));
    });
    $(document).on('click', '.btneditstatus', function () {
        // GetPreventiveMaintainanceActivityChangeStatus($(this).attr('name'));
    });
    $("#btnSubmit").click(function () {
        if (validateBusinesssssUnit() == true) {
            InsBusinessUnit();
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
            DeleteBusinessUnit($(this).attr('name'));
        });
    });
    $('#btnSetAsDefault').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            InsSetAsDefaultBusinessUnit($(this).attr('name')); 
        })
    });
});
function validateBusinesssssUnit() {
    var return_val = true;
    if ($('#txtBusinessUnit').val().trim() == "" || $('#txtBusinessUnit').val() == null) {
        $('#SpnBusinessUnit').show();
        return_val = false;
    } else {
        $('#SpnBusinessUnit').hide();
    }

    return return_val;
};
function InsBusinessUnit() {
    var parm = {
        "business_unit": $("#txtBusinessUnit").val().trim(),
        "business_head": $("#ddlBusinessHead option:selected").val().trim() 
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/InsBusinessUnit',
        success: function (data) {

            if (data.status_id != 0) {
                successnotify(data.status);
                GetBusinessUnit();
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
function GetBusinessUnit() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/GetBusinessUnit',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblBusinessUnits')) {
                table = $('#tblBusinessUnits').DataTable();
            } else {
                table = $('#tblBusinessUnits').DataTable();
            }
            table.destroy();
            $("#tblBusinessUnits").DataTable({
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
                        data: 'business_unit_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (business_unit_id_pk) {
                            return '<input id="checkbox0" class="cb-element checkbox tktcbk" name="' + business_unit_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'business_unit_id_pk' },
                    { data: 'business_unit' },
                    {
                        data: "is_default",
                        render: function (is_default) {
                            // Check if blank
                            if (is_default === 1) {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#029800;" name="' + status + '">' + "Yes" +'</span>';
                            }else  {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d !important;" name="' + status + '">' + "No" + '</span>';
                            }
                        }
                    },
                ],
               // dom: 'Bfrtip',
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
//Delete  Business Unit By Id
function DeleteBusinessUnit(business_unit_id) {
    var parm = { 
        "business_unit_id_pk": business_unit_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/DeleteBusinessUnitByID',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetBusinessUnit();

            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};
//Get All User Lists
function GetUser() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Staff/GetUserLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('.ddlUser').html("").append('<option value="0">Select</option>');
            $(data).each(function () {
                $('.ddlUser').append('<option value=' + this.user_id_pk + '>' + this.user_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Location Set As Default 
function InsSetAsDefaultBusinessUnit(business_unit_id) {  
    var parm = {
        "business_unit_id_pk": business_unit_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/InsSetAsDefaultBusinessUnit', 
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                successnotify(data.status);
                GetBusinessUnit();
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