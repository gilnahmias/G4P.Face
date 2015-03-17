using G4P.Face.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4P.Face.Repositories
{
    public class Seed
    {
        public static void Experiments()
        {
            Repositories.Experiments.AddOrUpdate(new Experiment
            {
                Id = "exp1",
                Template = new ExperimentTemplate
                {
                    Id = "template 1",
                    SpriteIds = new List<string> { "seed sprite 1", "seed sprite 2" },
                    Tags = new List<string> { "tag one", "tag two" }
                }
            });

            Repositories.Experiments.AddOrUpdate(new Experiment
            {
                Template = new ExperimentTemplate
                {
                    Id = "template 2",
                    SpriteIds = new List<string> { "seed sprite 2", "seed sprite 3" },
                    Tags = new List<string> { "tag two", "tag three" }
                }
            });
        }

        public static void Sprites()
        {
            Repositories.Sprites.AddOrUpdate(new Sprite
            {
                Id = "seed sprite 1",
                Url = "/seed1.png",
                Width = 1000,
                Height = 100,
                Rows = 5,
                Columns = 20,
                Tags = new List<string> { "seed", "one" }
            });

            Repositories.Sprites.AddOrUpdate(new Sprite
            {
                Id = "seed sprite 2",
                Url = "/seed2.png",
                Width = 1000,
                Height = 100,
                Rows = 5,
                Columns = 20,
                Tags = new List<string> { "seed", "two" }
            });

            Repositories.Sprites.AddOrUpdate(new Sprite
            {
                Id = "seed sprite 3",
                Url = "/seed3.png",
                Width = 1000,
                Height = 100,
                Rows = 5,
                Columns = 20
            });
        }

        public static void ExperimentTemplates()
        {
            Repositories.ExperimentTemplates.AddOrUpdate(new ExperimentTemplate
            {
                Id = "template 1",
                SpriteIds = new List<string> { "seed sprite 1", "seed sprite 2" },
                Tags = new List<string> { "tag one", "tag two" }
            });

            Repositories.ExperimentTemplates.AddOrUpdate(new ExperimentTemplate
            {
                Id = "template 2",
                SpriteIds = new List<string> { "seed sprite 2", "seed sprite 3" },
                Tags = new List<string> { "tag two", "tag three" }
            });
        }

        public static void PurgeAll()
        {
            DB.DeleteStorage();
        }
    }
}
