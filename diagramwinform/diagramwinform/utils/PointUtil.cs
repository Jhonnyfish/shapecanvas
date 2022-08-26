using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using diagramwinform.models;

namespace diagramwinform.utils
{
    public static class PointUtil
    {
        public static bool IsInWbv(Point formPointer, WbvRegion wbvRegion, ref Point wbvPoint)
        {
            if (formPointer.X > wbvRegion.xMin && formPointer.X < wbvRegion.xMax && formPointer.Y < wbvRegion.yMax &&
                formPointer.Y > wbvRegion.yMin)
            {
                wbvPoint = new Point(formPointer.X - wbvRegion.xMin, formPointer.Y - wbvRegion.yMin);
                return true;
            }
            return false;
        }
    }
}