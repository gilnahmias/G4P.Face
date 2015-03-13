﻿using G4P.Face.Models;
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
        const string DB_PATH = @"c:\g4p-face.db";
        const string EXPERIMENTS_COLLECTION = "experiments";

        public void Add(Experiment experiment)
        {
            using (IStorageEngine engine = STSdb.FromFile(DB_PATH))
            {
                var table = engine.OpenXTable<string, Experiment>(EXPERIMENTS_COLLECTION);
                table[experiment.Id.ToString()] = new Experiment() { Id = experiment.Id.ToString() };
                engine.Commit();
            }
        }

        public IEnumerable<Experiment> GetAll()
        {
            var experiments = new List<Experiment>();

            using (IStorageEngine engine = STSdb.FromFile(DB_PATH))
            {
                var table = engine.OpenXTable<string, Experiment>(EXPERIMENTS_COLLECTION);
                foreach (var row in table) //table.Forward(), table.Backward()
                {
                    Console.WriteLine("{0} {1}", row.Key, row.Value);
                    //experiments.Add(row.Value);
                }
            }

            return experiments;
        }

    }
}
