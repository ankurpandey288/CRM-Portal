﻿$(document).ready(function () {
    GetPenalityList(null,null);
    $('#btnFilter').click(function () {
       // GetPenalityList($('#txtFromDatefltr').val(), $('#txtToDatefltr').val());
        fromdt = $('#txtFromDate').val();
        var todt = ''
        todt = $('#txtToDate').val();
        GetPenalityList(fromdt, todt);
    });
});
// Get Penality List
function GetPenalityList(fdate,tdate) {   
    //var fdate = ''
    //fdate = $('#txtFromDate').val();
    //var tdate = ''
    //tdate = $('#txtToDate').val();
   
    var parm = {
        'from_date': fdate,
        'to_date': tdate,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/SLA/GetPenalityReqList',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            //alert(data.status);
            var table;
            if ($.fn.dataTable.isDataTable('#tblPenalityServiceReq')) {
                table = $('#tblPenalityServiceReq').DataTable();
            } else {
                table = $('#tblPenalityServiceReq').DataTable();
            }
            table.destroy();
            $("#tblPenalityServiceReq").DataTable({
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
                    { data: 'serial_number' },
                    {
                        data: 'service_req_id_pk', render: function (service_req_id_pk, type, row) {
                            return '<a href="#" class="editview" name="' + service_req_id_pk + '">' + row.prefix + + row.service_req_id_pk + ' </a>';
                        }
                    },
                    {
                        "data": "created_date",
                        "type": "date",
                        "render":
                            function (data, type, full) {
                                return (data) ? moment(data).format('DD/MM/YYYY  -  HH:mm:ss') : '';
                            }
                    },
                    // { data: 'ticket_id_pk' },
                    { data: 'serverty' },
                    { data: 'non_negative' },
                   // { data: 'penality_per_hour' },
                    {
                        data: 'penality_per_hour', render: function (penality_per_hour, type, row) {
                            return '<a href="#" class="" name="' + penality_per_hour + '">' + ' INR ' + + row.penality_per_hour + '.00' + '</a>';
                        }
                    },
                  //  { data: 'total_penality'},
                    {
                        data: 'total_penality', render: function (total_penality, type, row) {
                            return '<a href="#" class="editview" name="' + total_penality + '">' + ' INR ' + + row.total_penality + '.00' + '</a>';
                        }
                    },
                   
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