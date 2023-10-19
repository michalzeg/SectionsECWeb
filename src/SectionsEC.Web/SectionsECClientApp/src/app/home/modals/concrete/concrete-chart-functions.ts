import { Concrete } from "src/app/shared/models/concrete";
import { Point } from "src/app/shared/models/point";

const factor = 10000;

export const concreteCharStress = (strain: number, concrete: Concrete): number =>
  strain <= concrete.ec2 ? concrete.fck * (1 - Math.pow(1 - strain / concrete.ec2, concrete.n)) : concrete.fck;

export const concreteDesignStress = (strain: number, concrete: Concrete): number =>
  concreteCharStress(strain, concrete) * concrete.acc / concrete.gammaC;

export const concreteCharChartValues = (concrete: Concrete): Point[] => concreteChartValuesFactory(concrete,s=> concreteCharStress(s,concrete))

export const concreteDesignChartValues = (concrete: Concrete): Point[] => concreteChartValuesFactory(concrete,s=> concreteDesignStress(s,concrete))

export const concreteChartValuesFactory = (concrete: Concrete, factory: (strain: number, concrete: Concrete) => number): Point[] =>
  {
    const length = Math.ceil(concrete.ecu2 * factor + 1);
    const sequence = [...Array(length).keys()];
    return sequence.map(e => e / factor).map(e => ({ x: e, y: factory(e, concrete) }));
  };
