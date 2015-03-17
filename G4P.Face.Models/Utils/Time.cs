using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G4P.Face.Models.Utils
{
    public class Time
    {
        const long UnixEpochStartInTicks = 621355968000000000;

        public static DateTimeOffset MsToDateTimeOffset(long unixTimeStamp)
        {
            var dtDateTime = new DateTimeOffset(1970, 1, 1, 0, 0, 0, 0, TimeSpan.Zero);
            dtDateTime = dtDateTime.AddMilliseconds(unixTimeStamp);
            return dtDateTime; 
        }

        public static long DateTimeOffsetToMs(DateTimeOffset date)
        {
            return (date.UtcTicks - UnixEpochStartInTicks)/ TimeSpan.TicksPerMillisecond;
        }
    }
}
