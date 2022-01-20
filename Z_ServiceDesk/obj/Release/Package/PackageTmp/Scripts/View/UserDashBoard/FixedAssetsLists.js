$(document).ready(function () {
   // $(".open-left").click();
    //var id = $(this).attr("id");
    //var number = id.substring(1);
    var id = $.session.get("user_code");
    var number = id.substring(4);
    //alert(number);
    GetAssetListByUserId(number);
    $(document).on('click', '.editview', function () {
        // alert($(this).attr("name"));
        if ($.session.get("asset_id_pk") != '' || $.session.get("asset_id_pk") != null || $.session.get("asset_id_pk") == undefined) {
            $.session.remove("asset_id_pk");
            $.session.set("asset_id_pk", $(this).attr("name"));
            //  window.open('/Inventry/FixedAssetsDetails');
        }

    });
    
});
function GetAssetListByUserId(asset_user) {
    var parm = {
        'asset_user_id': asset_user
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetListByUserId',  
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            //alert(data.status);
            var table;
            if ($.fn.dataTable.isDataTable('#tblFixedAsset')) {
                table = $('#tblFixedAsset').DataTable();
            } else {
                table = $('#tblFixedAsset').DataTable();
            }
            table.destroy();
            $("#tblFixedAsset").DataTable({
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
                    //    data: 'asset_id_pk',
                    //    sWidth: '2px',
                    //    sClass: "view",
                    //    bSortable: false,
                    //    render: function (asset_id_pk) {
                    //        return '<input id="checkbox0" class="cb-element checkbox" name="' + asset_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                    //    }
                    //},
                    {
                        data: 'asset_id_pk',
                        sWidth: '60px',
                        sClass: "view",
                        bSortable: false,
                        render: function (asset_id_pk) {
                            return '<a class="editview" href="/UserDashBoard/FixedAssetsDetails"  name="' + asset_id_pk + '"> <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i>  &nbsp;' + asset_id_pk + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    //{
                    //    data: 'asset_tag',
                    //    sWidth: '140px',
                    //    sClass: "view",
                    //    bSortable: false,
                    //    render: function (asset_id_pk) {
                    //        return '<a class="editview"  name="' + asset_id_pk + '"><i class="fa fa-flag fa-fw" data-toggle="tooltip" title="" style="color:#1a4ba9 !important" data-original-title="Normal priority"></i>  ' + asset_id_pk + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                    //    }
                    //},
                    { data: 'asset_tag', sWidth: '150px', }, 
                    { data: 'asset_cat_name' },
                    { data: 'asset_name' },
                    { data: 'model_name' },
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