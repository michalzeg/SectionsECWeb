using SectionsEC.Calculations.Extensions;
using System;

namespace SectionsEC.Calculations.Geometry
{
    public record struct PointD
    {
        public PointD(double x, double y)
        {
            X = x;
            Y = y;
        }

        public double X { get;  }
        public double Y { get;  }

        public PointD Copy() => new PointD(X, Y); 
    }
}