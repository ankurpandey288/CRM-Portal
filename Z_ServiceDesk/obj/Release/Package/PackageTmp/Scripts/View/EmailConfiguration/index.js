$(document).ready(function () {
    if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
        window.location.href = "/Login/Index/";
    };
    GetEmailConfig();
    $('.cb-element').click(function () {
        if (!$(this).is(':checked')) {
            return confirm("Are you sure?");
            alert("Value Checked");
        }
    });
    $("#BtnSubmit").click(function () {
        if (validateEmailConfiguration() == true) {
            InsEmailConfiguration();
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


});

function validateEmailConfiguration() {
    var return_val = true; 
    
    if ($('#txtEmailFromAddress').val().trim() == "" || $('#txtEmailFromAddress').val() == null) {
        $('#SpnEmailFromAddress').show();
        return_val = false;
    } else {
        $('#SpnEmailFromAddress').hide();
    }
    if ($('#txtEmailFromAddressName').val().trim() == "" || $('#txtEmailFromAddressName').val() == null) {
        $('#SpnEmailFromAddressName').show();
        return_val = false;
    } else {
        $('#SpnEmailFromAddressName').hide();
    }
    if ($('#txtSMTPHOST').val().trim() == "" || $('#txtSMTPHOST').val() == null) {
        $('#SpnSMTPHOST').show();
        return_val = false;
    } else {
        $('#SpnSMTPHOST').hide();
    }
    if ($('#txtSMTPPort').val().trim() == "" || $('#txtSMTPPort').val() == null) {
        $('#SpnSMTPPort').show();
        return_val = false;
    } else {
        $('#SpnSMTPPort').hide();
    }
    if ($('#txtSMTPUserName').val().trim() == "" || $('#txtSMTPUserName').val() == null) {
        $('#SpnSMTPUserName').show();
        return_val = false;
    } else {
        $('#SpnSMTPUserName').hide();
    }
    if ($('#txtSMTPPassword').val().trim() == "" || $('#txtSMTPPassword').val() == null) {
        $('#SpnSMTPPassword').show();
        return_val = false;
    } else {
        $('#SpnSMTPPassword').hide();
    }
    if ($('#ddlSMTPSecurity option:selected').val() == 0) {
        $('#SpnSMTPSecurity').show();
        return_val = false;
    } else {
        $('#SpnSMTPSecurity').hide();
    }
    if ($('#txtSMTPAuthenticationDomain').val().trim() == "" || $('#txtSMTPAuthenticationDomain').val() == null) {
        $('#SpnSMTPAuthenticationDomain').show();
        return_val = false;
    } else {
        $('#SpnSMTPAuthenticationDomain').hide();
    }
    return return_val;
};
// Insert Email COnfiguration   
function InsEmailConfiguration() {
    var parm = {
        "email_from_address": $("#txtEmailFromAddress").val().trim(),
        "email_from_name": $("#txtEmailFromAddressName").val().trim(),
        "smtp_host": $("#txtSMTPHOST").val().trim(),
        "smtp_port": $("#txtSMTPPort").val().trim(),
        "smtp_user_name": $("#txtSMTPUserName").val().trim(),
        "smtp_password": $("#txtSMTPPassword").val().trim(),
        "smtp_security": $("#ddlSMTPSecurity option:selected").text().trim(),
        "smtp_authentication_domain": $("#txtSMTPAuthenticationDomain").val().trim(),
        "is_smtp_req_auth": $("#chkSMTPRAuth").is(":checked") == true ? 1 : 0,
        "updated_by": $.session.get("id")
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Utility/InsEmailConfiguration', 
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

