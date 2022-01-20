$(document).ready(function () {
    $("#btnNew").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModal') }
        );
    });
    GetVIPUserLists();
    GetUser();
    $('#BtnUpdate').click(function () {
        UpdUserDetails();
    });
});
// Get Staff Lists 
function GetVIPUserLists() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Staff/GetVIPUserLists',
        dataType: "json",
        success: function (data) {
            //alert(data.status);
            var table;
            if ($.fn.dataTable.isDataTable('#tblStaff')) {
                table = $('#tblStaff').DataTable();
            } else {
                table = $('#tblStaff').DataTable();
            }
            table.destroy();
            $("#tblStaff").DataTable({
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
                        data: 'user_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (user_id_pk) {
                            return '<input id="check" class="cb-element checkbox" name="' + user_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'user_id_pk' },
                    { data: 'user_name' },
                    { data: 'email' },
                    { data: 'title' }
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
//Get All Non VIP User Lists
function GetUser() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Staff/GetNonVIPUserLists',
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
// Update User Details   
function UpdUserDetails() {
    var parm = {
        "user_id_pk": $("#ddlUser option:selected").val(),
        "is_vip": 1,
        "updated_by": $.session.get("id")
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Staff/UpdVipUser', 
        success: function (data) {
            if (data.status_id != 0) {
                CreateSuccess(data.status);
                $('#closedModel').click();
                GetVIPUserLists();
                $(".cb-element").prop("checked", false);
            } else {
                $('#closedModel').click();
                //CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};