using STSdb4.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4P.Face.Repositories
{
    public class DB
    {
        const string DB_PATH = @"c:\g4p-face.db";
        const string EXPERIMENTS_COLLECTION = "experiments";

        public static IStorageEngine CreateEngine()
        {
            return STSdb.FromFile(DB_PATH);
        }
    }
}
