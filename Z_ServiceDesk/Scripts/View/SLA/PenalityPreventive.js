$(document).ready(function () {
    debugger;
    // GetPenalityList(null, null);
    GetPenalityList(null, null);

    $('#btnFilter').click(function () {
        debugger;
        fromdt = $('#txtFromDate').val();
        var todt = ''
        todt = $('#txtToDate').val();
        GetPenalityList(fromdt, todt);
    });
});
function GetPenalityList(fdate, tdate) {
    //var fdate = null
    //fdate = $('#txtFromDate').val();
    //var tdate = null
    //tdate = $('#txtToDate').val();

    var parm = {
        'from_date': fdate,
        'to_date': tdate,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/SLA/GetPreventivePenality', 
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            //alert(data.status);
            var table;
            if ($.fn.dataTable.isDataTable('#tblPenality')) {
                table = $('#tblPenality').DataTable();
            } else {
                table = $('#tblPenality').DataTable();
            }
            table.destroy();
            $("#tblPenality").DataTable({
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
                    { data: 'p_m_activity_id_pk' },
                   // { data: 'created_date' },
                    {
                        "data": "created_date",
                        "type": "date",
                        "render":
                            function (data, type, full) {
                                return (data) ? moment(data).format('DD/MM/YYYY  -  HH:mm:ss') : '';
                            }
                    },
                    { data: 'asset_tag' },
                    { data: 'serial_number' },
                    { data: 'status' }, 
                    { data: 'penalty' }
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