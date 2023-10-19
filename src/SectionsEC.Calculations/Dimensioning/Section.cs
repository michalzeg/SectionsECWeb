using System.Linq;
using System.Collections.Generic;
using SectionsEC.Calculations.Sections;
using SectionsEC.Calculations.Interfaces;
using SectionsEC.Calculations.Geometry;
using SectionsEC.Calculations.SectionProperties;
using StruCal.SectionsEC.Calculations.Materials;

namespace SectionsEC.Calculations.Dimensioning
{
    public class Section
    {
        public Concrete Concrete { get; }
        public Steel Steel { get; }
        public SectionGeometry SectionGeometry { get; }

        public double EffectiveDepth { get; }

        public IList<Reinforcement> Reinforcement { get; }

        public Section(Concrete concrete, Steel steel, SectionGeometry sectionGeometry, IList<Bar> bars)
        {
            Concrete = concrete;
            Steel = steel;
            SectionGeometry = sectionGeometry;
            Reinforcement = bars.Select(e => new Reinforcement()
            {
                Bar = e,
                D = SectionGeometry.MaxY - e.Y
            }).ToList();

            EffectiveDepth = Reinforcement.Max(bar => bar.D);
        }

        public double ForceInTensionSteel(double x, IStrainCalculations strainCalculations)
        {
            var resultantForce = 0d;
            var yNeutralAxis = SectionGeometry.GetNeutralAxis(x);
            foreach (var item in Reinforcement.Where(e => e.Bar.Y < yNeutralAxis))
            {
                var effectiveHeight = item.D;
                var strain = strainCalculations.StrainInAs1(x, effectiveHeight, EffectiveDepth);
                resultantForce += item.Bar.As * Steel.SteelStressDesign(strain);
                item.Epsilon = strain;
                item.IsCompressed = false;
            }
            return resultantForce;
        }

        public double ForceInCompressedSteel(double x, IStrainCalculations strainCalculations)
        {
            var resultantForce = 0d;
            var yNeutralAxis = SectionGeometry.GetNeutralAxis(x);

            foreach (var item in Reinforcement.Where(e => e.Bar.Y > yNeutralAxis))
            {
                var effectiveHeight = item.D;
                var strain = strainCalculations.StrainInAs2(x, effectiveHeight, EffectiveDepth);
                resultantForce += item.Bar.As * Steel.SteelStressDesign(strain);
                item.Epsilon = strain;
                item.IsCompressed = true;
            }
            return resultantForce;
        }

        public double MomentReinforcement()
        {
            var moment = 0d;

            foreach (var item in Reinforcement)
            {
                var multiplier = item.IsCompressed ? 1 : -1;
                item.Sigma = Steel.SteelStressDesign(item.Epsilon) * multiplier;
                item.Epsilon *= multiplier;
                item.Force = item.Bar.As * item.Sigma;
                item.Moment = item.Force * (item.Bar.Y - SectionGeometry.MinY);

                moment += item.Moment;
            }

            return moment;
        }

        public double ForceInConcrete(double x, ICompressionZoneCalculations compressionZoneCalculations)
        {
            var result = compressionZoneCalculations.Calculate(x, SectionGeometry, EffectiveDepth);
            return result.NormalForce;
        }
        public double TensionCapacity()
        {
            return -1 * Reinforcement.Select(e=>e.Bar).Sum(bar => bar.As * Steel.Fyd * Steel.K);
        }

        public double CompressionCapacity()
        {
            if (SectionGeometry.Coordinates.Count == 0)
            {
                return 0.0;
            }

            return SectionPropertiesCalculator.Area(SectionGeometry.Coordinates) * Concrete.Fcd;
        }
    }
}