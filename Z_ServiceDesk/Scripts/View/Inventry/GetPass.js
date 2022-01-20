$(document).ready(function () {
    
    var gatepassid = 0;
   
    GetBusinessUnit();
    GetAssetList();
    GetGetPassAddress();
    GetGatePassLists();
    GetEmployeesLists();
    $('#ddlAssetStatusChange').change(function () {
        if ($(this).val() == 2) {
            GetStatus();
            $("#ddlAssetStatus").removeAttr("disabled");
        } else {
            $('#ddlAssetStatus').html("").append('<option value="0">Select Status</option>');
            $("#ddlAssetStatus").attr("disabled", "disabled");
        }
    });
    $("#ddlGatePassType").change(function () {
        if ($(this).val() == 1) {
            alert($(this).val());
            $("#txtExpectedDateofReturn").removeAttr("disabled");
        } else {
            alert($(this).val());
            $("#txtExpectedDateofReturn").attr("disabled", "disabled");
        }
    });
    $('#ddlApprovalRequired').change(function () {
        if ($(this).val() == 2) {
            $(".LstOrNotLst").show();
        } else {
            $(".LstOrNotLst").hide();
        }
    });
    $('.cb-element').click(function () {
        if (!$(this).is(':checked')) {
            return confirm("Are you sure?");
            alert("Value Checked");
        }
    });
    $(document).on('click', '.cb-element', function () {
        if ($(this).is(':checked')) {
            $("#btnEdit").removeAttr("disabled");
            $("#btnPrintGatePass").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnPrintGatePass").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
        }
        else {
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnPrintGatePass").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
        }
    });
    $("#CheckAll").click(function () {
        if ($(this).is(':checked')) {
            $("#btnEdit").removeAttr("disabled");
            $("#btnPrintGatePass").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnPrintGatePass").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
        }
        else {
            $("#btnEdit").attr("disabled", "disabled");
            $("#btnPrintGatePass").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
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
    $("#CheckAllStatus").click(function () {
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#btnStatusUpdate').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            UpdateTicketStatus($(this).attr('name'));
            $(".cb-element").prop("checked", false);
        });
    });
    $("#CheckAllAsignTo").click(function () {
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#btnPrintGatePass').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            alert($(this).attr('name'));
            if ($.session.get("gate_pass_id_pk") != '' || $.session.get("gate_pass_id_pk") != null || $.session.get("gate_pass_id_pk") == undefined) {
                $.session.remove("gate_pass_id_pk");
                $.session.set("gate_pass_id_pk", $(this).attr("name"));
                window.open('/Inventry/PrintGatePass');
            }
        });
    });
    $("#ddlSupportGroup").change(function () {
        if ($(this).val() != 0) {
            GetEmployeeListSGD($(this).val());
        } else {
            $("#ddlAssign").html("").append('<option value="0">Select Employee</option>');
        }
    });
    $("#btnEdit").click(function () {
        var val = [];
        $('.gatepass:checked').each(function (i) {
            val[i] = $(this).val();
            GetGatePassDetails($(this).attr('name'));
            alert($(this).attr('name'));
        });
        $("#btnSubmit").hide();
        $("#btnUpdate").show();
        //  alert($(this).attr('name'));

    });
    $("#btnSubmit").click(function () {
        if (validateGatePass() == true) {
            var asstag = [];
            $.each($("#ddlAssets option:selected"), function () {
                asstag.push($(this).text());
            });
            var appid = [];
            $.each($("#ddlOtherApprover option:selected"), function () {
                appid.push($(this).text());
            });
            InsGatePass(asstag.join(","),appid.join(","));
        } else {
            return false;
        }
    });
    $("#btnUpdate").click(function () {
        if (validateGatePass() == true) {
            var asstag = [];
            $.each($("#ddlAssets option:selected"), function () {
                asstag.push($(this).text());
            });
            var appid = [];
            $.each($("#ddlOtherApprover option:selected"), function () {
                appid.push($(this).text());
            });
            var val = [];
            $(':checkbox:checked').each(function (i) {
                val[i] = $(this).val();
                UpdGatePassUpdate($(this).attr('name'), asstag.join(","), appid.join(","));
               // $(".cb-element").prop("checked", false);
            });
           // InsGatePass(asstag.join(", "), appid.join(", "));
        } else {
            return false;
        }
    });
    //$(document).on('click', '.editview', function () {
    //    if ($.session.get("gate_pass_id_pk") != '' || $.session.get("gate_pass_id_pk") != null || $.session.get("gate_pass_id_pk") == undefined) {
    //        $.session.remove("gate_pass_id_pk");
    //        $.session.set("gate_pass_id_pk", $(this).attr("name"));
    //        window.open('/Inventry/PrintGatePass');
    //    }
    //});
    //$(document).on('click', '.view', function () {
    //    GetTaskDetails($(this).attr("name"));
    //});
});
function validateGatePass() {
    var return_val = true;
    if ($('#ddlMovementType option:selected').val() == 0) {
        $('#SpnMovementType').show();
        return_val = false;
    } else {
        $('#SpnMovementType').hide();
    }
    if ($('#ddlGatePassType option:selected').val() == 0) {
        $('#SpnGatePassType').show();
        return_val = false;
    } else {
        $('#SpnGatePassType').hide();
    }
    if ($('#ddlGatePassType option:selected').val() == 1) {
        if ($('#txtExpectedDateofReturn').val().trim() == "" || $('#txtExpectedDateofReturn').val() == null) {
            $('#SpnExpectedDateofReturn').show();
            return_val = false;
        } else {
            $('#SpnExpectedDateofReturn').hide();
        }
    } else {
        $('#SpnExpectedDateofReturn').hide();
    }
    if ($('#ddlAssetStatusChange option:selected').val() == 2) {
        if ($('#ddlAssetStatus option:selected').val() == 0) {
            $('#SpnAssetStatus').show();
            return_val = false;
        } else {
            $('#SpnAssetStatus').hide();
        }
    } else {
        $('#SpnAssetStatus').hide();
    }
    if ($('#ddlApprovalRequired option:selected').val() == 2) {
        if ($('#ddlOtherApprover option:selected').val() == 0) {
            $('#SpnOtherApprover').show();
            return_val = false;
        } else {
            $('#SpnOtherApprover').hide();
        }
    } else {
        $('#SpnOtherApprover').hide();
    }
    if ($('#ddlBusinessUnit option:selected').val() == 0) {
        $('#SpnBusinessUnit').show();
        return_val = false;
    } else {
        $('#SpnBusinessUnit').hide();
    }
    if ($('#ddlFromAddress option:selected').val() == 0) {
        $('#SpnFromAddress').show();
        return_val = false;
    } else {
        $('#SpnFromAddress').hide();
    }
    if ($('#ddlAssets option:selected').val() == 0) {
        $('#SpnAssets').show();
        return_val = false;
    } else {
        $('#SpnAssets').hide();
    }
   
    if ($('#ddlAssign option:selected').val() == 0) {
        $('#SpnAssign').show();
        return_val = false;
    } else {
        $('#SpnAssign').hide();
    }
    if ($('#txtReasonForGatePass').val().trim() == "" || $('#txtReasonForGatePass').val() == null) {
        $('#SpnReasonForGatePass').show();
        return_val = false;
    } else {
        $('#SpnReasonForGatePass').hide();
    }
    if ($('#txtToAddress').val().trim() == "" || $('#txtToAddress').val() == null) {
        $('#SpnToAddress').show();
        return_val = false;
    } else {
        $('#SpnToAddress').hide();
    }
    if ($('#txtGatePassValidity').val().trim() == "" || $('#txtGatePassValidity').val() == null) {
        $('#SpnGatePassValidity').show();
        return_val = false;
    } else {
        $('#SpnGatePassValidity').hide();
    }
    return return_val;
};
//Get Task Type Lists
function GetGetPassAddress() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetGetPassAddress', 
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#ddlFromAddress').html("").append('<option value="0">Select Form Address</option>'); 
            $(data).each(function () {
                $('#ddlFromAddress').append('<option value=' + this.get_pass_add_id_pk + '>' + this.address + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Business Unit Lists
function GetBusinessUnit() {

    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Change/GetBusinessUnit',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#ddlBusinessUnit').html("").append('<option value="0">Select Location</option>');
            $(data).each(function () {
                $('#ddlBusinessUnit').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get Assets Lists 
function GetAssetList() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetListForGatePass',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlAssets').html("").append('<option value="0">Select Assets Name</option>');
            $(data).each(function () {
                $('#ddlAssets').append('<option  value=' + this.asset_id_pk + '>' + this.asset_tag + '</option>'); 

            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Status Lists
function GetStatus() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetAssetStatus',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlAssetStatus').html("").append('<option value="0">Select Status</option>');
            $(data).each(function () {
                $('#ddlAssetStatus').append('<option value=' + this.status_id_pk + '>' + this.status + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Insert GatePass 
function InsGatePass(asstag, appid) {
    var parm = {
        "moment_type": $("#ddlMovementType option:selected").text(),
        "gate_pass_type": $("#ddlGatePassType option:selected").text(),
        "expected_date": $("#txtExpectedDateofReturn").val().trim(),
        "business_unit_id_fk": $("#ddlBusinessUnit option:selected").val().trim(),
        "get_pass_add_id_fk": $("#ddlFromAddress option:selected").val().trim(),
        "asset_id_fk": asstag , // $("#ddlAssets option:selected").text(),
        "change_asset_status": $("#ddlAssetStatusChange option:selected").val().trim(),
        "asset_status_id_fk": $("#ddlAssetStatus option:selected").val().trim(),
        "reason_for_gate_pass": $("#txtReasonForGatePass").val().trim(),
        "gate_pass_validity": $("#txtGatePassValidity").val().trim(),
        "is_approval_req": $("#ddlApprovalRequired option:selected").val().trim(),
        "approver_id": appid ,// $("#ddlOtherApprover option:selected").text()
        "to_address": $("#txtToAddress").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/InsGatePass',
        success: function (data) {
            if (data.status_id != 0) {
                //alert(data.DataItem);
                //alert(data.gate_pass_id_pk);
                //if ($.session.get("gate_pass_id_pk") != '' || $.session.get("gate_pass_id_pk") != null || $.session.get("gate_pass_id_pk") == undefined) {
                //    $.session.remove("gate_pass_id_pk");
                //    $.session.set("gate_pass_id_pk", data.gate_pass_id_pk);
                //    window.open('/Inventry/PrintGatePass');
                //}
                GetUserForSendEmail(data.gate_pass_id_pk)
                successnotify(data.status);
                GetGatePassLists();
            } else {
                warningnotify(data.status);

            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Get Task Lists 
function GetGatePassLists() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetGatePassLists',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblGatePass')) {
                table = $('#tblGatePass').DataTable();
            } else {
                table = $('#tblGatePass').DataTable();
            }
            table.destroy();
            $("#tblGatePass").DataTable({
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
                        data: 'gate_pass_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (gate_pass_id_pk) {
                            return '<input id="checkbox0" class="cb-element gatepass" name="' + gate_pass_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    {
                        data: 'gate_pass_id_pk', render: function (gate_pass_id_pk, type, row) {
                            return '<a href="#" class="editview"  name="' + gate_pass_id_pk + '">' + row.prefix + + row.gate_pass_id_pk + '</a>';

                        }
                    },
                    { data: 'moment_type' },
                    { data: 'gate_pass_type' },
                   // { data: 'expected_date' },
                    {
                        "data": "expected_date",
                        "type": "date",
                        "render":
                            function (data, type, full) {
                                return (data) ? moment(data).format('DD/MM/YYYY') : '';
                            }
                    },
                    { data: 'business_unit' },
                   // { data: 'asset_name' },
                    { data: 'status' },
                   // { data: 'gate_pass_validity' }
                    {
                        "data": "gate_pass_validity",
                        "type": "date",
                        "render":
                            function (data, type, full) {
                                return (data) ? moment(data).format('DD/MM/YYYY') : '';
                            }
                    },
                ],
                //  dom: 'Bfrtip',
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
                    //{
                    //    extend: 'csvHtml5',
                    //    text: '<i class="fa fa-file-text-o"></i>',
                    //    titleAttr: 'CSV'
                    //},
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
function GetGatePassDetails(gate_pass_id) {
    var parm = {
        'gate_pass_id_pk': gate_pass_id// $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetGatePassDetails',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {

            var selectedText = data.moment_type;
            $('#ddlMovementType option').map(function () {
                if ($(this).text() == selectedText) return this;
            }).attr('selected', 'selected');
            var gatepasstype = data.gate_pass_type;
            $('#ddlGatePassType option').map(function () {
                if ($(this).text() == gatepasstype) return this;
            }).attr('selected', 'selected');
            $("#txtAssetsTag").val(data.asset_id_fk);
            $("#txtAssetsTag").show();
            $("#txtExpectedDateofReturn").val(data.expected_date);
            $("#ddlBusinessUnit").val(data.business_unit_id_fk).change();
            $("#ddlFromAddress").val(data.get_pass_add_id_fk).change();
            $("#ddlAssets").val(data.asset_id_fk).text(); 
            $("#ddlAssetStatusChange").val(data.change_asset_status).change();
            $("#ddlAssetStatus").val(data.asset_status_id_fk).change();
            $("#txtReasonForGatePass").val(data.reason_for_gate_pass);
            $("#txtGatePassValidity").val(data.gate_pass_validity);
            $("#ddlApprovalRequired").val(data.is_approval_req).change();
            $("#txtOtherApprover").val(data.approver_id);
            $("#txtToAddress").val(data.to_address);
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//get All Employee List from People
function GetEmployeesLists() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Staff/GetAllApproverLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".ddlTechnician").html("").append('<option value="0">Select Technician</option>');
            $(data).each(function () {
                $('.ddlTechnician').append('<option value=' + this.id + '>' + this.name + '</option>');
                $('.ddlUserList').append('<option value=' + this.id + '>' + this.name + '</option>');
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
// Get User Details
function GetUserForSendEmail(gate_pass_id) {
    var parm = {
        'gate_pass_id_pk': gate_pass_id // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetApproverToendEmailForGatePass',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
          
            $(data).each(function () {
                alert(this.DataItem);
                alert(this.gate_pass_id_pk);
                alert(this.moment_type);
                alert(this.gate_pass_type);
               // alert(this.name);
                SendEmailChangeGatePassStatus(this.DataItem, this.gate_pass_id_pk, this.moment_type, this.gate_pass_type, this.DataItem)   // this.DataItem 
                //$('.ddlTechnician').append('<option value=' + this.id + '>' + this.name + '</option>');   'GTP000' + '' +
                //$('.ddlUserList').append('<option value=' + this.id + '>' + this.name + '</option>');
            });
          //  SendEmailTicketCreate(data.email, 'INC00' + '' + ticket_id, data.user_name, 'Ticket Status :  New ')

           
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Update GatePass Status  
function UpdGatePassUpdate(gate_pass_id,asstag,appid) { 
    var parm = {
        "gate_pass_id_pk": gate_pass_id,
        "moment_type": $("#ddlMovementType option:selected").text(),
        "gate_pass_type": $("#ddlGatePassType option:selected").text(),
        "expected_date": $("#txtExpectedDateofReturn").val().trim(),
        "business_unit_id_fk": $("#ddlBusinessUnit option:selected").val().trim(),
        "get_pass_add_id_fk": $("#ddlFromAddress option:selected").val().trim(),
        "asset_id_fk": $("#txtAssetsTag").val()+','+asstag, // $("#ddlAssets option:selected").text(),
        "change_asset_status": $("#ddlAssetStatusChange option:selected").val().trim(),
        "asset_status_id_fk": $("#ddlAssetStatus option:selected").val().trim(),
        "reason_for_gate_pass": $("#txtReasonForGatePass").val().trim(),
        "gate_pass_validity": $("#txtGatePassValidity").val().trim(),
        "is_approval_req": $("#ddlApprovalRequired option:selected").val().trim(),
        "approver_id": $("#txtOtherApprover").val()+','+appid ,// $("#ddlOtherApprover option:selected").text()
        "to_address": $("#txtToAddress").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/UpdGatePassUpdate',
        success: function (data) {
            if (data.status_id != 0) {
                CreateSuccess(data.status);
                $('#closedModelStatus').click();
               // GetTicketLists();
               // $(".cb-element").prop("checked", false);
            } else {
                $('#closedModelStatus').click();
                //CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};