using System.Xml.Serialization;

namespace StruCal.SectionsEC.Calculations.Materials
{
    public class Steel
    {
        public string Grade { get; init; }

        public double Fyk { get; init; }

        public double GammaS { get; init; }

        public double K { get; init; }

        public double Es { get; init; }

        public double Euk { get; init; }

        public double EudToEuk { get; init; }

        public double Fyd
        {
            get
            {
                return Fyk / GammaS;
            }
        }

        public double Eud
        {
            get
            {
                return Euk * EudToEuk;
            }
        }

        public double SteelStressDesign(double epsilon)
        {
            if (epsilon < 0)
            {
                return 0;
            }
            else if (epsilon <= Fyd / Es)
            {
                return epsilon * Es;
            }
            else if (epsilon <= Eud)
            {
                var a = (K * Fyd - Fyd) / (Euk - Fyd / Es);
                var b = Fyd - a * Fyd / Es;
                return a * epsilon + b;
            }
            return 0d;
        }

        public double SteelStressCharacteristic(double epsilon)
        {

            if (epsilon <= Fyk / Es)
            {
                return epsilon * Es;
            }
            else if (epsilon <= Euk)
            {
                var a = (K * Fyk - Fyk) / (Euk - Fyk / Es);
                var b = Fyk - a * Fyk / Es;
                return a * epsilon + b;
            }
            return 0d;
        }
    }
}