using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace diagramwinform
{
    public static class ConstOfPath
    {
        public static readonly string BasePath = Path.Combine(System.AppDomain.CurrentDomain.BaseDirectory);
    }
}