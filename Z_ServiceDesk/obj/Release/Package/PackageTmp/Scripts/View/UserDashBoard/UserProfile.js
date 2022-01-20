$(document).ready(function () {
    GetUserDetailsById($.session.get("id")); 
});
function GetUserDetailsById(user_id_pk) {
    var parm = {
        'user_id_pk': user_id_pk // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Commonapi/GetUserDetailsById', 
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            $("#empname").text(data.user_name);
            $("#title").text(data.title);
            $("#email").text(data.email);
            $("#contact").text(data.mobile_no); 

            $("#txtState").text(data.state);
            $("#txtCity").text(data.city);
            $("#txtManager").text(data.manager_name);
            $("#txtDepartment").text(data.department_name); 

        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};