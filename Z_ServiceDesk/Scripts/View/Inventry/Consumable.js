$(document).ready(function () {
    GetEmployees();
    GetStoredLocation();
    GetCategoryList();
    GetConsubaleLists();
    $("#btnSave").click(function () {
        if (validateareamaster() == true) {
            InsAllocateConsumableItem()
        } else {
            return false;
        }
    });
    $("#btnSubmit").click(function () {
       // alert("hello")
        if (validateareamasterALF() == true) {
            InsConsumableItem()
        } else {
            return false;
        }
    });
    $(".Category").change(function () {
        if ($(this).val() != 0) {
            GetItemList($(this).val());
        } else {
            $(".ItemName").html("").append('<option value="0">Select Item</option>');
        }
    });
});
function validateareamaster() {
    var return_val = true;
    if ($('#dllAllocateStoreLocation option:selected').val() == 0) {
        $('#SpnAllocateStoreLocation').show();
        return_val = false;
    } else {
        $('#SpnAllocateStoreLocation').hide();
    }
    if ($('#dllAllocateConCategory option:selected').val() == 0) {
        $('#SpnAllocateConCategory').show();
        return_val = false;
    } else {
        $('#SpnAllocateConCategory').hide();
    }
    if ($('#dllConItemDetails option:selected').val() == 0) {
        $('#SpnAllocateItemName').show();
        return_val = false;
    } else {
        $('#SpnAllocateItemName').hide();
    }
    if ($('#dllAllocateTo option:selected').val() == 0) {
        $('#SpnAllocateTo').show();
        return_val = false;
    } else {
        $('#SpnAllocateTo').hide();
    }
    if ($('#txtAllocationDate').val().trim() == "" || $('#txtAllocationDate').val() == null) {
        $('#SpnAllocationDate').show();
        return_val = false;
    } else {
        $('#SpnAllocationDate').hide();
    }
    if ($('#txtQty').val().trim() == "" || $('#txtQty').val() == null) {
        $('#SpnQty').show();
        return_val = false;
    } else {
        $('#SpnQty').hide();
    }
    return return_val;
};
function validateareamasterALF() {
    var return_val = true;
    if ($('#dllStoreLocation option:selected').val() == 0) {
        $('#SpnStoreLocation').show();
        return_val = false;
    } else {
        $('#SpnStoreLocation').hide();
    }
    if ($('#dllConCategory option:selected').val() == 0) {
        $('#SpnConCategory').show();
        return_val = false;
    } else {
        $('#SpnConCategory').hide();
    }
    if ($('#dllConItemName option:selected').val() == 0) {
        $('#SpnConItemName').show();
        return_val = false;
    } else {
        $('#SpnConItemName').hide();
    }
    
    //if ($('#txtConItemName').val().trim() == "" || $('#txtConItemName').val() == null) {
    //    $('#SpanConItemName').show();
    //    return_val = false;
    //} else {
    //    $('#SpanConItemName').hide();
    //}
    if ($('#txtConItemDetails').val().trim() == "" || $('#txtConItemDetails').val() == null) {
        $('#SpanConItemDetails').show();
        return_val = false;
    } else {
        $('#SpanConItemDetails').hide();
    }
    if ($('#txtConQty').val().trim() == "" || $('#txtConQty').val() == null) {
        $('#SpanConQty').show();
        return_val = false;
    } else {
        $('#SpanConQty').hide();
    }
    if ($('#txtConUnitPrice').val().trim() == "" || $('#txtConUnitPrice').val() == null) {
        $('#SpanConUnitPrice').show();
        return_val = false;
    } else {
        $('#SpanConUnitPrice').hide();
    }
    

    
    return return_val;
};

