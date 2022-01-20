using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Z_ServiceDesk.Controllers
{
    public class TicketController : Controller
    {
        // GET: Ticket
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Index1() 
        {
            return View();
        }
        public ActionResult AddIncident()  
        {
            return View();
        }
        public ActionResult NewIncident() 
        {
            return View();
        }
    }
}