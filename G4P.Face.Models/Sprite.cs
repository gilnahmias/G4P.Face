using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4P.Face.Models
{
    public class Sprite
    {
        public string Id { get; set; }

        public List<string> Tags { get; set; }

        public string Url { get; set; }
        public int Width { get; set; }

        public int Height { get; set; }

        public int Rows { get; set; }

        public int Columns { get; set; }
    }
}
