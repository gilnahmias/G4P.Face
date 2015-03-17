using STSdb4.Database;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4P.Face.Repositories
{
    public class DB
    {
        const string DB_PATH = @"c:\g4p-face.db";

        public static IStorageEngine CreateEngine()
        {
            return STSdb.FromFile(DB_PATH);
        }

        public static void DeleteStorage(){
            DB.UnlockFile();

            if (File.Exists(DB_PATH))
            {
                File.Delete(DB_PATH);
            }
        }

        private static void UnlockFile()
        {
            var length = new FileInfo(DB_PATH).Length;

            try
            {
                using (FileStream fileStream = new FileStream(
                    DB_PATH, FileMode.OpenOrCreate,
                    FileAccess.ReadWrite, FileShare.ReadWrite))
                {
                    fileStream.Unlock(0, length);
                }
            }
            catch
            {
                // swallow for now
            }
        }
                                
    }
}
