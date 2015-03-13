using G4P.Face.Models;
using G4P.Face.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace G4P.UsagePatterns.Web.Controllers
{
    [RoutePrefix("debug")]
    public class DebugController : ApiController
    {

        [HttpGet, Route("add-experiments/{count}")]
        public IHttpActionResult AddExperiments(int count)
        {
            var experiments = new Experiments();
            var ids = new List<string>();

            for (var i = 0; i < count; i++)
            {
                var experiment = this.CreateFakeExpriment();
                ids.Add(experiment.Id);
                experiments.Add(experiment);
            }

            return Ok(ids);
        }

        private Experiment CreateFakeExpriment()
        {
            var experiment = new Experiment();

            return experiment;
        }

    }
}
