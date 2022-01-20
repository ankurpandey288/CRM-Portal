$(document).ready(function () {
    if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
        window.location.href = "/Login/Index/";
    };
    //GetEmailConfig();
    $('.cb-element').click(function () {
        if (!$(this).is(':checked')) {
            return confirm("Are you sure?");
            alert("Value Checked");
        }
    });
    $("#BtnSubmit").click(function () {
        if (validateEmailTemplete() == true) { 
            InsEmailTemplete();
        } else {
            return false;
        }
    });
    $(document).on('click', '.cb-element', function () {
        if ($(this).is(':checked')) {
            //$("#btnEdit").show();
            $("#btnNew").attr("disabled", "disabled");
            $("#btnEdit").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnNew").removeAttr("disabled");
            $("#btnEdit").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            //$("#btnEdit").hide();
            //$("#btnNew").show();
        }
        else {
            $("#btnNew").removeAttr("disabled");
            $("#btnEdit").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            //$("#btnEdit").hide();
            //$("#btnNew").show();
        }
    });
    $("#CheckAll").click(function () {
        if ($(this).is(':checked')) {
            $("#btnEdit").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
            $("#btnNew").attr("disabled", "disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnEdit").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnNew").removeAttr("disabled");
        }
        else {
            $("#btnEdit").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnNew").removeAttr("disabled");
        }
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#BtnDelete').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            $("#btnEdit").hide();
            DeleteTechnician($(this).attr('name'));
            $(".cb-element").prop("checked", false);
        });
    });
    $('#btnEdit').click(function () {
        // var val = [];
        $(':checkbox:checked').each(function (i) {
            //  alert($(this).attr('name'));
            GetStaffDetails($(this).attr('name'));
            //  $('#ddlSupportGroup').val([1, 2, 3]).change();
            //  val[i] = $(this).val();
            //  $("#btnEdit").hide();
            ////  DeleteTechnician($(this).attr('name'));
            //  $(".cb-element").prop("checked", false);
        });
    });
    $("#ddlTempleteType").change(function () { 
        if ($(this).val() != 0) {
            GetTemplateDetails($(this).val()); 
        } else {
           
        }
    });
    $("#BtnUpdate").click(function () {
        UpdateEmailTemplete($("#ddlTempleteType option:selected").val());
        //if (validateEmailTemplete() == true) {
        //    UpdateEmailTemplete();
        //} else {
        //    return false;
        //}
    });
});

function validateEmailTemplete() { 
    var return_val = true;
    if ($('#ddlTempleteType option:selected').val() == 0) {
        $('#SpnTempleteType').show();
        return_val = false;
    } else {
        $('#SpnTempleteType').hide();
    }
    if ($('#txtTitle').val().trim() == "" || $('#txtTitle').val() == null) {
        $('#SpnTitle').show();
        return_val = false;
    } else {
        $('#SpnTitle').hide();
    }
    if ($('#txtSubject').val().trim() == "" || $('#txtSubject').val() == null) {
        $('#SpnSubject').show();
        return_val = false;
    } else {
        $('#SpnSubject').hide();
    }
    if ($('#txtMessage').val().trim() == "" || $('#txtMessage').val() == null) {
        $('#SpnMessage').show();
        return_val = false;
    } else {
        $('#SpnMessage').hide();
    }
    return return_val;
};
// Insert Email COnfiguration   
function InsEmailTemplete() {
    var parm = { 
        "templete_type": $("#ddlTempleteType option:selected").val(),
        "name": $("#txtTitle").val().trim(),
        "Description": $("#txtSubject").val().trim(),
        "isactive": $("#chkIsActive").is(":checked") == true ? 1 : 0, 
        "subject": $("#txtTitle").val().trim(),
        "Template": $("#txtMessage").val().trim() 

    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Utility/InsEmailTemplete', 
        success: function (data) {
            if (data.status_id != 0) {
                successnotify(data.status);
                $("#ClrEmailConfiguration").find("input").val("");
                $("#ClrEmailConfiguration").find("select").val(0).change();
                $('#closedModel').click();
            } else {
                // alert(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get Staff Lists 
function GetEmailConfig() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Utility/GetEmailConfig',
        dataType: "json",
        success: function (data) {
            //alert(data.status);
            var table;
            if ($.fn.dataTable.isDataTable('#tblStaff')) {
                table = $('#tblStaff').DataTable();
            } else {
                table = $('#tblStaff').DataTable();
            }
            table.destroy();
            $("#tblStaff").DataTable({
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
                        data: 'email_config_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (email_config_id_pk) {
                            return '<input id="check" class="cb-element checkbox" name="' + email_config_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'email_config_id_pk' },
                    { data: 'email_from_address' },
                    { data: 'email_from_name' },
                    { data: 'smtp_host' },
                    { data: 'smtp_port' },
                    { data: 'smtp_user_name' },
                    { data: 'smtp_authentication_domain' },
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
// Get Email Templete 
// Get Get Ticket Resolution Notes
function GetTemplateDetails(templete_type) {  
    var parm = {
        'templete_type': templete_type  // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Utility/GetTemplateDetails',  
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#txtTitle").val(data.subject);  
            $("#txtSubject").val(data.name);  
            $("#txtDesc").html(data.Template).text();
            $("#BtnUpdate").show();
            $("#BtnSubmit").hide();
            //$(".jqte-test").html(data.content); 
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Update Email COnfiguration   
function UpdateEmailTemplete(templete_type) { 
    var parm = {
        "templete_type": templete_type,
        "name": $("#txtTitle").val().trim(),
        "Description": $("#txtSubject").val().trim(),
        "isactive": $("#chkIsActive").is(":checked") == true ? 1 : 0,
        "subject": $("#txtTitle").val().trim(),
        "Template": $("#txtMessage").val().trim()

    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Utility/UpdateEmailTemplete',
        success: function (data) {
            if (data.status_id != 0) {
                successnotify(data.status);
                $("#ClrEmailConfiguration").find("input").val("");
                $("#txtDesc").val('');
                $("#ClrEmailConfiguration").find("select").val(0).change();
                $('#closedModel').click();
            } else {
                // alert(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};