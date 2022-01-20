$(document).ready(function () {
    if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
        window.location.href = "/Login/Index/";
    };
    GetCloserCode();
    $("#btnSubmit").click(function () { 
        if (validateCLoserCode() == true) { 
             InsCLoserCode()
        } else {
            return false;
        }
    });
    $("#CheckAll").click(function () {
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#BtnDelete').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            DeleteAssetCategory($(this).attr('name'));
        });
    });
});
function validateCLoserCode() {
    var return_val = true;
    if ($('#txtCLoserCode').val().trim() == "" || $('#txtCLoserCode').val() == null) {
        $('#SpnCLoserCode').show();
        return_val = false;
    } else {
        $('#SpnCLoserCode').hide(); 
    }
    return return_val;
};
function InsCLoserCode() {
    debugger
    var parm = {
        "closer_code": $("#txtCLoserCode").val().trim() 
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Ticket/InsertCLoserCode', 
        success: function (data) { 
            if (data.status_id != 0) {
                successnotify(data.status);
                $('#closedModel').click();
                GetCloserCode();
            } else {
                warningnotify(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get CLoser Code Lists  
function GetCloserCode() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Ticket/GetCloserCode', 
        dataType: "json",
        success: function (data) {


            //alert(data.status);
            var table;
            if ($.fn.dataTable.isDataTable('#tblCLoserCode')) {
                table = $('#tblCLoserCode').DataTable();
            } else {
                table = $('#tblCLoserCode').DataTable();
            }
            table.destroy();
            $("#tblCLoserCode").DataTable({
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
                        data: 'closer_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (closer_id_pk) {
                            return '<input id="check" class="cb-element servcbk" name="' + closer_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'closer_id_pk' },
                    { data: 'closer_code' } 
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
