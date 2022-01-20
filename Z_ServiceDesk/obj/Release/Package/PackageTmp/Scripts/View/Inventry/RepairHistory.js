$(document).ready(function () {
    GetRepairHistoryLists();
});

// Get Ticket Lists 
function GetRepairHistoryLists() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetRepairHistoryLists',
        dataType: "json",
        success: function (data) {


            //alert(data.status);
            var table;
            if ($.fn.dataTable.isDataTable('#tblRepairHistory')) {
                table = $('#tblRepairHistory').DataTable();
            } else {
                table = $('#tblRepairHistory').DataTable();
            }
            table.destroy();
            $("#tblRepairHistory").DataTable({
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
                
                    { data: 'asset_id_pk' },
                    { data: 'asset_name' },
                    { data: 'status' },
                   
                  
                    
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
