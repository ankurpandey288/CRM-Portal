$(document).ready(function () {
    GetAutoDiscoverdLists();
    $("#btnSave").click(function () {
        if (validateareamaster() == true) {
         //   InsAllocateConsumableItem()
        } else {
            return false;
        }
    });
    $("#btnSubmit").click(function () {
        // alert("hello")
        if (validateareamasterALF() == true) {
          //  InsConsumableItem()
        } else {
            return false;
        }
    });
    $(".Category").change(function () {
        if ($(this).val() != 0) {
          //  GetItemList($(this).val());
        } else {
            $(".ItemName").html("").append('<option value="0">Select Item</option>');
        }
    });
    $(document).on('click', '.cb-element', function () {
        if ($(this).is(':checked')) {
            $("#btnEdit").show();
            //$("#btnNew").hide();
            $("#btnNew").attr("disabled", "disabled");
            $("#btnAssignTo").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnNew").removeAttr("disabled");
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnEdit").hide();
            //$("#btnNew").show();
        }
        else {
            $("#btnNew").removeAttr("disabled");
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnEdit").hide();
            //$("#btnNew").show();
        }


    });
    $('#BtnDelete').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            DeleteAutoDiscovery($(this).attr('name'));
            $(".cb-element").prop("checked", false);
           
        });
    });

    $("#CheckAll").click(function () {
        if ($(this).is(':checked')) {
            $("#btnNew").attr("disabled", "disabled");
            $("#btnAssignTo").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
            $("#btnEdit").show();
            //$("#btnNew").hide();
        } else if (!$(this).is(':checked')) {
            $("#btnNew").removeAttr("disabled");
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnEdit").hide();
            //$("#btnNew").show();
        }
        else {
            $("#btnNew").removeAttr("disabled");
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnEdit").hide();
            //$("#btnNew").show();
        }
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
});
function GetAutoDiscoverdLists() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/AutoDiscovered/GetAutoDiscoverdLists',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblAutoDiscovery')) {
                table = $('#tblAutoDiscovery').DataTable();
            } else {
                table = $('#tblAutoDiscovery').DataTable();
            }
            table.destroy();
            $("#tblAutoDiscovery").DataTable({
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
                        data: 'ID',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (ID) {
                            return '<input id="check" class="cb-element checkbox" name="' + ID + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'ID' },
                    { data: 'SerialNo' },
                    { data: 'HostName' },
                    { data: 'OS' },
                    { data: 'IP' },
                    { data: 'MACAddress' },
                    { data: 'lu_date' }
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
function DeleteAutoDiscovery(ID) {
    var parm = {
        "ID": ID
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/AutoDiscovered/DeleteAutoDiscoveryByID', 
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetAutoDiscoverdLists();

            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};
