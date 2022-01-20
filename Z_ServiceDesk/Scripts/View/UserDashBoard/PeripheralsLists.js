$(document).ready(function () {
   // $(".open-left").click();
    //var id = $(this).attr("id");
    //var number = id.substring(1);
    var id = $.session.get("user_code");
    var number = id.substring(4);
   // alert(number);
    GetPeripheralsListByUserId(number);
    $(document).on('click', '.editview', function () {
        if ($.session.get("peripherals_id_pk") != '' || $.session.get("peripherals_id_pk") != null || $.session.get("peripherals_id_pk") == undefined) {
            $.session.remove("peripherals_id_pk");
            $.session.set("peripherals_id_pk", $(this).attr("name"));
        }

    });

});
function GetPeripheralsListByUserId(asset_user_id) {
    var parm = {
        'asset_user_id_pk': asset_user_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Peripherals/GetPeripheralsListByUserId', 
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            //alert(data.status);
            var table;
            if ($.fn.dataTable.isDataTable('#tblPeripherals')) {
                table = $('#tblPeripherals').DataTable();
            } else {
                table = $('#tblPeripherals').DataTable();
            }
            table.destroy();
            $("#tblPeripherals").DataTable({
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
                    //{
                    //    data: 'peripherals_id_pk',
                    //    sWidth: '2px',
                    //    sClass: "view",
                    //    bSortable: false,
                    //    render: function (peripherals_id_pk) {
                    //        return '<input id="checkbox0" name="' + peripherals_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                    //    }
                    //},
                    {
                        data: 'peripherals_id_pk',
                        sWidth: '40px',
                        sClass: "view",
                        bSortable: false,
                        render: function (peripherals_id_pk) {
                            return '<a href="/UserDashBoard/PeripheralsDetails" class="editview"  name="' + peripherals_id_pk + '"><i class="fa fa-flag fa-fw" data-toggle="tooltip" title="" style="color:#1a4ba9 !important" data-original-title="Normal priority"></i>  ' + peripherals_id_pk + '</a>';
                        }
                    },
                    { data: 'assets_tag', sWidth: '140px' }, 
                    { data: 'category_name' },
                    { data: 'asset_name' },
                    { data: 'model' },
                    { data: 'serial_number' },
                    { data: 'location_name' },
                    { data: 'status' },
                ],
                //  dom: 'Bfrtip',

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
                    //{
                    //    extend: 'csvHtml5',
                    //    text: '<i class="fa fa-file-text-o"></i>',
                    //    titleAttr: 'CSV'
                    //},
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