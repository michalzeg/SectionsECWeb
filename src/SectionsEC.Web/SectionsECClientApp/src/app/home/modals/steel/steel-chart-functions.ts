import { Point } from "src/app/shared/models/point";
import { Steel } from "src/app/shared/models/steel";

const factor = 10000;

export const steelCharStress = (strain: number, steel: Steel): number =>
  {
    let result;
    if (strain <= steel.fyk / steel.es) {
        result = strain * steel.es;
    }
    else {
        const a = (steel.k * steel.fyk - steel.fyk) / (steel.euk - steel.fyk / steel.es);
        const b = steel.fyk - a * steel.fyk / steel.es;
        result = a * strain + b;
    }
    return result;
  };

export const steelDesignStress = (strain: number, steel: Steel): number =>
  {
    let result;
    if (strain <= steel.fyd / steel.es) {
        result = strain * steel.es;
    }
    else {
        const a = (steel.k * steel.fyd - steel.fyd) / (steel.eud - steel.fyd / steel.es);
        const b = steel.fyd - a * steel.fyd / steel.es;
        result = a * strain + b;
    }
    return result;
  };

export const steelCharChartValues = (steel: Steel): Point[] => steelChartValuesFactory(steel,s=> steelCharStress(s,steel), steel.euk)

export const steelDesignChartValues = (steel: Steel): Point[] => steelChartValuesFactory(steel,s=> steelDesignStress(s,steel), steel.eud)

export const steelChartValuesFactory = (steel: Steel, factory: (strain: number, steel: Steel) => number, limit: number): Point[] =>
  {
    const length = Math.ceil(limit * factor + 1);
    const sequence = [...Array(length).keys()];
    return sequence.map(e => e / factor).map(e => ({ x: e, y: factory(e, steel) }));
  };

