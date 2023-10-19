using SectionsEC.Calculations.Interfaces;
using SectionsEC.Calculations.Sections;
using StruCal.SectionsEC.Calculations.Materials;

namespace SectionsEC.Calculations.StressFunctions
{
    public class StrainCalculations : IStrainCalculations
    {
        private Concrete _concrete;
        private Steel _steel;
        private SectionGeometry _section;

        public StrainCalculations(Concrete concrete, Steel steel, SectionGeometry section)
        {
            _concrete = concrete;
            _steel = steel;
            _section = section;
        }

        public double Ec2Y(double x, double effectiveDepth)
        {
            var ec2Y = 0d;
            if (x > effectiveDepth)
            {
                if (StrainFunction.AssumedMaxStrainInConcrete.E37h(x, _concrete.Ec2, _concrete.Ecu2, _section.H) > _concrete.Ec2)
                {
                    ec2Y = StrainFunction.AssumedMaxStrainIn37H.Ec2Y(_section.H, _concrete.Ec2, _concrete.Ecu2);
                }
                else
                {
                    ec2Y = StrainFunction.AssumedMaxStrainInConcrete.Ec2Y(x, _concrete.Ec2, _concrete.Ecu2);
                }
            }
            else
            {
                if (StrainFunction.AssumedMaxStrainInConcrete.Esi(effectiveDepth, x, _concrete.Ecu2) > _steel.Eud)
                {
                    ec2Y = StrainFunction.AssumedMaxStrainInSteel.Ec2Y(effectiveDepth, x, _steel.Eud, _concrete.Ec2);
                }
                else
                {
                    ec2Y = StrainFunction.AssumedMaxStrainInConcrete.Ec2Y(x, _concrete.Ec2, _concrete.Ecu2);
                }
            }
            return ec2Y;
        }

        public double StrainInAs2(double x, double di, double effectiveDepth)
        {
            var e = 0d;
            if (x > effectiveDepth)
            {
                if (StrainFunction.AssumedMaxStrainInConcrete.E37h(x, _concrete.Ec2, _concrete.Ecu2, _section.H) > _concrete.Ec2)
                {
                    e = StrainFunction.AssumedMaxStrainIn37H.Es2i(x, di, _concrete.Ec2, _concrete.Ecu2, _section.H);
                }
                else
                {
                    e = StrainFunction.AssumedMaxStrainInConcrete.Es2i(di, x, _concrete.Ecu2);
                }
            }
            else
            {
                if (StrainFunction.AssumedMaxStrainInConcrete.Esi(effectiveDepth, x, _concrete.Ecu2) > _steel.Eud)
                {
                    e = StrainFunction.AssumedMaxStrainInSteel.Es2i(di, x, effectiveDepth, _steel.Eud);
                }
                else
                {
                    e = StrainFunction.AssumedMaxStrainInConcrete.Es2i(di, x, _concrete.Ecu2);
                }
            }
            return e;
        }

        public double StrainInAs1(double x, double di, double effectiveDepth)
        {
            var e = 0d;
            if (x > effectiveDepth)
            {
                e = 0;
            }
            else
            {
                if (StrainFunction.AssumedMaxStrainInConcrete.Esi(effectiveDepth, x, _concrete.Ecu2) > _steel.Eud)
                {
                    e = StrainFunction.AssumedMaxStrainInSteel.Esi(di, x, effectiveDepth, _steel.Eud);
                }
                else
                {
                    e = StrainFunction.AssumedMaxStrainInConcrete.Esi(di, x, _concrete.Ecu2);
                }
            }
            return e;
        }

        public double StrainInConcrete(double x, double di, double effectiveDepth)
        {
            var e = 0d;
            if (x > effectiveDepth)
            {
                if (StrainFunction.AssumedMaxStrainInConcrete.E37h(x, _concrete.Ec2, _concrete.Ecu2, _section.H) > _concrete.Ec2)
                {
                    e = StrainFunction.AssumedMaxStrainIn37H.Ec(x, di, _section.H, _concrete.Ec2, _concrete.Ecu2);
                }
                else
                {
                    e = StrainFunction.AssumedMaxStrainInConcrete.Ec(x, di, _concrete.Ecu2);
                }
            }
            else
            {
                if (StrainFunction.AssumedMaxStrainInConcrete.Esi(effectiveDepth, x, _concrete.Ecu2) > _steel.Eud)
                {
                    e = StrainFunction.AssumedMaxStrainInSteel.Ec(effectiveDepth, x, di, _steel.Eud);
                }
                else
                {
                    e = StrainFunction.AssumedMaxStrainInConcrete.Ec(x, di, _concrete.Ecu2);
                }
            }
            return e;
        }
    }
}