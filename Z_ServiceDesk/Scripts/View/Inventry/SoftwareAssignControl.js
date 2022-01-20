$(document).ready(function () {
    GetSoftwareComplianceLists();
    GetSoftwareAssignControlLists();
    $("#btnSubmit").click(function () {
        if (validateSoftwareAssControl() == true) {
            InsSoftwareAssignControl();
        } else {
            return false;
        }
    });
});
function validateSoftwareAssControl() { 
    var return_val = true;
    if ($('#ddlSoftwareName option:selected').val() == 0) {
        $('#SpnSoftwareName').show();
        return_val = false;
    } else {
        $('#SpnSoftwareName').hide();
    }
    if ($('#ddlApplilcationControl option:selected').val() == 0) {
        $('#SpnApplilcationControl').show();
        return_val = false;
    } else {
        $('#SpnApplilcationControl').hide();
    }
    return return_val;
};
//Get All Location Lists
function GetSoftwareComplianceLists() {

    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Software/GetSoftwareMapLists',
      //  url: 'http://playmediahouse.com/api/api/Software/GetLocation',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#ddlSoftwareName').html("").append('<option value="0">Select Software Name</option>');
            $(data).each(function () {
                $('#ddlSoftwareName').append('<option value=' + this.serial_number + '>' + this.SoftwareName + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Insert Software Assign Control
function InsSoftwareAssignControl() {
    var parm = {
        "soft_name": $("#ddlSoftwareName option:selected").text(),
        "app_control_id": $("#ddlApplilcationControl option:selected").val()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Software/InsSoftwareAssignControl',
        success: function (data) {
            //  alert("Inserted Successfully");
            if (data.status_id == 0) {
                successnotify(data.status);
            } else {
                warningnotify(data.status);
               
            }
            //$("#divPickupInformation").find("input").val("");
            //getPickupInformation();
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
function GetSoftwareAssignControlLists() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Software/GetSoftwareAssignControlLists',
        dataType: "json",
        success: function (data) {
            var table;
            if ($.fn.dataTable.isDataTable('#tblSoftwareAssignControl')) {
                table = $('#tblSoftwareAssignControl').DataTable();
            } else {
                table = $('#tblSoftwareAssignControl').DataTable();
            }
            table.destroy();
            $("#tblSoftwareAssignControl").DataTable({
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
                        data: 'soft_ass_con_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (soft_ass_con_id_pk) {
                            return '<input id="check" class="cb-element checkbox" name="' + soft_ass_con_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'soft_ass_con_id_pk' },
                    { data: 'soft_name' },
                    {
                        data: "App_Control_Status",
                        render: function (App_Control_Status) {
                            // Check if blank
                            if (App_Control_Status === "Whitelisted") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#029800;" name="' + App_Control_Status + '">' + App_Control_Status + '</span>';
                            }
                            else if (App_Control_Status === "Blacklisted") {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d !important;" name="' + App_Control_Status + '">' + App_Control_Status + '</span>';
                            }


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