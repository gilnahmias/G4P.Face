using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4P.Face.Repositories
{
    public class Repositories
    {
        private static Lazy<Experiments> _experiments = new Lazy<Experiments>(() => new Experiments());
        private static Lazy<Sprites> _sprites = new Lazy<Sprites>(() => new Sprites());
        private static Lazy<MachineTelemetry> _machineTelemetry = new Lazy<MachineTelemetry>(() => new MachineTelemetry());
        private static Lazy<ExperimentTemplates> _experimentTemplates = new Lazy<ExperimentTemplates>(() => new ExperimentTemplates());

        public static Experiments Experiments
        {
            get
            {
                return Repositories._experiments.Value;
            }
        }

        public static Sprites Sprites
        {
            get
            {
                return Repositories._sprites.Value;
            }
        }

        public static MachineTelemetry MachineTelemetry
        {
            get
            {
                return Repositories._machineTelemetry.Value;
            }
        }

        public static ExperimentTemplates ExperimentTemplates
        {
            get
            {
                return Repositories._experimentTemplates.Value;
            }
        }
    }
}
