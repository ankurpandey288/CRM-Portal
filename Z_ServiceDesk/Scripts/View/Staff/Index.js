$(document).ready(function () {
    if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
        window.location.href = "/Login/Index/";
    };
    GetRole();
    GetLocation();
    GetStaffLists();
    GetSupportGroup();
   // GetStaffDetails(1);
    $('.cb-element').click(function () {
        if (!$(this).is(':checked')) {
            return confirm("Are you sure?");
            alert("Value Checked");
        }
    });
    $("#BtnSubmit").click(function () {
        if (validateStaff() == true) {
            var countries = [];
            $.each($(".country option:selected"), function () {
                countries.push($(this).val());
            });
            InsStaff(countries.join(", "));
        } else {
            return false;
        }
    });
    $("#BtnUpdate").click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            if (validateStaff() == true) {
                var countries = [];
                $.each($(".country option:selected"), function () {
                    countries.push($(this).val());
                });
                UpdStaff($(this).attr('name'),countries.join(", "));
            } else {
                return false;
            }
        });


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
        $("#myModalLabelNew").hide(); $("#myModalLabelEdit").show();
        $("#BtnSubmit").hide(); $("#BtnUpdate").show();
    });
   
});

function validateStaff() {
    var return_val = true;
    //if ($('#ddlRole option:selected').val() == 0) {
    //    $('#SpnRole').show();
    //    return_val = false;
    //} else {
    //    $('#SpnRole').hide();
    //}
    //if ($('#txtEmailAddress').val().trim() == "" || $('#txtEmailAddress').val() == null) {
    //    $('#SpnEmailAddress').show();
    //    return_val = false;
    //} else {
    //    $('#SpnEmailAddress').hide();
    //}
    if ($('#txtName').val().trim() == "" || $('#txtName').val() == null) {
        $('#SpnName').show();
        return_val = false;
    } else {
        $('#SpnName').hide();
    }
    if ($('#txtMobileNumber').val().trim() == "" || $('#txtMobileNumber').val() == null) {
        $('#SpnMobileNumber').show();
        return_val = false;
    } else {
        $('#SpnMobileNumber').hide();
    }
    if ($('#ddlLocation option:selected').val() == 0) {
        $('#SpnLocation').show();
        return_val = false;
    } else {
        $('#SpnLocation').hide();
    }
    if ($('#txtJobTitle').val().trim() == "" || $('#txtJobTitle').val() == null) {
        $('#SpnJobTitle').show();
        return_val = false;
    } else {
        $('#SpnJobTitle').hide();
    }
    if ($('#txtpwd').val().trim() == "" || $('#txtpwd').val() == null) {
        $('#Spnpwd').show();
        return_val = false;
    } else {
        $('#Spnpwd').hide();
    }
    if ($('#ddlSupportGroup option:selected').val() == 0) {
        $('#SpnSupportGroup').show();
        return_val = false;
    } else {
        $('#SpnSupportGroup').hide();
    }
    return return_val;
};
//Get All Support Department 
function GetRole() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Staff/GetRole',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#ddlRole").html("").append('<option value="0">Select Staff Role</option>');
            $(data).each(function () {
                $('#ddlRole').append('<option value=' + this.id + '>' + this.type + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Support Group Department 
function GetSupportGroup () {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Masters/GetSupportGroup',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(data).each(function () {
                $('#ddlSupportGroup').append('<option value=' + this.support_group_id_pk + '>' + this.support_dep_group_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//Get All Location Lists
function GetLocation() {

    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Software/GetLocation',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $('#ddlLocation').html("").append('<option value="0">Select Location</option>');
            $(data).each(function () {
                $('#ddlLocation').append('<option value=' + this.location_id_pk + '>' + this.location_name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Insert Staff  
function InsStaff(countries) {
    var parm = {
        "roleid": 0,
        "name": $("#txtName").val().trim(),
        "email": $("#txtEmailAddress").val().trim(),
        "mobile": $("#txtMobileNumber").val().trim(),
        "location_id_pk": $("#ddlLocation option:selected").val().trim(),
        "title": $("#txtJobTitle").val().trim(),
        "password": $("#txtpwd").val().trim(),
        "support_dep_group": countries  //$("#ddlSupportGroup option:selected").val().trim(),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Staff/InsStaff',
        success: function (data) {
            if (data.status_id != 0) {
                successnotify(data.status);
                $('#closedModel').click();
                GetStaffLists();
            } else {
                // alert(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
// Insert Staff  
function InsStaffSupportGroup(support_group_id, emp_id) { 
    var parm = {
        "support_group_id_fk": support_group_id,
        "emp_id_fk": emp_id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Staff/InsStaffSuppDepaGroup',
        success: function (data) {
            //alert("Inserted Successfully");
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};

// Get Staff Lists 
function GetStaffLists() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Staff/GetStaffLists', 
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
                        data: 'id',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (id) {
                            return '<input id="check" class="cb-element checkbox" name="' + id + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    { data: 'id' },
                    { data: 'name' },
                    { data: 'email' },
                    { data: 'title' },
                    { data: 'role' },
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
function DeleteTechnician(id) {
    var parm = {
        "id": id
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Staff/DeleteTechnicianByID',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                DeleteSuccess(data.status);
                GetStaffLists();

            } else {
                DeleteSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error Occured");
        }
    });
};
function GetStaffDetails(id) {
    var parm = {
        'id': id  // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Staff/GetStaffDetails',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {

            //$("#ddlSupportGroup").change(function () {
            //    var selectOption = $(this).find(":selected");
            //    selectOption.each(function (e) {
            //        alert($(this).val());
            //    });
            //});
            //set the selected values
            //   var selectedValues = new Array();
            //selectedValues[0] = "1";
            //selectedValues[1] = "2";
            //   $("#ddlSupportGroup").val(selectedValues);

            //    alert([data.support_dep_group]);

            //var countries = []
            //countries = [data.support_dep_group];

            //var string = "";
            //string = [data.support_dep_group];

            //alert(string);

            $("#ddlRole").val(data.roleid).change();
            $("#txtName").val(data.name);
            $("#txtEmailAddress").val(data.email);
            $("#txtMobileNumber").val(data.mobile);
            $("#ddlLocation").val(data.location_id_pk).change();
            $("#txtJobTitle").val(data.title);
            $("#txtpwd").val(data.password);
            $("#ddlSupportGroup").val(data.support_dep_group).change();
            
            //var txt = parseInt(data.support_dep_group);

            //alert(txt);
            //alert([data.support_dep_group]);
            //alert([1, 2, 3, 4]);

           // $("#ddlSupportGroup").val(['1','2','4']).change();

            //$('#ddlSupportGroup').change(function () {
            //    var selectedValues = [data.support_dep_group];
            //     selectedValues = $(this).val();
            //});


            //var values = [data.support_dep_group];
            //$('#ddlSupportGroup').val();

            //var values = [data.support_dep_group];
            //$.each(values.split(","), function (i, e) {
            //    $("#ddlSupportGroup option[value='" + e + "']").prop("selected", true);
            //});



          //  $("#ddlSupportGroup").multiple([data.support_dep_group]).change();

            //$(".country").val([countries]).change();

            //  $("#ddlSupportGroup").append($("<option ></option>").val(data.support_dep_group).change());



        //    $('#ddlSupportGroup').val([data.support_dep_group].join(",")).change();

            //InsStaff(countries.join(", "));

          //  $("#ddlSupportGroup").val([1,  2,  3,  4,  5]).change();

            //var countries = [];
            //$.each($(".country option:selected"), function () {
            //    countries.push($(this).val());
            //});
           

        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
// Update User Details   
function UpdStaff(id, countries) {
    var parm = {
        "id": id,
        "roleid": 0,
        "name": $("#txtName").val().trim(),
        "email": $("#txtEmailAddress").val().trim(),
        "mobile": $("#txtMobileNumber").val().trim(),
        "location_id_pk": $("#ddlLocation option:selected").val().trim(),
        "title": $("#txtJobTitle").val().trim(),
        "password": $("#txtpwd").val().trim(),
        "support_dep_group": countries,  //$("#ddlSupportGroup option:selected").val().trim(),
        "updated_by": $.session.get("id"),
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Staff/UpdStaff',
        success: function (data) {

            if (data.status_id != 0) {
                CreateSuccess(data.status);
                $('#closedModel').click();
                GetStaffLists();
                $(".cb-element").prop("checked", false);
            } else {
                $('#closedModel').click();
                //CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};