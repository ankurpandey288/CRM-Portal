$(document).ready(function () {
    GetSoftwareComplianceLists();
});

function GetSoftwareComplianceLists() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Software/GetSoftwareComplianceLists',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblSoftwareCompliance')) { 
                table = $('#tblSoftwareCompliance').DataTable();
            } else {
                table = $('#tblSoftwareCompliance').DataTable();
            }
            table.destroy();
            $("#tblSoftwareCompliance").DataTable({
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
                    { data: 'soft_ass_con_id_pk' },
                    { data: 'soft_name' },
                    {
                        data: 'insalled_qty',
                        sWidth: '100px',
                        sClass: "view",
                        bSortable: false,
                        render: function (Insalled_Qty) {
                            return '<a class="editview" href="#" style="text-align:center;margin: 37px !important;"  name="' + Insalled_Qty + '"> ' + Insalled_Qty + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    {
                        data: 'purchased_qty',
                        sWidth: '100px',
                        sClass: "view",
                        bSortable: false,
                        render: function (purchased_qty) {
                            return '<a class="editview" href="#" style="text-align:center;margin: 37px !important;"  name="' + purchased_qty + '"> ' + purchased_qty + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    {
                        data: 'variance',
                        sWidth: '100px',
                        sClass: "view",
                        bSortable: false,
                        render: function (variance) {
                            return '<a class="editview" href="#" style="text-align:center;margin: 37px !important;"  name="' + variance + '"> ' + variance + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    //{ data: 'purchased_qty' },
                  //  { data: 'variance' },
                    {
                        data: "App_Control_Status",
                        render: function (App_Control_Status) {
                            // Check if blank
                            if (App_Control_Status === "Whitelisted") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#029800;margin-left: 116px;"  name="' + App_Control_Status + '">' + App_Control_Status + '</span>';
                            }
                            else if (App_Control_Status === "Blacklisted") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d !important;margin-left: 116px;" name="' + App_Control_Status + '">' + App_Control_Status + '</span>'; 
                            }
                        
                          
                        }
                    },
                   // { data: 'App_Control_Status' },
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