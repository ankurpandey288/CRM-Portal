$(document).ready(function () {
    //SendEmail("rkmgpj0@gmail.com", "Ravish", "Testing Purpose", "8766235849", "Efilingportal.in");
    //getchartreport(); 
  //  GetProblemReportList("IssueStatus");
  //  GetTicketsReportList("IssueStatusNew");
  //  GetGetChartServiceRequest("ServiceRequest");
  //  GetTasks("Tasks");
  //  GetChanges("Changes");
  //  GetTotalAssets("TotalAssets");
  //  TotalIncidents();
 //   alert($.session.get("id"));
    if ($.session.get("roleid") == undefined || $.session.get("roleid") == 0) {
        $("#MenuConfiguration").hide();
        $("#MenuFeedback").hide();
        $("#MenuSla").hide();
        $(".btndelete").hide();
    };

   
});
function GetProblemReportList(chartid) {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Problems/GetProblemReportList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var total = 0, open = 0, close = 0;

            $(data).each(function () {
                if (this.status == 'Open') {
                    open = parseInt(this.status_count);
                    //alert(open);
                    total = parseInt(total) + parseInt(this.status_count);
                } else if (this.status == 'Closed') {
                    close = parseInt(this.status_count);
                    total = parseInt(total) + parseInt(this.status_count);
                }
                // alert(this.status_count + '           ' + this.status) 
            });
            //alert(total, open, close);
            GetChart(chartid, total, open, close);
            //$('#ddlRegisteredOfficeinState').val(10).change();
        },
        error: function (edata) {
            //$(edata).each(function () {
            //    InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            //});
            alert("error while feching record.");
        }
    });
};
function GetTicketsReportList(chartidtickets) {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/DashBoardChart/GetTicketsReportList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
           
            var total = 0, open = 0, close = 0, ropen = 0 ; 
            $(data).each(function () {

                if (this.status == 'Closed') {
                   
                    open = parseInt(this.id);
                  //  alert(open);
                    total = parseInt(total) + parseInt(this.id);
                  //  alert(total);

                } else if (this.status == 'In Progress') {
                    close = parseInt(this.id);
                  //  alert(close);
                    total = parseInt(total) + parseInt(this.id);
                   // alert(total);
                }
                else if (this.status == 'Reopened') {
                   
                    ropen = parseInt(this.id);
                  //  alert(ropen);

                    total = parseInt(total) + parseInt(this.id);
                  //  alert(total);
                }
                // alert(this.status_count + '           ' + this.status) 
            });
          //  alert(total, open, close, ropen);
            GetChartTickets(chartidtickets, total, open, close, ropen)
            //$('#ddlRegisteredOfficeinState').val(10).change();
        },
        error: function (edata) {
            //$(edata).each(function () {
            //    InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            //});
            alert("error while feching record.");
        }
    });
};
function GetGetChartServiceRequest(chartid) {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Problems/GetProblemReportList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var total = 0, open = 0, close = 0;

            $(data).each(function () {
                if (this.status == 'Open') {
                    open = parseInt(this.status_count);
                    //alert(open);
                    total = parseInt(total) + parseInt(this.status_count);
                } else if (this.status == 'Closed') {
                    close = parseInt(this.status_count);
                    total = parseInt(total) + parseInt(this.status_count);
                }
                // alert(this.status_count + '           ' + this.status) 
            });
            //alert(total, open, close);
            GetChartServiceRequest(chartid, total, open, close);
            //$('#ddlRegisteredOfficeinState').val(10).change();
        },
        error: function (edata) {
            //$(edata).each(function () {
            //    InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            //});
            alert("error while feching record.");
        }
    });
};
function GetTasks(chartid) {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Problems/GetProblemReportList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var total = 0, open = 0, close = 0;

            $(data).each(function () {
                if (this.status == 'Open') {
                    open = parseInt(this.status_count);
                    //alert(open);
                    total = parseInt(total) + parseInt(this.status_count);
                } else if (this.status == 'Closed') {
                    close = parseInt(this.status_count);
                    total = parseInt(total) + parseInt(this.status_count);
                }
                // alert(this.status_count + '           ' + this.status) 
            });
            //alert(total, open, close);
            GetChartTasks(chartid, total, open, close);
            //$('#ddlRegisteredOfficeinState').val(10).change();
        },
        error: function (edata) {
            //$(edata).each(function () {
            //    InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            //});
            alert("error while feching record.");
        }
    });
};
function GetChanges(chartid) {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Problems/GetProblemReportList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var total = 0, open = 0, close = 0;

            $(data).each(function () {
                if (this.status == 'Open') {
                    open = parseInt(this.status_count);
                    //alert(open);
                    total = parseInt(total) + parseInt(this.status_count);
                } else if (this.status == 'Closed') {
                    close = parseInt(this.status_count);
                    total = parseInt(total) + parseInt(this.status_count);
                }
                // alert(this.status_count + '           ' + this.status) 
            });
            //alert(total, open, close);
            GetChartChanges(chartid, total, open, close);
            //$('#ddlRegisteredOfficeinState').val(10).change();
        },
        error: function (edata) {
            //$(edata).each(function () {
            //    InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            //});
            alert("error while feching record.");
        }
    });
};
function GetTotalAssets(chartid) {
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Problems/GetProblemReportList',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var total = 0, open = 0, close = 0;

            $(data).each(function () {
                if (this.status == 'Open') {
                    open = parseInt(this.status_count);
                    //alert(open);
                    total = parseInt(total) + parseInt(this.status_count);
                } else if (this.status == 'Closed') {
                    close = parseInt(this.status_count);
                    total = parseInt(total) + parseInt(this.status_count);
                }
                // alert(this.status_count + '           ' + this.status) 
            });
            //alert(total, open, close);
            GetChartTotalAssets(chartid, total, open, close);
            //$('#ddlRegisteredOfficeinState').val(10).change();
        },
        error: function (edata) {
            //$(edata).each(function () {
            //    InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            //});
            alert("error while feching record.");
        }
    });
};

