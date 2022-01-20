$(document).ready(function () {
    Getclients();

});
//Get All clients Lists
function Getclients() {
   
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Peripherals/Getclients',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
           
            $('#ddlClient').html("").append('<option value="0">Select</option>');
            $(data).each(function () {
                $('#ddlClient').append('<option value=' + this.id + '>' + this.name + '</option>');
            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};