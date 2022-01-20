$(document).ready(function () {
    
    alert($.session.get("change_category_id_pk"))
    
    //$(document).on('click', '.btnview', function () {
    //    //("#ChangeManagement")
    //    //alert($(this).parent("td").parent("tr").find("td:eq(1)").html());
    //    alert($(this).attr("name"));
    //    //window.open('/Changes/ChangesRecords');
    //    if ($.session.get("change_category_id_pk") != '' || $.session.get("change_category_id_pk") != null || $.session.get("change_category_id_pk") == undefined) {
    //        $.session.remove("change_category_id_pk");
    //        $.session.set("change_category_id_pk", $(this).attr("name"));
    //        window.open('/Changes/ChangesRecords');
    //    } 
    //});
  
});