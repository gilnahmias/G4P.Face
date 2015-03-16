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
    [RoutePrefix("experiments")]
    public class ExperimentsController : ApiController
    {
        private Lazy<Experiments> _experiments = new Lazy<Experiments>(() => new Experiments());

        private Experiments Experiments
        {
            get { return _experiments.Value; }
        }

        public IHttpActionResult GetValues()
        {
            return Ok(Experiments.GetAll());
        }

        [HttpPost, Route("{experimentId}/results")]
        public void Add(string experimentId, [FromBody]ProbeResult result)
        {
            Experiments.AddResult(experimentId, result);
        }
    }


}
