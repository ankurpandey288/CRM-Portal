$(document).ready(function () {
    //alert($.session.get("solution_id_pk"));
    GetKnowledgeBaseArticle($.session.get("solution_id_pk"));
});

function GetKnowledgeBaseArticle(solution_id) {
    var parm = {
        'solution_id_pk': solution_id // $.session.get("asset_id_pk");
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/KnowledgeBase/GetKnowledgeBaseArticle',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
        success: function (data) {
            //alert(data.category_name);
            //alert(data.sub_category_name);
            $("#txtCategory").text(data.category_name);
            $("#txtSubCategory").text(data.sub_category_name);
            $("#txtTitle").text(data.solution_title);
            //$("#txtContent").text(data.contents);
            $("#txtContent").html(data.contents).text();
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};