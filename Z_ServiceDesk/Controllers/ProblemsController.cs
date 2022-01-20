using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Z_ServiceDesk.Controllers
{
    public class ProblemsController : Controller
    {
        // GET: Problems
        public ActionResult Index()
        {
            return View();
        }
    }
}