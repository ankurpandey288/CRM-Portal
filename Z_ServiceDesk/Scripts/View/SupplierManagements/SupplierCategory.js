$(document).ready(function () {
    if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
        window.location.href = "/Login/Index/";
    };
    GetSupplierCategoryLists();
    $('.cb-element').click(function () {
        if (!$(this).is(':checked')) {
            return confirm("Are you sure?");
            alert("Value Checked");
        }
    });
    $(document).on('click', '.cb-element', function () {
        if ($(this).is(':checked')) {
            $("#btnEdit").show();
            $("#btnNew").hide();
            $("#btnAssignTo").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnEdit").hide();
            $("#btnNew").show();
        }
        else {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnEdit").hide();
            $("#btnNew").show();
        }
        // alert($(this).attr("name"));
        //if ($.session.get("ticket_id_pk") != '' || $.session.get("ticket_id_pk") != null || $.session.get("ticket_id_pk") == undefined) {
        //    $.session.remove("ticket_id_pk");
        //    $.session.set("ticket_id_pk", $(this).attr("name"));
        //    window.open('/Ticket/TicketDetails');
        //}

    });

    $("#CheckAll").click(function () {
        if ($(this).is(':checked')) {
            $("#btnAssignTo").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
            $("#btnEdit").show();
            $("#btnNew").hide();
        } else if (!$(this).is(':checked')) {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnEdit").hide();
            $("#btnNew").show();
        }
        else {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnEdit").hide();
            $("#btnNew").show();
        }
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#BtnDelete').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            $("#btnEdit").hide();
            deleteTicket($(this).attr('name'));
            $(".cb-element").prop("checked", false);
            //  alert($(this).val());
        });
    });
    $("#btnSubmit").click(function () {
        if (validateSupplierCategory() == true) {
            InsSupplierCategory();
        } else {
            return false;
        }
    });
   
});
function validateSupplierCategory() { 
    var return_val = true;
    if ($('#txtCategoryName').val().trim() == "" || $('#txtCategoryName').val() == null) {
        $('#SpnCategoryName').show();
        return_val = false;
    } else {
        $('#SpnCategoryName').hide();
    }
    return return_val;
};
// Insert Supplier Category 
function InsSupplierCategory() {
    var parm = {
        "category_name": $("#txtCategoryName").val().trim() 
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Supplier/InsSupplierCategory',
        success: function (data) {
            //alert("Inserted Successfully");
            if (data.status_id != 0) {
                //  alert(data.status);
                successnotify(data.status);
                GetSupplierCategoryLists();
            } else {
                // alert(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get Supplier Category Lists 
function GetSupplierCategoryLists() {
    $.ajax({ 
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Supplier/GetSupplierCategoryLists', 
        dataType: "json",
        success: function (data) {


            //alert(data.status);
            var table;
            if ($.fn.dataTable.isDataTable('#tblSupplierCategory')) {
                table = $('#tblSupplierCategory').DataTable();
            } else {
                table = $('#tblSupplierCategory').DataTable();
            }
            table.destroy();
            $("#tblSupplierCategory").DataTable({
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
                        data: 'sup_category_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (sup_category_id_pk) {
                            return '<input id="check" class="cb-element checkbox" name="' + sup_category_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'sup_category_id_pk' },
                    { data: 'category_name' },
                   
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