function GetChart(chartid, total, open, closed) {
    var issueStatus = new CanvasJS.Chart(chartid, {
        data: [
          {
              showInLegend: false,
              indexLabelFontSize: '14',
              indexLabelFontColor: 'white',
              startAngle: 150,
              indexLabelPlacement: "inside",
              toolTipContent: "{name}: {y} issues",
              type: "pie",
              dataPoints: [
                  //$(data).each(function () {
                  //    { y: open, indexLabel+ ":"+ this.data1, name+ ":"+ this.data2 }
                  //}
            { y: open, indexLabel: 'Open', name: 'Open' },
            { y: total, indexLabel: 'Total', name: 'Total' },
            { y: closed, indexLabel: 'Closed', name: 'Closed' }

              ]
          }
        ],
        title: {
            text: "Problems",
            fontSize: "14"
        },
        legend: {
            fontFamily: "Arial",
            fontSize: 14
        },
        creditHref: "",
        backgroundColor: "white"
    });
    issueStatus.render();
}
function GetChartTickets(chartidtickets, total, open, closed, ropen) {
    var issueStatus = new CanvasJS.Chart(chartidtickets, {
        data: [
            {
                showInLegend: false,
                indexLabelFontSize: '14',
                indexLabelFontColor: 'white',
                startAngle: 150,
                indexLabelPlacement: "inside",
                toolTipContent: "{name}: {y} issues",
                type: "pie",
                dataPoints: [
                    //$(data).each(function () {
                    //    { y: open, indexLabel+ ":"+ this.data1, name+ ":"+ this.data2 }
                    //}
                    { y: open, indexLabel: 'Open', name: 'Open' },
                    { y: total, indexLabel: 'Total', name: 'Total' },
                    { y: closed, indexLabel: 'Closed', name: 'Closed'},
                    { y: ropen, indexLabel: 'ReOpen', name: 'ReOpen' }
                   

                ]
            }
        ],
        title: {
            text: "Incidents",
            fontSize: "14"
        },
        legend: {
            fontFamily: "Arial",
            fontSize: 14
        },
        creditHref: "",
        backgroundColor: "white"
    });
    issueStatus.render();
}
function GetChartServiceRequest(chartid, total, open, closed) {
    var issueStatus = new CanvasJS.Chart(chartid, {
        data: [
            {
                showInLegend: false,
                indexLabelFontSize: '14',
                indexLabelFontColor: 'white',
                startAngle: 150,
                indexLabelPlacement: "inside",
                toolTipContent: "{name}: {y} issues",
                type: "pie",
                dataPoints: [
                    //$(data).each(function () {
                    //    { y: open, indexLabel+ ":"+ this.data1, name+ ":"+ this.data2 }
                    //}
                    { y: open, indexLabel: 'Open', name: 'Open' },
                    { y: total, indexLabel: 'Total', name: 'Total' },
                    { y: closed, indexLabel: 'Closed', name: 'Closed' }

                ]
            }
        ],
        title: {
            text: "Service Request",
            fontSize: "14"
        },
        legend: {
            fontFamily: "Arial",
            fontSize: 14
        },
        creditHref: "",
        backgroundColor: "white"
    });
    issueStatus.render();
}
function GetChartTasks(chartid, total, open, closed) {
    var issueStatus = new CanvasJS.Chart(chartid, {
        data: [
            {
                showInLegend: false,
                indexLabelFontSize: '14',
                indexLabelFontColor: 'white',
                startAngle: 150,
                indexLabelPlacement: "inside",
                toolTipContent: "{name}: {y} issues",
                type: "pie",
                dataPoints: [
                    //$(data).each(function () {
                    //    { y: open, indexLabel+ ":"+ this.data1, name+ ":"+ this.data2 }
                    //}
                    { y: open, indexLabel: 'Open', name: 'Open' },
                    { y: total, indexLabel: 'Total', name: 'Total' },
                    { y: closed, indexLabel: 'Closed', name: 'Closed' }

                ]
            }
        ],
        title: {
            text: "Tasks",
            fontSize: "14"
        },
        legend: {
            fontFamily: "Arial",
            fontSize: 14
        },
        creditHref: "",
        backgroundColor: "white"
    });
    issueStatus.render();
}
function GetChartChanges(chartid, total, open, closed) {
    var issueStatus = new CanvasJS.Chart(chartid, {
        data: [
            {
                showInLegend: false,
                indexLabelFontSize: '14',
                indexLabelFontColor: 'white',
                startAngle: 150,
                indexLabelPlacement: "inside",
                toolTipContent: "{name}: {y} issues",
                type: "pie",
                dataPoints: [
                    //$(data).each(function () {
                    //    { y: open, indexLabel+ ":"+ this.data1, name+ ":"+ this.data2 }
                    //}
                    { y: open, indexLabel: 'Open', name: 'Open' },
                    { y: total, indexLabel: 'Total', name: 'Total' },
                    { y: closed, indexLabel: 'Closed', name: 'Closed' }

                ]
            }
        ],
        title: {
            text: "Changes",
            fontSize: "14"
        },
        legend: {
            fontFamily: "Arial",
            fontSize: 14
        },
        creditHref: "",
        backgroundColor: "white"
    });
    issueStatus.render();
}
function GetChartTotalAssets(chartid, total, open, closed) {
    var issueStatus = new CanvasJS.Chart(chartid, {
        data: [
            {
                showInLegend: false,
                indexLabelFontSize: '14',
                indexLabelFontColor: 'white',
                startAngle: 150,
                indexLabelPlacement: "inside",
                toolTipContent: "{name}: {y} issues",
                type: "pie",
                dataPoints: [
                    //$(data).each(function () {
                    //    { y: open, indexLabel+ ":"+ this.data1, name+ ":"+ this.data2 }
                    //}
                    { y: open, indexLabel: 'Open', name: 'Open' },
                    { y: total, indexLabel: 'Total', name: 'Total' },
                    { y: closed, indexLabel: 'Closed', name: 'Closed' }

                ]
            }
        ],
        title: {
            text: "Total Assets",
            fontSize: "14"
        },
        legend: {
            fontFamily: "Arial",
            fontSize: 14
        },
        creditHref: "",
        backgroundColor: "white"
    });
    issueStatus.render();
}

function TotalIncidents()
{
    new Vue({
        el: '#chartTestTest',
        components: {
            apexchart: VueApexCharts,
        },
        data: {
            series: [44, 55, 41, 17, 15],
            chartOptions: {
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            }
        },

    })
}