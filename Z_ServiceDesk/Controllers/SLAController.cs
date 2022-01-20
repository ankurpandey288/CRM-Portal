using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Z_ServiceDesk.Controllers
{
    public class SLAController : Controller
    {
        // GET: SLA
        public ActionResult SLACreation() 
        {
            return View();
        }
        public ActionResult AddSLACreation() 
        {
            return View();
        }
        public ActionResult SLAMapping()
        {
            return View();
        }
        public ActionResult AddSLAMapping() 
        {
            return View();
        }
        public ActionResult SLATimeline() 
        {
            return View();
        }
        public ActionResult AddSLATimeline() 
        {
            return View();
        }
        public ActionResult PriorityMatrix() 
        {
            return View();
        }
        public ActionResult AddPriorityMatrix() 
        {
            return View();
        }
        public ActionResult HolidayCalenderLocation() 
        {
            return View();
        }
        public ActionResult AddHolidayCalenderLocation() 
        {
            return View();
        }
        public ActionResult HolidayCalender()
        {
            return View();
        }
        public ActionResult AddHolidayCalender() 
        {
            return View();
        }
    }
}