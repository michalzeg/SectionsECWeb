namespace SectionsEC.Calculations.Interfaces
{
    public interface IStrainCalculations
    {
        double Ec2Y(double x, double effectiveDepth);

        double StrainInAs1(double x, double di, double effectiveDepth);

        double StrainInAs2(double x, double di, double effectiveDepth);

        double StrainInConcrete(double x, double di, double effectiveDepth);
    }
}