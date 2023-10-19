using System;
using System.Xml.Serialization;

namespace StruCal.SectionsEC.Calculations.Materials
{
    public class Concrete
    {
        public string Grade { get; init; }

        public double Fck { get; init; }

        public double Acc { get; init; }

        public double GammaC { get; init; }

        public double N { get; init; }

        public double Ec2 { get; init; }

        public double Ecu2 { get; init; }

        public double Fcd
        {
            get
            {
                return Acc * Fck / GammaC;
            }
        }

        public double ConcreteStressDesign(double epsilon)
        {
            if (epsilon < 0)
            {
                return 0;
            }
            else if (epsilon <= Ec2)
            {
                return Fcd * (1 - Math.Pow(1 - epsilon / Ec2, N));
            }
            else if (epsilon <= Ecu2)
            {
                return Fcd;
            }
            return 0d;
        }

        public double ConcreteStressCharacteristic(double epsilon)
        {
            if (epsilon <= Ec2)
            {
                return Fck * (1 - Math.Pow(1 - epsilon / Ec2, N));
            }
            else
            {
                return Fck;
            }
        }
    }
}