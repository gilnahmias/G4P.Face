using G4P.Face.Models.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4P.Face.Models
{
    public class Experiment
    {
        public Experiment()
        {
            this.Id = Guid.NewGuid().ToString();
            this.CreatedAt = Time.DateTimeOffsetToMs(DateTimeOffset.UtcNow);
            this.Results = new Dictionary<string, ProbeResult>();
            this.Facilitators = new List<string>();
        }

        public string Id { get; set; }

        public List<string> Tags { get; set; }

        public long CreatedAt { get; set; }

        public long StartedAt { get; set; }

        public List<string> Facilitators { get; set; }

        public ExperimentTemplate Template { get; set; }

        public Dictionary<string, ProbeResult> Results { get; set; }
    }
}
