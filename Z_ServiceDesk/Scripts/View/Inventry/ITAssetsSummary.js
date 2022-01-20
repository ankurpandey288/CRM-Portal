$(document).ready(function () {
    GetITAssetSummary();
    GetITAssetSummaryTotalCount();
});
function GetITAssetSummary() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetITAssetSummary',
        dataType: "json",
        success: function (data) {
            $("#tbodyItAssets").html('');
           
            $(data).each(function () {
                var all = 0;
                all = this.allocated;
                var store = 0;
                store = this.in_store;
                var repair = 0;
                repair = this.in_repair;
                var active = 0;
                active = this.in_active;
                var dis = 0;
                dis = this.discard; 
                var the = 0;
                the = this.theft;
                var Total = all + store + repair + active + dis + the;

                //alert(Total);
                $("#tbodyItAssets").append("<tr><td>" + this.serial_number + "</td><td>" + this.asset_cat_name + "</td><td>" + this.allocated + "</td><td>" + this.in_store + "</td><td>" + this.in_repair + "</td><td>" + this.in_active + "</td><td>" + this.discard + "</td><td>" + this.theft + "</td><td>" + Total + "</td></tr>");
            });
        },

        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
//
function GetITAssetSummaryTotalCount() {
    $.ajax({
        type: "Get",
        contentType: "application/json; charset=utf-8",
        url: 'http://playmediahouse.com/api/api/FixedAssets/GetITAssetSummaryTotalCount',
        dataType: "json",
        success: function (data) {
            $("#divAlloc").text(data.allocated);
            $("#divInStore").text(data.in_store);
            $("#divInRepair").text(data.in_repair);
            $("#divInactive").text(data.in_active);
            $("#divDiscard").text(data.discard);
            $("#divTheft").text(data.theft);
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
