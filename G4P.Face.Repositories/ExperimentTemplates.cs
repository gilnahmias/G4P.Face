using G4P.Face.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4P.Face.Repositories
{
    public class ExperimentTemplates
    {

        const string COLLECTION = "experiment-templates";

        public void Clear()
        {
            using (var engine = DB.CreateEngine())
            {
                var table = engine.OpenXTable<string, ExperimentTemplate>(COLLECTION);
                table.Clear();
                engine.Commit();
            }
        }

        public void AddOrUpdate(ExperimentTemplate experiment)
        {
            using (var engine = DB.CreateEngine())
            {
                var table = engine.OpenXTable<string, ExperimentTemplate>(COLLECTION);
                table[experiment.Id] = experiment;
                engine.Commit();
            }
        }

        public IEnumerable<ExperimentTemplate> GetAll()
        {
            var templates = new List<ExperimentTemplate>();

            using (var engine = DB.CreateEngine())
            {
                var table = engine.OpenXTable<string, ExperimentTemplate>(COLLECTION);
                foreach (var row in table) //table.Forward(), table.Backward()
                {
                    templates.Add(row.Value);
                }
            }

            return templates;
        }

    }
}
