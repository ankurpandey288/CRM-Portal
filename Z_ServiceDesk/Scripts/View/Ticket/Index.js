$(document).ready(function () {
    var ticket = 0;
    var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');
    allWells.hide();
    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });
    allNextBtn.click(function () {
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
            if (!curInputs[i].validity.valid) {
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }
        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });
    $('#SLAcbk').click(function () {
        if ($(this).is(':checked')) {
            $(".SLAApplicable").hide();
            $(".SLAApplicable").find("select").val(0).change();
        } else {
            $(".SLAApplicable").show();
            GetImpactList();
            GetUrgency();
            GetPriority();
        }
    });
    $('div.setup-panel div a.btn-primary').trigger('click');
    $(document).on('click', '.cb-element', function () {
        if ($(this).is(':checked')) {
            $("#btnEdit").show();
            $("#btnEditInc").removeAttr("disabled");
            $("#btnAssetLocation").removeAttr("disabled");
            $("#btnAssignTo").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
            $("#btnStatusUpdate").removeAttr("disabled");
            $("#btnKnowledgeBase").removeAttr("disabled");
            $("#btnAddproblem").removeAttr("disabled");
            $("#btnMasterIncident").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnAssetLocation").attr("disabled", "disabled");
            $("#btnEditInc").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnStatusUpdate").attr("disabled", "disabled");
            $("#btnKnowledgeBase").attr("disabled", "disabled");
            $("#btnAddproblem").attr("disabled", "disabled");
            $("#btnMasterIncident").attr("disabled", "disabled");
        }
        else {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnAssetLocation").attr("disabled", "disabled");
            $("#btnEditInc").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnStatusUpdate").attr("disabled", "disabled");
            $("#btnKnowledgeBase").attr("disabled", "disabled");
            $("#btnAddproblem").attr("disabled", "disabled");
            $("#btnMasterIncident").attr("disabled", "disabled");
        }
     
    });
    $('#btnKnowledgeBase').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            GetTicketsAllDetails($(this).attr('name'));
            //  alert($(this).val());
        });
        $('.select2').select2(
            { dropdownParent: $('#myModalKB') });
    });
    $('#btnSaveSolution').click(function () {
        InsSolutionForIncidentAndProblem();
        //var val = [];
        //$(':checkbox:checked').each(function (i) {
        //    val[i] = $(this).val();
        //    GetTicketsAllDetails($(this).attr('name'));
        //    //  alert($(this).val());
        //});
    });
    $("#CheckAll").click(function () {
        if ($(this).is(':checked')) {
            $("#btnAssignTo").removeAttr("disabled");
            $("#btnAssetLocation").removeAttr("disabled");
            $("#btnEditInc").removeAttr("disabled");
            $("#btnChangeStatus").removeAttr("disabled");
            $("#BtnDelete").removeAttr("disabled");
            $("#btnStatusUpdate").removeAttr("disabled");
            $("#btnKnowledgeBase").removeAttr("disabled");
            $("#btnAddproblem").removeAttr("disabled");
            $("#btnMasterIncident").removeAttr("disabled");
        } else if (!$(this).is(':checked')) {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnAssetLocation").attr("disabled", "disabled");
            $("#btnEditInc").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnStatusUpdate").attr("disabled", "disabled");
            $("#btnKnowledgeBase").attr("disabled", "disabled");
            $("#btnAddproblem").attr("disabled", "disabled");
            $("#btnMasterIncident").attr("disabled", "disabled");
        }
        else {
            $("#btnAssignTo").attr("disabled", "disabled");
            $("#btnAssetLocation").attr("disabled", "disabled");
            $("#btnEditInc").attr("disabled", "disabled");
            $("#btnChangeStatus").attr("disabled", "disabled");
            $("#BtnDelete").attr("disabled", "disabled");
            $("#btnStatusUpdate").attr("disabled", "disabled");
            $("#btnKnowledgeBase").attr("disabled", "disabled");
            $("#btnAddproblem").attr("disabled", "disabled");
            $("#btnMasterIncident").attr("disabled", "disabled");
        }
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#BtnDelete').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            $("#btnEdit").hide();
            deleteTicket($(this).attr('name'));
            $(".cb-element").prop("checked", false);
        });
    });
    $("#CheckAllStatus").click(function () { 
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#btnEditInc').click(function () { 
        var val = [];
        $('.tktcbk:checked').each(function (i) {
            val[i] = $(this).val();
            GetTicketsAllDetailsEdit($(this).attr('name')); 
          //  $("#txtarea").hide();
        });
        $('.select2').select2(
            { dropdownParent: $('#myModalNew') }
        );
        $("#ddlUser").attr("disabled", "disabled");
        $("#btnSubmit").hide(); $("#btnUpdate").show();
        $("#myModalLabelINC").hide(); $("#myModalLabelEdit").show();
    });
    $('#btnStatusUpdateReopen').click(function () {
        var val = [];
        $('.tktcbk:checked').each(function (i) {
            //alert($(this).attr('name'));
            val[i] = $(this).val();
            UpdateTicketStatusReopen($(this).attr('name'));
        });
    });
    $('#btnStatusUpdate').click(function () {
        var val = [];
        $('.tktcbk:checked').each(function (i) {
            //alert($(this).attr('name'));
            val[i] = $(this).val();
            UpdateTicketStatus($(this).attr('name'));
           // UpdateTicketAsignToChangeStatus($(this).attr('name'));
        });
    });
    $('#btnStatusUpdateAssign').click(function () {
        var val = [];
        $('.tktcbk:checked').each(function (i) {
            //alert($(this).attr('name'));
            val[i] = $(this).val();
            UpdateTicketStatus($(this).attr('name'));
            UpdateTicketAsignToChangeStatus($(this).attr('name'));
        });
    });
    $('#btnMasterIncident').click(function () {
        var countries = [];
        $.each($('.tktcbk:checked'), function () {
            countries.push($(this).attr('name'));
          //  alert(countries.join(","));
            GetMasterIncident(countries.join(","));
        });
    });
    $('#btnMasterIncidentSubmit').click(function () {
        var val = [];
        $('.tktcbk:checked').each(function (i) {
            val[i] = $(this).val();
           // alert($(this).attr('name'));
            InsMasterIncidentMappedToChildIncident($(this).attr('name'));
        });
    });
    $('#btnUpdate').click(function () {
        var val = [];
        $('.tktcbk:checked').each(function (i) {
            //alert($(this).attr('name'));
            val[i] = $(this).val();
            UpdateTicket($(this).attr('name'));
        });

    });
    $("#CheckAllAsignTo").click(function () {
        $('input:checkbox').not(this).prop('checked', this.checked);
    });
    $('#btnAsignToUpdate').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            UpdateTicketAsignTo($(this).attr('name'));
            UpdateTicketStatusChangeAssignToEngi($(this).attr('name'));
        });
    });
    $('#btnAssetLocation').click(function () {
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            GetAssetLocation($(this).attr("name"));
        });
    });
    $("#dllCategoryForSolutions").change(function () {
        if ($(this).val() != 0) {
            GetCategoryList($(this).val());
        } else {
            $("#ddlSubCategoryForSolution").html("").append('<option value="0">Select Sub Category</option>');
        }
    });
    
    //GetCloserCode();
    //GetSubLocation();
    //GetSection();
    //GetBusinessUnit();
    //GetCondition();
    //GetSupplierDetails();
    //GetCommonCategory();
    //GetFloor();
    //GetAssetCategory();
    //GetAllAssetList();
    //GetProblemMagementList();
    //GetKnowledgeBaseCategory();
    //GetTicketStatus();
    //GetCommonCategoryAsset();
    //GetViewWorkloadList()
    //GetSupportDepartment();
    //GetCloserCode();
    //GetClientLists();
    //GetPriority();
    //GetImpactList();
    //GetUrgency();
    //GetLocation();
    //GetUser();
    //GetDepartmentLists();
    //GetAllSubCategory();
    //GetSupplierDetails();
    //GetPendingReason();
    //GetConsultant();
    $("#btnNew").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModalNew') }
        );
       
        $("#ddlLoggedVia").removeAttr("disabled");
        $("#ddlUser").removeAttr("disabled");
        $("#ClrTicket").find("input").val("");
        $("#ClrTicket").find("select").val(0).change();
    });
    $("#btnAssignTo").click(function () {
        $('.select2').select2(
         { dropdownParent: $('#myModalAsignTo') });
    });
    $("#btnChangeStatus").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModalChangeStatus') });
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
            GetTicketStatusListsConditionWise($(this).attr('name'));
        });
    });
    $("#btnAddproblem").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myLargeModalAddProblem') });
    });
    $("#ddlDepartmentNameAsset").change(function () { 
        if ($(this).val() != 0) {
            GetSectionDepartmentWise($(this).val());
        } else {
            $("#ddlSection").html("").append('<option value="0">Select Section</option>');
        }
    });
    $("#btnAddAsset").click(function () {
        $('.select2').select2(
            { dropdownParent: $('#myModal') }
        );
    });
    $("#btnSubmitAsset").click(function () {
        if (validateAssets() == true) {
            InsAsset();
        } else {
            return false;
        }
    });
    $("#ddlLocationAsset").change(function () { 
        if ($(this).val() != 0) {
            GetStoredLocation($(this).val());
        } else {
            $("#ddlVendorContactPerson").html("").append('<option value="0">Select Stored Location</option>');
        }
    });
    GetTicketLists();
    GetTicketListsAll();
    $("#ddlAsset").change(function () {
        if ($(this).val() != 0) {
            GetAssetDetailsEdit($(this).val());
        } else {
           //  $("#ddlDepartmentName").html("").append('<option value="0">Select </option>');
        }
    });
    $("#ddlUser").change(function () {
        if ($(this).val() != 0) {
           // GetAssetList($(this).val());
          //  GetDepartmentAccToUserList($(this).val());
        } else {
        //    $("#ddlAsset").html("").append('<option value="0">Select </option>');
         //   $("#ddlDepartmentName").html("").append('<option value="0">Select </option>');
        }
    });
    $("#ddlCategory").change(function () {
        if ($(this).val() != 0) {
            GetCommonSubCategory($(this).val());
        } else {
            $("#ddlSubCategory").html("").append('<option value="0">Select Sub Category</option>');
        }
    });
    $("#ddlSupportGroup").change(function () {
        if ($(this).val() != 0) {
            GetEmployeeListSGD($(this).val());
        } else {
            $("#ddlTechnician").html("").append('<option value="0">Select Technician</option>');
        }
    });
    $("#ddlClient").change(function () {
        if ($(this).val() != 0) {
      //      GetLocationAccToBusinessUnitList($(this).val());
        } else {
            $("#ddlLocation").html("").append('<option value="0">Select Location</option>'); 
        }
    });
    $("#ddlSupportGroupAsgn").change(function () {
        if ($(this).val() != 0) {
            GetEmployeeListSGD($(this).val());
        } else {
            $("#ddlTechnician").html("").append('<option value="0">Select Technician</option>');
        }
    });
    $("#ddlSupportGroupAsgnStatus").change(function () {
        if ($(this).val() != 0) {
            GetEmployeeListSGD($(this).val());
        } else {
            $("#ddlUserListStatus").html("").append('<option value="0">Select Technician</option>');
        }
    });
    $("#ddlSupportOrgnisation").change(function () {
        if ($(this).val() != 0) {
            GetSupportGroup($(this).val());
        } else {
            $("#ddlSupportGroup").html("").append('<option value="0">Select Support Group</option>');
        }
    });
    $("#ddlSupportOrgnisationAsgn").change(function () {
        if ($(this).val() != 0) {
            GetSupportGroup($(this).val());
        } else {
            $("#ddlSupportGroupAsgn").html("").append('<option value="0">Select Support Group</option>');
        }
    });
    $("#ddlSupportOrgnisationAsgnStatus").change(function () {
        if ($(this).val() != 0) {
            GetSupportGroup($(this).val());
        } else {
            $("#ddlSupportGroupAsgnStatus").html("").append('<option value="0">Select Support Group</option>');
        }
    });
    $("#btnSubmit").click(function () {
      if (validateTickets() == true) {
          InsAddNewTicket();
        } else {
            return false;
        }
    });
    $(document).on('click', '.editview', function () {
        // alert($(this).attr("name"));
        if ($.session.get("ticket_id_pk") != '' || $.session.get("ticket_id_pk") != null || $.session.get("ticket_id_pk") == undefined) {
            $.session.remove("ticket_id_pk");
            $.session.set("ticket_id_pk", $(this).attr("name"));
          //  window.open('/Ticket/TicketDetails');
        }

    });
    $(document).on('click', '.tktedit', function () {
        $('#btnEditInc').click();
        alert($(this).attr("name"));
        GetTicketsAllDetailsEdit($(this).attr("name"));
    });
    $(document).on('click', '.adminview', function () {
        GetAdminDetails($(this).attr("name"));
    });
    $(document).on('click', '.adminviewsubmitter', function () {
        GetAdminDetailsSubmitter($(this).attr("name"));
    });
    $(document).on('click', '.consultant', function () {
        GetConsultantDetails($(this).attr("name"));
    });
    $("#btnAttachProblem").click(function () {
        if (validateAttachProblem() == true) {
            var val = [];
            $('.tktcbk:checked').each(function (i) {
                val[i] = $(this).val();
               // alert($(this).attr('name'));
               InsAttachProblemWithTicket($(this).attr('name'));
            });
        } else {
            return false;
        }
    });
    $("#btnFilter").click(function () {
        GetTicketLists();
       // $('#closedModelFilter').click();
    });
    $("#ddlRange").change(function () {
        GetTicketLists();
    });
    $("#ddlTicketStatus").change(function () {
        if ($(this).val() == 4) {
            $("#DivPendingBox").show();
            $("#DivCommentBox").show();
            $("#divCloser").hide(); 
            $("#Assigned").hide();
            $("#DivReopenCommentBox").hide();
            $("#btnStatusUpdateAssign").hide();
            $("#btnStatusUpdateReopen").hide();
            $("#btnStatusUpdate").show();
        } else if ($(this).val() == 2) {
            $("#Assigned").show();
            $("#btnStatusUpdateAssign").show();
            $("#btnStatusUpdate").hide();
            $("#btnStatusUpdateReopen").hide();
            $("#DivPendingBox").hide();
            $("#DivCommentBox").hide();
            $("#DivReopenCommentBox").hide();
        } else if ($(this).val() == 5) {
            $("#divCloser").show();
            $("#btnStatusUpdateAssign").hide();
            $("#btnStatusUpdateReopen").hide();
            $("#btnStatusUpdate").show();
            $("#DivPendingBox").hide();
            $("#DivCommentBox").hide();
            $("#Assigned").hide();
            $("#DivReopenCommentBox").hide();
        } else if ($(this).val() == 6) {
            $("#divCloser").hide();
            $("#btnStatusUpdateAssign").hide();
            $("#btnStatusUpdate").hide();
            $("#btnStatusUpdateReopen").show();
            $("#DivPendingBox").hide();
            $("#DivCommentBox").hide();
            $("#Assigned").hide();
            $("#DivReopenCommentBox").show();
            $("#DivPendingReason").hide();  
        } 
        else {
            $("#divCloser").hide(); 
            $("#DivPendingBox").hide(); 
            $("#DivVendor").hide();
            $("#DivCommentBox").hide();
            $("#Assigned").hide();
            $("#btnStatusUpdateAssign").hide();
            $("#btnStatusUpdate").show();
            $("#btnStatusUpdateReopen").hide();
            $("#DivReopenCommentBox").hide(); 
            $("#DivPendingReason").hide();  
        }
    });
    $("#ddlPending").change(function () {
        if ($(this).val() == 1) {
            $("#DivVendor").show();
            $("#DivPendingReason").hide();
        } else if ($(this).val() == 0) {
            $("#DivVendor").hide();
            $("#DivPendingReason").hide();
        } else if ($(this).val() == 3) {
            $("#DivVendor").hide();
            $("#DivPendingReason").hide();
        } else {
           $("#DivPendingReason").show();
            $("#DivVendor").hide();
        }
    });
    $("#btnNew").click(function () {
        GetCommonCategory();
    });
    
});