function GetEmployees() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Staff/GetUserLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            //$('#ddlUser').html("").append('<option value="0">Select User</option>');
            $("#dllAllocateTo").html("").append('<option value="0">Select </option>');
            $(data).each(function () {
                $('#dllAllocateTo').append('<option value=' + this.user_id_pk + '>' + this.user_name + '</option>');
                // $('#ddlUser').append('<option value=' + this.user_id_pk + '>' + this.user_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Stored Location
function GetStoredLocation() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Consumable/GetStoredLocation',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".StoreLocation").html("").append('<option value="0">Select Stored Location</option>');
            $(data).each(function () {
                $('.StoreLocation').append('<option value=' + this.stored_location_id_pk + '>' + this.stored_location_name + '</option>');
            });
            //$('#ddlRegisteredOfficeinState').val(10).change();
        },
        error: function (edata) {
            //$(edata).each(function () {
            //    InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            //});
            alert("error while feching record.");
        }
    });
};
//Get All Category Lists
function GetCategoryList() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Consumable/GetCategoryList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".Category").html("").append('<option value="0">Select Category</option>');
            $(data).each(function () {
                $('.Category').append('<option value=' + this.catogory_id_pk + '>' + this.category_name + '</option>');
            });
            //$('#ddlRegisteredOfficeinState').val(10).change();
        },
        error: function (edata) {
            //$(edata).each(function () {
            //    InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            //});
            alert("error while feching record.");
        }
    });
};
//Get All Item Lists
function GetItemList(category_id) {
    var parm = {
        "catogory_id_fk": category_id,
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Consumable/GetItemList',
        success: function (data) {
            $(".ItemName").html("").append('<option value="0">Select Item</option>');
            $(data).each(function () {
                $(".ItemName").append('<option value=' + this.item_id_pk + '>' + this.item_name + '</option>');
            });
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
function InsConsumableItem() { 
    var parm = {
        "stored_location_id_fk": $("#dllStoreLocation option:selected").val(),
        "stored_location": $("#dllStoreLocation option:selected").text(),        
        "category": $("#dllConCategory").val().trim(),
        "item_name": $("#dllConItemName").val().trim(),
        "item_details": $("#txtConItemDetails").val().trim(),
        "qty": $("#txtConQty").val().trim(),
        "unit_price": $("#txtConUnitPrice").val().trim(),        
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Consumable/InsConsumableItem',
        success: function (data) {
            //  alert("Inserted Successfully");           
            if (data.status_id == 0) {
                successnotify(data.status);
               
            } else {
                successnotify(data.status);              
                InsInsStockLedger($("#dllStoreLocation option:selected").val(), $("#dllConCategory").val().trim(), $("#dllConItemName").val().trim(), $("#txtConQty").val().trim(), null, 1);
                GetConsubaleLists();
                $("#ClrConsumable").find("input").val("");
                $("#ClrConsumable").find("select").val(0).change();
                $('#closedModel').click();
                
                //GetPickupBookingDetails();
            }
            //$("#divPickupInformation").find("input").val("");
            //getPickupInformation();
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
function InsAllocateConsumableItem() {
    var parm = {
        "stored_location_id_fk": $("#dllAllocateStoreLocation option:selected").val(),
        "category": $("#dllAllocateConCategory option:selected").val(),
        "item_name": $("#dllConItemDetails option:selected").val(),
        "employee_id_fk": $("#dllAllocateTo").val(),
        "allocate_date": $("#txtAllocationDate").val().trim(),
        "quantity": $("#txtQty").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Consumable/InsAllocateConsumableItem',
        success: function (data) {
            alert("Inserted Successfully");
            if (data.status_id == 0) {
                alert(data.status);
            } else {
                successnotify(data.status);
                InsInsStockLedger($("#dllAllocateStoreLocation option:selected").val(), $("#dllAllocateConCategory option:selected").val(), $("#dllConItemDetails option:selected").val(), null, $("#txtQty").val().trim(), 1)
                //GetPickupBookingDetails();
            }
            //$("#divPickupInformation").find("input").val("");
            //getPickupInformation();
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
function InsInsStockLedger(store_loc_id_fk, category_id_fk, item_id_fk, item_in, item_out, ref_id) {
    var parm = {
        "store_loc_id_fk": store_loc_id_fk,
        "category_id_fk": category_id_fk,
        "item_id_fk": item_id_fk,
        "item_in": item_in,
        "item_out": item_out,
        "ref_id": ref_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Consumable/InsStockLedger',
        success: function (data) {
           // alert("Inserted Successfully");
            if (data.status_id == 0) {
                successnotify(data.status);
            } else {
                warningnotify(data.status);
                
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
/////////////////////////////////////////////////////////
// Get Consumable Lists
function GetConsubaleLists() { 
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Consumable/GetConsumableLists',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblConsumableList')) {
                table = $('#tblConsumableList').DataTable();
            } else {
                table = $('#tblConsumableList').DataTable();
            }
            table.destroy();
            $("#tblConsumableList").DataTable({ 
                data: data,
                paging: true,
                sort: true,
                searching: true,
                order: [],
                ordering: true,
                lengthMenu: [
                [10, 25, 50, -1],
                ['10 rows', '25 rows', '50 rows', 'Show all']
                ],
                responsive: true,
                columns: [  
                    //{
                    //    data: 'soft_name_id_fk',
                    //    sWidth: '2px',
                    //    sClass: "view",
                    //    bSortable: false,
                    //    render: function (soft_name_id_fk) {
                    //        return '<input id="check" class="cb-element checkbox" name="' + soft_name_id_fk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                    //    }
                    //},
                      { data: 'store_loc_id_fk' },
                      { data: 'item_code' },
                      { data: 'stored_location_name' },
                      { data: 'category_name' },
                      { data: 'item_name' },                     
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
                //dom: 'Bfrtip',
                //buttons: [
                //    'copyHtml5',
                //    'excelHtml5',
                //    'csvHtml5',
                //    'pdfHtml5'
                //]
            });
        },

        error: function (edata) {
            alert("error while feching record.");
        }
    });
};


