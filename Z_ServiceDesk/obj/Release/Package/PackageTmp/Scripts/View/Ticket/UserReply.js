$(document).ready(function () {
    var id = GetParameterValues('id'); 
    alert("your ID is " + id);
    $("#btnSubmit").click(function () {
        InsTicketReplyConversation(id);
    });
    function GetParameterValues(param) {
        var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < url.length; i++) {
            var urlparam = url[i].split('=');
            if (urlparam[0] == param) {
                return urlparam[1];
            }
        }
        //window.location.href = "http://localhost:49829/Inventry/PrintGatePass";
    }
    //$("#btnSubmit").click(function () {
    //    InsTicketReplyConversation(id);
    //});
});
// insert ticket reply Conversation  
function InsTicketReplyConversation(ticket_id) {
    var parm = {
        "ticket_id_fk": ticket_id,
        "reply_description": $("#txtCommentBox").val().trim(),
        "technician_id_fk": 0
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/Ticket/InsTicketReplyConversation',
        data: josnstr,
        dataType: "json",
        success: function (data) {
            if (data.status_id == "1") {
                CreateSuccess(data.status);
            } else {
                CreateSuccess(data.status);
            }
        },
        error: function (result) {
            alert("Not Update data");
        }
    });
};