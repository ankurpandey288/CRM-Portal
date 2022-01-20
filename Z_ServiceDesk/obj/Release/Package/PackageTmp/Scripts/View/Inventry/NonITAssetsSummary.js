$(document).ready(function () {
    GetNonITAssetSummary();
});
function GetNonITAssetSummary() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetNonITAssetSummary', 
        dataType: "json",
        success: function (data) {
            $("#tbodyNonItAssets").html(''); 

            $(data).each(function () {
                var all = 0;
                all = this.allocated;
                var store = 0;
                store = this.in_store;
                var repair = 0;
                repair = this.in_repair;
                var active = 0;
                active = this.in_active;

                var Total = all + store + repair + active; 

                alert(Total);
                $("#tbodyNonItAssets").append("<tr><td>" + this.serial_number + "</td><td>" + this.non_it_ass_cat_name + "</td><td>" + this.allocated + "</td><td>" + this.in_store + "</td><td>" + this.in_repair + "</td><td>" + this.in_active + "</td><td>" + Total + "</td></tr>");
            });
        },

        error: function (edata) {
            alert("error while feching record.");
        }
    });
};