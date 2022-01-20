using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net;
using System.Web.Script.Serialization;
using System.Data.SqlClient;
using System.Configuration;
//using Api_ZserviceDesk.Models;
using System.Text;

namespace Z_ServiceDesk.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        //[HttpPost]
        //public ActionResult Index(zdesk_employee e)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        zdesk_employee emp = validLogin(e.email, e.password);
        //        if (emp.id == 0 && emp.location_id_pk == 0)
        //        {
        //            ViewBag.Message = "Technician Not Found : Please Enter valid User Credentilal";
        //            return View(e);
        //        }
        //        //else if (emp.user_code != null)  
        //        //{
        //        //    zdesk_employee ei = new zdesk_employee();
        //        //    ei.id = emp.id;
        //        //    ei.user_code = emp.user_code;
        //        //    ei.name = emp.name;
        //        //    ei.location_id_pk = emp.location_id_pk;
        //        //    Session["EmployeeInfo"] = ei;
        //        //    return RedirectToAction("Index", "UserDashBoard");
        //        //}
        //        //else if (emp.id == 2)
        //        //{
        //        //    ViewBag.Message = "Technician Already Logged In";
        //        //    return View(e);
        //        //}
        //        else
        //        {
        //            zdesk_employee ei = new zdesk_employee();
        //            ei.id = emp.id;
        //            ei.name = emp.name;
        //            ei.location_id_pk = emp.location_id_pk;
        //            ei.roleid = emp.roleid;
        //            Session["EmployeeInfo"] = ei;
        //            return RedirectToAction("DashBoard", "Home");
        //        }
        //    }
        //    return View(e);
        //}


        //[NonAction]
        //public zdesk_employee validLogin(string emp_email, string emp_password)
        //{
        //    var input2 = new
        //    {
        //        email = emp_email,
        //        password = emp_password,
        //    };
        //    string inputJson2 = (new JavaScriptSerializer()).Serialize(input2);
        //    WebClient client2 = new WebClient();
        //    client2.Headers["Content-type"] = "application/json";
        //    client2.Encoding = Encoding.UTF8;
        //    //  string json = client2.UploadString("http://api.dmishraphysio.com/api/Login/ValidateUser", inputJson2);

        //    string json = client2.UploadString("http://playmediahouse.com/api/api/Login/ValidateTechnician", inputJson2);
        //    zdesk_employee emp = (new JavaScriptSerializer()).Deserialize<zdesk_employee>(json);
        //    return emp;
        //}
        public ActionResult DashBoard() 
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}