using G4P.Face.Models;
using G4P.Face.Repositories;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Configuration;
using System.Web.Http;

namespace G4P.UsagePatterns.Web.Controllers
{
    [RoutePrefix("debug")]
    public class DebugController : ApiController
    {
        [HttpGet, Route("init")]
        public IHttpActionResult InitDB()
        {
            Seed.PurgeAll();
            Seed.Sprites();
            Seed.ExperimentTemplates();
            Seed.Experiments();

            return Ok("done");
        }

        [HttpGet, Route("browser")]
        public IHttpActionResult GetSometihng()
        {
            var userAgent = HttpContext.Current.Request.UserAgent;
            var userBrowser = new HttpBrowserCapabilities { Capabilities = new Hashtable { { string.Empty, userAgent } } };
            var factory = new BrowserCapabilitiesFactory();
            factory.ConfigureBrowserCapabilities(new NameValueCollection(), userBrowser);

            var telemetry = new G4P.Face.Models.MachineTelemetry
            {
                BrowserType = userBrowser.Browser,
                BrowserVersion = userBrowser.Version,
                IsMobile = userBrowser.IsMobileDevice
            };

            return Ok(userBrowser);
        }

    }
}
