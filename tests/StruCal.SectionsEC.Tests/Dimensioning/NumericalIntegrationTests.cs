using NUnit.Framework;
using System.Collections.Generic;
using SectionsEC.Calculations.Geometry;
using SectionsEC.Calculations.Sections;
using SectionsEC.Calculations.Integrations;

namespace SectionsECTests.Dimensioning
{
    [TestFixture]
    public class NumericalIntegrationTests
    {
        [Test]
        public void Integrate_RectangulerSection_Passed()
        {
            IList<PointD> coordinates = new List<PointD>
            {
                new PointD(0, 0),
                new PointD(1, 0),
                new PointD(1, 1),
                new PointD(0, 1),
                new PointD(0, 0)
            };

            var section = new SectionGeometry(coordinates);

            var integration = new NumbericalIntegrationCalculator();
            var result = integration.Integrate(section, 0d, (e) => 1);

            Assert.AreEqual(1d, result.NormalForce, 0.001);
            Assert.AreEqual(0.5, result.Moment, 0.001);
        }

        [Test()]
        public void Integrate_RectangulerSectionParabilicFunction_Passed()
        {
            IList<PointD> coordinates = new List<PointD>
            {
                new PointD(0, 0),
                new PointD(1, 0),
                new PointD(1, 1),
                new PointD(0, 1),
                new PointD(0, 0)
            };

            var section = new SectionGeometry(coordinates);

            var integration = new NumbericalIntegrationCalculator();
            var result = integration.Integrate(section, 0d, y => (1 - (1 - y) * (1 - y)));

            Assert.AreEqual(0.6666667, result.NormalForce, 0.001);
            Assert.AreEqual(0.416667, result.Moment, 0.001);
        }
    }
}