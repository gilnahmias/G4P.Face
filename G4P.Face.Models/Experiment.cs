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
            this.CreatedAt = DateTimeOffset.UtcNow.UtcTicks / TimeSpan.TicksPerMillisecond;
        }

        public string Id { get; set; }

        public List<string> Tags { get; set; }

        public long CreatedAt { get; set; }

        public long StartedAt { get; set; }

        public List<string> Facilitators { get; set; }

        public ExperimentTemplate Template { get; set; }

        public List<ProbeResult> Results { get; set; }

        public static DateTime UnixTimeStampToDateTime(double unixTimeStamp)
        {
            // Unix timestamp is seconds past epoch
            System.DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
            dtDateTime = dtDateTime.AddSeconds(unixTimeStamp).ToLocalTime();
            return dtDateTime;
        }
    }
}
