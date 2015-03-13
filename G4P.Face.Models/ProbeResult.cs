using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4P.Face.Models
{
    public class ProbeResult
    {
        public long Timestamp { get; set; }

        public string SpriteId { get; set; }
        
        public string SubjectId { get; set; }
        
        public long Duration { get; set; }
    }
}
