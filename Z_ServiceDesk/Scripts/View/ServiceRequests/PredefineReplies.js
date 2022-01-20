$(document).ready(function () {
    if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
        window.location.href = "/Login/Index/";
    };
    GetPredefineReplyList();
    $('.cb-element').click(function () {
        if (!$(this).is(':checked')) {
            return confirm("Are you sure?");
            alert("Value Checked");
        }
    });
    $(document).on('click', '.cb-element', function () {
        if ($(this).is(':checked')) {
            $("#btnEdit").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
        }
        else {
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
        }

    });
    $("#CheckAll").click(function () {
        if ($(this).is(':checked')) {
            $("#btnEdit").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
        }
        else {
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
        }
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#BtnDelete').click(function () {
        var val = [];
        $('.cb-element:checked').each(function (i) {
            val[i] = $(this).val();
            DeletePredefineReplyByID($(this).attr('name')); 
            //$(".cb-element").prop("checked", false);
        });
    });
    $("#btnSubmit").click(function () {
        if (validatePredefineReplies() == true) {
            InsertPredefineReply();
        } else {
            return false;
        }
    });
    $("#btnEdit").click(function () {
        var val = [];
        $('.cb-element:checked').each(function (i) {
            val[i] = $(this).val();
            GetPredefineReplyForEdit($(this).attr('name')); 
        });
        $("#myModalLabelNew").hide(); $("#myModalLabelEdit").show();
        $("#btnSubmit").hide(); $("#btnUpdate").show();
    });
    $("#btnUpdate").click(function () {
        if (validatePredefineReplies() == true) { 
            alert("Hello");
            var val = [];
            $('.cb-element:checked').each(function (i) {
                val[i] = $(this).val();
                UpdatePredefineReply($(this).attr('name')); 
            });
        } else {
            return false;
        }
    });
});
function validatePredefineReplies() {
    var return_val = true;
    if ($('#txtName').val().trim() == "" || $('#txtName').val() == null) {
        $('#SpnName').show();
        return_val = false;
    } else {
        $('#SpnName').hide();
    }
    if ($('#txtContents').val().trim() == "" || $('#txtContents').val() == null) {
        $('#SpnContents').show();
        return_val = false;
    } else {
        $('#SpnContents').hide();
    }
    return return_val;
};
// Add New Tickets 
function InsertPredefineReply() {
    var parm = {
        "name": $("#txtName").val().trim(),
        "content": $("#txtContents").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/InsertPredefineReply',
        success: function (data) {
            if (data.status_id != 0) {
                successnotify(data.status);
                $("#ClrPredefineTicket").find("input").val("");
                $("#txtContents").val("");
                $('#closedModel').click();
                GetPredefineReplyList();
            } else {

            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get Predefine Reply List
function GetPredefineReplyList() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/GetPredefineReplyList',
        dataType: "json",
        success: function (data) {
            //alert(data.status);
            var table;
            if ($.fn.dataTable.isDataTable('#tblPredefineReply')) {
                table = $('#tblPredefineReply').DataTable();
            } else {
                table = $('#tblPredefineReply').DataTable();
            }
            table.destroy();
            $("#tblPredefineReply").DataTable({
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
                        data: 'p_def_r_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (p_def_r_id_pk) {
                            return '<input id="check" class="cb-element checkbox" name="' + p_def_r_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'p_def_r_id_pk' },
                    { data: 'content' }
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
function GetPredefineReplyForEdit(p_def_r_id) {
    var parm = {
        'p_def_r_id_pk': p_def_r_id   // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/GetPredefineReplyForEdit',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            //alert(data.mapping_priority_id_pk);
            $("#txtName").val(data.name).text();
            $("#txtContents").val(data.content).text();
           // $("#txtTempContent").html(data.message).text();
         
           
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Update Predefine Reply 
function UpdatePredefineReply(p_def_r_id) {
    var parm = {
        "p_def_r_id_pk": p_def_r_id,
        "name": $("#txtName").val(),
        "content": $("#txtContents").val(),
        "updated_by": 1 // $.session.get("id")
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/UpdatePredefineReply',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                CreateSuccess(data.status);
                $('#closedModel').click();
            } else {
                CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Not Update data");
        }
    });
};
//
function DeletePredefineReplyByID(p_def_r_id) {  
    var parm = {
        "p_def_r_id_pk": p_def_r_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/ServiceRequests/DeletePredefineReplyByID', 
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetPredefineReplyList(); 

            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};