function GetTicketLists() {   // , logged_via, user_id_fk, ticket_status_id_pk, client_id_pk, department_id_fk, priority_id_pk, common_cat_id_pk, sub_category_id_pk
    var fdate = ''
    fdate = $('#txtFromDatefltr').val();
    var tdate = ''
    tdate = $('#txtToDatefltr').val();
    var location = null
    $("#ddlLocationFltr option:selected").each(function () {
        if ($(this).val() != 0) {
          //  location = location + ' ' + $(this).val();
            location = $(this).val();
        }
      //  alert(location);
    });
    var loggedvia = null 
    $("#ddlLoggedViaFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            loggedvia = $(this).val();
        }
    });
    var user = null 
    $("#ddlUserFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            user = $(this).val();
        }
    });
    var status = null
    $("#ddlStatusFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            status = $(this).val();
        }
    });
    var client = null 
    $("#ddlClientFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            client = $(this).val();
        }
    });
    var department = null
    $("#ddlDepartmentNameFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            department = $(this).val();
         //   alert(department);
        }
    });
    var priority = null 
    $("#ddlPriorityFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            priority = $(this).val();
        }
    });
    var category = null 
    $("#ddlCategoryFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            category = $(this).val(); 
        }
    });
    var subcategory = null 
    $("#ddlSubCategoryFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            subcategory = $(this).val();
        }
    });
    var resolutionsla = null
    $("#ddlResolutionSLAFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            resolutionsla = $(this).val();
        }
    });
    var pendingcategory = null
    $("#ddlPendingCategoryFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            pendingcategory = $(this).val();
        }
    });
    var pendingreason = null
    $("#ddlPendingReasonFltr option:selected").each(function () {
        if ($(this).val() != 0) {
            //  location = location + ' ' + $(this).val();
            pendingreason = $(this).val();
        }
    });
    var range = null
    $("#ddlRange option:selected").each(function () {
        if ($(this).val() != 0) {
            range = $(this).val();
        }
    });
    var parm = {
        'from_date': fdate ,
        'to_date': tdate,
        'location_id': location, 
        'logged_via': loggedvia,
        'user_id': user,
        'ticket_status': status ,
        'client_id': client,
        'department_id': department,
        'priority_id': priority,
        'common_cat_id': category,
        'sub_category_id': subcategory,
        'resolution_sla': resolutionsla,
        'pending_reason_id_fk': pendingcategory,
        'pending_category_id': pendingreason,
        'range': range
    };
    var josnstr = JSON.stringify(parm);
    $.ajax({
        type: "Post",
        url: 'http://playmediahouse.com/api/api/Ticket/GetTicketLists1',
        contentType: "application/json; charset=utf-8",
        data: josnstr,
        dataType: "json",
      //  deferLoading: 10
        success: function (data) {
            
            var table;
            if ($.fn.dataTable.isDataTable('#tblTicket')) {
                table = $('#tblTicket').DataTable();
            } else {
                table = $('#tblTicket').DataTable();
            }
            table.destroy();
            $("#tblTicket").DataTable({
                data: data,
                paging: true,
                sort: false,
                searching: true,
                ordering: true,
                order: [],
                lengthMenu: [
                    [10, 25, 50, -1],
                    ['10 rows', '25 rows', '50 rows', 'Show all']
                ],
                responsive: true,
                columns: [

                    {
                        data: 'ticket_id_pk',
                        sWidth: '2px',
                        sClass: "view",
                        bSortable: false,
                        render: function (ticket_id_pk) {
                            return '<input id="check" class="cb-element checkbox tktcbk" name="' + ticket_id_pk + '" type="checkbox">';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },

                    {
                        data: 'ticket_id_pk', render: function (ticket_id_pk, type, row) {
                            // Combine the first and last names into a single table field
                            //return '<a href="/Ticket/TicketDetails" class="editview"  name="' + ticket_id_pk + '">' + row.prefix + + row.ticket_id_pk +'  <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="" style="color:#f39c12 !important" data-original-title="Normal priority"></i></a>';
                            if (row.priority_id_pk === 1) {
                                return ' <a href="/Admin/Ticket/TicketDetails" title="Critical" class="editview"  name="' + ticket_id_pk + '">  <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Severity - 1" style="color:#ea2d2d !important" title="Normal priority" data-original-title="Normal priority"></i>   &nbsp; <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp; ' + row.prefix + + row.ticket_id_pk + ' </a>';
                                // return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + status + '">' + status + '</span>';
                            }
                            else if (row.priority_id_pk === 2) {
                                return ' <a href="/Admin/Ticket/TicketDetails" title="High" class="editview"  name="' + ticket_id_pk + '">  <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Severity - 2" style="color:#b38909 !important" title="Normal priority" data-original-title="Normal priority"></i>   &nbsp;  <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp; ' + row.prefix + + row.ticket_id_pk + '</a>';
                                // return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (row.priority_id_pk === 3) {
                                return ' <a href="/Admin/Ticket/TicketDetails" title="Medium" class="editview"  name="' + ticket_id_pk + '"> <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Severity - 3" style="color:#ffee07 !important" data-original-title="Normal priority"></i>   &nbsp;  <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp; ' + row.prefix + + row.ticket_id_pk + '</a>';
                                // return '<span class="badge badge-primary ENABLED" style="background-color:#b3ae1f;" name="' + status + '">' + status + '</span>';
                            }
                            else if (row.priority_id_pk === 4) {
                                return ' <a href="/Admin/Ticket/TicketDetails" title="Low" class="editview"  name="' + ticket_id_pk + '"> <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Severity - 4" style="color:#067304ad  !important" data-original-title="Normal priority"></i>   &nbsp;  <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp; ' + row.prefix + + row.ticket_id_pk + '</a>';
                                //  <a class="fa fa-edit tktedit" style="font-size:24px" data-toggle="tooltip" name="' + ticket_id_pk + '" data-toggle="modal" data-target="#myModalNew" style="color:#35adaf !important" ></a>
                                //  return '<span class="badge badge-primary ENABLED" style="background-color:#3bc0c3 !important;" name="' + status + '">' + status + '</span>';
                            }
                            else if (row.priority_id_pk == 0) {
                                return ' <a href="/Admin/Ticket/TicketDetails" title="Low" class="editview"  name="' + ticket_id_pk + '"> <i class="fa fa-flag fa-fw" data-toggle="tooltip" title="Priority Not Assigned" style="color:#adb1b3  !important" data-original-title="Normal priority"></i>   &nbsp;  <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i> &nbsp; ' + row.prefix + + row.ticket_id_pk + '</a>';
                                //  return '<span class="badge badge-primary ENABLED" style="background-color:#3bc0c3 !important;" name="' + status + '">' + status + '</span>';
                            }

                        }
                    },
                    { data: 'subject' },
                    { data: 'department_name', "visible": false }, 
                    { data: 'LOCATION', "visible": false },
                    { data: 'ASSIGNED_ENGINEER', "visible": false },
                    { data: 'USER_CONTACT_NUMBER', "visible": false },
                    { data: 'USER_EMAIL', "visible": false },
                    { data: 'RESLOVED_DATE', "visible": false },
                    { data: 'PRIORITY', "visible": false },
                    { data: 'SUPPORT_DEPARTMENT', "visible": false },
                    { data: 'SUPPORT_DEPARTMENT_GROUP', "visible": false },
                    { data: 'CATEGORY', "visible": false },
                    { data: 'SUB_CATEGORY', "visible": false },
                    {
                       data: 'consultant_id_fk', render: function (consultant_id_fk, type, row) {
                           return '<a href="#" class="consultant"  name="' + consultant_id_fk + '"  data-toggle="modal" data-target="#myModalConsultant"> <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i>  &nbsp;' + row.consultant_name +'  </a>';
                         }
                    },
                    { data: 'email',sWidth: '140px',sClass: "view", bSortable: false, render: function (email) {
                            return '<a href="#" class="adminviewsubmitter"  name="' + email + '" data-toggle="modal" data-target="#myModalSubmitter" >  <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i>  &nbsp;  ' + email + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                        }
                    },
                    {
                          data: 'name',
                          sWidth: '140px',
                          sClass: "view",
                          bSortable: false,
                          render: function (name) {
                              return '<a href="#" class="adminview"  name="' + name + '" data-toggle="modal" data-target="#myModal" >  <i class="fa fa-eye" data-toggle="tooltip" title="" style="color:#35adaf !important" data-original-title="Normal priority"></i>  &nbsp;  ' + name + '</a>';  // <button class="btn btn-xs btn-success grid-buttons btnedit" name="' + catogory_id_pk + '" style="margin-right:5px;"><i class="fa fa-edit icon-ser"></i></button>
                          }
                      },
                    {
                        "data": "created_date",
                        "type": "date",
                        "render":
                            function (data, type, full) {
                                return (data) ? moment(data).format('DD/MM/YYYY  -  HH:mm:ss') : '';
                            }
                    },
                    {
                        data: 'ticket_id_pk', render: function (ticket_id_pk, type, row) {
                            if (row.is_sla_applicable == 0) {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#b5b6b7;" name="' + row.non_negative + '">' + 'N/A' + '</span>';
                            }
                            if (row.status == 'Pause') {
                                return '<i class="fa fa-pause" aria-hidden="true"></i>  &nbsp;&nbsp;&nbsp;<span class="badge badge-primary ENABLED" style="background-color:#23af73;font-size: 11px !important;" name="' + row.non_negative + '">' + row.non_negative + '</span> ';
                            }
                            else if (row.status == 'Pause' || parseFloat(row.non_negative) < 0) {
                                return '<i class="fa fa-pause" aria-hidden="true"></i>  &nbsp;&nbsp;&nbsp;<span class="badge badge-primary ENABLED" style="background-color:#f64e60;font-size: 11px !important;" name="' + row.non_negative + '">' + row.non_negative + '</span> ';
                            }
                            if (row.status == 'Closed') {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#b5b6b7;" name="' + row.non_negative + '">' + 'N/A' + '</span>';
                            }
                            if (row.status == 'Cancel') {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#b5b6b7;" name="' + row.non_negative + '">' + 'N/A' + '</span>';
                            }
                            if (row.status == 'Resolved') {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#b5b6b7;" name="' + row.non_negative + '">' + 'N/A' + '</span>';
                            }
                            var duecheck = false;
                            var str1 = row.non_negative;
                            var str2 = "-";
                            if (str1 != null && str1.indexOf(str2) != -1) {
                                duecheck = true;
                            }
                            if (row.status == 'Pause') {
                                return '<i class="fa fa-pause" aria-hidden="true"></i>  &nbsp;&nbsp;&nbsp;<span class="badge badge-primary ENABLED" style="background-color:#029800;font-size: 11px !important;" name="' + row.non_negative + '">' + row.non_negative + '</span> ';
                            }
                            else if (row.status == 'Pause' || parseFloat(row.non_negative) < 0) {
                                return '<i class="fa fa-pause" aria-hidden="true"></i>  &nbsp;&nbsp;&nbsp;<span class="badge badge-primary ENABLED" style="background-color:#f64e60;font-size: 11px !important;" name="' + row.non_negative + '">' + row.non_negative + '</span> ';
                            }
                            if (row.status == 'Closed') {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#b5b6b7;" name="' + row.non_negative + '">' + 'N/A' + '</span>';
                            }
                            if (duecheck == true) {
                                //  if (row.status == 'Pause') {
                                //     return '<i class="fa fa-pause" aria-hidden="true"></i>  &nbsp;&nbsp;&nbsp;<span class="badge badge-primary ENABLED" style="background-color:#029800;" name="' + row.non_negative + '">' + row.non_negative + '</span> ';
                                // }
                                if (row.SlaStatus == "Pause") {
                                    return '<i class="fa fa-pause" aria-hidden="true"></i>  &nbsp;&nbsp;&nbsp;<span class="badge badge-primary ENABLED" style="background-color:#f64e60;font-size: 11px !important;" name="' + row.non_negative + '">' + row.non_negative + '</span> ';
                                } else if (row.SlaStatus == "Running") {
                                    return '<i class="fa fa-play" aria-hidden="true"> </i>  &nbsp;&nbsp;&nbsp;<span class="badge badge-primary ENABLED" style="background-color:#f64e60 !important;font-size: 11px !important;" name="' + row.non_negative + '">' + row.non_negative + '</span> ';
                                }
                                // return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + row.non_negative + '">' + row.non_negative + '  OverDue' + '</span> <i class="fa fa-pause" aria-hidden="true"></i>';
                            }
                            //else if (parseFloat(row.non_negative) < 0 || row.status == 'Pause') {
                            //    return '<i class="fa fa-pause" aria-hidden="true"></i>  &nbsp;&nbsp;&nbsp;<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + row.non_negative + '">' + row.non_negative + '</span> ';
                            //}
                            else if (parseFloat(row.non_negative) < 0) {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#ea2d2d;" name="' + row.non_negative + '">' + row.non_negative + '</span> </i>';
                            } else if (row.non_negative == null) {
                                return '<span class="badge badge-primary ENABLED" style="background-color:#029800;" name="' + row.non_negative + '">' + row.non_negative + '</span>';
                            } else {
                                if (row.SlaStatus == "Running") {
                                    return '<i class="fa fa-play" aria-hidden="true"></i> &nbsp;&nbsp;&nbsp;<span class="badge badge-primary ENABLED" style="background-color:#23af73;font-size: 11px !important;" name="' + row.non_negative + '">' + row.non_negative + '</span> ';
                                } else if (row.SlaStatus == "Pause") {
                                    return '<i class="fa fa-pause" aria-hidden="true"> </i> &nbsp;&nbsp;&nbsp; <span class="badge badge-primary ENABLED" style="background-color:#f64e60 !important;font-size: 11px !important;" name="' + row.non_negative + '">' + row.non_negative + '</span> ';
                                }
                            }
                        }
                    },
                   
                    {
                          data: "status",
                          render: function (status) {
                            // Check if blank
                              if (status === "New") {
                                  return '<span class="badge badge-primary ENABLED" style="background-color:#f64e60;font-size: 11px !important;" name="' + status + '">' + status + '</span>';
                              }
                              else if (status === "Closed") {
                                  return '<span class="badge badge-primary ENABLED" style="background-color:#23af73 !important;font-size: 11px !important;" name="' + status + '">' + status + '</span>';
                              }
                              else if (status === "Assigned") {
                                  return '<span class="badge badge-primary ENABLED" style="background-color:#b3ae1f;font-size: 11px !important;" name="' + status + '">' + status + '</span>';
                              }
                              else if (status === "In Progress") { 
                                  return '<span class="badge badge-primary ENABLED" style="background-color:#3bc0c3 !important;font-size: 11px !important;" name="' + status + '">' + status + '</span>';
                              }  
                              else if (status === "Pause") {
                                  return '<span class="badge badge-primary ENABLED" style="background-color:#de7b00;font-size: 11px !important;" name="' + status + '">' + status + '</span>';
                              }
                              else if (status === "Resolved") {
                                  return '<span class="badge badge-primary" style="background-color:#bb60c1 !important;font-size: 11px !important;" name="' + status + '">' + status + '</span>';
                              }
                              else if (status === "Reopened") {
                                  return '<span class="badge badge-primary" style="background-color:#f24f7c !important;font-size: 11px !important;" name="' + status + '">' + status + '</span>';
                              }
                              else if (status === "Cancel") {
                                  return '<span class="badge badge-primary ENABLED" style="background-color:#029800 !important;font-size: 11px !important;" name="' + status + '">' + status + '</span>';
                              }
                            // If not blank display data normally
                           //   return '<span class="badge badge-primary DISABLED" style="background-color:#2ca04a;" name="' + status + '">' + status + '</span>';
                            //  return ' <input type="checkbox" class="custom-switch" checked name="switch1" data-textOn="ON" data-textOff="OFF" data - trackColorOn="#512DA8" data - trackColorOff="#616161" data - textColorOff="#fff" data - trackBorderColor="#555" >'; 
                        }
                    },
                    { data: 'sub_location' },
                    { data: 'gate' },
                    { data: 'floor_name' },
                    { data: 'section_name' },
                    { data: 'building_room_no' },
                ],
                dom: 'Bflrtip',
                lengthChange: true,
                buttons: [
                    {
                        extend: 'copyHtml5',
                        text: '<i class="fa fa-files-o fa-1x"></i>',
                        titleAttr: 'Copy'
                    },
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fa fa-file-excel-o fa-1x"></i>',
                        titleAttr: 'Excel'
                    },
                    {
                        extend: 'pdfHtml5',
                        text: '<i class="fa fa-file-pdf-o fa-1x"></i>',
                        titleAttr: 'PDF'
                    },
                    {
                        extend: 'colvis',
                        text: '<i class="fa fa-list fa-2x"></i>',
                        titleAttr: 'colvis'
                    },
                    //'colvis'
                ]

            });
        },
        error: function (edata) {
            alert("error while feching record.");
        }
    });
};
function GetTicketListsAll() { 
    $.ajax({
        type: "Get",
        url: 'http://playmediahouse.com/api/api/Ticket/GetTicketLists',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            alert(data.new_s + data.closed_s);
            $("#TotalRecord").text(data.new_s + data.closed_s + data.closed_s + data.cancel_s + data.resolved_s + data.pause_s + data.in_progress_s + data.assigned_s + data.new_s);
            $("#TotalClosed").text(data.closed_s);
            $("#TotalCancel").text(data.cancel_s);
            $("#TotalResolved").text(data.resolved_s);
            $("#TotalPause").text(data.pause_s);
            $("#TotalInProgress").text(data.in_progress_s);
            $("#TotalAssigned").text(data.assigned_s);
            $("#TotalNew").text(data.new_s);
           
        },
        error: function (edata) {
            $(edata).each(function () {
                InsException(this.status, this.statusText, (this.responseJSON).ExceptionMessage, (this.responseJSON).ExceptionType);
            });
            alert("error while geting record.");
        }
    });
};
