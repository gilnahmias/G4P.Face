using G4P.Face.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4P.Face.Repositories
{
    public class Sprites
    {
        const string SPRITES_COLLECTION = "sprites";

        public void Clear()
        {
            using (var engine = DB.CreateEngine())
            {
                var table = engine.OpenXTable<string, Sprite>(SPRITES_COLLECTION);
                table.Clear();
                engine.Commit();
            }
        }

        public Sprite GetById(string id)
        {
            using (var engine = DB.CreateEngine())
            {
                var table = engine.OpenXTable<string, Sprite>(SPRITES_COLLECTION);
                return table[id];
            }
        }

        public IEnumerable<Sprite> GetAll()
        {
            var sprites = new List<Sprite>();

            using (var engine = DB.CreateEngine())
            {
                var table = engine.OpenXTable<string, Sprite>(SPRITES_COLLECTION);
                foreach (var row in table) //table.Forward(), table.Backward()
                {
                    sprites.Add(row.Value);
                }
            }

            return sprites;
        }

        public void AddOrUpdate(Sprite sprite)
        {
            using (var engine = DB.CreateEngine())
            {
                var table = engine.OpenXTable<string, Sprite>(SPRITES_COLLECTION);
                table[sprite.Id] = sprite;
                engine.Commit();
            }
        }
    }
}
