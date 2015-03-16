using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4P.Face.Models
{
    public class MachineTelemetry
    {
        public string Id { get; set; }
        public string MachineKey { get; set; } // saved in local storage
        public string BrowserType { get; set; }
        public string BrowserVersion { get; set; }
        public bool IsMobile { get; set; }
        public string ExternalIP { get; set; }
        public string InternalIP { get; set; }
    }
}
