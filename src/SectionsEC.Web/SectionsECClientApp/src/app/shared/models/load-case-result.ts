import { Concrete } from "./concrete";
import { Steel } from "./steel";
import { LoadCase } from "./loadCase";
import { Point } from "./point";
import { Reinforcement } from "./reinforcement";


export interface LoadCaseResult {
  reinforcements: Reinforcement[];
  compressionZone: Point[];
  d: number;
  h: number;
  cz: number;
  ec: number;
  es: number;
  forceConcrete: number;
  loadCase: LoadCase;
  mrd: number;
  mrdConcrete: number;
  x: number;
  forceReinforcement: number;
  momentReinforcement: number;
  hasSolution: boolean;
  compressionAxialCapacity: number;
  tensionAxialCapacity: number;
  steel: Steel;
  concrete: Concrete;
}
