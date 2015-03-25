using G4P.Face.Models;
using G4P.Face.Repositories;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
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
        public void Add(string experimentId)
         {
             try
             {

                 var requestBody = RequestBody();
                 var dictionary = ToDictionary(requestBody);
                 var probeResult = new ProbeResult
                 {
                     Id = dictionary["id"],
                     MachineTelemetryId = dictionary["machineTelemetryId"],
                     SpriteId = dictionary["spriteId"],
                     SubjectId = dictionary["subjectId"],
                     Duration = long.Parse(dictionary["duration"]),
                     Frame = int.Parse(dictionary["frame"]),
                     Timestamp = long.Parse(dictionary["timestamp"])
                 };


                 //Repositories.Experiments.AddOrUpdateResult(experimentId, result);
             }
             catch
             {
                 //log 
                 throw;
             }
        }

        [HttpGet, Route("{experimentId}/results")]
        public IHttpActionResult GetResultsForExperiment(string experimentId)
        {
            var results = Repositories.Experiments.GetResultsForExperiment(experimentId);
            return Ok(results);
        }

        public static string RequestBody()
        {
            var stream = HttpContext.Current.Request.GetBufferlessInputStream();
            var streamreader = new StreamReader(stream);
            var text = streamreader.ReadToEnd();
            return text;
        }

        private Dictionary<string, string> ToDictionary(string requestBody)
        {
            var kvps = requestBody.Split(new[] { '&' });
            var dictionary = new Dictionary<string, string>();
            
            foreach (var kvp in kvps){
                var split = kvp.Split(new[] { '=' });
                dictionary.Add(split[0], split[1]);
            }

            return dictionary;
        }

        
    }


}
