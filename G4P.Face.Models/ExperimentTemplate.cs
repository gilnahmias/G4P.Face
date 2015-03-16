using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4P.Face.Models
{
    public class ExperimentTemplate
    {
        public string Id { get; set; }

        public List<string> Tags { get; set; }
        public List<string> SpriteIds { get; set; }
    }
}
