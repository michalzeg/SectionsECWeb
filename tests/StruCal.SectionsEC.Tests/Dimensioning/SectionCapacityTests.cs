using NUnit.Framework;
using SectionsEC.Calculations.Dimensioning;
using SectionsEC.Calculations.Geometry;
using SectionsEC.Calculations.LoadCases;
using SectionsEC.Calculations.Sections;
using StruCal.SectionsEC.Calculations.Materials;
using System;
using System.Collections.Generic;

namespace SectionsECTests.Dimensioning
{
    [TestFixture()]
    public class SectionCapacityTests
    {
        [TestCase(0, 1085)]
        [TestCase(1000, 1338)]
        [TestCase(-1000, 716)]
        [TestCase(5000, 951)]
        [TestCase(6000, 681)]
        public void CalculateCapacity_RectangularSectionWithOneBarNormalConcrete_Passed(double normalForce, double expectedCapacity)
        {
            var concrete = new Concrete
            {
                Acc = 1d,
                Ec2 = 2d / 1000d,
                Ecu2 = 3.5d / 1000d,
                GammaC = 1.5d,
                N = 2,
                Fck = 12000
            };
            var steel = new Steel
            {
                Fyk = 500000,
                GammaS = 1.15,
                K = 1.05,
                Euk = 2.5d / 100d,
                EudToEuk = 0.9,
                Es = 200000000
            };
            var sectionCapacity = new SectionCapacity(new CalculationsFactory());
            var coordinates = new List<PointD>
            {
                new PointD(0, 0),
                new PointD(1, 0),
                new PointD(1, 1),
                new PointD(0, 1),
                new PointD(0, 0)
            };
            var sectionGeometry = new SectionGeometry(coordinates);

            var bar = new Bar
            {
                D = Math.Sqrt( 4 / Math.PI * 30d / 10000d),
                X = 0.5,
                Y = 0.1
            };
            var bars = new[] { bar };

            var section = new Section(concrete, steel, sectionGeometry, bars);

            var results = sectionCapacity.CalculateCapacity(new LoadCase() { NormalForce = normalForce}, section);

            Assert.AreEqual(expectedCapacity, results.Mrd, 1);
        }

        [TestCase(0, 1278)]
        [TestCase(1000, 1688)]
        [TestCase(-1000, 828.7)]
        [TestCase(10000, 4889)]
        [TestCase(25000, 6345)]
        public void CalculateCapacity_RectangularSectionWithOneBarHighStrengthConcrete_Passed(double normalForce, double expectedCapacity)
        {
            var concrete = new Concrete
            {
                Acc = 1d,
                Ec2 = 2.6d / 1000d,
                Ecu2 = 2.6d / 1000d,
                GammaC = 1.5d,
                N = 1.4,
                Fck = 90000
            };
            var steel = new Steel
            {
                Fyk = 500000,
                GammaS = 1.15,
                K = 1.15,
                Euk = 7.5d / 100d,
                EudToEuk = 0.9,
                Es = 200000000
            };
            var sectionCapcity = new SectionCapacity(new CalculationsFactory());
            var coordinates = new List<PointD>
            {
                new PointD(0, 0),
                new PointD(1, 0),
                new PointD(1, 1),
                new PointD(0, 1),
                new PointD(0, 0)
            };
            var sectionGeometry = new SectionGeometry(coordinates);

            Bar bar = new Bar
            {
                D = Math.Sqrt(4 / Math.PI * 30d / 10000d),
                X = 0.5,
                Y = 0.1
            };
            var bars = new[] { bar };
            var section = new Section(concrete, steel, sectionGeometry, bars);

            var results = sectionCapcity.CalculateCapacity(new LoadCase() { NormalForce = normalForce }, section);

            Assert.AreEqual(expectedCapacity, results.Mrd, 1);
        }

        [TestCase(0, 315.8)]
        [TestCase(1000, 28.97)]
        [TestCase(-1000, 482.4)]
        [TestCase(500, 174.1)]
        [TestCase(-600, 484.7)]
        public void CalculateCapacity_CustomSectionWithOneBarNormalConcrete_Passed(double normalForce, double expectedCapacity)
        {
            Concrete concrete = new Concrete
            {
                Acc = 1d,
                Ec2 = 2d / 1000d,
                Ecu2 = 3.5d / 1000d,
                GammaC = 1.5d,
                N = 2,
                Fck = 12000
            };
            Steel steel = new Steel
            {
                Fyk = 500000,
                GammaS = 1.15,
                K = 1.05,
                Euk = 2.5d / 100d,
                EudToEuk = 0.9,
                Es = 200000000
            };
            var sectionCapacity = new SectionCapacity(new CalculationsFactory());
            List<PointD> coordinates = new List<PointD>
            {
                new PointD(0, 0),
                new PointD(0.1, 0),
                new PointD(0.2, 0.5),
                new PointD(0.3, 0.6),
                new PointD(-0.2, 0.6),
                new PointD(-0.1, 0.5),
                new PointD(0, 0)
            };
            var sectionGeometry = new SectionGeometry(coordinates);

            Bar bar = new Bar
            {
                D = Math.Sqrt(4 / Math.PI * 30d / 10000d),
                X = 0.05,
                Y = 0.05
            };
            var bars = new[] { bar };
            var section = new Section(concrete, steel, sectionGeometry, bars);

            var results = sectionCapacity.CalculateCapacity(new LoadCase() { NormalForce = normalForce }, section);
            Assert.AreEqual(expectedCapacity, results.Mrd, 1);
        }

        [TestCase(0, 696)]
        [TestCase(1000, 833)]
        [TestCase(-1000, 554.1)]
        [TestCase(500, 770.2)]
        [TestCase(700, 796.9)]
        public void CalculateCapacity_CustomSectionWithOneBarHighStrengthConcrete_Passed(double normalForce, double expectedCapacity)
        {
            var concrete = new Concrete
            {
                Acc = 1d,
                Ec2 = 2.6d / 1000d,
                Ecu2 = 2.6d / 1000d,
                GammaC = 1.5d,
                N = 1.4,
                Fck = 90000
            };
            var steel = new Steel
            {
                Fyk = 500000,
                GammaS = 1.15,
                K = 1.15,
                Euk = 7.5d / 100d,
                EudToEuk = 0.9,
                Es = 200000000
            };
            var sectionCapcity = new SectionCapacity(new CalculationsFactory());
            List<PointD> coordinates = new List<PointD>
            {
                new PointD(0, 0),
                new PointD(0.1, 0),
                new PointD(0.2, 0.5),
                new PointD(0.3, 0.6),
                new PointD(-0.2, 0.6),
                new PointD(-0.1, 0.5),
                new PointD(0, 0)
            };
            SectionGeometry sectionGeometry = new SectionGeometry(coordinates);

            Bar bar = new Bar
            {
                D = Math.Sqrt(4 / Math.PI * 30d / 10000d),
                X = 0.05,
                Y = 0.05
            };
            var bars = new[] { bar };
            var section = new Section(concrete, steel, sectionGeometry, bars);

            var results = sectionCapcity.CalculateCapacity(new LoadCase() { NormalForce = normalForce }, section);
            Assert.AreEqual(expectedCapacity, results.Mrd, 1);
        }
    }
}