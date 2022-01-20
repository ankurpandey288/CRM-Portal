using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Z_ServiceDesk.Controllers
{
    public class ChangesController : Controller
    {
        // GET: Changes
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AddNewChanges() 
        {
            return View();
        }
        
    }
}