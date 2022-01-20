$(document).ready(function () {
    //if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
    //    window.location.href = "/Login/Index/";
    //};
    GetClientLists();
    $("#btnUpdate").attr("disabled", "disabled");

    $(document).on('click', '.btnedit', function () {
        // GetPreventiveMaintainanceActivityViewCheckList($(this).attr('name'));
    });
    $(document).on('click', '.btneditstatus', function () {
        // GetPreventiveMaintainanceActivityChangeStatus($(this).attr('name'));
    });
   
    $("#btnSubmit").click(function () {
        if (validateLocation() == true) {
            InsLocation();
        } else {
            return false;
        }
    });
});

function validateLocation() {
    var return_val = true;
    if ($("#ddlClient option:selected").val() == 0) {
          $("#ddlCategory").addClass("is-invalid");
          $("#ddlCategory").addClass("was-validated");
        $("#ddlClient").parentsUntil(".col-md-6").addClass("is-invalid");
        alert("Test alert For DDL");
        return_val = false;
    } else {
        $("#ddlClient").removeClass("was-validated");
        $("#ddlClient").parentsUntil(".form-group").addClass("was-validated");
        $("#ddlClient").addClass("was-validated");
        alert("Test alert1");
    }
    if ($("#txtLocation").val() == "") {
        alert("Wrong");
        //  $("#txtTest").parentsUntil(".col-lg-9").addClass("parsley-error");
        $("#txtLocation").addClass("is-invalid");
        return_val = false;
    } else {
        alert("Right");
        $("#txtLocation").removeClass("is-invalid");
        $("#txtLocation").parentsUntil(".form-group").addClass("was-validated");
        $("#txtLocation").addClass("was-validated");
        //  $("#txtLastNameBillingTest").parentsUntil(".col-lg-9").removeClass("invalid-feedback");
    }

   

    return return_val;
};
//Get Client Lists
function GetClientLists() {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Change/GetBusinessUnit', 
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#ddlClient').html("").append('<option value="0">Select Clients</option>');
            $(data).each(function () {
                $('#ddlClient').append('<option value=' + this.business_unit_id_pk + '>' + this.business_unit + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
}; 
function InsLocation() {
    var parm = {
        "business_unit_id_fk": $("#ddlClient option:selected").val().trim(),
        "location_name": $("#txtLocation").val().trim()
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        data: josnstr,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Masters/InsLocation',
        success: function (data) {
            if (data.status_id != 0) {
                successnotify(data.status);
                window.location.href = "/Masters/Location";
            } else {
                //warningnotify(data.status);
            }
        },
        error: function (result) {
            alert("Error : data");
        }
    });
};
//Success Message
