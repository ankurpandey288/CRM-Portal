using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Z_ServiceDesk.Controllers
{
    public class ReportsController : Controller
    {
        // GET: Reports
        public ActionResult GenerateIncident() 
        {
            return View();
        }
        public ActionResult GenerateRequests() 
        {
            return View();
        }
        public ActionResult GenerateAssets() 
        {
            return View();
        }
        public ActionResult GenerateAllIncidentReport()
        {
            return View();
        }
        public ActionResult GenerateAssestOutOfWarranty()
        {
            return View();
        }
        public ActionResult GenerateAssestUnderWarranty()
        {
            return View();
        }
        public ActionResult GenerateComponentsUnderRepair()
        {
            return View();
        }
        public ActionResult GenerateServiceReportFixed()
        {
            return View();
        }
        public ActionResult GenerateAssestExpireWithin3Months()
        {
            return View();
        }
        public ActionResult GeneratePeripheralsExpireWithin3Months()
        {
            return View();
        }
        public ActionResult GenerateSoftwareExpireWithin3Months()
        {
            return View();
        }
        public ActionResult GenerateTest()
        {
            return View();
        }
        public ActionResult GenerateFilterdata()
        {
            return View();
        }
        public ActionResult Generateasset()
        {
            return View();
        }

    }
}