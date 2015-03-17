using G4P.Face.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using STSdb4.Database;
using STSdb4.WaterfallTree;

namespace G4P.Face.Repositories
{
    public class Experiments
    {
        const string EXPERIMENTS_COLLECTION = "experiments";

        public void Clear()
        {
            using (var engine = DB.CreateEngine())
            {
                var table = engine.OpenXTable<string, Experiment>(EXPERIMENTS_COLLECTION);
                table.Clear();
                engine.Commit();
            }
        }

        public Experiment GetById(string expdrimentId)
        {
            using (var engine = DB.CreateEngine())
            {
                var table = engine.OpenXTable<string, Experiment>(EXPERIMENTS_COLLECTION);
                return table[expdrimentId];
            }
        }

        public void AddOrUpdate(Experiment experiment)
        {
            using (var engine = DB.CreateEngine())
            {
                var table = engine.OpenXTable<string, Experiment>(EXPERIMENTS_COLLECTION);
                table[experiment.Id] = experiment;
                engine.Commit();
            }
        }

        public IEnumerable<Experiment> GetAll()
        {
            var experiments = new List<Experiment>();

            using (var engine = DB.CreateEngine())
            {
                var table = engine.OpenXTable<string, Experiment>(EXPERIMENTS_COLLECTION);
                foreach (var row in table) //table.Forward(), table.Backward()
                {
                    experiments.Add(row.Value);
                }
            }
            return experiments;
        }


        public void AddOrUpdateResult(string experimentId, ProbeResult result)
        {
            using (var engine = DB.CreateEngine())
            {
                var table = engine.OpenXTable<string, Experiment>(EXPERIMENTS_COLLECTION);
                result.Id = result.Id ?? result.Timestamp + "_" + result.SubjectId + "_" + new Random().Next(100);
                table[experimentId].Results[result.Id] = result;
                engine.Commit();
            }
        }

        public IEnumerable<ProbeResult> GetResultsForExperiment(string experimentId){
            var experiment = this.GetById(experimentId);

            var results = new List<ProbeResult>();
            foreach (var result in experiment.Results)
            {
                results.Add(result.Value);
            }

            return results;
        }
    }
}
