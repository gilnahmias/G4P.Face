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
    [RoutePrefix("data/experiments")]
    public class ExperimentsController : ApiController
    {
        [HttpGet, Route("")]
        public IHttpActionResult GetValues()
        {
            var experiments = Repositories.Experiments.GetAll();
            return Ok(experiments);
        }

        [HttpGet, Route("{experimentId}")]
        public IHttpActionResult GetById(string experimentId)
        {
            var experiment = Repositories.Experiments.GetById(experimentId);
            return Ok(experiment);
        }

        [HttpPost, Route("{experimentId}/results")]
        public void Add(string experimentId, [FromBody]ProbeResult result)
        {
            Repositories.Experiments.AddOrUpdateResult(experimentId, result);
        }

        [HttpGet, Route("{experimentId}/results")]
        public IHttpActionResult GetResultsForExperiment(string experimentId)
        {
            var results = Repositories.Experiments.GetResultsForExperiment(experimentId);
            return Ok(results);
        }
    }


}
