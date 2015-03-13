using G4P.Face.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace G4P.UsagePatterns.Web.Controllers
{
    public class ExperimentsController : ApiController
    {
        public IHttpActionResult GetValues()
        {
            var experiments = new Experiments();

           // return Ok(new[] { "a", "b", "c" });
            
            return Ok(experiments.GetAll());
        }
    }
}
