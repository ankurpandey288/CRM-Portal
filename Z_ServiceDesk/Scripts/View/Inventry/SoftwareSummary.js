$(document).ready(function () {
    GetSoftwareLists();
});
// Get Software Lists
function GetSoftwareLists() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Software/GetSoftwareLists',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblSoftware')) {
                table = $('#tblSoftware').DataTable();
            } else {
                table = $('#tblSoftware').DataTable();
            }
            table.destroy();
            $("#tblSoftware").DataTable({
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
                        data: 'soft_name_id_fk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (soft_name_id_fk) {
                            return '<input id="check" class="cb-element checkbox" name="' + soft_name_id_fk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'serial_number' },
                    { data: 'location_name' },
                    { data: 'stored_location_name' },
                    { data: 'soft_category_name' },
                    { data: 'software_name' },
                    { data: 'allocated' },
                    { data: 'balance' },
                    { data: 'added' }
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