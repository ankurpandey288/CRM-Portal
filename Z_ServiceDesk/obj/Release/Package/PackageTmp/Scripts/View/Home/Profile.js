$(document).ready(function () {
    alert($.session.get("id"));
   
    GetAdminDetailsById($.session.get("id"));

});
function GetAdminDetailsById(id) {
    var parm = {
        'id': id// $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Commonapi/GetAdminDetailsById',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#empname").text(data.name);  
            $("#title").text(data.title);  
            $("#email").text(data.email); 
            $("#contact").text(data.mobile); 
            
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};